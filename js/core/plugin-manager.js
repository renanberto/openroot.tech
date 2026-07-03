window.OpenRootPluginManager = (() => {
  function create(context) {
    const plugins = [];
    const commands = new Map();

    function register(plugin) {
      plugins.push(plugin);
      for (const command of plugin.commands) {
        commands.set(command.name, {
          plugin: plugin.name,
          description: command.description || "",
          usage: command.usage || command.name,
          run: command.run
        });
      }
    }

    function execute(raw) {
      const trimmed = raw.trim();
      if (!trimmed) return "";
      const [cmd, ...rest] = trimmed.split(/\s+/);
      const arg = rest.join(" ");
      const entry = commands.get(cmd);
      if (!entry) return `command not found: ${raw}\nType "help" or use "nonroot".`;
      return entry.run(arg, raw, context);
    }

    function listPlugins() {
      return plugins.map(plugin => ({
        name: plugin.name,
        description: plugin.description || "",
        commands: plugin.commands.map(command => command.name)
      }));
    }

    function listCommands() {
      return [...commands.entries()]
        .map(([name, entry]) => ({ name, plugin: entry.plugin, description: entry.description, usage: entry.usage }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    function completions(prefix, cwd) {
      const base = listCommands().map(c => c.usage || c.name);
      for (const plugin of plugins) {
        if (typeof plugin.completions === "function") {
          base.push(...plugin.completions(prefix, cwd, context));
        }
      }
      return [...new Set(base)].filter(item => item.toLowerCase().startsWith(prefix.toLowerCase()));
    }

    return { register, execute, listPlugins, listCommands, completions, context };
  }

  return { create };
})();
