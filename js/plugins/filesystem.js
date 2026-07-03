window.OpenRootFilesystemPlugin = {
  name: "filesystem",
  description: "Linux-like navigation over the OpenRoot content filesystem.",
  commands: [
    { name: "pwd", description: "Print current directory.", run: (_, __, ctx) => ctx.shell.cwd },
    {
      name: "ls",
      description: "List directory contents.",
      usage: "ls",
      run: (arg, raw, ctx) => {
        const target = ctx.fs.normalize(arg || ctx.shell.cwd, ctx.shell.cwd);
        const node = ctx.fs.nodeAt(target);
        if (!node) return `ls: cannot access '${arg}': No such file or directory`;
        if (node.type !== "dir") return target.split("/").filter(Boolean).pop();
        return ctx.fs.list(target).map(i => i.name + (i.type === "dir" ? "/" : "")).join("  ");
      }
    },
    {
      name: "cd",
      description: "Change current directory.",
      usage: "cd /usr/projects",
      run: (arg, raw, ctx) => {
        const target = ctx.fs.normalize(arg || "~", ctx.shell.cwd);
        const node = ctx.fs.nodeAt(target);
        if (!node) return `cd: no such file or directory: ${arg}`;
        if (node.type !== "dir") return `cd: not a directory: ${arg}`;
        ctx.shell.setCwd(target);
        ctx.shell.openPath(target, false);
        return "";
      }
    },
    {
      name: "cat",
      description: "Read a file.",
      usage: "cat /etc/profile",
      run: (arg, raw, ctx) => {
        if (!arg) return "cat: missing file operand";
        const target = ctx.fs.normalize(arg, ctx.shell.cwd);
        const node = ctx.fs.nodeAt(target);
        if (!node) return `cat: ${arg}: No such file`;
        if (node.type === "dir") return `cat: ${arg}: Is a directory`;
        ctx.shell.openPath(target, false);
        return node.body;
      }
    },
    { name: "open", description: "Open a file or directory in the main panel.", usage: "open /etc/profile", run: (arg, raw, ctx) => ctx.shell.openPath(arg || ".") },
    { name: "less", description: "Open/read a file.", usage: "less README.md", run: (arg, raw, ctx) => window.OpenRootFilesystemPlugin.commands.find(c => c.name === "cat").run(arg || "README.md", raw, ctx) },
    { name: "tree", description: "Print complete filesystem tree.", usage: "tree /", run: (_, __, ctx) => ctx.fs.tree() },
    {
      name: "find",
      description: "Search all content.",
      usage: "find aws",
      run: (query, raw, ctx) => {
        if (!query) return "find: missing search term";
        const q = query.toLowerCase();
        const matches = ctx.fs.allFiles("/").filter(f => f.path.toLowerCase().includes(q) || f.title.toLowerCase().includes(q) || f.body.toLowerCase().includes(q));
        return matches.length ? matches.map(f => f.path).join("\n") : `find: no matches for '${query}'`;
      }
    },
    {
      name: "grep",
      description: "Search matching lines.",
      usage: "grep AWS /usr/projects",
      run: (args, raw, ctx) => {
        const [query, ...rest] = args.split(/\s+/).filter(Boolean);
        const targetArg = rest.join(" ") || ".";
        if (!query) return "grep: missing pattern";
        const target = ctx.fs.normalize(targetArg, ctx.shell.cwd);
        const node = ctx.fs.nodeAt(target);
        if (!node) return `grep: ${targetArg}: No such file or directory`;
        const files = node.type === "file" ? [{ path: target, body: node.body }] : ctx.fs.allFiles(target);
        const q = query.toLowerCase();
        const matches = [];
        for (const file of files) {
          file.body.split("\n").forEach((line, idx) => {
            if (line.toLowerCase().includes(q)) matches.push(`${file.path}:${idx + 1}: ${line}`);
          });
        }
        return matches.length ? matches.join("\n") : `grep: no matches for '${query}'`;
      }
    },
    { name: "man", description: "Open manual page.", usage: "man ssh", run: (arg, raw, ctx) => window.OpenRootFilesystemPlugin.commands.find(c => c.name === "cat").run(arg ? `/man/${arg}.md` : "/man/README.md", raw, ctx) }
  ],
  completions(prefix, cwd, ctx) {
    const base = ["pwd", "ls", "cd ", "cat ", "open ", "less ", "tree /", "find ", "grep ", "man "];
    const currentNode = ctx.fs.nodeAt(cwd);
    if (currentNode && currentNode.type === "dir") {
      for (const item of ctx.fs.list(cwd)) {
        base.push("cd " + item.name);
        base.push("cat " + item.name);
        base.push("open " + item.name);
        base.push("less " + item.name);
      }
    }
    const allPaths = ctx.fs.allFiles("/").map(file => file.path);
    const dirs = new Set(["/"]);
    for (const filePath of allPaths) {
      const parts = filePath.split("/").filter(Boolean);
      let acc = "";
      for (let i = 0; i < parts.length - 1; i++) {
        acc += "/" + parts[i];
        dirs.add(acc);
      }
    }
    for (const dir of dirs) {
      base.push("cd " + dir);
      base.push("ls " + dir);
      base.push("open " + dir);
    }
    for (const file of allPaths) {
      base.push("cat " + file);
      base.push("open " + file);
      base.push("less " + file);
    }
    return base;
  }
};
