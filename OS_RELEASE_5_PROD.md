# OpenRoot OS Release 5 / PROD

OpenRoot OS stabilization release for openroot.tech.

## Scope

- Inspector Shell reduced to Profile, Projects, Skills and Contact.
- Non-recruiter content moved to terminal-first access.
- Terminal quick command bar simplified to Help only.
- Desktop, applications, dock, notifications, widgets and settings exposed as terminal commands.
- Right inspector header fixed by removing excess navigation controls.
- Left sidebar favorites strip fixed for large favorite collections using a bounded responsive grid.
- Runtime labels, validators, roadmap and release documentation updated to 5.0.0-prod.

## Build

```bash
npm install
npm run rc:check
```
- Release 5.1 sidebar hotfix: removed the visual favorites strip, kept favorite state through star markers, and hardened sidebar/top actions against overflow.
