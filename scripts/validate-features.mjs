import { existsSync, readFileSync } from "node:fs";

const checks = [
  ["release 1 shell", "apps/renanberto/src/main.ts", ["OpenRoot OS Release 1", "OS Release 1", "tour-badge", "fs-resize-handle", "context-menu", "data-fs-search"]],
  ["inspector nav", "packages/profile/src/index.ts", ["Profile", "Projects", "Skills", "Contact", "data-inspector-tab"]],
  ["terminal focus", "packages/terminal/src/index.ts", ["focusInput", "pointerdown", "runCommand", "focus()"]],
  ["icons", "apps/renanberto/public/assets/icons/github.svg", ["<svg"]],
  ["ux css", "apps/renanberto/src/styles.css", ["friendly-profile", "fs-node.active", "context-menu", "fs-resize-handle"]],
  ["workflow", ".github/workflows/pages.yml", ["configure-pages", "upload-pages-artifact", "deploy-pages", "apps/renanberto/dist"]]
];

let ok = true;

for (const [label, file, expected] of checks) {
  if (!existsSync(file)) {
    console.error(`Missing ${label}: ${file}`);
    ok = false;
    continue;
  }

  const content = readFileSync(file, "utf8");

  for (const token of expected) {
    if (!content.includes(token)) {
      console.error(`Feature validation failed for ${label}: missing "${token}"`);
      ok = false;
    }
  }
}

if (!ok) process.exit(1);

console.log("OpenRoot OS Release 1 feature validation passed.");
