window.OpenRootUI = (() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    bootText: $("bootText"),
    boot: $("boot"),
    tui: $("tui"),
    nonroot: $("nonroot"),
    output: $("output"),
    form: $("commandForm"),
    input: $("commandInput"),
    pathLabel: $("pathLabel"),
    treeView: $("treeView"),
    contentTitle: $("contentTitle"),
    contentCard: $("contentCard"),
    clock: $("clock"),
    simpleOutput: $("simpleOutput"),
    backToTerminal: $("backToTerminal")
  };

  function print(text, cls = "") {
    const div = document.createElement("div");
    div.className = `block ${cls}`.trim();
    div.textContent = text;
    el.output.appendChild(div);
    el.output.scrollTop = el.output.scrollHeight;
  }

  function setPrompt(path) {
    el.pathLabel.textContent = ":" + path + "$";
  }

  function showFile(title, html) {
    el.contentTitle.textContent = title;
    el.contentCard.innerHTML = html;
  }

  function openNonroot() {
    el.tui.classList.add("hidden");
    el.nonroot.classList.remove("hidden");
    el.simpleOutput.textContent = "Choose a card above. The shell keeps running underneath.";
    el.nonroot.scrollTop = 0;
  }

  function closeNonroot() {
    el.nonroot.classList.add("hidden");
    el.tui.classList.remove("hidden");
    el.input.focus();
  }

  function updateClock() {
    el.clock.textContent = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  return { el, print, setPrompt, showFile, openNonroot, closeNonroot, updateClock };
})();
