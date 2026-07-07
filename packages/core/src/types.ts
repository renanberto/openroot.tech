import type { VirtualFileSystem } from "@openroot/filesystem";

export type OpenRootMode = "explorer" | "profile";

export interface OpenRootConfig {
  appId: string;
  version: string;
  defaultMode: OpenRootMode;
}

export interface OpenRootCommandContext {
  fs: VirtualFileSystem;
  commands: unknown;
  setMode: (mode: OpenRootMode) => void;
  getGraph?: () => unknown;
  emit?: (event: string, payload: Record<string, unknown>) => void;
  shellState?: { cwd: string; theme: string };
  resolvePath?: (path?: string) => string;
}

export interface OpenRootCommand {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  run: (args: string[], context: OpenRootCommandContext) => string | Promise<string>;
}

export interface OpenRootPlugin {
  id: string;
  name: string;
  commands: OpenRootCommand[];
}

export interface OpenRootTheme {
  id: string;
  name: string;
  ascii: string;
  prompt: string;
  colors: Record<string, string>;
  boot: { steps: string[] };
}
