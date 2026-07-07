# OpenRoot OS Release 5 - OpenRoot OS

Status: DONE
Version: 5.0.0-prod
Date: 2026-07-07

## Objective

Stabilize the OS shell by making the inspector recruiter-focused while moving non-recruiter and OS-level surfaces to terminal commands.

## Completed minors

- R5.1 Desktop: terminal-first `desktop` command summarizes the OS layer.
- R5.2 Window Manager: shell layout preserved with filesystem, terminal and recruiter inspector.
- R5.3 Applications: `apps` command lists available OS apps.
- R5.4 Dock: `dock` command documents primary launch targets.
- R5.5 Notifications: `notifications` command exposes release/runtime state.
- R5.6 Widgets: `widgets` command lists statusbar, breadcrumbs, favorites and mount status.
- R5.7 Settings: `settings` command exposes persisted runtime preferences.
- R5.8 Themes: theme selection remains available through terminal and topbar control.
- R5.9 User Experience: inspector reduced to Profile, Projects, Skills and Contact.
- R5.10 Release: version, docs, validators, generated static API and release notes updated.

## Extra fixes

- Inspector Shell now only shows recruiter-domain panels: Profile, Projects, Skills and Contact.
- Professional, architecture, system and other technical content remains accessible through terminal commands.
- Right inspector header no longer overflows from excessive menu buttons.
- Terminal quick command bar now only exposes `help`.

## Production validation

- npm run validate:all: PASS
- npm run build: PASS
- npm run validate:pages: PASS
- npm run audit:static: PASS
- npm run rc:check: PASS
