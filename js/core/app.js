(() => {
  const config = window.OpenRootConfig;
  const content = window.OPENROOT_CONTENT || (typeof OPENROOT_CONTENT !== "undefined" ? OPENROOT_CONTENT : null);

  if (!content || !Array.isArray(content.files)) {
    document.body.innerHTML = "<main style='min-height:100vh;display:grid;place-items:center;background:#000;color:#fff;font-family:monospace;padding:24px'><div><h1>OpenRoot boot error</h1><p>Content filesystem was not loaded.</p><p>Check that <code>js/content.generated.js</code> exists and is loaded before <code>js/core/app.js</code>.</p></div></main>";
    throw new Error("OpenRoot content filesystem was not loaded. Missing window.OPENROOT_CONTENT.files.");
  }

  const fs = window.OpenRootFS.create(content.files);
  const ui = window.OpenRootUI;
  const renderer = window.OpenRootRenderer;
  const serviceManager = window.OpenRootServiceManager.create(config);
  const shell = window.OpenRootShell.create({ fs, ui, renderer, config, content });
  const runtime = { config, content, fs, ui, renderer, shell, serviceManager, pluginManager: null };
  const pluginManager = window.OpenRootPluginManager.create(runtime);
  runtime.pluginManager = pluginManager;

  window.OpenRootRuntime = runtime;

  pluginManager.register(window.OpenRootFilesystemPlugin);
  pluginManager.register(window.OpenRootGitPlugin);
  pluginManager.register(window.OpenRootSystemPlugin);
  pluginManager.register(window.OpenRootFunPlugin);
  pluginManager.register(window.OpenRootNavigationPlugin);
  pluginManager.register(window.OpenRootServicesPlugin);

  function renderSidebarNav() {
    const groups = [
      {
        title: "Start",
        items: [
          { label: "Bio", path: "/etc/bio.md", hint: "Human portfolio intro" },
          { label: "Skills", path: "/etc/skills.md", hint: "Technical capabilities" }
        ]
      },
      {
        title: "Portfolio",
        items: [
          { label: "Projects", path: "/usr/projects", hint: "Project catalog" },
          { label: "WAF", path: "/usr/projects/waf/README.md", hint: "Security cases" },
          { label: "Certs", path: "/usr/projects/certs/README.md", hint: "AWS validation" },
          { label: "Bemod", path: "/usr/projects/bemod/README.md", hint: "AI router" }
        ]
      },
      {
        title: "System",
        items: [
          { label: "Themes", path: "/etc/themes.json", hint: "Visual modes" },
          { label: "Services", path: "/etc/services.json", hint: "Daemons" },
          { label: "Release Log", path: "/var/log/releases.log", hint: "Version history" }
        ]
      },
      {
        title: "Contact",
        items: [
          { label: "Contact", path: "/dev/contact", hint: "Links and resume" },
          { label: "Nonroot", command: "nonroot", hint: "Clean guided view" }
        ]
      }
    ];

    ui.el.treeView.innerHTML = "";

    for (const group of groups) {
      const section = document.createElement("section");
      section.className = "tree-group";

      const title = document.createElement("p");
      title.className = "tree-group-title";
      title.textContent = group.title;
      section.appendChild(title);

      for (const item of group.items) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tree-link";

        const strong = document.createElement("strong");
        strong.textContent = item.label;

        const small = document.createElement("small");
        small.textContent = item.hint || item.path || item.command;

        button.appendChild(strong);
        button.appendChild(small);

        button.addEventListener("click", event => {
          event.stopPropagation();
          if (item.command) {
            if (ui.el.input) {
              ui.el.input.value = item.command;
              submitCurrent();
            }
            return;
          }

          const result = shell.openPath(item.path, true);
          if (result) ui.print(result, "dim");
          if (ui.el.input) ui.el.input.focus();
        });

        section.appendChild(button);
      }

      ui.el.treeView.appendChild(section);
    }
  }


  const savedTheme = localStorage.getItem(`${config.storagePrefix}.theme`);
  if (savedTheme && savedTheme !== "terminal") document.documentElement.dataset.theme = savedTheme;

  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function typeBootLine(text) {
    ui.el.bootText.textContent = "";
    for (let i = 0; i <= text.length; i++) {
      ui.el.bootText.textContent = text.slice(0, i);
      await sleep(22 + Math.random() * 26);
    }
  }

  async function eraseBootLine() {
    let value = ui.el.bootText.textContent;
    while (value.length) {
      value = value.slice(0, -1);
      ui.el.bootText.textContent = value;
      await sleep(9 + Math.random() * 10);
    }
  }


  function runCommandFromPortfolio(command) {
    ui.closeNonroot();
    if (!ui.el.input) return;
    ui.el.input.value = command;
    submitCurrent();
  }

  function renderStructuredPortfolio() {
    if (!window.OPENROOT_PORTFOLIO || !window.OpenRootPortfolioRenderer) return;

    const frame = document.querySelector(".nonroot-frame");
    if (!frame) return;

    frame.innerHTML = "";

    const top = document.createElement("div");
    top.className = "portfolio-mode-top";

    const back = document.createElement("button");
    back.type = "button";
    back.className = "back-button";
    back.textContent = "← Back to terminal";
    back.addEventListener("click", ui.closeNonroot);

    top.appendChild(back);
    frame.appendChild(top);

    const rendered = window.OpenRootPortfolioRenderer.render(window.OPENROOT_PORTFOLIO, {
      runCommand: runCommandFromPortfolio
    });

    frame.appendChild(rendered);
  }

  function bindCurrentInput() {
    if (!ui.el.input) return;
    ui.el.input.addEventListener("keydown", handleInputKeydown);
  }

  async function boot() {
    for (let i = 0; i < config.bootLines.length; i++) {
      await typeBootLine(config.bootLines[i].text);
      await sleep(config.bootLines[i].hold);
      if (i < config.bootLines.length - 1) {
        await eraseBootLine();
        await sleep(80);
      }
    }

    await sleep(260);
    ui.el.boot.classList.add("hidden");
    const isMobilePortfolio = window.matchMedia("(max-width: 760px)").matches;
    if (isMobilePortfolio) {
      ui.openNonroot();
    } else {
      ui.el.tui.classList.remove("hidden");
    }
    renderSidebarNav();
    if (ui.el.releaseLabel) ui.el.releaseLabel.textContent = config.release;
    shell.openPath(content.system.defaultOpen, false);

    ui.print(`openroot.tech Release 0.2.4-content-engine

GitHub Pages workflow added.
Terminal interaction rebuilt as a real transcript.
Type "help" to list commands.

`, "dim");

    ui.createPrompt(shell.displayPath(shell.cwd));
    shell.updatePrompt();
    bindCurrentInput();
  }

  function submitCurrent() {
    if (!ui.el.input) return;
    const value = ui.el.input.value;
    shell.submit(value, pluginManager);
    bindCurrentInput();
  }

  function handleInputKeydown(event) {
    const history = shell.getHistory();
    let historyIndex = shell.getHistoryIndex();

    if (event.key === "Enter") {
      event.preventDefault();
      submitCurrent();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length && historyIndex > 0) {
        historyIndex--;
        shell.setHistoryIndex(historyIndex);
        ui.el.input.value = history[historyIndex];
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        shell.setHistoryIndex(historyIndex);
        ui.el.input.value = history[historyIndex];
      } else {
        shell.setHistoryIndex(history.length);
        ui.el.input.value = "";
      }
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const current = ui.el.input.value.toLowerCase();
      const matches = pluginManager.completions(current, shell.cwd);
      if (matches.length === 1) ui.el.input.value = matches[0];
      else if (matches.length > 1) ui.print(matches.join("  "), "dim");
    }
  }

  document.addEventListener("keydown", event => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      ui.clearTerminal();
      ui.createPrompt(shell.displayPath(shell.cwd));
      shell.updatePrompt();
      bindCurrentInput();
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      if (!ui.el.tui.classList.contains("hidden")) {
        if (ui.el.input) ui.el.input.value = "";
        ui.print("^C", "command");
        shell.setReverseSearch(false);
        ui.createPrompt(shell.displayPath(shell.cwd));
        shell.updatePrompt();
        bindCurrentInput();
      }
    }

    if (event.ctrlKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      shell.setReverseSearch(true);
      if (ui.el.input) {
        ui.el.input.value = "";
        ui.el.input.placeholder = "reverse-i-search";
        ui.print("(reverse-i-search) Type a term and press Enter", "dim");
        ui.el.input.focus();
        setTimeout(() => {
          if (ui.el.input) ui.el.input.placeholder = "";
        }, 3000);
      }
    }

    if (event.key === "Escape" && !ui.el.nonroot.classList.contains("hidden")) ui.closeNonroot();
  });

  ui.el.terminalPanel.addEventListener("click", () => {
    if (ui.el.input) ui.el.input.focus();
  });

  document.addEventListener("click", () => {
    if (!ui.el.tui.classList.contains("hidden") && ui.el.input) ui.el.input.focus();
  });

  document.querySelectorAll("[data-shortcut]").forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      if (!ui.el.input) return;
      ui.el.input.value = btn.dataset.shortcut;
      submitCurrent();
    });
  });

  document.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      const path = btn.dataset.open;
      const node = fs.nodeAt(path);
      if (!node) {
        ui.el.simpleOutput.textContent = "Content not found yet.";
        return;
      }
      if (node.type === "dir") {
        const readme = node.children && node.children["README.md"];
        ui.el.simpleOutput.textContent = readme ? readme.body.replace(/^# /gm, "") : "Directory opened.";
      } else {
        ui.el.simpleOutput.textContent = node.body.replace(/^# /gm, "");
      }
      ui.el.simpleOutput.scrollIntoView({ block: "nearest" });
    });
  });

  if (ui.el.backToTerminal) ui.el.backToTerminal.addEventListener("click", ui.closeNonroot);
  renderStructuredPortfolio();
  ui.updateClock();
  setInterval(ui.updateClock, 20000);
  boot();
})();
