import type { CommandRegistry, OpenRootCommandContext } from "@openroot/core";

export interface ShellResult {
  input: string;
  output: string;
}

export interface ShellState {
  cwd: string;
  theme: string;
}

export class ShellRuntime {
  private history: string[] = [];
  private aliases = new Map<string, string>();
  private state: ShellState = {
    cwd: "/",
    theme: "openroot"
  };

  constructor(private commands: CommandRegistry, private context: OpenRootCommandContext) {
    this.aliases.set("ll", "ls /");
    this.aliases.set("skills", "read skills");
    this.aliases.set("projects", "read projects");
    this.aliases.set("contactme", "contact");
    this.aliases.set("me", "whoami");
  }

  async execute(input: string): Promise<ShellResult> {
    const trimmed = input.trim();
    if (!trimmed) return { input, output: "" };

    this.history.push(trimmed);

    if (trimmed === "history") {
      return { input, output: this.history.map((item, index) => `${index + 1}  ${item}`).join("\n") };
    }

    if (trimmed.startsWith("alias ")) {
      const [, name, ...value] = trimmed.split(/\s+/);
      if (!name || !value.length) return { input, output: "usage: alias <name> <command>" };
      this.aliases.set(name, value.join(" "));
      return { input, output: `alias ${name}='${value.join(" ")}'` };
    }

    if (trimmed === "aliases") {
      return { input, output: [...this.aliases.entries()].map(([name, value]) => `${name}='${value}'`).join("\n") };
    }

    const expanded = this.expandAlias(trimmed);
    return { input, output: await this.executePipeline(expanded) };
  }

  private expandAlias(input: string) {
    const [name, ...rest] = input.split(/\s+/);
    const alias = this.aliases.get(name);
    return alias ? `${alias}${rest.length ? ` ${rest.join(" ")}` : ""}` : input;
  }

  private resolvePath(path?: string) {
    if (!path || path === ".") return this.state.cwd;
    if (path === "..") {
      if (this.state.cwd === "/") return "/";
      const parts = this.state.cwd.split("/").filter(Boolean);
      parts.pop();
      return parts.length ? `/${parts.join("/")}` : "/";
    }
    if (path.startsWith("/")) return path;
    return this.state.cwd === "/" ? `/${path}` : `${this.state.cwd}/${path}`;
  }

  private async executePipeline(input: string) {
    const stages = input.split("|").map((stage) => stage.trim()).filter(Boolean);
    let current = "";

    for (const stage of stages) {
      const [name, ...args] = stage.split(/\s+/);

      if (name === "grep" && current) {
        const term = args.join(" ").toLowerCase();
        current = current.split("\n").filter((line) => line.toLowerCase().includes(term)).join("\n") || "no matches";
        continue;
      }

      if (name === "pwd") {
        current = this.state.cwd;
        continue;
      }

      if (name === "cd") {
        const target = this.resolvePath(args[0]);
        const node = this.context.fs.read(target);
        if (!node) {
          current = `cd: no such directory: ${target}`;
        } else if (node.type !== "directory") {
          current = `cd: not a directory: ${target}`;
        } else {
          this.state.cwd = target;
          current = this.state.cwd;
        }
        continue;
      }

      if (name === "theme") {
        const action = args[0];
        const value = args[1];
        const themes = ["openroot", "matrix", "nord", "tokyo", "dracula", "gruvbox", "catppuccin", "ubuntu", "arch", "fedora", "mac", "powershell", "solarized"];

        if (!action || action === "list") {
          current = themes.map((theme) => theme === this.state.theme ? `* ${theme}` : `  ${theme}`).join("\n");
        } else if (action === "set") {
          if (!value) current = "usage: theme set <theme>";
          else if (!themes.includes(value)) current = `unknown theme: ${value}`;
          else {
            this.state.theme = value;
            current = `theme set to ${value}`;
          }
        } else {
          current = "usage: theme list | theme set <theme>";
        }
        continue;
      }

      const resolvedArgs = args.map((arg) => {
        if (["cat", "ls", "view", "head", "tail", "grep"].includes(name) && (arg.startsWith("./") || (!arg.startsWith("/") && false))) {
          return arg;
        }
        return arg;
      });

      const command = this.commands.get(name);
      current = command ? await command.run(resolvedArgs, { ...this.context, shellState: this.state, resolvePath: this.resolvePath.bind(this) } as any) : `command not found: ${name}\nType "help" to list commands.`;
    }

    return current;
  }

  getHistory() {
    return [...this.history];
  }

  getState() {
    return { ...this.state };
  }

  complete(prefix: string) {
    const commandMatches = this.commands
      .list()
      .map((command) => command.name)
      .filter((name, index, list) => list.indexOf(name) === index)
      .filter((name) => name.startsWith(prefix));

    const aliasMatches = [...this.aliases.keys()].filter((name) => name.startsWith(prefix));

    const fileMatches = this.context.fs
      .all()
      .map((node) => node.path)
      .filter((path) => path.startsWith(prefix));

    return [...new Set([...commandMatches, ...aliasMatches, ...fileMatches])].sort();
  }
}
