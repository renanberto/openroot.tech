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
            "OpenRoot OS Release 5",
            "Build: OS Release 5 / PROD",
            "Runtime: browser",
            "Host: GitHub Pages",
            "Backend: none - static runtime",
            "Modes: terminal, filesystem, recruiter inspector, desktop command layer",
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
      },
      {
        name: "desktop",
        description: "Show OpenRoot OS desktop summary.",
        run() {
          return [
            "OpenRoot Desktop",
            "  Window manager: shell grid with terminal, filesystem and recruiter inspector",
            "  Applications: profile, projects, skills, contact, files, terminal, settings",
            "  Dock: terminal-first commands exposed through help and command palette",
            "  Notifications: static runtime status and release validation",
            "  Widgets: mount status, favorites, breadcrumbs and statusbar",
            "  UX: inspector reduced to recruiter domains; technical domains stay terminal-first"
          ].join("\n");
        }
      },
      {
        name: "apps",
        description: "List OpenRoot OS applications.",
        run() {
          return [
            "Applications",
            "  profile      Recruiter summary",
            "  projects     Proof of work",
            "  skills       Evidence-based skills",
            "  contact      Contact endpoints",
            "  files        Knowledge filesystem",
            "  terminal     Full technical access",
            "  settings     Runtime preferences"
          ].join("\n");
        }
      },
      {
        name: "dock",
        description: "Show dock commands.",
        run() {
          return [
            "Dock",
            "  help",
            "  whoami",
            "  projects",
            "  skills",
            "  contact",
            "  desktop",
            "  settings"
          ].join("\n");
        }
      },
      {
        name: "notifications",
        description: "Show runtime notifications.",
        run() {
          return [
            "Notifications",
            "  Release 5 active",
            "  Static build target: GitHub Pages",
            "  Recruiter inspector: simplified",
            "  Terminal: primary access for technical content"
          ].join("\n");
        }
      },
      {
        name: "widgets",
        description: "List desktop widgets.",
        run() {
          return [
            "Widgets",
            "  Breadcrumb",
            "  Mount status",
            "  Favorites",
            "  Statusbar",
            "  Theme selector"
          ].join("\n");
        }
      },
      {
        name: "settings",
        description: "Show runtime settings.",
        run() {
          return [
            "Settings",
            "  Filesystem width: persisted locally",
            "  Inspector width: persisted locally",
            "  Expanded folders: persisted locally",
            "  Favorites: persisted locally",
            "  Theme: use theme list and theme set <name>"
          ].join("\n");
        }
      }
    ]
  };
}
