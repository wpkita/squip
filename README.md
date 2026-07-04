# Squip

[![CI](https://github.com/wpkita/squip/actions/workflows/ci.yml/badge.svg)](https://github.com/wpkita/squip/actions/workflows/ci.yml)

Monorepo for Squip, split into a C# backend and an Ionic/Angular frontend:

- [`squip-api/`](squip-api/) — ASP.NET Core REST API (.NET 10), backed by PostgreSQL. Solution projects live under `src/`, tests under `tests/`. See [squip-api/README.md](squip-api/README.md) for local database setup.
- [`squip-app/`](squip-app/) — Ionic/Angular client, deployable as a PWA (via Firebase) or native app (via Capacitor).

## Getting started

### Backend

```bash
cd squip-api
dotnet build
dotnet run --project src/Squip.Rest
```

### Frontend

```bash
cd squip-app
npm install
npm start
```

## CI

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on every push and PR to `main`, with two jobs shown by the badge above:

- **Backend (squip-api)** — `dotnet build` + test (`Category!=Integration`) of `squip-api/Squip.sln`.
- **Frontend (squip-app)** — `npm ci`, `ng lint`, `ng build`, and headless `ng test`.

## License

Released under the [MIT License](LICENSE).
