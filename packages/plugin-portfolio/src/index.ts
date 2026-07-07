import type { OpenRootPlugin } from "@openroot/core";
import type { VirtualFileSystem } from "@openroot/filesystem";
import { queryGraph } from "@openroot/graph";
import { renderCaseStudy } from "@openroot/story";

const topics: Record<string, string> = {
  profile: "/profile",
  bio: "/profile",
  skills: "/skills",
  projects: "/projects",
  principles: "/principles",
  research: "/research",
  contact: "/contact",
  experience: "/experience",
  usage: "/usage",
  resume: "/resume",
  current: "/current",
  graph: "/graph"
};

function get(fs: VirtualFileSystem, path: string) {
  return fs.read(path)?.content as any;
}

function openLink(label: string, url: string) {
  if (typeof window !== "undefined") {
    if (url.startsWith("mailto:")) window.location.href = url;
    else window.open(url, "_blank", "noreferrer");
  }
  return `Opening ${label}: ${url}`;
}

export function createPortfolioPlugin(fs: VirtualFileSystem): OpenRootPlugin {
  return {
    id: "portfolio",
    name: "Portfolio",
    commands: [
      {
        name: "read",
        description: "Read a portfolio topic.",
        usage: "read skills",
        run(args) {
          const topic = args[0];
          if (!topic) return `usage: read <${Object.keys(topics).join("|")}>`;
          const path = topics[topic];
          if (!path) return `unknown topic: ${topic}`;
          return JSON.stringify(fs.read(path)?.content ?? {}, null, 2);
        }
      },
      {
        name: "whoami",
        description: "Show professional identity.",
        run() {
          const profile = get(fs, "/profile");
          const personal = profile.professionalPersonal;
          return [
            `${profile.name}`,
            `${profile.title}`,
            profile.tagline,
            "",
            `Location: ${personal.location}`,
            `Languages: ${personal.languagesSpoken.join(", ")}`,
            `Work preference: ${personal.workPreference.join(", ")}`,
            `Target roles: ${personal.targetRoles.join(", ")}`,
            "",
            personal.workingStyle,
            "",
            `Availability: ${personal.availability}`
          ].join("\n");
        }
      },
      {
        name: "resume",
        description: "Show resume information.",
        run() {
          const resume = get(fs, "/resume");
          return [
            `${resume.label}`,
            resume.summary,
            "",
            `File: ${resume.file}`,
            `Status: ${resume.status}`,
            resume.note
          ].join("\n");
        }
      },
      {
        name: "open",
        description: "Open external contact links.",
        usage: "open github|linkedin|email|resume",
        run(args) {
          const target = args[0];
          const contact = get(fs, "/contact");
          const resume = get(fs, "/resume");

          if (target === "github") return openLink("GitHub", contact.github);
          if (target === "linkedin") return openLink("LinkedIn", contact.linkedin);
          if (target === "email") return openLink("Email", `mailto:${contact.email}`);
          if (target === "resume") return openLink("Resume", resume.file);

          return "usage: open github|linkedin|email|resume";
        }
      },
      {
        name: "skills",
        description: "Show skill groups. Supports --dev, --devops, --ai.",
        usage: "skills --dev",
        run(args) {
          const skills = get(fs, "/skills");
          const flag = args[0];

          const filters: Record<string, string[]> = {
            "--dev": ["software-engineering"],
            "--devops": ["platform", "cloud", "observability", "security"],
            "--ai": ["ai"]
          };

          const allowed = flag ? filters[flag] : undefined;
          if (flag && !allowed) return "usage: skills [--dev|--devops|--ai]";

          return skills.groups
            .filter((group: any) => !allowed || allowed.includes(group.id))
            .map((group: any) => `${group.title}\n  ${group.items.join(" · ")}`)
            .join("\n\n");
        }
      },
      {
        name: "project",
        description: "Open a project summary.",
        usage: "project waf",
        run(args) {
          const id = args[0];
          if (!id) return "usage: project <id>";
          const projects = get(fs, "/projects");
          const project = projects.projects.find((item: any) => item.id === id);
          if (!project) return `unknown project: ${id}\nTry: stories`;
          return [
            `${project.title} [${project.tag}]`,
            "",
            `Problem: ${project.problem}`,
            `Solution: ${project.solution}`,
            `Stack: ${project.stack.join(", ")}`,
            `Impact: ${project.impact}`,
            "",
            `Try: story ${project.id}`
          ].join("\n");
        }
      },
      {
        name: "story",
        description: "Render a project as a case study.",
        usage: "story waf",
        run(args) {
          const id = args[0];
          if (!id) return "usage: story <project-id>";
          const projects = get(fs, "/projects");
          const project = projects.projects.find((item: any) => item.id === id);
          if (!project) return `unknown project: ${id}`;
          return renderCaseStudy(project);
        }
      },
      {
        name: "stories",
        description: "List available project stories.",
        run() {
          return get(fs, "/projects").projects.map((p: any) => `${p.id.padEnd(10)} ${p.title}`).join("\n");
        }
      },
      {
        name: "graph",
        description: "Query the knowledge graph.",
        usage: "graph AWS",
        run(args, context) {
          const term = args.join(" ");
          const graph = context.getGraph?.() as any;
          if (!graph) return "graph unavailable";
          if (!term) return JSON.stringify(graph, null, 2);
          return JSON.stringify(queryGraph(graph, term), null, 2);
        }
      },
      {
        name: "stack",
        description: "Show engineering stack summary.",
        run() {
          return get(fs, "/skills").groups.map((group: any) => `${group.title}\n  ${group.items.join(" · ")}`).join("\n\n");
        }
      },
      {
        name: "explain",
        description: "Explain how a term appears in the portfolio knowledge.",
        usage: "explain kubernetes",
        run(args, context) {
          const term = args.join(" ");
          if (!term) return "usage: explain <term>";
          const graph = context.getGraph?.() as any;
          const result = queryGraph(graph, term);
          const matches = fs.search(term).map((node) => node.path);
          return [
            `Explanation target: ${term}`,
            "",
            `Knowledge matches: ${matches.join(", ") || "none"}`,
            `Graph nodes: ${result.nodes.map((n: any) => n.label).join(", ") || "none"}`,
            `Graph edges: ${result.edges.map((e: any) => `${e.from} ${e.label} ${e.to}`).join("; ") || "none"}`,
            "",
            "Try:",
            `  grep ${term} /skills`,
            `  graph ${term}`
          ].join("\n");
        }
      },
      {
        name: "tour",
        description: "Guided command tour.",
        run() {
          return [
            "OpenRoot tour",
            "",
            "1. whoami",
            "2. skills --dev",
            "3. skills --devops",
            "4. skills --ai",
            "5. stories",
            "6. project openroot",
            "7. story waf",
            "8. graph AWS",
            "9. resume",
            "10. contact",
            "",
            "Prefer a visual route? Run: profile"
          ].join("\n");
        }
      },
      {
        name: "roadmap",
        description: "Show current OpenRoot direction.",
        run() {
          return get(fs, "/current").items.map((item: any) => `${item.title} [${item.status}]\n  ${item.description}`).join("\n\n");
        }
      },
      {
        name: "contact",
        description: "Show contact endpoints.",
        run() {
          const contact = get(fs, "/contact");
          return [`Email: ${contact.email}`, `GitHub: ${contact.github}`, `LinkedIn: ${contact.linkedin}`].join("\n");
        }
      },
      {
        name: "usage",
        description: "Show suggested paths by visitor type.",
        run() {
          const usage = get(fs, "/usage");
          return usage.personas.map((persona: any) => [
            `${persona.name}`,
            `  Goal: ${persona.goal}`,
            `  Path: ${persona.path.join(" → ")}`
          ].join("\n")).join("\n\n");
        }
      },
      {
        name: "current",
        description: "Show what is being built now.",
        run() {
          return get(fs, "/current").items.map((item: any) => `${item.title} [${item.status}]\n  ${item.description}`).join("\n\n");
        }
      },
      {
        name: "recruiter",
        description: "Show recruiter quick view.",
        run() {
          const profile = get(fs, "/profile");
          const skills = get(fs, "/skills");
          const contact = get(fs, "/contact");
          const experience = get(fs, "/experience");
          const personal = profile.professionalPersonal;

          return [
            `${profile.name}`,
            `${profile.title}`,
            "",
            `${profile.tagline}`,
            "",
            experience.summary,
            "",
            `Location: ${personal.location}`,
            `Languages: ${profile.languages.join(", ")}`,
            `Best fit: ${profile.bestFit.join(", ")}`,
            "",
            `Key areas: ${skills.groups.map((group: any) => group.title).join(" · ")}`,
            "",
            `Email: ${contact.email}`,
            `GitHub: ${contact.github}`,
            `LinkedIn: ${contact.linkedin}`
          ].join("\n");
        }
      },
      { name: "profile", description: "Switch to Profile Mode.", aliases: ["recruiter-mode"], run(_args, context) { context.setMode("profile"); return "Profile Mode enabled."; } },
      { name: "explorer", description: "Switch to Explorer Mode.", run(_args, context) { context.setMode("explorer"); return "Explorer Mode enabled."; } }
    ]
  };
}
