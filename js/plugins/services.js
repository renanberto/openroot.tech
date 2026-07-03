window.OpenRootServicesPlugin = {
  name: "services",
  description: "Background service inspection and journaling.",
  commands: [
    {
      name: "services",
      description: "List background services.",
      run: (_, __, ctx) => ctx.serviceManager.list().map(s => `${s.name.padEnd(22)} ${String(s.pid).padStart(3, "0")}   ${s.status}`).join("\n")
    },
    {
      name: "systemctl",
      description: "Inspect service status.",
      usage: "systemctl status shell",
      run: (args, raw, ctx) => {
        const [sub, name] = args.split(/\s+/).filter(Boolean);
        if (sub !== "status" || !name) return "usage: systemctl status <service>";
        const service = ctx.serviceManager.status(name);
        if (!service) return `Unit ${name}.service could not be found.`;
        return `● ${service.name}.service - ${service.description}
   Loaded: loaded (/etc/services.json; static)
   Active: ${service.status}
      PID: ${service.pid}
   Uptime: ${service.uptime}s`;
      }
    },
    {
      name: "journalctl",
      description: "Show service journal.",
      usage: "journalctl -u shell",
      run: (args, raw, ctx) => {
        const parts = args.split(/\s+/).filter(Boolean);
        let unit = "";
        if (parts[0] === "-u") unit = parts[1] || "";
        const logs = ctx.serviceManager.logs(unit);
        if (!logs.length) return unit ? `-- No entries for unit ${unit}` : "-- No journal entries";
        return logs.map((entry, idx) => {
          const sec = String(idx + 1).padStart(2, "0");
          return `00:00:${sec} openroot ${entry.unit}: ${entry.message}`;
        }).join("\n");
      }
    }
  ],
  completions() { return ["services", "systemctl status shell", "systemctl status plugin-manager", "systemctl status theme-engine", "journalctl", "journalctl -u shell", "journalctl -u theme-engine"]; }
};
