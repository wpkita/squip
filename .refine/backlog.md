# Refine Backlog

Priority order = file order. Topmost item is next.

### Add CI coverage for the frontend (squip-app)

- type: bug
- impact: medium — the Angular/Ionic app (squip-app) is never built, tested, or linted in CI; only the backend is. Half the product ships unverified (maturity rungs 5/7).
- effort: medium — add a frontend job/step: `npm ci`, `ng build`, `ng lint`, and `ng test` in headless Chrome (karma ChromeHeadless). May require a puppeteer/Chrome step on the agent.
- notes: squip-app scripts: start/build/test/lint (package.json). Tests use Karma (karma.conf.js) — configure ChromeHeadless for CI. Consider whether to split into a separate pipeline or add a stage. Backend runs on windows-latest; frontend is fine on ubuntu-latest.

### Add a root LICENSE file

- type: bug
- impact: medium — Tier 0 gate (maturity rung 2). Only `squip-api/LICENSE` (MIT) exists; the monorepo root and `squip-app` have no license, so a reader at the repo root sees an unlicensed project.
- effort: small — add root `LICENSE` (MIT, matching squip-api's, copyright "2026 Squip") and reference it from the root README.
- notes: squip-api/LICENSE is MIT (c) 2026 Squip. Reuse the same terms at the root.

### Add automated dependency updates (Dependabot/Renovate)

- type: feature
- impact: medium — maturity rung 9; vuln scanning without an update mechanism just generates guilt. Two ecosystems (NuGet + npm) to keep current.
- effort: medium — add `.github/dependabot.yml` (or Renovate) covering the `nuget` and `npm` package ecosystems in squip-api and squip-app.
- notes: No .github/ config exists yet. Confirm the host is GitHub before choosing Dependabot vs Azure-native.

### Make E2E test base URL configurable instead of hardcoded

- type: feature
- impact: low-medium — HibitsTests/HabitsTests/IdeasTests hardcode `https://localhost:8080/api`; brittle and unrunnable against any other environment.
- effort: medium — read base URL from an env var/config with the localhost default; share a client factory across the E2E tests.
- notes: Tests are excluded from CI (`Category!=End-to-end`) but still valuable to run locally/on-demand.
