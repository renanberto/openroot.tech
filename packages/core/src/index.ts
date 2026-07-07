export * from "./events";
export * from "./registries";
export * from "./types";

import { EventBus } from "./events";
import { CommandRegistry, PluginRegistry, ThemeRegistry } from "./registries";
import type { OpenRootConfig, OpenRootMode, OpenRootPlugin, OpenRootTheme } from "./types";

export function createOpenRoot(config: OpenRootConfig) {
  const events = new EventBus();
  const commands = new CommandRegistry();
  const plugins = new PluginRegistry();
  const themes = new ThemeRegistry();
  let mode: OpenRootMode = config.defaultMode;

  function registerPlugin(plugin: OpenRootPlugin) {
    plugins.register(plugin);
    for (const command of plugin.commands) {
      commands.register(command);
      for (const alias of command.aliases ?? []) {
        commands.register({ ...command, name: alias });
      }
    }
  }

  function registerTheme(theme: OpenRootTheme) {
    themes.register(theme);
  }

  function setMode(nextMode: OpenRootMode) {
    mode = nextMode;
    events.emit("mode:changed", { mode });
  }

  function boot() {
    events.emit("runtime:boot", { appId: config.appId, version: config.version });
    return {
      status: "booted",
      mode
    };
  }

  return {
    config,
    events,
    commands,
    plugins,
    themes,
    boot,
    registerPlugin,
    registerTheme,
    setMode,
    getMode: () => mode
  };
}
