import type { OpenRootTheme } from "@openroot/core";

export const openRootTheme: OpenRootTheme = {
  id: "openroot",
  name: "OpenRoot",
  ascii: String.raw`
   ____                  ____              __ 
  / __ \____  ___  ____ / __ \____  ____  / /_
 / / / / __ \/ _ \/ __ \/ /_/ / __ \/ __ \/ __/
/ /_/ / /_/ /  __/ / / / _, _/ /_/ / /_/ / /_  
\____/ .___/\___/_/ /_/_/ |_|\____/ .___/\__/  
    /_/                           /_/           
`,
  prompt: "visitor@openroot:~$",
  colors: {
    background: "#050806",
    foreground: "#f3f7f2",
    accent: "#6dff5f",
    muted: "rgba(243,247,242,.68)"
  },
  boot: {
    steps: [
      "Powering on OpenRoot OS",
      "Loading kernel",
      "Mounting knowledge filesystem",
      "Registering plugins",
      "Loading OpenRoot theme",
      "Preparing Explorer Mode",
      "Preparing Profile Mode",
      "System ready"
    ]
  }
};
