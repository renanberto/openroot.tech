# OpenRoot OS Release 4 - Interactive Portfolio

Status: DONE
Version: 4.0.0-prod
Date: 2026-07-07

## Objective

Turn the professional-content shell into a more interactive portfolio with project and architecture viewers, persistent favorites, stronger keyboard flow, cleaner inspector navigation and better mobile behavior.

## Completed minors

- R4.1 Project Viewer: selectable project detail view in the inspector.
- R4.2 Architecture Viewer: selectable architecture layer view with flow visualization.
- R4.3 Terminal Commands: added `viewer`, `architecture`, `shortcuts` and `favorites`.
- R4.4 Visual Components: viewer layouts, favorite strip and resizable content boxes.
- R4.5 Keyboard Shortcuts: Ctrl+K, Escape and Alt+1 through Alt+7 view switching.
- R4.6 Favorites: filesystem star actions with local persistence.
- R4.7 Context Menu: favorite action added to file context menu.
- R4.8 Session Persistence: active node, active view, panel widths, expanded folders and favorites persisted.
- R4.9 Performance: global keyboard listener guarded against duplicate registration.
- R4.10 Release: version, docs, validators, generated static API and release notes updated.

## Extra fixes

- Filesystem search and command palette now use separate query state.
- Search inputs restore caret position after rerender to prevent reversed typing.
- Filesystem and inspector panel widths have resize handles.
- Repeated inspector/content boxes use native resize handles where practical.
- Mobile layout collapses panels, tabs, cards and statusbar into single-column flows.

## Production validation

- npm run validate:all: PASS
- npm run build: PASS
- npm run validate:pages: PASS
- npm run audit:static: PASS
- npm run rc:check: PASS
