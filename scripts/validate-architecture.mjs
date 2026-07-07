import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const forbidden = [
  "apps/api",
  "server.js",
  "server.mjs"
];

const requiredStaticFiles = [
  "apps/renanberto/public/CNAME",
  "apps/renanberto/public/.nojekyll",
  "apps/renanberto/public/robots.txt",
  "apps/renanberto/public/sitemap.xml",
  "apps/renanberto/public/api/knowledge.json",
  "apps/renanberto/public/api/health.json"
];

const requiredPackages = [
  "packages/core/src/index.ts",
  "packages/filesystem/src/index.ts",
  "packages/shell/src/index.ts",
  "packages/terminal/src/index.ts",
  "packages/profile/src/index.ts",
  "packages/story/src/index.ts",
  "packages/graph/src/index.ts",
  "packages/plugin-filesystem/src/index.ts",
  "packages/plugin-portfolio/src/index.ts",
  "packages/plugin-fun/src/index.ts",
  "packages/plugin-system/src/index.ts",
  "packages/plugin-developer/src/index.ts",
  "packages/theme-openroot/src/index.ts"
];

let ok = true;

for (const item of forbidden) {
  if (existsSync(join(root, item))) {
    console.error(`Forbidden backend artifact exists: ${item}`);
    ok = false;
  }
}

for (const item of [...requiredStaticFiles, ...requiredPackages]) {
  if (!existsSync(join(root, item))) {
    console.error(`Missing architecture requirement: ${item}`);
    ok = false;
  }
}

if (!ok) process.exit(1);

console.log("OpenRoot architecture validation passed.");
