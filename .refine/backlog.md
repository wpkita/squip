# Refine Backlog

Priority order = file order. Topmost item is next.

### Migrate squip-app components to standalone (Angular-recommended)

- type: feature
- impact: low — code modernization only; the app works fine NgModule-based. Angular recommends standalone going forward, and doing so would let us re-enable the `@angular-eslint/prefer-standalone` rule (currently disabled with justification in .eslintrc.json).
- effort: large — architectural: use the official `ng generate @angular/core:standalone` 3-step migration, then remove now-empty NgModules and update bootstrap. Touches every feature module and its specs; verify build + all 25 unit tests stay green. Should likely be split per feature module.
- notes: Deferred deliberately — every component currently sets `standalone: false`. Only pursue if the maintainer wants to modernize; not a defect.

### Make squip-app Auth0 config build-time configurable (NOT a secret fix)

- type: feature
- impact: low — the values in `environment.ts`/`environment.prod.ts` (Auth0 `domain`/`clientId`/`audience`) are PUBLIC SPA identifiers, shipped in every browser bundle by design; there is no client secret, so this is not a security issue. Value here is only multi-environment flexibility (deploy the same build against different tenants).
- effort: small-medium — source Auth0/apiUrl config from build-time env (e.g. an `angular.json` fileReplacement per configuration is already the mechanism; could add a `staging`/env-driven variant) if/when a second environment actually exists.
- notes: Recorded to stop future Analyze passes from re-flagging these as "committed secrets." Do not prioritize until there's a real second deploy target.
