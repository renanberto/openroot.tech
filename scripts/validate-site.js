const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();

function assertFile(file) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

[
  "index.html",
  "css/main.css",
  "js/content.generated.js",
  "js/core/app.js",
  ".github/workflows/pages.yml",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml"
].forEach(assertFile);

const contentCode = fs.readFileSync(path.join(ROOT, "js/content.generated.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(contentCode, context);

const content = context.window.OPENROOT_CONTENT;
if (!content || !Array.isArray(content.files)) {
  console.error("OPENROOT_CONTENT.files was not generated correctly.");
  process.exit(1);
}

const requiredPaths = [
  "/etc/bio.md",
  "/etc/skills.md",
  "/etc/openroot.json",
  "/usr/projects/README.md",
  "/dev/contact",
  "/usr/recruiter.md"
];

for (const required of requiredPaths) {
  if (!content.files.some(file => file.path === required)) {
    console.error(`Missing virtual filesystem path: ${required}`);
    process.exit(1);
  }
}

const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
if (!index.includes('id="releaseLabel"')) {
  console.error("index.html must include #releaseLabel.");
  process.exit(1);
}

if (!index.includes('id="treeView"')) {
  console.error("index.html must include #treeView.");
  process.exit(1);
}

console.log(`Site validation passed with ${content.files.length} virtual files.`);
