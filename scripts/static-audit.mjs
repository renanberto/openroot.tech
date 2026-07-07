import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "apps", "renanberto", "dist");

let ok = true;

if (!existsSync(dist)) {
  console.error("Missing dist. Run npm run build first.");
  process.exit(1);
}

const indexPath = join(dist, "index.html");
const index = readFileSync(indexPath, "utf8");

const checks = [
  ["index references JS bundle", /<script[^>]+type="module"/.test(index)],
  ["index has title", /<title>/.test(index)],
  ["CNAME exists", existsSync(join(dist, "CNAME"))],
  [".nojekyll exists", existsSync(join(dist, ".nojekyll"))],
  ["knowledge snapshot exists", existsSync(join(dist, "api", "knowledge.json"))],
  ["health snapshot exists", existsSync(join(dist, "api", "health.json"))],
  ["developer snapshot exists", existsSync(join(dist, "api", "developer.json"))]
];

for (const [label, passed] of checks) {
  if (!passed) {
    console.error(`Static audit failed: ${label}`);
    ok = false;
  }
}

if (!ok) process.exit(1);

console.log("OpenRoot static audit passed.");
