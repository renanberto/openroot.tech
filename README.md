# Release 0.1.6 - openroot.tech

Patch release after Release 0.1.6.

## Changes

1. Renamed product label from `PROD` to `Release 0.1.6`
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


## Release 0.1.6 fix

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


## Release 0.1.6 validation/fix

Fixed after full package inspection:

- Sidebar no longer uses a raw filesystem dump. It now renders readable navigation cards.
- Full technical tree remains available with `tree /`.
- Terminal bottom/footer layout now uses auto height and wraps tips instead of breaking the box.
- JavaScript files were syntax-checked with `node --check`.


## Release 0.1.6

- Terminal input now stays at the top of the lower terminal panel.
- Command results appear below the typed command, top-to-bottom.
- Autocomplete now includes registered commands, local entries, absolute directories and absolute file paths.
- Initial screen now opens `/etc/bio.md`.
- Bio includes a profile image placeholder component.


## Release 0.1.6

- Terminal input no longer looks fixed/pinned.
- Nonroot mode now shows the same profile photo placeholder.
- Top Nonroot action is red and includes a friendly hint.
- `ssh openroot.tech` triggers a fake visual intrusion alert.
