import type { KnowledgeFile } from "@openroot/content";

export interface VfsNode {
  path: string;
  type: "file" | "directory";
  title: string;
  content?: unknown;
}

function normalize(path: string) {
  const value = path.startsWith("/") ? path : `/${path}`;
  return value.replace(/\/+/g, "/");
}

export class VirtualFileSystem {
  private nodes = new Map<string, VfsNode>();

  constructor(files: KnowledgeFile[] = []) {
    this.mount({ path: "/", type: "directory", title: "/" });
    for (const file of files) this.mountKnowledge(file);
  }

  mount(node: VfsNode) {
    this.nodes.set(normalize(node.path), { ...node, path: normalize(node.path) });
  }

  mountKnowledge(file: KnowledgeFile) {
    const cleanPath = normalize(file.path);
    const parts = cleanPath.split("/").filter(Boolean);
    let acc = "";

    for (let index = 0; index < parts.length - 1; index++) {
      acc += `/${parts[index]}`;
      if (!this.nodes.has(acc)) this.mount({ path: acc, type: "directory", title: parts[index] });
    }

    this.mount({ path: cleanPath, type: "file", title: file.title, content: file.content });
  }

  read(path: string) {
    return this.nodes.get(normalize(path));
  }

  exists(path: string) {
    return this.nodes.has(normalize(path));
  }

  list(path = "/") {
    const base = normalize(path);
    const prefix = base === "/" ? "/" : `${base}/`;

    return [...this.nodes.values()]
      .filter((node) => {
        if (node.path === base) return false;
        if (!node.path.startsWith(prefix)) return false;
        const rest = node.path.slice(prefix.length);
        return rest.length > 0 && !rest.includes("/");
      })
      .sort((a, b) => a.path.localeCompare(b.path));
  }

  tree(path = "/") {
    const base = normalize(path);
    return [...this.nodes.values()]
      .filter((node) => base === "/" || node.path === base || node.path.startsWith(`${base}/`))
      .sort((a, b) => a.path.localeCompare(b.path))
      .map((node) => `${node.type === "directory" ? "d" : "-"} ${node.path}`)
      .join("\n");
  }

  search(term: string) {
    const q = term.toLowerCase();
    return [...this.nodes.values()].filter((node) => {
      if (node.path.toLowerCase().includes(q)) return true;
      if (node.title.toLowerCase().includes(q)) return true;
      return JSON.stringify(node.content ?? "").toLowerCase().includes(q);
    });
  }

  all() {
    return [...this.nodes.values()].sort((a, b) => a.path.localeCompare(b.path));
  }
}
