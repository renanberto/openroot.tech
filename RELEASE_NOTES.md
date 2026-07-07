# Release Notes

## OpenRoot OS Release 6 - Developer Experience

Release 6 keeps the clean recruiter-facing inspector from Release 5 and adds a terminal-first developer layer. Use `devx` to open the overview, `api endpoints` for static API contracts, `json contract` for content rules, `plugins list` for runtime plugin registration, and `testing gates` for production checks.

Validation target: `npm run rc:check`.

# Release Notes - OpenRoot OS 5.0.0-prod

OpenRoot OS Release 5 is focused on shell stability and recruiter clarity. The inspector now stays limited to Profile, Projects, Skills and Contact, while technical and OS-level content is accessed through terminal commands.

## Highlights

- Recruiter-only Inspector Shell.
- Terminal-first access for non-recruiter domains.
- Terminal quick command bar reduced to Help.
- Desktop, apps, dock, notifications, widgets and settings commands.
- Right inspector header overflow fixed by reducing menu density.
- Left sidebar favorites overflow fixed for large favorite lists.
- Roadmap updated with Release 5 as DONE.

## Deployment

Run:

```bash
npm ci
npm run rc:check
```

GitHub Pages deploys `apps/renanberto/dist` through `.github/workflows/pages.yml`.
- Sidebar hotfix: favorites no longer render as a top strip; star markers remain, and actions now wrap in a stable compact grid.
