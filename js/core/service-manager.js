window.OpenRootServiceManager = (() => {
  function create(config) {
    const startedAt = config.startedAt;
    const services = [
      { name: "bootloader", status: "sleeping", pid: 1, description: "Initializes OpenRoot OS boot sequence." },
      { name: "content-filesystem", status: "running", pid: 2, description: "Mounts virtual content filesystem." },
      { name: "openroot-shell", status: "running", pid: 3, aliases: ["shell"], description: "Interactive command shell." },
      { name: "plugin-manager", status: "running", pid: 4, description: "Registers and dispatches commands." },
      { name: "service-manager", status: "running", pid: 5, description: "Tracks background daemons." },
      { name: "nonroot-gateway", status: "standby", pid: 6, description: "Guided button-based interface." },
      { name: "theme-engine", status: "running", pid: 7, description: "Switches terminal visual profiles." },
      { name: "github-sync", status: "mocked", pid: 8, description: "Future GitHub API integration." },
      { name: "search-index", status: "running", pid: 9, description: "Searches content files." }
    ];

    const journal = [
      { unit: "bootloader", message: "initialized boot sequence" },
      { unit: "content-filesystem", message: "mounted compact sidebar tree" },
      { unit: "plugin-manager", message: "registered filesystem git system fun navigation services" },
      { unit: "service-manager", message: "started service registry" },
      { unit: "openroot-shell", message: "shell ready" },
      { unit: "theme-engine", message: "registered 13 themes" },
      { unit: "nonroot-gateway", message: "standby" },
      { unit: "search-index", message: "indexed virtual files" },
      { unit: "github-sync", message: "mock mode active" }
    ];

    function uptime() {
      return Math.floor((Date.now() - startedAt) / 1000);
    }

    function list() {
      return services;
    }

    function find(name) {
      return services.find(s => s.name === name || (s.aliases || []).includes(name));
    }

    function status(name) {
      const service = find(name);
      if (!service) return null;
      return { ...service, uptime: uptime() };
    }

    function logs(unit) {
      return unit ? journal.filter(entry => entry.unit === unit || find(unit)?.name === entry.unit) : journal;
    }

    return { list, status, logs, uptime };
  }

  return { create };
})();
