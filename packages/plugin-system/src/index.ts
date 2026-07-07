import type { OpenRootPlugin } from "@openroot/core";

export function createSystemPlugin(): OpenRootPlugin {
  return {
    id: "system",
    name: "System",
    commands: [
      {
        name: "status",
        description: "Show OpenRoot runtime status.",
        run() {
          return [
            "OpenRoot OS Release 1",
            "Build: OS Release 1 / PROD",
            "Runtime: browser",
            "Host: GitHub Pages",
            "Backend: none - static runtime",
            "Modes: terminal, filesystem, inspector",
            "State: online"
          ].join("\n");
        }
      },
      {
        name: "ps",
        description: "Show OpenRoot runtime processes.",
        run() {
          return [
            "PID  COMMAND",
            "001  openroot-kernel",
            "014  knowledge-fs",
            "022  shell-runtime",
            "031  inspector-renderer",
            "042  theme-engine",
            "077  github-pages-adapter"
          ].join("\n");
        }
      },
      {
        name: "systemctl",
        description: "Show fake OpenRoot service status.",
        run(args) {
          const service = args[1] ?? args[0] ?? "openroot";
          return [
            `* ${service}.service - OpenRoot managed service`,
            "   Loaded: loaded",
            "   Active: active (running)",
            "   Runtime: static browser process"
          ].join("\n");
        }
      },
      {
        name: "journalctl",
        description: "Show OpenRoot runtime logs.",
        run() {
          return [
            "openroot: kernel booted",
            "openroot: knowledge mounted",
            "openroot: plugins registered",
            "openroot: inspector online",
            "openroot: github pages target verified"
          ].join("\n");
        }
      }
    ]
  };
}
