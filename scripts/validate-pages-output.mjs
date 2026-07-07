import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "apps", "renanberto", "dist");

const required = [
  "index.html",
  "CNAME",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml",
  "api/knowledge.json",
  "api/health.json",
  "api/developer.json"
];

let ok = true;

for (const rel of required) {
  const file = join(dist, rel);
  if (!existsSync(file)) {
    console.error(`Missing from Pages output: ${rel}`);
    ok = false;
  }
}

if (!ok) process.exit(1);

console.log("GitHub Pages output validation passed.");
