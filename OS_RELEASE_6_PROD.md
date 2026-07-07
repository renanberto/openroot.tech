# OpenRoot OS Release 6 / PROD

OpenRoot OS developer experience release for openroot.tech.

## Scope

- Static API contract exposed through `/api/health.json`, `/api/knowledge.json` and `/api/developer.json`.
- Developer JSON source-of-truth mounted under `/developer`.
- Dedicated developer plugin with terminal commands: `devx`, `api`, `json`, `plugins`, `extensions`, `cli`, `importers`, `exporters`, `testing` and `docs`.
- Filesystem developer folder added without restoring overloaded sidebar favorites.
- Command palette developer shortcuts added.
- Validators, docs, release notes, roadmap and generated static content updated to 6.0.0-prod.

## Build

```bash
npm install
npm run rc:check
```
