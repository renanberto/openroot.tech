# Changelog

## 6.0.0-prod - 2026-07-07

- Added Developer Experience release layer.
- Added `/developer` knowledge file and generated `/api/developer.json`.
- Added `@openroot/plugin-developer` with API, JSON, plugin, extension, CLI, importer, exporter, testing and docs commands.
- Added developer folder to the filesystem and developer entries to the command palette.
- Updated validators, roadmap, release docs and static release metadata to Release 6.

## 5.0.0-prod - OS Release 5 / OpenRoot OS

### Added

- Terminal commands for `desktop`, `apps`, `dock`, `notifications`, `widgets` and `settings`.
- Release 5 documentation under docs/releases/Release-05.md.

### Changed

- Updated runtime identity from OS Release 4 to OS Release 5.
- Reduced Inspector Shell to Profile, Projects, Skills and Contact.
- Moved non-recruiter content access back to terminal-first workflows.
- Reduced terminal quick command bar to Help only.
- Updated validators to enforce Release 5 expectations.
- Updated package and lock versions to 5.0.0-prod.

### Fixed

- Left sidebar favorites strip no longer breaks when many favorites are saved; favorites now wrap into a bounded grid with vertical scroll and truncated labels.
- Right inspector header no longer breaks from excessive menu buttons.

### Validated

- npm run rc:check

## 4.0.0-prod - OS Release 4 / Interactive Portfolio

### Added

- Project Viewer and Architecture Viewer inside the inspector.
- Favorites strip, filesystem star toggles and context-menu favorite action.
- Terminal commands for `viewer`, `architecture`, `shortcuts` and `favorites`.
- Resize handles for shell panels and native resize behavior on document boxes.
- Keyboard shortcuts for inspector navigation.
- Release 4 documentation under docs/releases/Release-04.md.

### Changed

- Updated runtime identity from OS Release 3 to OS Release 4.
- Reworked inspector navigation into primary tabs and professional subtabs.
- Improved mobile layout for panels, cards, viewers, topbar and statusbar.
- Separated filesystem search state from command-palette search state.
- Updated validation scripts to enforce Release 4 expectations.
- Updated package and lock versions to 4.0.0-prod.

### Fixed

- Search input caret now returns to the end after rerender, preventing reversed typing.
- Global keyboard listener is guarded against duplicate registration.

### Validated

- npm run rc:check

## 3.0.0-prod - OS Release 3 / Professional Content

### Added

- Professional filesystem directory with experience, certifications, articles, gallery, architecture, case studies and downloads.
- Inspector views for Experience, Architecture, Case Studies and Downloads.
- Structured SEO and accessibility baselines in the knowledge content.
- Release 3 documentation under docs/releases/Release-03.md.

### Changed

- Updated runtime identity from OS Release 2 to OS Release 3.
- Updated validation scripts to enforce Release 3 expectations.
- Updated package and lock versions to 3.0.0-prod.
- Expanded public knowledge generation with Release 3 content.

### Validated

- npm run rc:check

## 2.0.0-prod - OS Release 2 / Recruiter Experience

### Added

- Document-style inspector panels for Profile, Projects, Skills and Contact.
- Recruiter Tour as a guided five-step evaluation route.
- Ctrl+K Command Palette for navigation and terminal commands.
- Richer project cards with problem, solution, impact and stack.
- Evidence-based skill matrix grouped by engineering category.
- Release 2 documentation under docs/releases/Release-02.md.

### Changed

- Updated runtime identity from OS Release 1 to OS Release 2.
- Updated GitHub Pages workflow label to validate Release 2.
- Updated validation scripts to enforce Release 2 expectations.
- Updated package and lock versions to 2.0.0-prod.

### Validated

- npm ci
- npm run rc:check

## 1.0.0-prod - OS Release 1 / Foundation

### Added

- Production baseline for OpenRoot OS.
- Terminal, filesystem, inspector, GitHub Pages workflow and static build.
- Removed the fragile left-sidebar favorites strip; favorites now remain available through filesystem star markers and context-menu actions.
- Reworked sidebar/top action bars so controls wrap cleanly without breaking the shell layout.
