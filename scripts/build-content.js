const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const OUT = path.join(ROOT, "js", "content.generated.js");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function titleFromPath(filePath) {
  const base = path.basename(filePath);
  if (base === "README.md") return path.basename(path.dirname(filePath));
  return base.replace(/\.(md|json|log)$/i, "");
}

const contentFiles = walk(CONTENT_DIR)
  .filter(file => !file.endsWith(".DS_Store"))
  .sort()
  .map(file => {
    const rel = "/" + path.relative(CONTENT_DIR, file).replace(/\\/g, "/");
    return {
      path: rel,
      title: titleFromPath(file),
      body: fs.readFileSync(file, "utf8")
    };
  });

if (!contentFiles.find(file => file.path === "/etc/bio.md")) {
  console.error("Missing required file: /etc/bio.md");
  process.exit(1);
}

const payload = {
  system: {
    name: "openroot.tech",
    version: "Release 0.2.1-content-mobile",
    edition: "OpenRoot OS Release 0.2.1-content-mobile",
    defaultCwd: "/home/visitor",
    defaultOpen: "/etc/bio.md"
  },
  files: contentFiles,
  git: {
    branch: "main",
    commits: [
      "r021content Release 0.2.1-content-mobile content and mobile pass",
      "r020prep Release 0.2.0 production prep",
      "r019fix Release 0.1.9 github pages and terminal transcript"
    ]
  },
  fortunes: [
    "Automate the boring, document the strange.",
    "A clean rollback plan is a love letter to production.",
    "If it cannot be observed, it is not done yet.",
    "Small systems, sharp edges, calm operations.",
    "Root is not a title. It is a responsibility."
  ]
};

fs.writeFileSync(
  OUT,
  "var OPENROOT_CONTENT = " + JSON.stringify(payload, null, 2) + ";\nwindow.OPENROOT_CONTENT = OPENROOT_CONTENT;\n"
);

console.log(`Generated ${path.relative(ROOT, OUT)} with ${contentFiles.length} files.`);
