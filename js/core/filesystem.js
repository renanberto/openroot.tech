window.OpenRootFS = (() => {
  function build(files) {
    const root = { type: "dir", children: {} };
    for (const file of files) {
      const parts = file.path.split("/").filter(Boolean);
      let node = root;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const last = i === parts.length - 1;
        if (last) node.children[part] = { type: "file", title: file.title || part, body: file.body || "" };
        else {
          if (!node.children[part]) node.children[part] = { type: "dir", children: {} };
          node = node.children[part];
        }
      }
    }
    return root;
  }

  function create(files) {
    const root = build(files);

    function normalize(path, cwd) {
      if (!path || path === "~") return "/home/visitor";
      let base = path.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
      for (const part of path.split("/")) {
        if (!part || part === ".") continue;
        if (part === "..") base.pop();
        else if (part === "~") base = ["home", "visitor"];
        else base.push(part);
      }
      return "/" + base.join("/");
    }

    function nodeAt(path) {
      if (path === "/") return root;
      const parts = path.split("/").filter(Boolean);
      let node = root;
      for (const part of parts) {
        if (!node || node.type !== "dir" || !node.children[part]) return null;
        node = node.children[part];
      }
      return node;
    }

    function list(path) {
      const node = nodeAt(path);
      if (!node || node.type !== "dir") return [];
      return Object.entries(node.children).map(([name, child]) => ({
        name,
        type: child.type,
        path: (path === "/" ? "" : path) + "/" + name
      }));
    }

    function allFiles(start = "/") {
      const results = [];
      const node = nodeAt(start);
      if (!node) return results;
      function walk(current, path) {
        if (current.type === "file") {
          results.push({ path, title: current.title, body: current.body });
          return;
        }
        for (const [name, child] of Object.entries(current.children || {})) {
          walk(child, (path === "/" ? "" : path) + "/" + name);
        }
      }
      walk(node, start);
      return results;
    }

    function tree(options = {}) {
      const maxDepth = Number.isFinite(options.maxDepth) ? options.maxDepth : Infinity;
      const compact = options.compact || false;
      const lines = compact ? ["openroot:/"] : ["/"];

      function walk(node, prefix = "", depth = 0) {
        if (depth >= maxDepth) {
          if (Object.keys(node.children || {}).length) lines.push(prefix + "└── …");
          return;
        }

        const entries = Object.entries(node.children || {});
        entries.forEach(([name, child], idx) => {
          const last = idx === entries.length - 1;
          const marker = last ? "└── " : "├── ";
          const suffix = child.type === "dir" ? "/" : "";
          lines.push(prefix + marker + name + suffix);
          if (child.type === "dir") {
            walk(child, prefix + (last ? "    " : "│   "), depth + 1);
          }
        });
      }

      walk(root, "", 0);
      return lines.join("\\n");
    }

    function sidebarTree() {
      return [
        "OPENROOT OS",
        "Start: ~/README.md",
        "Bio: /etc/bio.md",
        "Skills: /etc/skills.json",
        "Projects: /usr/projects",
        "Lab: /usr/lab",
        "Blog: /usr/blog",
        "Themes: /etc/themes.json",
        "Services: /etc/services.json",
        "Contact: /dev/contact"
      ].join("\\n");
    }

    function sidebarTreeHTML() {
      const sections = [
        ["Start", [["~", "README.md", "cat ~/README.md"]]],
        ["Identity", [["/etc", "bio.md", "cat /etc/bio.md"], ["/etc", "profile", "cat /etc/profile"], ["/etc", "skills.json", "cat /etc/skills.json"]]],
        ["Portfolio", [["/usr/projects", "overview", "cd /usr/projects"], ["/usr/projects", "corly", "cat /usr/projects/corly/README.md"], ["/usr/projects", "bemod", "cat /usr/projects/bemod/README.md"], ["/usr/projects", "certs", "cat /usr/projects/certs/README.md"], ["/usr/projects", "waf", "cat /usr/projects/waf/README.md"]]],
        ["System", [["/etc", "themes.json", "cat /etc/themes.json"], ["/etc", "services.json", "cat /etc/services.json"], ["/var/log", "releases.log", "cat /var/log/releases.log"]]],
        ["Contact", [["/dev", "contact", "cat /dev/contact"]]]
      ];

      return sections.map(([title, items]) => `
        <div class="tree-card">
          <div class="tree-title">${title}</div>
          ${items.map(([dir, name, cmd]) => `
            <div class="tree-row" title="${cmd}">
              <span class="tree-dir">${dir}</span>
              <span class="tree-name">${name}</span>
            </div>`).join("")}
        </div>`).join("");
    }

    return { root, normalize, nodeAt, list, allFiles, tree, sidebarTree, sidebarTreeHTML };
  }

  return { create };
})();
