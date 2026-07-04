window.OpenRootRenderer = (() => {
  function escapeHTML(value) {
    return value.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function inlineFormat(line) {
    return line
      .replace(/`([^`]+)`/g, "<kbd>$1</kbd>")
      .replace(/::badge\[([^\]]+)\]/g, '<span class="md-badge">$1</span>')
      .replace(/::status\[([^\]]+)\]/g, '<div class="md-status">$1</div>')
      .replace(/::stack\[([^\]]+)\]/g, '<div class="md-stack">$1</div>')
      .replace(/::link\[([^|\]]+)\|([^\]]+)\]/g, '<a class="md-link" href="$2" target="_blank" rel="noreferrer">$1</a>');
  }

  function markdownToHTML(body) {
    const escaped = escapeHTML(body).replace(
      /\[\[bio-hero\]\]/g,
      `<div class="bio-hero">
        <div class="bio-photo" role="img" aria-label="Profile photo"></div>
        <div>
          <p class="bio-kicker">portfolio identity</p>
          <div class="bio-title">Renan Berto</div>
          <p class="bio-lead">DevOps Engineer focused on cloud infrastructure, Linux systems, automation, production readiness and security-minded operations.</p>
        </div>
      </div>`
    );

    const lines = escaped.split("\n");
    let html = "";
    let inList = false;
    let inGrid = false;
    let inCard = false;
    let cardTitle = "";
    let cardBody = [];
    let inCallout = false;
    let calloutColor = "green";
    let calloutBody = [];

    function closeList() {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
    }

    function closeCard() {
      if (inCard) {
        html += `<article class="md-card"><h3>${cardTitle}</h3><p>${inlineFormat(cardBody.join(" ").trim())}</p></article>`;
        inCard = false;
        cardTitle = "";
        cardBody = [];
      }
    }

    function closeCallout() {
      if (inCallout) {
        html += `<div class="md-callout ${calloutColor}">${inlineFormat(calloutBody.join(" ").trim())}</div>`;
        inCallout = false;
        calloutColor = "green";
        calloutBody = [];
      }
    }

    for (const raw of lines) {
      const line = raw.trimEnd();

      if (line.startsWith(":::grid")) {
        closeList();
        html += '<section class="md-grid">';
        inGrid = true;
        continue;
      }

      if (line.startsWith(":::card[")) {
        closeList();
        const match = line.match(/:::card\[([^\]]+)\]/);
        inCard = true;
        cardTitle = match ? match[1] : "Card";
        cardBody = [];
        continue;
      }

      if (line.startsWith(":::callout[")) {
        closeList();
        const match = line.match(/:::callout\[([^\]]+)\]/);
        inCallout = true;
        calloutColor = match ? match[1] : "green";
        calloutBody = [];
        continue;
      }

      if (line === ":::") {
        closeCard();
        closeCallout();
        if (inGrid) {
          html += "</section>";
          inGrid = false;
        }
        continue;
      }

      if (inCard) {
        if (line) cardBody.push(line);
        continue;
      }

      if (inCallout) {
        if (line) calloutBody.push(line);
        continue;
      }

      if (line.startsWith("# ")) {
        closeList();
        html += `<h1>${inlineFormat(line.slice(2))}</h1>`;
      } else if (line.startsWith("## ")) {
        closeList();
        html += `<h2>${inlineFormat(line.slice(3))}</h2>`;
      } else if (line.startsWith("### ")) {
        closeList();
        html += `<h3>${inlineFormat(line.slice(4))}</h3>`;
      } else if (line.startsWith("- ")) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${inlineFormat(line.slice(2))}</li>`;
      } else if (line.trim() === "") {
        closeList();
      } else if (line.includes('class="bio-hero"')) {
        closeList();
        html += line;
      } else if (line.trim().startsWith("<div") || line.trim().startsWith("</div>") || line.trim().startsWith("<p") || line.trim().startsWith("</p>")) {
        closeList();
        html += line;
      } else {
        closeList();
        html += `<p>${inlineFormat(line)}</p>`;
      }
    }

    closeList();
    closeCard();
    closeCallout();
    if (inGrid) html += "</section>";

    return html;
  }

  return { markdownToHTML };
})();
