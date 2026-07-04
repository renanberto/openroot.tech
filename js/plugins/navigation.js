window.OpenRootNavigationPlugin = {
  name: "navigation",
  description: "Help, shell convenience, nonroot and plugin inspection.",
  commands: [
    {
      name: "help",
      description: "Show help.",
      run: (_, __, ctx) => `OpenRoot OS Release 0.2.2-mobile-nonroot

Try:
ascii
ssh openroot.tech
themes
theme dracula
theme tokyo
tree /
services
journalctl

Filesystem:
pwd, ls, cd, cat, open, less, tree, find, grep, man

System:
ascii, neofetch, ps, uptime, status, logs, theme, themes

Services:
services, systemctl, journalctl

Navigation:
nonroot, help, history, alias, clear`
    },
    { name: "plugins", description: "List installed plugins.", run: (_, __, ctx) => ctx.pluginManager.listPlugins().map(p => `${p.name.padEnd(12)} ${p.commands.join(", ")}`).join("\n") },
    {
      name: "plugin",
      description: "Inspect one plugin.",
      usage: "plugin system",
      run: (name, raw, ctx) => {
        if (!name) return "plugin: missing plugin name";
        const plugin = ctx.pluginManager.listPlugins().find(p => p.name === name);
        if (!plugin) return `plugin not found: ${name}`;
        return `${plugin.name}

${plugin.description}

Commands:
${plugin.commands.map(c => "- " + c).join("\n")}`;
      }
    },
    { name: "commands", description: "List all registered commands.", run: (_, __, ctx) => ctx.pluginManager.listCommands().map(c => `${c.name.padEnd(12)} ${c.plugin.padEnd(12)} ${c.description}`).join("\n") },
    { name: "nonroot", description: "Open guided mode.", run: (_, __, ctx) => { ctx.ui.openNonroot(); return "nonroot mode opened"; } },
    { name: "simple", description: "Alias for nonroot.", run: (_, __, ctx) => window.OpenRootNavigationPlugin.commands.find(c => c.name === "nonroot").run(_, __, ctx) },
    { name: "whoami", description: "Show current visitor identity.", run: () => "visitor" },
    { name: "history", description: "Show command history.", run: (_, __, ctx) => ctx.shell.getHistory().map((h, i) => `${i + 1}  ${h}`).join("\n") },
    {
      name: "alias",
      description: "Create alias.",
      usage: "alias p=cd /usr/projects",
      run: (arg, raw, ctx) => {
        if (!arg) return ctx.pluginManager.execute("aliases");
        const eq = arg.indexOf("=");
        if (eq === -1) return "alias: usage alias name=command";
        const name = arg.slice(0, eq).trim();
        const value = arg.slice(eq + 1).trim();
        ctx.shell.setAlias(name, value);
        return `alias created: ${name}='${value}'`;
      }
    },
    { name: "aliases", description: "List aliases.", run: (_, __, ctx) => { const entries = Object.entries(ctx.shell.getAliases()); return entries.length ? entries.map(([k, v]) => `${k}='${v}'`).join("\n") : "no aliases defined"; } },
    { name: "unalias", description: "Remove alias.", usage: "unalias p", run: (arg, raw, ctx) => { if (!arg) return "unalias: missing alias name"; ctx.shell.unsetAlias(arg); return `alias removed: ${arg}`; } },
    { name: "clear", description: "Clear terminal output.", run: (_, __, ctx) => { ctx.ui.clearTerminal(); return ""; } },
    { name: "github", description: "Open mocked GitHub process file.", run: (_, raw, ctx) => window.OpenRootFilesystemPlugin.commands.find(c => c.name === "cat").run("/proc/github", raw, ctx) },
    { name: "linkedin", description: "Show LinkedIn placeholder.", run: () => "LinkedIn placeholder: https://www.linkedin.com/in/renan-berto" },
    { name: "resume", description: "Show resume placeholder.", run: () => "Resume: assets/resume.pdf" }
  ],
  completions() { return ["help", "plugins", "plugin filesystem", "plugin git", "plugin system", "plugin services", "plugin fun", "plugin navigation", "commands", "nonroot", "simple", "whoami", "history", "alias ", "aliases", "unalias ", "clear", "github", "linkedin", "resume"]; }
};
