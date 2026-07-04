# Refine Backlog

Priority order = file order. Topmost item is next.

### Add CI coverage for the frontend (squip-app)

- type: bug
- impact: medium — the Angular/Ionic app is never built or tested in CI; only the backend is (maturity rungs 5/7). Now unblocked: the frontend unit suite is green (25/25) and `ng build` passes.
- effort: medium — extend azure-pipelines.yml into two jobs (backend on windows-latest, frontend on ubuntu-latest). Frontend steps: NodeTool (Node 22.x), `npm ci`, `npm run build`, and `npm test -- --watch=false --browsers=ChromeHeadlessCI` (the ChromeHeadlessCI launcher already exists in karma.conf.js). Do NOT gate on `npm run lint` yet — see the lint item below (currently 62 errors). Add the lint gate after that item lands.
- notes: Verified locally that npm ci, ng build, and the headless test all pass. Node 24 is installed locally; Angular 20 supports 20/22/24 — pin 22.x (LTS) in CI. `git remote` is GitHub (github.com/wpkita/squip) but CI is Azure Pipelines; keep it Azure for this item (migrating CI systems is out of scope).

### Fix squip-app ESLint errors, then enforce `ng lint` in CI

- type: bug
- impact: medium — `ng lint` currently fails with 62 errors, so the linter cannot be an enforced gate (maturity rung 14). Most are Angular 20 modernizations: `@angular-eslint/prefer-inject`, `@angular-eslint/prefer-standalone`, and a few `no-empty-lifecycle-method`.
- effort: medium — many are auto-fixable via `ng lint --fix` and the Angular migration schematics (`ng generate @angular/core:inject`); `prefer-standalone` may need manual review per component. After green, add `npm run lint` to the frontend CI job.
- notes: 62 errors across targets/* and other feature modules. Split further if the standalone migration proves large.

### Add automated dependency updates (Dependabot/Renovate)

- type: feature
- impact: medium — maturity rung 9; vuln scanning without an update mechanism just generates guilt. Two ecosystems (NuGet + npm) to keep current.
- effort: medium — add `.github/dependabot.yml` covering `nuget` (squip-api) and `npm` (squip-app). Host is GitHub, so Dependabot is native.
- notes: No .github/ config exists yet.

### Make E2E test base URL configurable instead of hardcoded

- type: feature
- impact: low-medium — HibitsTests/HabitsTests/IdeasTests hardcode `https://localhost:8080/api`; brittle and unrunnable against any other environment.
- effort: medium — read base URL from an env var/config with the localhost default; share a client factory across the E2E tests.
- notes: Tests are excluded from CI (`Category!=End-to-end`) but still valuable to run locally/on-demand.
