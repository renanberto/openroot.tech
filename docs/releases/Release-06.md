# OpenRoot OS Release 6 - Developer Experience

Status: DONE
Version: 6.0.0-prod
Date: 2026-07-07

## Objective

Add a developer-facing layer to the static OpenRoot OS without re-expanding the recruiter inspector. Release 6 exposes API contracts, JSON engine rules, plugin registry details, extension points, CLI commands, import/export contracts, test gates and docs through the filesystem, terminal and public static API.

## Completed minors

- R6.1 API: static API endpoint contract documented and exposed through `api endpoints`.
- R6.2 JSON Engine: content source-of-truth and generator rules exposed through `json contract`.
- R6.3 Plugin System: runtime plugin registry and extension points exposed through `plugins list`.
- R6.4 Extensions: command, content, static API and theme extension map exposed through `extensions map`.
- R6.5 CLI: developer command guide exposed through `cli` and command palette entries.
- R6.6 Importers: supported importer contracts exposed through `importers`.
- R6.7 Exporters: static exporter contracts exposed through `exporters`.
- R6.8 Testing: release gates exposed through `testing gates`.
- R6.9 Documentation: Release 6 docs, changelog, release notes and feature matrix updated.
- R6.10 Release: version, validators, generated public API and production build updated to 6.0.0-prod.

## Extra fixes

- Developer content is available as `/developer` in the virtual filesystem and generated as `/api/developer.json`.
- A dedicated `@openroot/plugin-developer` package registers developer commands without polluting the recruiter inspector.
- Filesystem now includes a `developer` folder with API, JSON, plugins, extensions, CLI, importers, exporters and testing nodes.
- Command palette includes Developer Experience, API Endpoints, Plugin Registry and Testing Gates entries.

## Production validation

- npm run validate:all: PASS
- npm run build: PASS
- npm run validate:pages: PASS
- npm run audit:static: PASS
- npm run rc:check: PASS
