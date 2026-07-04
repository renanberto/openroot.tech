window.OpenRootSystemPlugin = {
  name: "system",
  description: "System identity, themes and status commands.",
  commands: [
    {
      name: "ascii",
      description: "Display OpenRoot ASCII banner.",
      run: () => `

   ____                  ____              __ 
  / __ \\____  ___  ____ / __ \\____  ____  / /_
 / / / / __ \\/ _ \\/ __ \\/ /_/ / __ \\/ __ \\/ __/
/ /_/ / /_/ /  __/ / / / _, _/ /_/ / /_/ / /_  
\\____/ .___/\\___/_/ /_/_/ |_|\\____/ .___/\\__/  
    /_/                           /_/           

        openroot.tech  ::  Release 0.2.3-content-polish
        static terminal os for cloud, linux and automation
`
    },
    {
      name: "neofetch",
      description: "Display OpenRoot system identity.",
      run: (_, __, ctx) => `             >_        visitor@openroot
          openroot      ----------------
        tech static     OS: openroot.tech Static Terminal OS
       release 0.1      Version: ${ctx.content.system.version}
      command mesh      Shell: openroot-sh
     content mounted    Files: ${ctx.fs.allFiles("/").length}
                        Plugins: ${ctx.pluginManager.listPlugins().length}
                        Services: ${ctx.serviceManager.list().length}
                        Theme: ${document.documentElement.dataset.theme || "terminal"}
                        CPU: curiosity
                        Memory: calm operations`
    },
    {
      name: "ps",
      description: "List running processes.",
      run: (_, __, ctx) => ctx.serviceManager.list().map(s => `${String(s.pid).padStart(3, "0")}   ${s.name.padEnd(20)} ${s.status}`).join("\n")
    },
    { name: "uptime", description: "Show session uptime.", run: (_, __, ctx) => `openroot.tech up ${ctx.serviceManager.uptime()}s` },
    { name: "status", description: "Show OS status.", run: (_, __, ctx) => window.OpenRootGitPlugin.commands[0].run("status", "git status", ctx) },
    {
      name: "logs",
      description: "Show release or career logs.",
      usage: "logs career",
      run: (arg, raw, ctx) => {
        const cat = window.OpenRootFilesystemPlugin.commands.find(c => c.name === "cat");
        if (arg === "career") return cat.run("/var/log/career.log", raw, ctx);
        if (arg === "journal") return cat.run("/var/log/journal.log", raw, ctx);
        return cat.run("/var/log/releases.log", raw, ctx);
      }
    },
    {
      name: "themes",
      description: "List available themes.",
      run: (_, __, ctx) => ctx.config.themes.map(t => `theme ${t}`).join("\n")
    },
    {
      name: "theme",
      description: "Switch theme.",
      usage: "theme dracula",
      run: (name, raw, ctx) => {
        if (!name) return `themes: ${ctx.config.themes.join(", ")}`;
        if (!ctx.config.themes.includes(name)) return `unknown theme: ${name}`;
        document.documentElement.dataset.theme = name === "terminal" ? "" : name;
        localStorage.setItem(`${ctx.config.storagePrefix}.theme`, name);
        return `theme switched to ${name}`;
      }
    }
  ],
  completions(prefix, cwd, ctx) {
    return ["ascii", "neofetch", "ps", "uptime", "status", "logs", "logs career", "logs journal", "themes", ...ctx.config.themes.map(t => `theme ${t}`)];
  }
};
