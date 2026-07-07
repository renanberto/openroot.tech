import type { OpenRootPlugin } from "@openroot/core";

export function createFunPlugin(): OpenRootPlugin {
  return {
    id: "fun",
    name: "Fun",
    commands: [
      {
        name: "help",
        description: "List starter commands.",
        run() {
          return [
            "OpenRoot commands:",
            "  tour                 Recruiter-specialist guided tour",
            "  whoami               Professional identity",
            "  recruiter            Hiring summary",
            "  resume               Resume information",
            "  current              What I am building now",
            "  skills --dev         Software engineering skills",
            "  skills --devops      Platform/DevOps/cloud skills",
            "  skills --ai          AI engineering skills",
            "  project openroot     Open project summary",
            "  story waf            Full case-study style story",
            "  graph AWS            Search the knowledge graph",
            "  viewer projects      Interactive project viewer",
            "  architecture         Architecture layers",
            "  shortcuts            Keyboard shortcuts",
            "  favorites            Favorite entry points",
            "  desktop              OpenRoot OS desktop summary",
            "  apps                 List OpenRoot OS applications",
            "  dock                 Show dock commands",
            "  notifications        Runtime notifications",
            "  widgets              Desktop widgets",
            "  settings             Runtime settings",
            "  contact              Contact endpoints",
            "  open github          Open GitHub",
            "  open linkedin        Open LinkedIn",
            "  open email           Open email client",
            "",
            "Terminal:",
            "  cd /projects",
            "  pwd",
            "  ls",
            "  theme list",
            "  theme set matrix",
            "",
            "System:",
            "  status",
            "  ps",
            "  systemctl status openroot",
            "  journalctl"
          ].join("\n");
        }
      },
      {
        name: "tour",
        description: "Recruiter-specialist guided tour.",
        run() {
          return [
            "Recruiter tour: Renan Berto",
            "",
            "Step 1 - Identity",
            "  whoami",
            "  recruiter",
            "",
            "Step 2 - Fit",
            "  skills --dev",
            "  skills --devops",
            "  skills --ai",
            "",
            "Step 3 - Proof",
            "  project openroot",
            "  story waf",
            "  project bemod",
            "",
            "Step 4 - Current direction",
            "  current",
            "  graph AWS",
            "",
            "Step 5 - Contact",
            "  resume",
            "  contact",
            "  open linkedin",
            "",
            "Recommended recruiter path:",
            "  PROFILE tab -> INSPECTOR Overview -> Projects -> Skills -> Contact",
            "",
            "Evaluation summary:",
            "  Best fit: Software Engineer, DevOps Engineer, Platform Engineer, Cloud Engineer, AI Engineering.",
            "  Location: Lisboa, Portugal / Remote.",
            "  Strength: builds useful production systems across software, cloud, automation and AI workflows."
          ].join("\n");
        }
      },
      { name: "ssh", description: "Fake SSH sequence.", run(args) { const target = args[0] ?? "openroot.tech"; return [`Connecting to ${target}...`, "Negotiating keys...", "Authenticating visitor...", "Access granted.", "Welcome to OpenRoot OS."].join("\n"); } },
      { name: "sudo", description: "Nice try.", run(args) { if (args.join(" ") === "rm -rf /") return "Nice try. Production survived."; return "Permission denied."; } },
      { name: "apt", description: "Fake package manager.", run(args) { if (args.join(" ") === "install coffee") return "Package coffee installed. Caffeine level increased."; return "Nothing to do."; } }
    ]
  };
}
