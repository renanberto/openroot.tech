window.OpenRootUI = (() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    bootText: $("bootText"),
    boot: $("boot"),
    tui: $("tui"),
    nonroot: $("nonroot"),
    output: $("output"),
    terminalPanel: $("terminalPanel"),
    form: null,
    input: null,
    pathLabel: null,
    treeView: $("treeView"),
    releaseLabel: $("releaseLabel"),
    contentTitle: $("contentTitle"),
    contentCard: $("contentCard"),
    clock: $("clock"),
    simpleOutput: $("simpleOutput"),
    backToTerminal: $("backToTerminal")
  };

  function scrollTerminal() {
    if (!el.output) return;
    el.output.scrollTop = el.output.scrollHeight;
  }

  function createPrompt(pathText = "~") {
    const line = document.createElement("form");
    line.id = "commandForm";
    line.className = "input-line terminal-current";
    line.autocomplete = "off";

    const user = document.createElement("span");
    user.className = "user";
    user.textContent = "visitor@openroot";

    const path = document.createElement("span");
    path.id = "pathLabel";
    path.className = "path";
    path.textContent = ":" + pathText + "$";

    const input = document.createElement("input");
    input.id = "commandInput";
    input.type = "text";
    input.setAttribute("aria-label", "Terminal command input");
    input.spellcheck = false;
    input.autofocus = true;

    line.appendChild(user);
    line.appendChild(path);
    line.appendChild(input);

    el.output.appendChild(line);
    el.form = line;
    el.input = input;
    el.pathLabel = path;

    setTimeout(() => {
      input.focus();
      scrollTerminal();
    }, 0);

    return line;
  }

  function freezePrompt(commandText) {
    if (!el.form) return;
    const frozen = document.createElement("div");
    frozen.className = "terminal-line command";
    const prompt = el.pathLabel ? el.pathLabel.textContent : ":~$";
    frozen.textContent = "visitor@openroot" + prompt + " " + commandText;

    el.output.replaceChild(frozen, el.form);
    el.form = null;
    el.input = null;
    el.pathLabel = null;
  }

  function print(text, cls = "") {
    const div = document.createElement("div");
    div.className = `terminal-result block ${cls}`.trim();
    div.textContent = text;
    el.output.appendChild(div);
    scrollTerminal();
  }

  function setPrompt(path) {
    if (el.pathLabel) {
      el.pathLabel.textContent = ":" + path + "$";
    }
  }

  function showFile(title, html) {
    el.contentTitle.textContent = title;
    el.contentCard.innerHTML = html;
  }

  function openNonroot() {
    el.tui.classList.add("hidden");
    el.nonroot.classList.remove("hidden");
    if (el.simpleOutput) el.simpleOutput.textContent = "Pick a card above. I will show the content here without requiring terminal commands.";
    el.nonroot.scrollTop = 0;
  }

  function closeNonroot() {
    el.nonroot.classList.add("hidden");
    el.tui.classList.remove("hidden");
    if (el.input) el.input.focus();
  }

  function updateClock() {
    el.clock.textContent = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  function clearTerminal() {
    el.output.innerHTML = "";
  }

  return {
    el,
    print,
    setPrompt,
    showFile,
    openNonroot,
    closeNonroot,
    updateClock,
    createPrompt,
    freezePrompt,
    scrollTerminal,
    clearTerminal
  };
})();
