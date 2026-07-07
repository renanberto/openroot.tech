import { existsSync } from "node:fs";

const required = [
  "README.md",
  "OS_RELEASE_1_PROD.md",
  "apps/renanberto/index.html",
  "apps/renanberto/src/main.ts",
  "apps/renanberto/src/content.ts",
  "apps/renanberto/src/styles.css",
  "apps/renanberto/vite.config.ts",
  "apps/renanberto/public/CNAME",
  "apps/renanberto/public/.nojekyll",
  "apps/renanberto/public/api/knowledge.json",
  "packages/core/src/index.ts",
  "packages/filesystem/src/index.ts",
  "packages/shell/src/index.ts",
  "packages/terminal/src/index.ts",
  "packages/profile/src/index.ts",
  "packages/plugin-system/src/index.ts"
];

let ok = true;

for (const file of required) {
  if (!existsSync(file)) {
    console.error(`Missing: ${file}`);
    ok = false;
  }
}

if (!ok) process.exit(1);

console.log("OpenRoot OS Release 1 project validation passed.");
