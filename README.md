# OpenRoot OS

OpenRoot OS is a static portfolio operating-system experience for openroot.tech.

Current version: **5.0.0-prod**
Current release: **OS Release 5 - OpenRoot OS**

## Run locally

```bash
npm ci
npm run dev
```

## Production validation

```bash
npm run rc:check
```

This runs project validation, content validation, architecture checks, feature checks, consistency checks, typecheck, production build, GitHub Pages output validation and static audit.

## Deploy

GitHub Pages deploys from:

```text
apps/renanberto/dist
```

Workflow:

```text
.github/workflows/pages.yml
```

## Roadmap

- Operational roadmap: `docs/ROADMAP.md`
- Release 2 execution notes: `docs/releases/Release-02.md`
- Release 3 execution notes: `docs/releases/Release-03.md`
- Release 4 execution notes: `docs/releases/Release-04.md`
- Release 5 execution notes: `docs/releases/Release-05.md`
- Changelog: `CHANGELOG.md`
- Release notes: `RELEASE_NOTES.md`
- Feature matrix: `FEATURE_MATRIX.md`
