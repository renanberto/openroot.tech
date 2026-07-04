# Release 0.2.3-content-polish - openroot.tech

Patch release after Release 0.2.3-content-polish.

## Changes

1. Renamed product label from `PROD` to `Release 0.2.3-content-polish`
2. Fixed the left filesystem panel:
   - sidebar now shows a curated navigation map
   - it no longer dumps the entire technical filesystem
   - full tree remains available via `tree /`

3. Added a stronger bio/portfolio layer:
   - `/etc/bio.md`
   - nonroot now points to the bio first
   - profile is still available at `/etc/profile`
4. Added ASCII banner:
   - `ascii`
5. Improved SSH command:
   - `ssh openroot.tech`
6. Added full theme set:
   - terminal
   - matrix
   - nord
   - tokyo
   - dracula
   - gruvbox
   - catppuccin
   - ubuntu
   - arch
   - fedora
   - mac
   - powershell
   - solarized

## Test

Open `index.html` directly in your browser.

## Suggested commands

```txt
cat /etc/bio.md
ascii
ssh openroot.tech
themes
theme dracula
theme tokyo
theme gruvbox
tree /
nonroot
```


## Release 0.2.3-content-polish fix

Fixed local boot error:

```txt
Uncaught TypeError: can't access property "files", content is undefined
```

`js/content.generated.js` now exposes content both as:

```js
var OPENROOT_CONTENT
window.OPENROOT_CONTENT
```

`js/core/app.js` also validates content loading before booting.


## Release 0.2.3-content-polish validation/fix

Fixed after full package inspection:

- Sidebar no longer uses a raw filesystem dump. It now renders readable navigation cards.
- Full technical tree remains available with `tree /`.
- Terminal bottom/footer layout now uses auto height and wraps tips instead of breaking the box.
- JavaScript files were syntax-checked with `node --check`.


## Release 0.2.3-content-polish

- Terminal input now stays at the top of the lower terminal panel.
- Command results appear below the typed command, top-to-bottom.
- Autocomplete now includes registered commands, local entries, absolute directories and absolute file paths.
- Initial screen now opens `/etc/bio.md`.
- Bio includes a profile image placeholder component.


## Release 0.2.3-content-polish

- Terminal input no longer looks fixed/pinned.
- Nonroot mode now shows the same profile photo placeholder.
- Top Nonroot action is red and includes a friendly hint.
- `ssh openroot.tech` triggers a fake visual intrusion alert.


## Release 0.2.3-content-polish

Terminal UX polish:

- Rebuilt the lower terminal panel visual layout.
- Prompt/input now sits like a normal terminal prompt at the bottom.
- Command history and outputs render above it in a clean scrollable area.
- Top Nonroot button was rebuilt as a compact red rescue pill without breaking the header.


## Release 0.2.3-content-polish

UX-focused release:

- Nonroot was rebuilt as a clean portfolio catalog.
- Terminal lower panel now behaves as normal flow: input appears first, output appears below.
- Terminal input is not fixed or pinned.
- Terminal scroll container now scrolls the whole terminal content naturally.


## Release 0.2.3-content-polish

GitHub Pages and terminal stability release:

- Added `.github/workflows/pages.yml`
- Added `.nojekyll`
- Workflow validates JavaScript with `node --check`
- Workflow uploads the static site to GitHub Pages
- Terminal was rebuilt as a transcript:
  - active prompt is inside the output area
  - commands freeze into history
  - results appear directly below commands
  - a new prompt appears after each command
  - scroll follows the terminal transcript
- Header buttons now submit commands through the active prompt path.


## Release 0.2.3-content-polish

Production prep for openroot.tech:

- Fixed sidebar filesystem by replacing the fragile text tree with a structured navigation renderer.
- Header release label now reads from `OpenRootConfig.release`.
- Added `CNAME` for `openroot.tech`.
- Added `package.json` automation:
  - `npm run validate:js`
  - `npm run validate:site`
  - `npm run build:content`
  - `npm run predeploy`
- Added real `scripts/build-content.js` starter to generate `js/content.generated.js` from `/content`.
- GitHub Pages workflow now runs `npm run predeploy` before deploying.
- Production release direction:
  - Keep `main` as the deployed branch.
  - Use `Release 0.2.x` for polish and content updates.
  - Move to `Release 1.0.0` once final bio, links, images and project summaries are complete.


## Release 0.2.3-content-polish

Content and mobile pass:

- Reworked `/etc/skills.json` into `/etc/skills.md`.
- Skills are now human-readable and structured by engineering area.
- Added modern AI engineering context:
  - LLM-assisted workflows
  - Ollama
  - LiteLLM
  - model routing
  - RAG concepts
  - AI agents for repository and operational workflows
- Rewrote project README files to be more human-readable.
- Improved `/etc/bio.md` as the main portfolio landing file.
- Added mobile responsiveness pass:
  - full viewport mobile layout
  - hidden sidebar on mobile
  - horizontally scrollable top actions
  - larger readable content
  - cleaner nonroot catalog layout
  - terminal sized for mobile screens

Production note:

The site is already online at `openroot.tech`.
This release is intended as the next production candidate after final visual review on desktop and phone.


## Release 0.2.3-content-polish

Changes:

- Mobile now skips terminal mode completely.
- Mobile opens directly into nonroot portfolio mode.
- Nonroot was improved as a cleaner portfolio/catalog experience.
- Contact information updated:
  - Email: renanbertoo@gmail.com
  - GitHub: github.com/renanberto
  - LinkedIn: www.linkedin.com/in/renan-berto


## Release 0.2.3-content-polish

Content polish release:

- MDs are now more visually expressive.
- Added custom markdown-like components:
  - `::badge[]`
  - `::status[]`
  - `::stack[]`
  - `:::grid`
  - `:::card[]`
  - `:::callout[]`
  - `::link[]`
- Skills page now uses colored categories and human-readable structure.
- Projects are now formatted as case studies.
- Added command: `recruiter`
- Added command: `read <topic>`
  - `read bio`
  - `read skills`
  - `read projects`
  - `read waf`
  - `read certs`
  - `read bemod`
  - `read corly`
  - `read hermes`
  - `read jira`
  - `read contact`
