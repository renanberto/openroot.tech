function triggerIntrusionAlert() {
  const existing = document.querySelector(".intrusion-alert");
  if (existing) existing.remove();

  const layer = document.createElement("div");
  layer.className = "intrusion-alert";
  layer.innerHTML = `<div class="intrusion-box"><strong>INTRUSION ALERT</strong><span>fake ssh breach simulation · access granted to localhost</span></div>`;
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 2900);
}

window.OpenRootFunPlugin = {
  name: "fun",
  description: "Small easter eggs and terminal atmosphere.",
  commands: [
    {
      name: "fortune",
      description: "Print a small proverb.",
      run: (_, __, ctx) => {
        const list = ctx.content.fortunes;
        return list[Math.floor(Math.random() * list.length)];
      }
    },
    { name: "coffee", description: "Load caffeine.", run: () => "☕ caffeine loaded\nservice: human-runtime\nstatus: slightly more operational" },
    {
      name: "matrix",
      description: "Start temporary matrix overlay.",
      run: () => {
        const layer = document.createElement("div");
        layer.className = "matrix-layer";
        const chars = "01 openroot cloud linux aws kube root shell ";
        const cols = Math.floor(window.innerWidth / 22);
        for (let i = 0; i < cols; i++) {
          const col = document.createElement("div");
          col.className = "matrix-col";
          col.style.left = `${i * 22}px`;
          col.style.animationDuration = `${1.4 + Math.random() * 1.8}s`;
          let txt = "";
          for (let j = 0; j < 80; j++) txt += chars[Math.floor(Math.random() * chars.length)] + "\n";
          col.textContent = txt;
          layer.appendChild(col);
        }
        document.body.appendChild(layer);
        setTimeout(() => layer.remove(), 2400);
        return "matrix layer started";
      }
    },
    {
      name: "ssh",
      description: "Fake SSH handshake.",
      usage: "ssh openroot.tech",
      run: (arg) => {
        if (arg !== "openroot.tech") return "ssh: usage ssh openroot.tech";
        triggerIntrusionAlert();
        return `OpenSSH_9.7p1 OpenRootOS_Release_0.1.6

Connecting to openroot.tech [127.0.0.1] port 22...
Connection established.
Authenticating visitor using public key...
Fingerprint SHA256:OPENROOT01 accepted.
PTY allocation request accepted.
Mounting remote filesystem...
Loading /etc/motd...

Welcome to openroot.tech Release 0.1.

remote: already mounted locally
session: interactive shell available
hint: try "cat /etc/profile" or "ls /usr/projects"`;
      }
    }
  ],
  completions() { return ["fortune", "coffee", "matrix", "ssh openroot.tech"]; }
};
