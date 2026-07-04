# Refine Backlog

Priority order = file order. Topmost item is next.

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

### Migrate squip-app components to standalone (Angular-recommended)

- type: feature
- impact: low — code modernization only; the app works fine NgModule-based. Angular recommends standalone going forward, and doing so would let us re-enable the `@angular-eslint/prefer-standalone` rule (currently disabled with justification in .eslintrc.json).
- effort: large — architectural: use the official `ng generate @angular/core:standalone` 3-step migration, then remove now-empty NgModules and update bootstrap. Touches every feature module and its specs; verify build + all 25 unit tests stay green. Should likely be split per feature module.
- notes: Deferred deliberately — every component currently sets `standalone: false`. Only pursue if the maintainer wants to modernize; not a defect.
