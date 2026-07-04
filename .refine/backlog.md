# Refine Backlog

Priority order = file order. Topmost item is next.

### Patch the 10 high-severity npm CVEs in squip-app

- type: bug
- impact: high — Tier 0 maturity gate: known high-severity CVEs in shipped frontend deps. `@angular/*` 20.0.0–20.3.x carry DoS-via-OOM and HttpTransferCache info-leak/weak-cache-key advisories; transitive `lodash` ≤4.17.23 carries code-injection (`_.template`) and prototype-pollution (`_.unset`/`_.omit`) advisories.
- effort: small — `npm audit fix` (verified via `--dry-run`) resolves all 10 with semver-compatible bumps; NO `--force`/breaking major required. Then verify `ng lint` clean, `ng build` green, and 25/25 Karma tests pass, and commit the updated package-lock.json.
- notes: Backend `dotnet list ... --vulnerable` is clean, so this is frontend-only. Re-run `npm audit --omit=dev` after to confirm 0 high/critical remain.

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
