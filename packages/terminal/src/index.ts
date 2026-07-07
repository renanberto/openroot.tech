import type { ShellRuntime } from "@openroot/shell";

const starters = ["help"];

interface TerminalOptions {
  compact?: boolean;
}

export function renderTerminal(target: HTMLElement, shell: ShellRuntime, options: TerminalOptions = {}) {
  target.innerHTML = "";

  const root = document.createElement("section");
  root.className = "terminal-window";

  root.innerHTML = `
    <header class="terminal-tabs">
      <span class="tab active">root@openroot:~</span>
      <span class="tab muted">+</span>
    </header>

    <div class="terminal-quick">
      ${starters.map((cmd) => `<button type="button" data-command="${cmd}">${cmd}</button>`).join("")}
    </div>

    <div class="or-transcript"></div>
  `;

  target.appendChild(root);

  const transcriptElement = root.querySelector<HTMLDivElement>(".or-transcript");
  if (!transcriptElement) throw new Error("Missing terminal transcript");
  const transcript = transcriptElement;

  function focusInput() {
    transcript.querySelector<HTMLInputElement>("input")?.focus();
  }

  root.addEventListener("pointerdown", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("button, a, input, select, textarea")) {
      window.requestAnimationFrame(focusInput);
    }
  });

  function promptLabel() {
    const state = shell.getState?.() ?? { cwd: "/" };
    const cwd = state.cwd === "/" ? "~" : state.cwd;
    return `root@openroot:${cwd}#`;
  }

  function line(text: string, className = "or-line") {
    const element = document.createElement("pre");
    element.className = className;
    element.textContent = text;
    transcript.appendChild(element);
    transcript.scrollTop = transcript.scrollHeight;
  }

  async function run(value: string) {
    const command = value.trim();
    if (!command) {
      prompt();
      return;
    }

    line(`${promptLabel()} ${command}`, "or-line or-command");

    if (command === "clear") {
      transcript.innerHTML = "";
      prompt();
      return;
    }

    const result = await shell.execute(command);
    if (result.output) line(result.output, "or-line or-output");
    prompt();
  }

  function prompt() {
    transcript.querySelector("form")?.remove();
    const form = document.createElement("form");
    form.className = "or-prompt";
    form.innerHTML = `<span>${promptLabel()}&nbsp;</span><input aria-label="OpenRoot command" autocomplete="off" spellcheck="false" />`;
    transcript.appendChild(form);

    const input = form.querySelector("input");
    if (!input) return;

    input.focus();
    let historyIndex = shell.getHistory().length;

    input.addEventListener("keydown", (event) => {
      const history = shell.getHistory();

      if (event.ctrlKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        transcript.innerHTML = "";
        prompt();
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        form.remove();
        line("^C", "or-line or-command");
        prompt();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const current = input.value.trim();
        const matches = shell.complete(current);
        if (matches.length === 1) input.value = matches[0];
        if (matches.length > 1) line(matches.join("  "), "or-line or-output");
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] ?? input.value;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] ?? "";
      }
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = input.value;
      form.remove();
      await run(value);
    });
  }

  root.querySelectorAll<HTMLButtonElement>("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      transcript.querySelector("form")?.remove();
      run(button.dataset.command ?? "help");
    });
  });

  line("root@openroot:~# help", "or-line or-command");
  line(`Navigation
  cd folder             Change directory
  ls folder             List files and directories
  pwd                  Print working directory
  cat [file]           Display file content
  tree folder           Show directory tree

Profile
  whoami               Who am I?
  resume               Show my resume
  skills --ai          Show AI skills
  project [id]         Show project details
  viewer projects      Open viewer guidance
  architecture         Show architecture layers
  shortcuts            Show keyboard shortcuts
  favorites            Show favorite entry points
  desktop              Show OS desktop summary
  apps                 List OS applications
  dock                 Show dock commands
  notifications        Show runtime notifications
  widgets              List desktop widgets
  settings             Show runtime settings
  tour                 Start interactive tour

Open / Connect
  open github          Open GitHub profile
  open linkedin        Open LinkedIn profile
  open email           Open email client

System
  clear                Clear terminal
  history              Show command history
  aliases              Show command aliases
  theme list           List available themes
  theme set [name]     Set theme`, "or-line or-output");
  line("root@openroot:~# ls", "or-line or-command");
  line("home  skills  projects  contact  docs  .config", "or-line or-output");
  line("root@openroot:~# whoami", "or-line or-command");
  line("Renan Berto\nSoftware Engineer • DevOps Engineer • AI Builder\n10+ years building scalable systems and developer tools.\nBrazil / Remote • Available for global opportunities", "or-line or-card");
  prompt();

  return {
    async runCommand(command: string) {
      transcript.querySelector("form")?.remove();
      await run(command);
    },
    focus() {
      const input = transcript.querySelector<HTMLInputElement>("input");
      focusInput();
    },
    clear() {
      transcript.innerHTML = "";
      prompt();
    },
    destroy() {
      target.innerHTML = "";
    }
  };
}
