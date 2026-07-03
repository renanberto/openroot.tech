# PROD-5 - openroot.tech

Terminal-native portfolio with TUI navigation and friendly nonroot mode.

## Highlights

- TUI layout inspired by terminal tools such as k9s/lazygit
- Real filesystem-style navigation:
  - `pwd`
  - `ls`
  - `cd projects`
  - `cat README.md`
  - `tree`
- Content panel updates as you navigate
- Sidebar filesystem tree
- Friendly nonroot mode for non-technical visitors
- Tooltip/footer guidance under the terminal
- Hotkeys:
  - Ctrl+L clear
  - Ctrl+C cancel
  - Tab autocomplete
  - ArrowUp/Down history
  - Esc leaves nonroot mode
- Themes:
  - `theme white`
  - `theme green`
  - `theme amber`
  - `theme blue`

## Test locally

Open `index.html` in your browser.

## Publish

Push everything to GitHub Pages repository root.

## Replace placeholders

Edit `js/app.js`.

Search for:
- `hello@openroot.tech`
- `https://github.com/your-user`
- `https://linkedin.com/in/your-user`
- `/assets/resume.pdf`
- project sections inside `FS`

## Suggested PROD-6

Move filesystem content into `/content/*.json` or Markdown files, then fetch it dynamically.
