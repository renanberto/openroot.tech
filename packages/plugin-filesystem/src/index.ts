import type { OpenRootPlugin } from "@openroot/core";
import type { VirtualFileSystem } from "@openroot/filesystem";

function formatNodeContent(content: unknown) {
  if (typeof content === "string") return content;
  return JSON.stringify(content, null, 2);
}

function lines(value: string) {
  return value.split("\n");
}

function compactJson(content: unknown) {
  if (!content || typeof content !== "object") return String(content ?? "");
  const value = content as any;

  if (value.name && value.title) return `${value.name}\n${value.title}\n${value.tagline ?? ""}`;
  if (Array.isArray(value.groups)) return value.groups.map((g: any) => `${g.title}: ${g.items.join(", ")}`).join("\n");
  if (Array.isArray(value.projects)) return value.projects.map((p: any) => `${p.id}: ${p.title} [${p.tag}]`).join("\n");
  if (Array.isArray(value.principles)) return value.principles.map((p: string) => `- ${p}`).join("\n");
  if (Array.isArray(value.current)) return value.current.map((p: string) => `- ${p}`).join("\n");
  if (Array.isArray(value.events)) return value.events.map((e: any) => `${e.date}: ${e.title} - ${e.description}`).join("\n");
  if (Array.isArray(value.roles)) return value.roles.map((r: any) => `${r.title}: ${r.focus}`).join("\n");
  if (Array.isArray(value.items)) return value.items.map((r: any) => `${r.title}: ${r.description}`).join("\n");

  return JSON.stringify(value, null, 2);
}

function resolve(context: any, path?: string) {
  return context.resolvePath ? context.resolvePath(path) : path ?? "/";
}

export function createFilesystemPlugin(fs: VirtualFileSystem): OpenRootPlugin {
  return {
    id: "filesystem",
    name: "Filesystem",
    commands: [
      {
        name: "ls",
        description: "List virtual directory contents.",
        usage: "ls /skills",
        run(args, context) {
          const path = resolve(context, args[0] ?? ".");
          const nodes = fs.list(path);
          if (!nodes.length) return `empty: ${path}`;
          return nodes.map((node) => `${node.type === "directory" ? "d" : "-"} ${node.path}`).join("\n");
        }
      },
      {
        name: "cat",
        description: "Read a virtual file.",
        usage: "cat /profile",
        run(args, context) {
          const path = resolve(context, args[0]);
          if (!args[0]) return "usage: cat <path>";
          const node = fs.read(path);
          if (!node) return `not found: ${path}`;
          if (node.type === "directory") return `is a directory: ${path}`;
          return formatNodeContent(node.content);
        }
      },
      {
        name: "view",
        description: "Read a virtual file in compact human format.",
        usage: "view /skills",
        run(args, context) {
          const path = resolve(context, args[0]);
          if (!args[0]) return "usage: view <path>";
          const node = fs.read(path);
          if (!node) return `not found: ${path}`;
          if (node.type === "directory") return `is a directory: ${path}`;
          return compactJson(node.content);
        }
      },
      { name: "tree", description: "Print the virtual filesystem tree.", usage: "tree /", run(args, context) { return fs.tree(resolve(context, args[0] ?? ".")); } },
      {
        name: "find",
        description: "Search virtual content.",
        usage: "find kubernetes",
        run(args) {
          const term = args.join(" ");
          if (!term) return "usage: find <term>";
          return fs.search(term).map((node) => node.path).join("\n") || "no matches";
        }
      },
      {
        name: "grep",
        description: "Search within a virtual file or all files.",
        usage: "grep AWS /skills",
        run(args, context) {
          const [term, rawPath] = args;
          const path = rawPath ? resolve(context, rawPath) : undefined;
          if (!term) return "usage: grep <term> [path]";
          const nodes = path ? [fs.read(path)].filter(Boolean) : fs.all().filter((node) => node.type === "file");
          const matches: string[] = [];
          for (const node of nodes as any[]) {
            const body = formatNodeContent(node.content);
            for (const line of lines(body).filter((item) => item.toLowerCase().includes(term.toLowerCase()))) {
              matches.push(`${node.path}: ${line}`);
            }
          }
          return matches.join("\n") || "no matches";
        }
      },
      {
        name: "head",
        description: "Print first lines of a virtual file.",
        usage: "head /projects 10",
        run(args, context) {
          const path = resolve(context, args[0]);
          const count = Number(args[1] ?? 10);
          if (!args[0]) return "usage: head <path> [lines]";
          const node = fs.read(path);
          if (!node || node.type !== "file") return `not a file: ${path}`;
          return lines(formatNodeContent(node.content)).slice(0, count).join("\n");
        }
      },
      {
        name: "tail",
        description: "Print last lines of a virtual file.",
        usage: "tail /projects 10",
        run(args, context) {
          const path = resolve(context, args[0]);
          const count = Number(args[1] ?? 10);
          if (!args[0]) return "usage: tail <path> [lines]";
          const node = fs.read(path);
          if (!node || node.type !== "file") return `not a file: ${path}`;
          return lines(formatNodeContent(node.content)).slice(-count).join("\n");
        }
      },
      {
        name: "man",
        description: "Show starter manual.",
        run() {
          return [
            "OpenRoot manual",
            "",
            "Navigation: pwd · cd /projects · ls · tree / · cat /profile · view /skills",
            "Search: find kubernetes · grep AWS /skills",
            "Portfolio: whoami · resume · project waf · skills --dev · open github",
            "Usage: tour · usage · explain kubernetes · roadmap · contact",
            "Themes: theme list · theme set matrix",
            "Modes: profile · explorer"
          ].join("\n");
        }
      }
    ]
  };
}
