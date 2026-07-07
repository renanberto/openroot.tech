import { existsSync, readFileSync } from "node:fs";

const checks = [
  ["release 6 shell", "apps/renanberto/src/main.ts", ["OpenRoot OS Release 6", "createDeveloperPlugin", "developer/api", "developer/testing", "fs-resize-handle", "inspector-resize-handle", "favorite-toggle", "data-fs-search", "command-palette", "inspectorViewFor"]],
  ["developer plugin", "packages/plugin-developer/src/index.ts", ["devx", "api", "json", "plugins", "extensions", "importers", "exporters", "testing", "docs"]],
  ["developer content", "apps/renanberto/content/knowledge/developer/developer.json", ["Developer Experience", "api", "jsonEngine", "pluginSystem", "importers", "exporters", "testing"]],
  ["inspector nav", "packages/profile/src/index.ts", ["Profile", "Projects", "Skills", "Contact", "inspector-primary-tabs", "data-inspector-tab"]],
  ["interactive commands", "packages/plugin-portfolio/src/index.ts", ["viewer", "architecture", "shortcuts", "favorites"]],
  ["os commands", "packages/plugin-system/src/index.ts", ["desktop", "apps", "dock", "notifications", "widgets", "settings"]],
  ["terminal quick bar", "packages/terminal/src/index.ts", ["const starters = [\"help\"]"]],
  ["ux css", "apps/renanberto/src/styles.css", ["friendly-profile", "fs-node.active", "context-menu", "fs-resize-handle", "inspector-resize-handle", "command-palette", "professional-row", "viewer-shell"]],
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

console.log("OpenRoot OS Release 6 feature validation passed.");
