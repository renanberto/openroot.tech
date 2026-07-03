window.OpenRootConfig = {
  storagePrefix: "openroot.release01",
  startedAt: Date.now(),
  themes: [
    "terminal",
    "matrix",
    "nord",
    "tokyo",
    "dracula",
    "gruvbox",
    "catppuccin",
    "ubuntu",
    "arch",
    "fedora",
    "mac",
    "powershell",
    "solarized"
  ],
  bootLines: [
    { text: "bootloader: openroot.os", hold: 240 },
    { text: "loading Release 0.1.9", hold: 330 },
    { text: "mounting compact filesystem tree", hold: 360 },
    { text: "registering themes", hold: 340 },
    { text: "welcome to openroot.tech", hold: 460 }
  ]
};
