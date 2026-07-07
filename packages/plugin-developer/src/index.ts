import type { OpenRootPlugin } from "@openroot/core";
import type { VirtualFileSystem } from "@openroot/filesystem";

function getDeveloper(fs: VirtualFileSystem) {
  return fs.read("/developer")?.content as any;
}

function table(rows: Array<[string, string]>) {
  const width = Math.max(...rows.map(([left]) => left.length));
  return rows.map(([left, right]) => `${left.padEnd(width)}  ${right}`).join("\n");
}

export function createDeveloperPlugin(fs: VirtualFileSystem): OpenRootPlugin {
  return {
    id: "developer",
    name: "Developer Experience",
    commands: [
      {
        name: "devx",
        description: "Show the OpenRoot developer experience overview.",
        run() {
          const dev = getDeveloper(fs);
          return [
            `${dev.label} ${dev.version}`,
            "",
            dev.summary,
            "",
            "Try:",
            "  api endpoints",
            "  json contract",
            "  plugins list",
            "  extensions map",
            "  cli",
            "  testing gates"
          ].join("\n");
        }
      },
      {
        name: "api",
        description: "Inspect static API endpoints and contract.",
        usage: "api endpoints|contract",
        run(args) {
          const dev = getDeveloper(fs);
          const topic = args[0] ?? "endpoints";
          if (topic === "contract") return dev.api.contract;
          if (topic !== "endpoints") return "usage: api endpoints|contract";
          return dev.api.endpoints.map((endpoint: any) => `${endpoint.path}\n  ${endpoint.purpose}`).join("\n\n");
        }
      },
      {
        name: "json",
        description: "Show JSON engine rules.",
        usage: "json contract",
        run() {
          const engine = getDeveloper(fs).jsonEngine;
          return [
            `Source: ${engine.sourceOfTruth}`,
            `Generator: ${engine.generator}`,
            "",
            ...engine.rules.map((rule: string) => `- ${rule}`)
          ].join("\n");
        }
      },
      {
        name: "plugins",
        description: "List registered plugin contracts.",
        usage: "plugins list",
        run() {
          const system = getDeveloper(fs).pluginSystem;
          return [
            system.runtime,
            "",
            "Plugins:",
            ...system.plugins.map((plugin: string) => `- ${plugin}`),
            "",
            "Extension points:",
            ...system.extensionPoints.map((point: string) => `- ${point}`)
          ].join("\n");
        }
      },
      {
        name: "extensions",
        description: "Show extension map.",
        usage: "extensions map",
        run() {
          return getDeveloper(fs).extensions.map((extension: any) => `${extension.name} [${extension.status}]\n  ${extension.example}`).join("\n\n");
        }
      },
      {
        name: "cli",
        description: "Show developer CLI commands.",
        run() {
          const cli = getDeveloper(fs).cli;
          return [
            "Developer commands",
            table(cli.commands.map((command: string) => [command, `run: ${command}`])),
            "",
            "Examples:",
            ...cli.examples.map((example: string) => `  ${example}`)
          ].join("\n");
        }
      },
      {
        name: "importers",
        description: "Show supported importer contracts.",
        run() {
          return getDeveloper(fs).importers.map((item: any) => `${item.source}\n  Mode: ${item.mode}\n  Target: ${item.target}`).join("\n\n");
        }
      },
      {
        name: "exporters",
        description: "Show supported exporter contracts.",
        run() {
          return getDeveloper(fs).exporters.map((item: any) => `${item.target}\n  Script: ${item.script}`).join("\n\n");
        }
      },
      {
        name: "testing",
        description: "Show release testing gates.",
        usage: "testing gates",
        run() {
          const testing = getDeveloper(fs).testing;
          return [`Testing status: ${testing.status}`, "", ...testing.gates.map((gate: string) => `- ${gate}`)].join("\n");
        }
      },
      {
        name: "docs",
        description: "Show release documentation files.",
        run() {
          return getDeveloper(fs).documentation.map((doc: string) => `- ${doc}`).join("\n");
        }
      }
    ]
  };
}
