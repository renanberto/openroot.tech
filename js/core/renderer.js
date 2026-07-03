window.OpenRootRenderer = (() => {
  function markdownToHTML(body) {
    const escaped = body.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    const withComponents = escaped.replace(
      /\[\[bio-hero\]\]/g,
      `<div class="bio-hero"><div class="bio-photo" role="img" aria-label="Profile photo placeholder"></div><div><p class="bio-kicker">portfolio identity</p><div class="bio-title">Renan Berto</div><p class="bio-lead">DevOps Engineer focused on cloud infrastructure, Linux systems, automation, production readiness and security-minded operations.</p></div></div>`
    );
    const lines = withComponents.split("\n");
    let html = "", inList = false, inCode = false, code = [];

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        if (!inCode) { inCode = true; code = []; }
        else { inCode = false; html += `<pre>${code.join("\n")}</pre>`; }
        continue;
      }
      if (inCode) { code.push(line); continue; }

      if (line.startsWith("# ")) { if (inList) { html += "</ul>"; inList = false; } html += `<h1>${line.slice(2)}</h1>`; }
      else if (line.startsWith("## ")) { if (inList) { html += "</ul>"; inList = false; } html += `<h2>${line.slice(3)}</h2>`; }
      else if (line.startsWith("### ")) { if (inList) { html += "</ul>"; inList = false; } html += `<h3>${line.slice(4)}</h3>`; }
      else if (line.startsWith("- ")) { if (!inList) { html += "<ul>"; inList = true; } html += `<li>${line.slice(2)}</li>`; }
      else if (line.trim() === "") { if (inList) { html += "</ul>"; inList = false; } html += "<br>"; }
      else if (line.includes('class="bio-hero"')) { if (inList) { html += "</ul>"; inList = false; } html += line; }
      else { if (inList) { html += "</ul>"; inList = false; } html += `<p>${line.replace(/`([^`]+)`/g, "<kbd>$1</kbd>")}</p>`; }
    }

    if (inList) html += "</ul>";
    return html;
  }

  return { markdownToHTML };
})();
