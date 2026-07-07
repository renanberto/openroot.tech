import { createOpenRoot } from "@openroot/core";
import { VirtualFileSystem } from "@openroot/filesystem";
import { ShellRuntime } from "@openroot/shell";
import { renderTerminal } from "@openroot/terminal";
import { renderInspector } from "@openroot/profile";
import { createFilesystemPlugin } from "@openroot/plugin-filesystem";
import { createPortfolioPlugin } from "@openroot/plugin-portfolio";
import { createFunPlugin } from "@openroot/plugin-fun";
import { createSystemPlugin } from "@openroot/plugin-system";
import { openRootTheme } from "@openroot/theme-openroot";
import { knowledge, graph } from "./content";
import "./styles.css";

const appElement = document.querySelector<HTMLDivElement>("#app");
if (!appElement) throw new Error("Missing #app");
const app = appElement;

const fs = new VirtualFileSystem(knowledge);

const runtime = createOpenRoot({
  appId: "renanberto",
  version: "OpenRoot OS Release 5 / PROD",
  defaultMode: "profile"
});

runtime.registerTheme(openRootTheme);
runtime.registerPlugin(createFilesystemPlugin(fs));
runtime.registerPlugin(createPortfolioPlugin(fs));
runtime.registerPlugin(createSystemPlugin());
runtime.registerPlugin(createFunPlugin());

const shell = new ShellRuntime(runtime.commands, {
  fs,
  commands: runtime.commands,
  setMode: runtime.setMode,
  getGraph: () => graph,
  emit: runtime.events.emit.bind(runtime.events)
});

type InspectorView =
  | "profile"
  | "tour"
  | "projects"
  | "skills"
  | "experience"
  | "certifications"
  | "articles"
  | "gallery"
  | "architecture"
  | "cases"
  | "downloads"
  | "contact"
  | "system";
type FsNode = {
  id: string;
  label: string;
  icon: string;
  type: "folder" | "file";
  command?: string;
  view: InspectorView;
  meta?: string;
  children?: FsNode[];
};

let currentInspectorView: InspectorView = "profile";
let terminalApi: { runCommand(command: string): Promise<void>; focus(): void; clear(): void } | null = null;
let inspectorView: { destroy(): void } | null = null;
let activeNodeId = "profile/home";
let activePath = "/profile/home";
let fsQuery = "";
let paletteQuery = "";
let commandPaletteOpen = false;
let documentEventsWired = false;
let filesystemWidth = Number(localStorage.getItem("openroot.fs.width") ?? "320");
let inspectorWidth = Number(localStorage.getItem("openroot.inspector.width") ?? "500");
let expandedFolders = new Set<string>(JSON.parse(localStorage.getItem("openroot.fs.expanded") ?? "[\"profile\",\"skills\",\"projects\",\"system\"]"));
let favorites = new Set<string>(JSON.parse(localStorage.getItem("openroot.favorites") ?? "[\"profile/home\",\"projects/openroot\",\"professional/architecture\"]"));

const recruiterViews = new Set<InspectorView>(["profile", "projects", "skills", "contact"]);

function inspectorViewFor(view: InspectorView): InspectorView | undefined {
  return recruiterViews.has(view) ? view : undefined;
}

const fsTree: FsNode[] = [
  {
    id: "profile",
    label: "profile",
    icon: "folder",
    type: "folder",
    view: "profile",
    meta: "person",
    children: [
      { id: "profile/home", label: "home.profile", icon: "profile", type: "file", view: "profile", command: "whoami", meta: "summary" },
      { id: "profile/about", label: "about.renan", icon: "home", type: "file", view: "profile", command: "cat /profile", meta: "whoami" },
      { id: "profile/resume", label: "resume.info", icon: "resume", type: "file", view: "profile", command: "resume", meta: "cv" },
      { id: "profile/contact", label: "contact.card", icon: "contact", type: "file", view: "contact", command: "contact", meta: "email" }
    ]
  },
  {
    id: "skills",
    label: "skills",
    icon: "folder",
    type: "folder",
    view: "skills",
    meta: "matrix",
    children: [
      { id: "skills/software", label: "software.engineering", icon: "backend", type: "file", view: "skills", command: "skills --dev", meta: "code" },
      { id: "skills/platform", label: "platform.devops", icon: "devops", type: "file", view: "skills", command: "skills --devops", meta: "aws/k8s" },
      { id: "skills/ai", label: "ai.engineering", icon: "ai", type: "file", view: "skills", command: "skills --ai", meta: "agents" }
    ]
  },
  {
    id: "projects",
    label: "projects",
    icon: "folder",
    type: "folder",
    view: "projects",
    meta: "proof",
    children: [
      { id: "projects/waf", label: "waf.hardening", icon: "security", type: "file", view: "projects", command: "project waf", meta: "security" },
      { id: "projects/bemod", label: "bemod.ai-router", icon: "ai", type: "file", view: "projects", command: "project bemod", meta: "llm" },
      { id: "projects/jira", label: "jira.rag-bot", icon: "rag", type: "file", view: "projects", command: "project jira-ai", meta: "rag" },
      { id: "projects/openroot", label: "openroot.os", icon: "openroot", type: "file", view: "projects", command: "project openroot", meta: "this" }
    ]
  },
  {
    id: "professional",
    label: "professional",
    icon: "folder",
    type: "folder",
    view: "experience",
    meta: "content",
    children: [
      { id: "professional/experience", label: "experience.map", icon: "resume", type: "file", view: "experience", command: "cat /experience", meta: "roles" },
      { id: "professional/certifications", label: "certifications", icon: "docs", type: "file", view: "certifications", command: "cat /certifications", meta: "signals" },
      { id: "professional/articles", label: "articles", icon: "docs", type: "file", view: "articles", command: "cat /articles", meta: "writing" },
      { id: "professional/gallery", label: "gallery", icon: "graph", type: "file", view: "gallery", command: "cat /gallery", meta: "visuals" },
      { id: "professional/architecture", label: "architecture", icon: "system", type: "file", view: "architecture", command: "cat /architecture", meta: "system" },
      { id: "professional/case-studies", label: "case.studies", icon: "project", type: "file", view: "cases", command: "cat /case-studies", meta: "proof" },
      { id: "professional/downloads", label: "downloads", icon: "pdf", type: "file", view: "downloads", command: "cat /downloads", meta: "static" }
    ]
  },
  {
    id: "system",
    label: "system",
    icon: "folder",
    type: "folder",
    view: "system",
    meta: "runtime",
    children: [
      { id: "system/docs", label: "runtime.docs", icon: "docs", type: "file", view: "system", command: "tree /", meta: "docs" },
      { id: "system/theme", label: "theme.config", icon: "theme", type: "file", view: "system", command: "theme list", meta: "ui" }
    ]
  }
];

function icon(name: string, label = "") {
  return `<img class="ui-icon" src="/assets/icons/${name}.svg" alt="" aria-hidden="true" />${label ? `<span>${label}</span>` : ""}`;
}

function saveExpanded() {
  localStorage.setItem("openroot.fs.expanded", JSON.stringify([...expandedFolders]));
}

function saveFavorites() {
  localStorage.setItem("openroot.favorites", JSON.stringify([...favorites]));
}

function saveSession() {
  localStorage.setItem("openroot.session", JSON.stringify({ activeNodeId, activePath, currentInspectorView }));
}

function flatten(nodes: FsNode[], parents: string[] = []): Array<FsNode & { path: string; parents: string[] }> {
  return nodes.flatMap((node) => {
    const path = `/${node.id}`;
    const item = { ...node, path, parents };
    return [item, ...(node.children ? flatten(node.children, [...parents, node.id]) : [])];
  });
}

function breadcrumb() {
  const parts = activePath.split("/").filter(Boolean);
  return `<div class="breadcrumb" aria-label="Breadcrumb"><span>/</span>${parts.map((part, index) => `<button data-breadcrumb-index="${index}">${part}</button>`).join("<i>/</i>")}</div>`;
}

function matches(node: FsNode) {
  if (!fsQuery.trim()) return true;
  const token = fsQuery.toLowerCase();
  return `${node.label} ${node.meta ?? ""} ${node.command ?? ""}`.toLowerCase().includes(token);
}

function subtreeMatches(node: FsNode): boolean {
  return matches(node) || Boolean(node.children?.some(subtreeMatches));
}

function renderFsNodes(nodes: FsNode[], depth = 0): string {
  return nodes
    .filter(subtreeMatches)
    .map((node) => {
      const isFolder = node.type === "folder";
      const isExpanded = expandedFolders.has(node.id) || Boolean(fsQuery.trim());
      const isActive = activeNodeId === node.id;
      const isFavorite = favorites.has(node.id);
      const visibleChildren = node.children && isExpanded ? renderFsNodes(node.children, depth + 1) : "";
      const twist = isFolder ? `<span class="twisty">${isExpanded ? "v" : ">"}</span>` : `<span class="twisty file-dot">-</span>`;
      return `
        <div class="fs-node-wrap">
          <button class="fs-node ${isFolder ? "is-folder" : "is-file"} ${isExpanded ? "is-open" : ""} ${isActive ? "active" : ""}" style="--depth:${depth}" data-node-id="${node.id}" data-node-type="${node.type}" data-inspector-view="${node.view}" data-fs-command="${node.command ?? ""}">
            ${twist}${icon(node.icon, node.label)}<small>${node.meta ?? ""}</small>
          </button>
          <button class="favorite-toggle ${isFavorite ? "active" : ""}" data-favorite-node="${node.id}" title="${isFavorite ? "Remove favorite" : "Add favorite"}">${isFavorite ? "★" : "☆"}</button>
          ${visibleChildren}
        </div>
      `;
    })
    .join("");
}

function fileTree() {
  const count = flatten(fsTree).filter((node) => node.type === "file").length;
  const favoriteNodes = [...favorites]
    .map((id) => flatten(fsTree).find((node) => node.id === id))
    .filter(Boolean) as Array<FsNode & { path: string; parents: string[] }>;
  return `
    <div class="fs-search">
      <img class="ui-icon" src="/assets/icons/file.svg" alt="" aria-hidden="true" />
      <input data-fs-search value="${fsQuery}" placeholder="Search filesystem..." aria-label="Search filesystem" />
      <span>${count}</span>
    </div>
    <div class="favorite-strip" aria-label="Favorites">
      ${favoriteNodes.map((node) => `<button data-favorite-open="${node.id}">${icon(node.icon, node.label)}</button>`).join("") || "<span>No favorites</span>"}
    </div>
    <div class="fs-actions">
      <button data-fs-action="expand">Expand all</button>
      <button data-fs-action="collapse">Collapse all</button>
      <button data-fs-command="pwd" data-inspector-view="system">pwd</button>
      <button data-fs-command="tree /" data-inspector-view="system">tree</button>
    </div>
    <div class="fs-root" role="tree">${renderFsNodes(fsTree)}</div>
  `;
}

function renderInspectorPanel() {
  const inspector = document.querySelector<HTMLElement>("#inspector-panel");
  if (!inspector) return;
  inspectorView?.destroy();
  inspectorView = renderInspector(inspector, fs, {
    compact: true,
    title: "INSPECTOR SHELL",
    view: inspectorViewFor(currentInspectorView) ?? "profile",
    path: activePath
  } as any);
}

async function run(command: string, view?: InspectorView, printToTerminal = true) {
  const nextView = view ? inspectorViewFor(view) : undefined;
  if (nextView) currentInspectorView = nextView;
  renderInspectorPanel();
  if (printToTerminal && command) await terminalApi?.runCommand(command);
}

function setActiveNode(id: string) {
  const found = flatten(fsTree).find((node) => node.id === id);
  if (!found) return;
  activeNodeId = found.id;
  activePath = found.path;
  currentInspectorView = inspectorViewFor(found.view) ?? currentInspectorView;
  found.parents.forEach((parent) => expandedFolders.add(parent));
  saveExpanded();
  saveSession();
}

function showContextMenu(x: number, y: number, node: FsNode) {
  document.querySelector(".context-menu")?.remove();
  const menu = document.createElement("div");
  menu.className = "context-menu";
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  menu.innerHTML = `
    <button data-context-action="open">Open</button>
    <button data-context-action="terminal">Open in Terminal</button>
    <button data-context-action="copy">Copy Path</button>
    <button data-context-action="reveal">Reveal in Inspector</button>
    <button data-context-action="favorite">${favorites.has(node.id) ? "Remove Favorite" : "Add Favorite"}</button>
    <hr />
    <button data-context-action="expand">Expand all</button>
    <button data-context-action="collapse">Collapse all</button>
  `;
  document.body.appendChild(menu);
  menu.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.contextAction;
      if (action === "open") {
        setActiveNode(node.id);
        render();
        await run(node.command ?? "pwd", node.view, true);
      }
      if (action === "terminal") await run(node.command ?? `cd /${node.id}`, node.view, true);
      if (action === "copy") await navigator.clipboard?.writeText(`/${node.id}`);
      if (action === "reveal") {
        setActiveNode(node.id);
        render();
      }
      if (action === "favorite") {
        favorites.has(node.id) ? favorites.delete(node.id) : favorites.add(node.id);
        saveFavorites();
        render();
      }
      if (action === "expand") {
        flatten(fsTree).filter((item) => item.type === "folder").forEach((item) => expandedFolders.add(item.id));
        saveExpanded();
        render();
      }
      if (action === "collapse") {
        expandedFolders = new Set([node.id.split("/")[0]]);
        saveExpanded();
        render();
      }
      menu.remove();
    });
  });
}

function wireFilesystemResize() {
  const handle = document.querySelector<HTMLElement>(".fs-resize-handle");
  if (!handle) return;
  let startX = 0;
  let startWidth = filesystemWidth;
  const move = (event: MouseEvent) => {
    const next = Math.min(560, Math.max(230, startWidth + event.clientX - startX));
    filesystemWidth = next;
    document.documentElement.style.setProperty("--fs-width", `${next}px`);
  };
  const stop = () => {
    localStorage.setItem("openroot.fs.width", String(filesystemWidth));
    document.body.classList.remove("is-resizing");
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
  };
  handle.addEventListener("mousedown", (event) => {
    startX = event.clientX;
    startWidth = filesystemWidth;
    document.body.classList.add("is-resizing");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  });
  handle.addEventListener("dblclick", () => {
    filesystemWidth = 320;
    localStorage.setItem("openroot.fs.width", "320");
    document.documentElement.style.setProperty("--fs-width", "320px");
  });
}

function wireInspectorResize() {
  const handle = document.querySelector<HTMLElement>(".inspector-resize-handle");
  if (!handle) return;
  let startX = 0;
  let startWidth = inspectorWidth;
  const move = (event: MouseEvent) => {
    const next = Math.min(760, Math.max(320, startWidth - (event.clientX - startX)));
    inspectorWidth = next;
    document.documentElement.style.setProperty("--inspector-width", `${next}px`);
  };
  const stop = () => {
    localStorage.setItem("openroot.inspector.width", String(inspectorWidth));
    document.body.classList.remove("is-resizing-inspector");
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
  };
  handle.addEventListener("mousedown", (event) => {
    startX = event.clientX;
    startWidth = inspectorWidth;
    document.body.classList.add("is-resizing-inspector");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  });
  handle.addEventListener("dblclick", () => {
    inspectorWidth = 500;
    localStorage.setItem("openroot.inspector.width", "500");
    document.documentElement.style.setProperty("--inspector-width", "500px");
  });
}

function focusInputAtEnd(selector: string) {
  const input = document.querySelector<HTMLInputElement>(selector);
  if (!input) return;
  input.focus();
  const end = input.value.length;
  input.setSelectionRange(end, end);
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem("openroot.session") ?? "{}");
    if (typeof saved.activeNodeId === "string" && flatten(fsTree).some((node) => node.id === saved.activeNodeId)) {
      activeNodeId = saved.activeNodeId;
      activePath = saved.activePath ?? activePath;
      currentInspectorView = inspectorViewFor(saved.currentInspectorView ?? currentInspectorView) ?? "profile";
    }
  } catch {
    saveSession();
  }
}

function wireGlobalKeyboard() {
  if (documentEventsWired) return;
  documentEventsWired = true;
  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement | null;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      commandPaletteOpen = !commandPaletteOpen;
      paletteQuery = "";
      render();
      return;
    }
    if (event.key === "Escape" && commandPaletteOpen) {
      commandPaletteOpen = false;
      render();
      return;
    }
    if (event.altKey && event.key >= "1" && event.key <= "7") {
      event.preventDefault();
      const views: InspectorView[] = ["profile", "projects", "skills", "contact"];
      currentInspectorView = views[Number(event.key) - 1] ?? currentInspectorView;
      saveSession();
      renderInspectorPanel();
      return;
    }
    if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    terminalApi?.focus();
  });
}


const paletteCommands = [
  { label: "Open Profile", command: "whoami", view: "profile" as InspectorView, hint: "summary" },
  { label: "Open Projects", command: "projects", view: "projects" as InspectorView, hint: "proof" },
  { label: "Open Skills", command: "skills", view: "skills" as InspectorView, hint: "matrix" },
  { label: "Open Contact", command: "contact", view: "contact" as InspectorView, hint: "connect" },
  { label: "Search Kubernetes", command: "graph Kubernetes", view: "skills" as InspectorView, hint: "knowledge" },
  { label: "Search AWS", command: "graph AWS", view: "projects" as InspectorView, hint: "knowledge" },
  { label: "Desktop Status", command: "desktop", view: "profile" as InspectorView, hint: "terminal" },
  { label: "Open GitHub", command: "open github", view: "contact" as InspectorView, hint: "external" },
  { label: "Open LinkedIn", command: "open linkedin", view: "contact" as InspectorView, hint: "external" },
  { label: "Clear Terminal", command: "clear", view: "system" as InspectorView, hint: "system" }
];

function commandPalette() {
  if (!commandPaletteOpen) return "";
  const token = paletteQuery.trim().toLowerCase();
  const items = paletteCommands.filter((item) => !token || `${item.label} ${item.command} ${item.hint}`.toLowerCase().includes(token));
  return `
    <div class="palette-backdrop" data-close-palette>
      <section class="command-palette" role="dialog" aria-label="Command palette">
        <header>
          <span>&gt;</span>
          <input data-palette-search value="${paletteQuery}" placeholder="Search commands, files, projects, skills..." autofocus />
        </header>
        <div class="palette-results">
          ${items.map((item, index) => `
            <button data-palette-command="${item.command}" data-palette-view="${item.view}" class="${index === 0 ? "active" : ""}">
              <strong>${item.label}</strong>
              <span>${item.command}</span>
              <small>${item.hint}</small>
            </button>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function render() {
  document.documentElement.style.setProperty("--fs-width", `${filesystemWidth}px`);
  document.documentElement.style.setProperty("--inspector-width", `${inspectorWidth}px`);
  app.innerHTML = `
    <main class="deck">
      <header class="topbar">
        <div class="brand">
          <span class="logo">&gt;_</span>
          <strong>OpenRoot OS</strong>
          <em>OS Release 5</em>
        </div>

        ${breadcrumb()}

        <div class="top-actions">
          <strong class="online">ONLINE</strong>
          <button class="palette-badge" data-command-palette title="Command Palette">CTRL K</button>
          <span>THEME</span>
          <select aria-label="Theme" data-theme-select>
            <option value="catppuccin">CATPPUCCIN</option>
            <option value="matrix">MATRIX</option>
            <option value="nord">NORD</option>
            <option value="dracula">DRACULA</option>
          </select>
          <button data-command-shortcut="open github">${icon("github", "GitHub")}</button>
          <button data-command-shortcut="open linkedin">${icon("linkedin", "LinkedIn")}</button>
          <button data-command-shortcut="open email">${icon("email", "Email")}</button>
        </div>
      </header>

      <section class="deck-body">
        <aside class="filesystem panel">
          <div class="panel-title"><span>${icon("folder", "FILESYSTEM")}</span><strong>${activePath}</strong></div>
          ${fileTree()}
          <div class="mount compact-mount">
            <h3>${icon("root", "MOUNT STATUS")}</h3>
            <p><span>root</span><code>/</code><b>rw</b><i></i></p>
            <p><span>portfolio</span><code>/profile</code><b>ro</b><i></i></p>
          </div>
        </aside>
        <div class="fs-resize-handle" aria-label="Resize filesystem panel" role="separator"></div>
        <section id="terminal-panel" class="terminal-panel"></section>
        <div class="inspector-resize-handle" aria-label="Resize inspector panel" role="separator"></div>
        <aside id="inspector-panel" class="inspector panel"></aside>
      </section>

      ${commandPalette()}

      <footer class="statusbar">
        <span>OpenRoot OS Release 5</span>
        <span>PANEL: ${currentInspectorView.toUpperCase()}</span>
        <span>PATH: ${activePath}</span>
        <span>STATIC: GITHUB PAGES</span>
        <span>FS: RESIZABLE</span>
        <span>SEARCH: READY</span>
        <span>R5: OPENROOT OS</span>
      </footer>
    </main>
  `;

  const terminal = document.querySelector<HTMLElement>("#terminal-panel");
  if (!terminal) throw new Error("Missing terminal panel");

  terminalApi = renderTerminal(terminal, shell, { compact: true }) as any;
  terminal.addEventListener("pointerdown", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("button, a, input, select, textarea")) {
      terminalApi?.focus();
    }
  });
  wireGlobalKeyboard();
  renderInspectorPanel();
  wireFilesystemResize();
  wireInspectorResize();

  document.querySelectorAll<HTMLButtonElement>("[data-command-shortcut]").forEach((button) => {
    button.addEventListener("click", () => run(button.dataset.commandShortcut ?? "help", undefined, true));
  });

  document.querySelectorAll<HTMLButtonElement>("[data-node-id]").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.nodeId ?? "";
      const type = item.dataset.nodeType;
      if (type === "folder") {
        expandedFolders.has(id) ? expandedFolders.delete(id) : expandedFolders.add(id);
        saveExpanded();
      }
      setActiveNode(id);
      render();
      run(item.dataset.fsCommand ?? "", item.dataset.inspectorView as InspectorView | undefined, Boolean(item.dataset.fsCommand));
    });

    item.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const node = flatten(fsTree).find((candidate) => candidate.id === item.dataset.nodeId);
      if (node) showContextMenu(event.clientX, event.clientY, node);
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-favorite-node]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = button.dataset.favoriteNode ?? "";
      favorites.has(id) ? favorites.delete(id) : favorites.add(id);
      saveFavorites();
      render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-favorite-open]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveNode(button.dataset.favoriteOpen ?? "profile/home");
      render();
      const found = flatten(fsTree).find((node) => node.id === activeNodeId);
      run(found?.command ?? "", found?.view, Boolean(found?.command));
    });
  });

  document.querySelector<HTMLInputElement>("[data-fs-search]")?.addEventListener("input", (event) => {
    fsQuery = (event.target as HTMLInputElement).value;
    render();
    focusInputAtEnd("[data-fs-search]");
  });

  document.querySelectorAll<HTMLButtonElement>("[data-fs-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.fsAction === "expand") flatten(fsTree).filter((item) => item.type === "folder").forEach((item) => expandedFolders.add(item.id));
      if (button.dataset.fsAction === "collapse") expandedFolders = new Set();
      saveExpanded();
      render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-fs-command]").forEach((item) => {
    item.addEventListener("click", () => run(item.dataset.fsCommand ?? "help", item.dataset.inspectorView as InspectorView | undefined, true));
  });

  document.querySelector<HTMLSelectElement>("[data-theme-select]")?.addEventListener("change", (event) => {
    const value = (event.target as HTMLSelectElement).value;
    document.documentElement.dataset.theme = value;
    run(`theme set ${value}`, "system", true);
  });

  document.querySelector<HTMLButtonElement>("[data-command-palette]")?.addEventListener("click", () => {
    commandPaletteOpen = true;
    paletteQuery = "";
    render();
  });

  document.querySelector<HTMLInputElement>("[data-palette-search]")?.addEventListener("input", (event) => {
    paletteQuery = (event.target as HTMLInputElement).value;
    render();
    focusInputAtEnd("[data-palette-search]");
  });

  document.querySelector<HTMLInputElement>("[data-palette-search]")?.focus();

  document.querySelectorAll<HTMLButtonElement>("[data-palette-command]").forEach((button) => {
    button.addEventListener("click", () => {
      commandPaletteOpen = false;
      paletteQuery = "";
      render();
      run(button.dataset.paletteCommand ?? "help", button.dataset.paletteView as InspectorView | undefined, true);
    });
  });

  document.querySelector<HTMLElement>("[data-close-palette]")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      commandPaletteOpen = false;
      render();
    }
  });

  document.addEventListener("click", (event) => {
    if (!(event.target as HTMLElement).closest(".context-menu")) document.querySelector(".context-menu")?.remove();
  }, { once: true });
}

function showBoot() {
  app.innerHTML = `
    <section class="boot">
      <div>
        <pre>${openRootTheme.ascii}</pre>
        <p>Booting OpenRoot OS Release 5...</p>
      </div>
    </section>
  `;
}

showBoot();
setTimeout(() => {
  runtime.boot();
  restoreSession();
  render();
}, 400);

/* OS Release 5 production baseline: recruiter-focused inspector, terminal-first OS commands, desktop command layer, simplified controls and fixed right sidebar header. */
