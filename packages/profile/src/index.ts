import type { VirtualFileSystem } from "@openroot/filesystem";

type AnyRecord = Record<string, any>;

interface ProfileOptions {
  compact?: boolean;
  title?: string;
  view?: "profile" | "tour" | "projects" | "skills" | "contact" | "system";
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

export function renderInspector(target: HTMLElement, fs: VirtualFileSystem, options: ProfileOptions = {}) {
  const profile = content(fs, "/profile");
  const skills = content(fs, "/skills");
  const projects = content(fs, "/projects");
  const contact = content(fs, "/contact");
  const current = content(fs, "/current");
  const personal = profile.professionalPersonal;
  const view = options.view ?? "profile";

  target.innerHTML = "";

  const root = document.createElement("section");
  root.className = "inspector-shell";

  const overview = `
    <section class="friendly-profile">
      <div class="profile-shot"></div>
      <div class="friendly-copy">
        <p class="friendly-eyebrow">${icon("profile", "Profile summary")}</p>
        <h1>Renan Berto</h1>
        <h2>Software Engineer + DevOps + AI Builder</h2>
        <p class="friendly-lead">I build production systems that connect software, cloud infrastructure, automation and AI workflows.</p>

        <div class="plain-facts">
          <span>${icon("contact", "Lisboa, Portugal / Remote")}</span>
          <span>${icon("email", "Portuguese / English")}</span>
          <span>${icon("cloud", "Global teams")}</span>
        </div>

        <div class="link-row">
          <a href="${contact.github}" target="_blank" rel="noreferrer">${icon("github", "GitHub")}</a>
          <a href="${contact.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin", "LinkedIn")}</a>
          <a href="mailto:${contact.email}">${icon("email", "Email")}</a>
          <button data-copy-contact="${contact.email}">COPY CONTACT</button>
        </div>
      </div>
    </section>

    <section class="nondev-summary">
      <article>
        <h3>${icon("tour", "For recruiters")}</h3>
        <p>Renan is strongest in roles where software engineering meets cloud infrastructure, automation, production reliability and practical AI adoption.</p>
      </article>
      <article>
        <h3>${icon("devops", "What that means")}</h3>
        <p>He can write application code, automate delivery, operate systems, improve observability and help teams make technology safer to run.</p>
      </article>
      <article>
        <h3>${icon("ai", "Current direction")}</h3>
        <p>Currently exploring AI agents, RAG, local models and developer automation to improve engineering workflows.</p>
      </article>
    </section>

    <section class="role-cards">
      ${personal.targetRoles.slice(0,5).map((role: string) => `
        <article>
          <strong>${role}</strong>
          <span>Good fit</span>
        </article>
      `).join("")}
    </section>

    <section class="inspector-grid">
      <article>
        <h3>${icon("project", "What I'm building now")}</h3>
        ${current.items.map((item: any) => `<p class="build-item"><b>${item.title}</b><br/>${item.description}</p>`).join("")}
      </article>

      <article>
        <h3>${icon("skills", "Simple skill map")}</h3>
        <p class="arrow">> Software: Python, Go, Node.js</p>
        <p class="arrow">> Cloud/Platform: AWS, Kubernetes, Linux</p>
        <p class="arrow">> AI: Agents, RAG, automation workflows</p>
        <p class="arrow">> Production: Observability, security, CI/CD</p>
      </article>
    </section>
  `;

  const contextSummary = `
    <section class="inspector-context">
      <article>
        <span>Active path</span>
        <strong>${options.path ?? "/profile/home"}</strong>
      </article>
      <article>
        <span>View mode</span>
        <strong>${view}</strong>
      </article>
      <article>
        <span>Runtime</span>
        <strong>static / prod</strong>
      </article>
    </section>
  `;

  const tourView = `
    <section class="tour-panel">
      <header>
        <h3>${icon("tour", "Recruiter Tour")}</h3>
        <p>A simple route for evaluating Renan without needing to understand the terminal.</p>
      </header>

      <div class="tour-steps">
        <article>
          <strong>01</strong>
          <h4>Start with fit</h4>
          <p>Look at the Profile summary and Best Fit Roles to understand where he lands best.</p>
          <span>Recommended panel: Profile</span>
        </article>
        <article>
          <strong>02</strong>
          <h4>Check the skills</h4>
          <p>Use Skills to separate software engineering, DevOps/platform and AI engineering signals.</p>
          <span>Recommended panel: Skills</span>
        </article>
        <article>
          <strong>03</strong>
          <h4>Review proof</h4>
          <p>Use Projects to see concrete examples: WAF/security, AI routing, RAG automation and OpenRoot OS.</p>
          <span>Recommended panel: Projects</span>
        </article>
        <article>
          <strong>04</strong>
          <h4>Understand direction</h4>
          <p>Review current work: AI agents, RAG, local models and developer automation.</p>
          <span>Recommended panel: Profile / Projects</span>
        </article>
        <article>
          <strong>05</strong>
          <h4>Contact</h4>
          <p>Use Contact or the topbar buttons to open LinkedIn, GitHub or email.</p>
          <span>Recommended panel: Contact</span>
        </article>
      </div>
    </section>
  `;

  const projectsView = `
    <section class="featured">
      <header>
        <h3>${icon("project", "Project Inspector")}</h3>
        <span>${projects.projects.length} projects mounted</span>
      </header>
      ${projects.projects.map((project: any) => `
        <article class="featured-row">
          <div class="project-icon"><img src="/assets/icons/${project.id === "waf" ? "security" : project.id === "bemod" ? "ai" : project.id === "openroot" ? "openroot" : "project"}.svg" alt="" /></div>
          <div>
            <h4>${project.title}</h4>
            <p><b>Problem:</b> ${project.problem}</p>
            <p><b>Impact:</b> ${project.impact}</p>
          </div>
          <div class="tag-list">
            ${project.stack.slice(0,4).map((item: string) => `<span>${item}</span>`).join("")}
          </div>
        </article>
      `).join("")}
    </section>
  `;

  const skillsView = `
    <section class="featured">
      <header>
        <h3>${icon("skills", "Skill Matrix")}</h3>
        <span>software · devops · ai</span>
      </header>
      ${skills.groups.map((group: any) => `
        <article class="skill-row">
          <h4>${icon(group.id === "ai" ? "ai" : group.id === "software-engineering" ? "backend" : "devops", group.title)}</h4>
          <p>${group.description}</p>
          <div class="tag-list is-left">${group.items.map((item: string) => `<span>${item}</span>`).join("")}</div>
        </article>
      `).join("")}
    </section>
  `;

  const contactView = `
    <section class="overview-card is-contact">
      <div class="contact-icon"><img src="/assets/icons/contact.svg" alt="" /></div>
      <div>
        <h1>Contact</h1>
        <p>${personal.availability}</p>
        <p>Location: ${personal.location}</p>
        <div class="link-row">
          <a href="mailto:${contact.email}">${icon("email", contact.email)}</a>
          <a href="${contact.github}" target="_blank" rel="noreferrer">${icon("github", "GitHub")}</a>
          <a href="${contact.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin", "LinkedIn")}</a>
          <button data-copy-contact="${contact.email}">COPY CONTACT</button>
        </div>
      </div>
    </section>
  `;

  const graphView = `
    <section class="featured">
      <header>
        <h3>${icon("graph", "Knowledge Graph")}</h3>
        <span>browser runtime</span>
      </header>
      <article class="graph-box">
        <p>Skills -> Projects -> Security -> AI -> Platform</p>
        <p>Try in terminal: <code>graph AWS</code>, <code>graph Python</code>, <code>graph AI</code></p>
      </article>
    </section>
  `;

  const systemView = `
    <section class="featured">
      <header>
        <h3>${icon("system", "System")}</h3>
        <span>static github pages runtime</span>
      </header>
      <article class="graph-box">
        <p><b>OpenRoot OS Release 1</b></p>
        <p>Virtual filesystem mounted with search, context menu, breadcrumbs, active file indicator and persisted resize state.</p>
        <p>Terminal runtime online with recruiter friendly navigation outside the command line.</p>
        <p>Inspector shell online with clean contextual panels.</p>
        <p>GitHub Pages compatible production bundle.</p>
      </article>
    </section>
  `;

  const viewBody = {
    profile: overview,
    tour: tourView,
    projects: projectsView,
    skills: skillsView,
    contact: contactView,
    graph: graphView,
    system: systemView
  }[view];

  root.innerHTML = `
    <div class="panel-title"><span>${options.title ?? "INSPECTOR"}</span><strong>${view.toUpperCase()}</strong></div>

    <div class="inspector-tabs">
      <button class="${active("profile", view)}" data-inspector-tab="profile">${icon("profile", "Profile")}</button>
      <button class="${active("projects", view)}" data-inspector-tab="projects">${icon("project", "Projects")}</button>
      <button class="${active("skills", view)}" data-inspector-tab="skills">${icon("skills", "Skills")}</button>
      <button class="${active("contact", view)}" data-inspector-tab="contact">${icon("contact", "Contact")}</button>
    </div>

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
      renderInspector(target, fs, { ...options, view: button.dataset.inspectorTab as any });
    });
  });

  return { destroy() { target.innerHTML = ""; } };
}

export const renderProfile = renderInspector;
