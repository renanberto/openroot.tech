import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contentRoot = join(root, "apps", "renanberto", "content", "knowledge");
const outRoot = join(root, "apps", "renanberto", "public", "api");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const knowledge = {
  profile: readJson(join(contentRoot, "identity", "profile.json")),
  contact: readJson(join(contentRoot, "contact", "contact.json")),
  skills: readJson(join(contentRoot, "skills", "skills.json")),
  projects: readJson(join(contentRoot, "projects", "projects.json")),
  principles: readJson(join(contentRoot, "principles", "principles.json")),
  research: readJson(join(contentRoot, "research", "research.json")),
  experience: readJson(join(contentRoot, "experience", "experience.json")),
  usage: readJson(join(contentRoot, "usage", "usage.json")),
  resume: readJson(join(contentRoot, "resume", "resume.json")),
  current: readJson(join(contentRoot, "current", "current.json")),
  certifications: readJson(join(contentRoot, "certifications", "certifications.json")),
  articles: readJson(join(contentRoot, "articles", "articles.json")),
  gallery: readJson(join(contentRoot, "gallery", "gallery.json")),
  architecture: readJson(join(contentRoot, "architecture", "architecture.json")),
  caseStudies: readJson(join(contentRoot, "case-studies", "case-studies.json")),
  downloads: readJson(join(contentRoot, "downloads", "downloads.json")),
  seo: readJson(join(contentRoot, "seo", "seo.json")),
  accessibility: readJson(join(contentRoot, "accessibility", "accessibility.json")),
  developer: readJson(join(contentRoot, "developer", "developer.json"))
};

mkdirSync(outRoot, { recursive: true });
writeFileSync(join(outRoot, "knowledge.json"), JSON.stringify(knowledge, null, 2));
writeFileSync(join(outRoot, "developer.json"), JSON.stringify(knowledge.developer, null, 2));
writeFileSync(join(outRoot, "health.json"), JSON.stringify({ status: "ok", runtime: "static", host: "github-pages", build: "os-release-6-prod" }, null, 2));

console.log("Generated public/api static content.");
