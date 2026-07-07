import type { VirtualFileSystem } from "@openroot/filesystem";

type AnyRecord = Record<string, any>;
type InspectorTab =
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

let selectedProjectId = "openroot";
let selectedArchitectureLayer = "Application shell";

interface ProfileOptions {
  compact?: boolean;
  title?: string;
  view?: InspectorTab;
  path?: string;
}

function content<T = AnyRecord>(fs: VirtualFileSystem, path: string): T {
  return fs.read(path)?.content as T;
}

function active(view: string, current: string) {
  return view === current ? "active" : "";
}

function icon(name: string, label = "") {
  return `<img class="ui-icon" src="/assets/icons/${name}.svg" alt="" aria-hidden="true" />${label ? `<span>${label}</span>` : ""}`;
}

function docCard(title: string, body: string, iconName = "docs") {
  return `<article class="doc-card"><h3>${icon(iconName, title)}</h3><p>${body}</p></article>`;
}

function callout(title: string, body: string) {
  return `<aside class="doc-callout"><strong>${title}</strong><span>${body}</span></aside>`;
}

function tags(items: string[]) {
  return `<div class="tag-list is-left">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
}

function evidenceList(items: string[]) {
  return `<ul class="evidence-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

export function renderInspector(target: HTMLElement, fs: VirtualFileSystem, options: ProfileOptions = {}) {
  const profile = content(fs, "/profile");
  const skills = content(fs, "/skills");
  const projects = content(fs, "/projects");
  const contact = content(fs, "/contact");
  const current = content(fs, "/current");
  const resume = content(fs, "/resume");
  const experience = content(fs, "/experience");
  const certifications = content(fs, "/certifications");
  const articles = content(fs, "/articles");
  const gallery = content(fs, "/gallery");
  const architecture = content(fs, "/architecture");
  const caseStudies = content(fs, "/case-studies");
  const downloads = content(fs, "/downloads");
  const seo = content(fs, "/seo");
  const accessibility = content(fs, "/accessibility");
  const personal = profile.professionalPersonal;
  const view = options.view ?? "profile";

  target.innerHTML = "";

  const root = document.createElement("section");
  root.className = "inspector-shell";

  const contextSummary = `
    <section class="inspector-context">
      <article><span>Active path</span><strong>${options.path ?? "/profile/home"}</strong></article>
      <article><span>Experience</span><strong>10+ years</strong></article>
      <article><span>Release</span><strong>OS Release 6</strong></article>
    </section>
  `;

  const overview = `
    <section class="friendly-profile document-view">
      <div class="profile-shot"></div>
      <div class="friendly-copy">
        <p class="friendly-eyebrow">${icon("profile", "Profile summary")}</p>
        <h1>Renan Berto</h1>
        <h2>Software Engineer + DevOps Engineer + AI Builder</h2>
        <p class="friendly-lead">I build production systems that connect backend software, cloud infrastructure, automation, observability, security and practical AI workflows.</p>
        <div class="plain-facts">
          <span>${icon("contact", personal.location)}</span>
          <span>${icon("email", personal.languagesSpoken.join(" / "))}</span>
          <span>${icon("cloud", personal.workPreference.join(" · "))}</span>
        </div>
        <div class="link-row">
          <a href="${contact.github}" target="_blank" rel="noreferrer">${icon("github", "GitHub")}</a>
          <a href="${contact.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin", "LinkedIn")}</a>
          <a href="mailto:${contact.email}">${icon("email", "Email")}</a>
          <button data-copy-contact="${contact.email}">COPY CONTACT</button>
        </div>
      </div>
    </section>

    <section class="document-grid three">
      ${docCard("Recruiter fit", "Strongest where software engineering meets cloud/platform ownership, production reliability and automation.", "tour")}
      ${docCard("Operating style", personal.workingStyle, "terminal")}
      ${docCard("Current direction", personal.currentInterests.join(", "), "ai")}
    </section>

    <section class="doc-section">
      <header><h3>${icon("resume", "Professional snapshot")}</h3><span>${resume.summary}</span></header>
      ${callout("Best fit roles", personal.targetRoles.join(" · "))}
      <div class="role-cards">
        ${personal.targetRoles.map((role: string) => `<article><strong>${role}</strong><span>good fit</span></article>`).join("")}
      </div>
    </section>

    <section class="inspector-grid">
      <article>
        <h3>${icon("project", "What I'm building now")}</h3>
        ${current.items.map((item: any) => `<p class="build-item"><b>${item.title}</b><br/>${item.description}</p>`).join("")}
      </article>
      <article>
        <h3>${icon("skills", "Signal map")}</h3>
        <p class="arrow">> Software: Python, Go, Node.js, TypeScript</p>
        <p class="arrow">> Cloud/Platform: AWS, Kubernetes, Linux, CI/CD</p>
        <p class="arrow">> Security: WAF, IAM, TLS, traffic controls</p>
        <p class="arrow">> AI: agents, RAG, local/cloud model workflows</p>
      </article>
    </section>
  `;

  const tourView = `
    <section class="tour-panel document-view">
      <header>
        <h3>${icon("tour", "Recruiter Tour")}</h3>
        <p>A five-minute route to understand fit, proof, skills and contact paths without needing the terminal.</p>
      </header>
      <div class="tour-steps">
        <article><strong>01</strong><h4>Profile</h4><p>Start with the summary, role fit and current direction.</p><span>Panel: Profile</span></article>
        <article><strong>02</strong><h4>Skills</h4><p>Check software, platform, cloud, security, observability and AI signal.</p><span>Panel: Skills</span></article>
        <article><strong>03</strong><h4>Projects</h4><p>Review proof of work: OpenRoot, WAF, certificates, Bemod, Corly and Jira AI.</p><span>Panel: Projects</span></article>
        <article><strong>04</strong><h4>Terminal</h4><p>Use quick commands or click anywhere in the terminal to focus the prompt.</p><span>Try: whoami, skills, project openroot</span></article>
        <article><strong>05</strong><h4>Contact</h4><p>Open LinkedIn, GitHub or email when the fit is clear.</p><span>Panel: Contact</span></article>
      </div>
    </section>
  `;

  const projectsView = `
    <section class="featured document-view project-viewer">
      <header><h3>${icon("project", "Project Viewer")}</h3><span>${projects.projects.length} projects mounted</span></header>
      <div class="viewer-shell">
        <nav class="viewer-list" aria-label="Project viewer">
          ${projects.projects.map((project: any) => `
            <button class="${project.id === selectedProjectId ? "active" : ""}" data-project-viewer="${project.id}">
              <strong>${project.title}</strong>
              <span>${project.tag}</span>
            </button>
          `).join("")}
        </nav>
        ${(() => {
          const project = projects.projects.find((item: any) => item.id === selectedProjectId) ?? projects.projects[0];
          return `
            <article class="viewer-detail project-document">
              <div class="project-icon"><img src="/assets/icons/${project.id === "waf" ? "security" : project.id === "bemod" ? "ai" : project.id === "openroot" ? "openroot" : project.id === "jira-ai" ? "rag" : "project"}.svg" alt="" /></div>
              <div>
                <h4>${project.title}</h4>
                <p><b>Problem:</b> ${project.problem}</p>
                <p><b>Solution:</b> ${project.solution ?? project.context ?? "Production engineering workflow."}</p>
                <p><b>Impact:</b> ${project.impact}</p>
                <p><b>Architecture:</b> ${(project.architecture ?? []).join(" -> ")}</p>
                ${tags(project.stack)}
              </div>
            </article>
          `;
        })()}
      </div>
    </section>
  `;

  const skillsView = `
    <section class="featured document-view">
      <header><h3>${icon("skills", "Skills Experience")}</h3><span>evidence over stars</span></header>
      ${skills.groups.map((group: any) => `
        <article class="skill-row">
          <h4>${icon(group.id === "ai" ? "ai" : group.id === "software-engineering" ? "backend" : group.id === "cloud" ? "cloud" : group.id === "security" ? "security" : "devops", group.title)}</h4>
          <p>${group.description}</p>
          ${tags(group.items)}
        </article>
      `).join("")}
    </section>
  `;

  const contactView = `
    <section class="overview-card is-contact document-view">
      <div class="contact-icon"><img src="/assets/icons/contact.svg" alt="" /></div>
      <div>
        <h1>Contact</h1>
        <p>${personal.availability}</p>
        <p>Location: ${personal.location}</p>
        <p>Languages: ${personal.languagesSpoken.join(" / ")}</p>
        <div class="link-row">
          <a href="mailto:${contact.email}">${icon("email", contact.email)}</a>
          <a href="${contact.github}" target="_blank" rel="noreferrer">${icon("github", "GitHub")}</a>
          <a href="${contact.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin", "LinkedIn")}</a>
          <button data-copy-contact="${contact.email}">COPY CONTACT</button>
        </div>
      </div>
    </section>
  `;

  const experienceView = `
    <section class="featured document-view">
      <header><h3>${icon("resume", "Experience")}</h3><span>${experience.summary}</span></header>
      ${experience.roles.map((role: any) => `
        <article class="skill-row">
          <h4>${role.title}</h4>
          <p>${role.focus}</p>
          ${tags(role.signals)}
        </article>
      `).join("")}
    </section>
  `;

  const certificationsView = `
    <section class="featured document-view">
      <header><h3>${icon("docs", "Certifications")}</h3><span>${certifications.summary}</span></header>
      ${certifications.items.map((item: any) => `
        <article class="professional-row">
          <h4>${item.title}</h4>
          <strong>${item.status}</strong>
          ${evidenceList(item.evidence)}
        </article>
      `).join("")}
    </section>
  `;

  const articlesView = `
    <section class="featured document-view">
      <header><h3>${icon("docs", "Articles")}</h3><span>${articles.summary}</span></header>
      ${articles.items.map((item: any) => `
        <article class="professional-row">
          <h4>${item.title}</h4>
          <strong>${item.status}</strong>
          <p>${item.topic}</p>
        </article>
      `).join("")}
    </section>
  `;

  const galleryView = `
    <section class="featured document-view">
      <header><h3>${icon("graph", "Gallery")}</h3><span>${gallery.summary}</span></header>
      <div class="document-grid three">
        ${gallery.items.map((item: any) => docCard(item.title, `${item.type}: ${item.description}`, "project")).join("")}
      </div>
    </section>
  `;

  const architectureView = `
    <section class="featured document-view architecture-viewer">
      <header><h3>${icon("system", "Architecture Viewer")}</h3><span>${architecture.summary}</span></header>
      <div class="viewer-shell">
        <nav class="viewer-list" aria-label="Architecture viewer">
          ${architecture.layers.map((layer: any) => `
            <button class="${layer.name === selectedArchitectureLayer ? "active" : ""}" data-architecture-viewer="${layer.name}">
              <strong>${layer.name}</strong>
              <span>layer</span>
            </button>
          `).join("")}
        </nav>
        ${(() => {
          const layer = architecture.layers.find((item: any) => item.name === selectedArchitectureLayer) ?? architecture.layers[0];
          return `
            <article class="viewer-detail">
              <h4>${layer.name}</h4>
              <p>${layer.details}</p>
              <div class="architecture-flow">
                ${architecture.layers.map((item: any, index: number) => `<span class="${item.name === layer.name ? "active" : ""}">${index + 1}. ${item.name}</span>`).join("")}
              </div>
            </article>
          `;
        })()}
      </div>
      <article class="graph-box"><p><b>SEO</b></p>${evidenceList(seo.checks)}</article>
      <article class="graph-box"><p><b>Accessibility</b></p>${evidenceList(accessibility.checks)}</article>
    </section>
  `;

  const casesView = `
    <section class="featured document-view">
      <header><h3>${icon("project", "Case Studies")}</h3><span>${caseStudies.summary}</span></header>
      ${caseStudies.items.map((item: any) => `
        <article class="featured-row project-document">
          <div class="project-icon"><img src="/assets/icons/project.svg" alt="" /></div>
          <div>
            <h4>${item.title}</h4>
            <p><b>Problem:</b> ${item.problem}</p>
            <p><b>Decision:</b> ${item.decision}</p>
            <p><b>Impact:</b> ${item.impact}</p>
          </div>
        </article>
      `).join("")}
    </section>
  `;

  const downloadsView = `
    <section class="featured document-view">
      <header><h3>${icon("pdf", "Downloads")}</h3><span>${downloads.summary}</span></header>
      ${downloads.items.map((item: any) => `
        <article class="download-row">
          <h4>${item.label}</h4>
          <code>${item.path}</code>
          <strong>${item.status}</strong>
        </article>
      `).join("")}
    </section>
  `;

  const systemView = `
    <section class="featured document-view">
      <header><h3>${icon("system", "System")}</h3><span>static github pages runtime</span></header>
      <article class="graph-box">
        <p><b>OpenRoot OS Release 6</b></p>
        <p>OpenRoot OS release: recruiter inspector reduced to Profile, Projects, Skills and Contact. Desktop, applications, dock, notifications, widgets, settings and theme details are available through terminal commands.</p>
      </article>
    </section>
  `;

  const viewBody = {
    profile: overview,
    tour: tourView,
    projects: projectsView,
    skills: skillsView,
    experience: experienceView,
    certifications: certificationsView,
    articles: articlesView,
    gallery: galleryView,
    architecture: architectureView,
    cases: casesView,
    downloads: downloadsView,
    contact: contactView,
    system: systemView
  }[view] ?? overview;

  root.innerHTML = `
    <div class="panel-title"><span>${options.title ?? "INSPECTOR"}</span><strong>${view.toUpperCase()}</strong></div>
    <nav class="inspector-nav" aria-label="Inspector navigation">
      <div class="inspector-primary-tabs">
        <button class="${active("profile", view)}" data-inspector-tab="profile">${icon("profile", "Profile")}</button>
        <button class="${active("projects", view)}" data-inspector-tab="projects">${icon("project", "Projects")}</button>
        <button class="${active("skills", view)}" data-inspector-tab="skills">${icon("skills", "Skills")}</button>
        <button class="${active("contact", view)}" data-inspector-tab="contact">${icon("contact", "Contact")}</button>
      </div>
    </nav>
    ${contextSummary}
    ${viewBody}
  `;

  target.appendChild(root);

  root.querySelectorAll<HTMLButtonElement>("[data-copy-contact]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copyContact ?? "";
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "COPIED";
        setTimeout(() => (button.textContent = "COPY CONTACT"), 1400);
      } catch {
        button.textContent = value;
      }
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-inspector-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      renderInspector(target, fs, { ...options, view: button.dataset.inspectorTab as InspectorTab });
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-project-viewer]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedProjectId = button.dataset.projectViewer ?? selectedProjectId;
      renderInspector(target, fs, { ...options, view: "projects" });
    });
  });

  root.querySelectorAll<HTMLButtonElement>("[data-architecture-viewer]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedArchitectureLayer = button.dataset.architectureViewer ?? selectedArchitectureLayer;
      renderInspector(target, fs, { ...options, view: "architecture" });
    });
  });

  return { destroy() { target.innerHTML = ""; } };
}

export const renderProfile = renderInspector;
