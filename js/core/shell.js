window.OpenRootShell = (() => {
  function create({ fs, ui, renderer, config, content }) {
    const storage = config.storagePrefix;
    let cwd = localStorage.getItem(`${storage}.cwd`) || content.system.defaultCwd || "/home/visitor";
    let history = JSON.parse(localStorage.getItem(`${storage}.history`) || "[]");
    let aliases = JSON.parse(localStorage.getItem(`${storage}.aliases`) || "{}");
    let historyIndex = history.length;
    let reverseSearch = false;

    function displayPath(path) {
      return path === "/home/visitor" ? "~" : path.replace("/home/visitor", "~");
    }

    function updatePrompt() {
      ui.setPrompt(displayPath(cwd));
    }

    function setCwd(path) {
      cwd = path;
      localStorage.setItem(`${storage}.cwd`, cwd);
      updatePrompt();
    }

    function openPath(path, echo = true) {
      const full = fs.normalize(path, cwd);
      const node = fs.nodeAt(full);
      if (!node) return `not found: ${path}`;

      if (node.type === "dir") {
        setCwd(full);
        const readme = node.children && node.children["README.md"];
        ui.showFile(displayPath(full), readme ? renderer.markdownToHTML(readme.body) : `<h1>${full}</h1><p>Directory opened.</p>`);
        return echo ? `entered ${displayPath(full)}` : "";
      }

      ui.showFile(displayPath(full), renderer.markdownToHTML(node.body));
      return echo ? `opened ${displayPath(full)}` : "";
    }

    function echo(command) {
      ui.print(`visitor@openroot${displayPath(cwd)}$ ${command}`, "command");
    }

    function saveHistory(command) {
      if (!command.trim()) return;
      history.push(command.trim());
      history = history.slice(-120);
      historyIndex = history.length;
      localStorage.setItem(`${storage}.history`, JSON.stringify(history));
    }

    function expandAlias(raw) {
      const [cmd, ...rest] = raw.trim().split(/\s+/);
      if (aliases[cmd]) return aliases[cmd] + (rest.length ? " " + rest.join(" ") : "");
      return raw;
    }

    function submit(raw, pluginManager) {
      if (reverseSearch) {
        reverseSearch = false;
        const found = [...history].reverse().find(item => item.toLowerCase().includes(raw.toLowerCase()));
        ui.el.input.value = found || "";
        ui.print(`reverse-i-search: ${raw} ${found ? "=> " + found : "=> no match"}`, "dim");
        return;
      }

      echo(raw);
      saveHistory(raw);
      const expanded = expandAlias(raw);
      const result = pluginManager.execute(expanded);
      if (result) ui.print(result);
      ui.el.input.value = "";
    }

    if (!fs.nodeAt(cwd) || fs.nodeAt(cwd).type !== "dir") cwd = "/home/visitor";
    updatePrompt();

    return {
      get cwd() { return cwd; },
      setCwd,
      openPath,
      displayPath,
      submit,
      setAlias(name, value) {
        aliases[name] = value;
        localStorage.setItem(`${storage}.aliases`, JSON.stringify(aliases));
      },
      unsetAlias(name) {
        delete aliases[name];
        localStorage.setItem(`${storage}.aliases`, JSON.stringify(aliases));
      },
      getAliases() { return aliases; },
      getHistory() { return history; },
      getHistoryIndex() { return historyIndex; },
      setHistoryIndex(value) { historyIndex = value; },
      setReverseSearch(value) { reverseSearch = value; }
    };
  }

  return { create };
})();
