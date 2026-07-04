# Refine Done

Completed items, newest first.

### Fix azure-pipelines.yml so CI actually runs, and drop dead Cosmos env vars

- type: bug | impact: high | effort: small
- resolution: The Azure pipeline triggered only on `develop`, but the repo's default and only branch is `main` and there was no `pr:` trigger — so CI never ran on this repo (maturity rung 5, the enforcement backbone, was dead). Retargeted `trigger:` to `main` and added a `pr:` block for `main` so CI runs on pushes to main and on PRs. Also removed the `env:` block that injected `COSMOS_DB_CONN_STRING`/`COSMOS_DB_NAME`: the app uses PostgreSQL (Npgsql) exclusively with zero Cosmos usage, the unit tests are pure domain, and E2E tests are excluded via `--filter Category!=End-to-end`, so no env vars are needed. Verified locally that the pipeline's exact steps (`dotnet build` + `dotnet test --filter Category!=End-to-end`) succeed: build clean, 6/6 unit tests pass.
