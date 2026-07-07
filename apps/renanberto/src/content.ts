import type { KnowledgeFile } from "@openroot/content";
import { createKnowledgeGraph } from "@openroot/graph";
import profile from "../content/knowledge/identity/profile.json";
import contact from "../content/knowledge/contact/contact.json";
import skills from "../content/knowledge/skills/skills.json";
import projects from "../content/knowledge/projects/projects.json";
import principles from "../content/knowledge/principles/principles.json";
import research from "../content/knowledge/research/research.json";
import experience from "../content/knowledge/experience/experience.json";
import usage from "../content/knowledge/usage/usage.json";
import resume from "../content/knowledge/resume/resume.json";
import current from "../content/knowledge/current/current.json";

export const graph = createKnowledgeGraph({ skills, projects, research });

export const knowledge: KnowledgeFile[] = [
  { path: "/profile", title: "Profile", kind: "identity", content: profile },
  { path: "/contact", title: "Contact", kind: "contact", content: contact },
  { path: "/skills", title: "Skills", kind: "skills", content: skills },
  { path: "/projects", title: "Projects", kind: "projects", content: projects },
  { path: "/principles", title: "Principles", kind: "principles", content: principles },
  { path: "/research", title: "Research", kind: "research", content: research },
  { path: "/experience", title: "Experience", kind: "experience", content: experience },
  { path: "/usage", title: "Usage", kind: "usage", content: usage },
  { path: "/resume", title: "Resume", kind: "resume", content: resume },
  { path: "/current", title: "Current Work", kind: "current", content: current },
  { path: "/graph", title: "Knowledge Graph", kind: "graph", content: graph }
];
