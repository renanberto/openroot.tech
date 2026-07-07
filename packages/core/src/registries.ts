import type { OpenRootCommand, OpenRootPlugin, OpenRootTheme } from "./types";

export class CommandRegistry {
  private commands = new Map<string, OpenRootCommand>();

  register(command: OpenRootCommand) {
    this.commands.set(command.name, command);
  }

  get(name: string) {
    return this.commands.get(name);
  }

  list() {
    return [...this.commands.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
}

export class PluginRegistry {
  private plugins = new Map<string, OpenRootPlugin>();

  register(plugin: OpenRootPlugin) {
    this.plugins.set(plugin.id, plugin);
  }

  list() {
    return [...this.plugins.values()];
  }
}

export class ThemeRegistry {
  private themes = new Map<string, OpenRootTheme>();

  register(theme: OpenRootTheme) {
    this.themes.set(theme.id, theme);
  }

  get(id: string) {
    return this.themes.get(id);
  }

  list() {
    return [...this.themes.values()];
  }
}
