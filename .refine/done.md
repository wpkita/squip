# Refine Done

Completed items, newest first.

### Fix squip-app ESLint errors and enforce `ng lint` in CI

- type: bug | impact: medium | effort: medium
- resolution: `ng lint` failed with 62 errors, so the linter was not an enforced gate (maturity rung 14). Breakdown: 48 `@angular-eslint/prefer-inject`, 3 `no-empty-lifecycle-method`, 11 `@angular-eslint/prefer-standalone`. Ran the official `ng generate @angular/core:inject` migration to convert constructor injection to `inject()` across 24 files (clears all 48 prefer-inject). Manually removed the 3 empty `ngOnInit`s (and their `OnInit`/`implements` declarations) from the modal editor components. The 11 prefer-standalone errors flag a deliberate architecture choice — every component sets `standalone: false` — so rather than force a large, risky standalone migration, disabled `@angular-eslint/prefer-standalone` in .eslintrc.json with a justification comment and filed a separate deferred backlog item for the eventual migration. Then added an `ng lint` step to the frontend CI job so the rest of the ruleset is now enforced. Verified: `ng lint` clean (0 errors), `ng build` green, 25/25 unit tests pass.

### Add CI coverage for the frontend (squip-app)

- type: bug | impact: medium | effort: medium
- resolution: Only the backend ran in CI (maturity rungs 5/7). Converted azure-pipelines.yml from a single job into two: a `backend` job (windows-latest: `dotnet build` + filtered `dotnet test`, unchanged) and a `frontend` job (ubuntu-latest: NodeTool 22.x → `npm ci` → `npm run build` → `npm test -- --watch=false --browsers=ChromeHeadlessCI`). Updated the README CI section to describe both jobs. Deliberately did NOT gate on `ng lint` yet (still 62 errors — separate backlog item). While verifying, discovered the frontend suite was flaky: `AppComponent`'s label-rendering test read `ion-label` text content, which intermittently returns '' because Ionic registers `ion-label` as a global custom element (triggered by any earlier IonicModule test) and moves the text into shadow DOM — under Jasmine's random order the outcome varied. Rewrote it to count the `*ngFor` host elements (structural, stable) and moved title/url verification onto the component model (`appPages`). Verified: `npm ci`, `ng build`, and 8/8 consecutive headless test runs all green (25/25 each). YAML validates to two jobs.

### Add a root LICENSE file

- type: bug | impact: medium | effort: small
- resolution: Tier 0 gate (maturity rung 2). Only `squip-api/LICENSE` existed; the monorepo root and the separately-deployable `squip-app` were unlicensed, so a reader at the repo root saw no license. Added a root `LICENSE` (MIT, verbatim match to squip-api's — © 2026 Squip) covering the whole monorepo, and added a "License" section to the root README linking to it. First line is `MIT License`, so GitHub/SPDX license detection recognizes it.

### Fix the failing frontend unit test suite (Angular 20 DI regressions)

- type: bug | impact: high | effort: medium
- resolution: Selected the "add frontend CI" item, but executing it revealed the squip-app Karma suite was entirely red — 16 of 25 tests failing — so per the maturity ladder (a red suite outranks every feature) the prerequisite was fixed first. Two root causes, both fallout from the Angular 15→20 upgrade where the specs were never updated: (1) 13 service/component specs never provided `HttpClient` (NG0201: No provider for HttpClient) — added `provideHttpClient()` + `provideHttpClientTesting()` to each TestBed; (2) AppComponent's spec injected the real Auth0 `AuthService` (NG0201: auth0.client token) and asserted a stale menu (Inbox/Outbox, 12 items) that no longer matches the template (5 nav pages) — mocked `AuthService`, replaced deprecated `RouterTestingModule` with `RouterModule.forRoot([])`, and rewrote the two DOM assertions against the current `appPages` (Angular 20 also dropped `ng-reflect-*` attributes, so the url check now asserts the nav config directly). Also added a `ChromeHeadlessCI` custom launcher (`--no-sandbox`) to karma.conf.js so the suite runs headless in CI/containers. Verified: `npm test -- --watch=false --browsers=ChromeHeadlessCI` → 25/25 pass; `ng build` still green.

### Fix azure-pipelines.yml so CI actually runs, and drop dead Cosmos env vars

- type: bug | impact: high | effort: small
- resolution: The Azure pipeline triggered only on `develop`, but the repo's default and only branch is `main` and there was no `pr:` trigger — so CI never ran on this repo (maturity rung 5, the enforcement backbone, was dead). Retargeted `trigger:` to `main` and added a `pr:` block for `main` so CI runs on pushes to main and on PRs. Also removed the `env:` block that injected `COSMOS_DB_CONN_STRING`/`COSMOS_DB_NAME`: the app uses PostgreSQL (Npgsql) exclusively with zero Cosmos usage, the unit tests are pure domain, and E2E tests are excluded via `--filter Category!=End-to-end`, so no env vars are needed. Verified locally that the pipeline's exact steps (`dotnet build` + `dotnet test --filter Category!=End-to-end`) succeed: build clean, 6/6 unit tests pass.
