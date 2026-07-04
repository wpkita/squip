# Squip

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

[`azure-pipelines.yml`](azure-pipelines.yml) runs two jobs on every push and PR to `main`: a **backend** job that builds and tests `squip-api/Squip.sln`, and a **frontend** job that builds `squip-app` and runs its unit tests headless.

## License

Released under the [MIT License](LICENSE).
