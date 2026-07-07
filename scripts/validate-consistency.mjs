import { existsSync, readFileSync } from "node:fs";

const checks = [
  ["index", "apps/renanberto/index.html", ['<div id="app"></div>', 'src="/src/main.ts"', "favicon.svg"]],
  ["vite", "apps/renanberto/vite.config.ts", ['root: "apps/renanberto"', 'base: "/"']],
  ["main", "apps/renanberto/src/main.ts", ["OS Release 5", "renderInspectorPanel", "inspectorViewFor", "terminalApi?.focus"]],
  ["terminal", "packages/terminal/src/index.ts", ["runCommand", "promptLabel", "focusInput"]],
  ["inspector", "packages/profile/src/index.ts", ["renderInspector", "friendly-profile", "data-inspector-tab"]],
  ["css", "apps/renanberto/src/styles.css", ["ui-icon", "friendly-profile", "body { overflow: hidden"]],
  ["workflow", ".github/workflows/pages.yml", ["npm ci", "npm run rc:check", "deploy-pages"]]
];

let ok = true;

for (const [label, file, tokens] of checks) {
  if (!existsSync(file)) {
    console.error(`Missing ${label}: ${file}`);
    ok = false;
    continue;
  }

  const content = readFileSync(file, "utf8");

  for (const token of tokens) {
    if (!content.includes(token)) {
      console.error(`Consistency failed in ${label}: missing "${token}"`);
      ok = false;
    }
  }
}

if (!ok) process.exit(1);

console.log("OpenRoot OS Release 5 consistency validation passed.");
