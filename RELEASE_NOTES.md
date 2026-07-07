# Release Notes - OpenRoot OS 5.0.0-prod

OpenRoot OS Release 5 is focused on shell stability and recruiter clarity. The inspector now stays limited to Profile, Projects, Skills and Contact, while technical and OS-level content is accessed through terminal commands.

## Highlights

- Recruiter-only Inspector Shell.
- Terminal-first access for non-recruiter domains.
- Terminal quick command bar reduced to Help.
- Desktop, apps, dock, notifications, widgets and settings commands.
- Right inspector header overflow fixed by reducing menu density.
- Roadmap updated with Release 5 as DONE.

## Deployment

Run:

```bash
npm ci
npm run rc:check
```

GitHub Pages deploys `apps/renanberto/dist` through `.github/workflows/pages.yml`.
