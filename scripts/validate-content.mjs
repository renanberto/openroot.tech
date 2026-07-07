import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contentRoot = join(root, "apps", "renanberto", "content", "knowledge");

const required = [
  "identity/profile.json",
  "contact/contact.json",
  "skills/skills.json",
  "projects/projects.json",
  "principles/principles.json",
  "research/research.json",
  "experience/experience.json",
  "usage/usage.json",
  "resume/resume.json",
  "current/current.json"
];

let ok = true;

for (const rel of required) {
  const file = join(contentRoot, rel);

  if (!existsSync(file)) {
    console.error(`Missing content: ${rel}`);
    ok = false;
    continue;
  }

  try {
    JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    console.error(`Invalid JSON: ${rel}`);
    console.error(error);
    ok = false;
  }
}

if (!ok) process.exit(1);

console.log("OpenRoot content validation passed.");
