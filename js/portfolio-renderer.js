window.OpenRootPortfolioRenderer = (() => {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(label, href) {
    const a = el("a", "portfolio-link", label);
    a.href = href;
    if (!href.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noreferrer";
    }
    return a;
  }

  function render(data, handlers = {}) {
    const container = document.createElement("div");
    container.className = "portfolio-rendered";

    const hero = el("section", "portfolio-hero");
    const copy = el("div", "portfolio-hero-copy");
    copy.appendChild(el("p", "eyebrow", "openroot.tech / portfolio mode"));
    copy.appendChild(el("h1", "", data.profile.name));
    copy.appendChild(el("h2", "", data.profile.role));
    copy.appendChild(el("p", "portfolio-lead", data.profile.summary));

    const contacts = el("div", "portfolio-links");
    contacts.appendChild(link(data.profile.email, `mailto:${data.profile.email}`));
    contacts.appendChild(link("GitHub", data.profile.github));
    contacts.appendChild(link("LinkedIn", data.profile.linkedin));
    copy.appendChild(contacts);

    const photo = el("div", "portfolio-photo");
    photo.style.backgroundImage = `linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.16)), url("${data.profile.photo}")`;

    hero.appendChild(copy);
    hero.appendChild(photo);
    container.appendChild(hero);

    const highlights = el("section", "portfolio-highlights");
    for (const item of data.highlights) {
      const card = el("article", "portfolio-highlight");
      card.appendChild(el("strong", "", item.label));
      card.appendChild(el("small", "", item.value));
      highlights.appendChild(card);
    }
    container.appendChild(highlights);

    const recruiter = el("section", "portfolio-section recruiter-section");
    recruiter.appendChild(el("p", "eyebrow", "Recruiter view"));
    recruiter.appendChild(el("h2", "", "Quick signal"));
    recruiter.appendChild(el("p", "", data.recruiter.summary));

    const fit = el("div", "portfolio-chip-row");
    for (const item of data.recruiter.bestFit) fit.appendChild(el("span", "", item));
    recruiter.appendChild(fit);

    const signals = el("ul", "portfolio-signal-list");
    for (const item of data.recruiter.signals) signals.appendChild(el("li", "", item));
    recruiter.appendChild(signals);
    container.appendChild(recruiter);

    const skills = el("section", "portfolio-section");
    skills.appendChild(el("p", "eyebrow", "Skills"));
    skills.appendChild(el("h2", "", "Engineering areas"));
    const skillGrid = el("div", "portfolio-skill-grid");

    for (const group of data.skills) {
      const card = el("article", `portfolio-skill ${group.tone}`);
      card.appendChild(el("h3", "", group.category));
      card.appendChild(el("p", "", group.description));

      const chips = el("div", "portfolio-chip-row");
      for (const item of group.items) chips.appendChild(el("span", "", item));
      card.appendChild(chips);
      skillGrid.appendChild(card);
    }
    skills.appendChild(skillGrid);
    container.appendChild(skills);

    const projects = el("section", "portfolio-section");
    projects.appendChild(el("p", "eyebrow", "Projects"));
    projects.appendChild(el("h2", "", "Case study catalog"));

    const projectGrid = el("div", "portfolio-project-grid");
    for (const project of data.projects) {
      const card = el("article", "portfolio-project");
      card.appendChild(el("span", "project-tag", project.tag));
      card.appendChild(el("h3", "", project.title));

      const problem = el("p", "", "");
      problem.innerHTML = `<strong>Problem:</strong> ${project.problem}`;
      card.appendChild(problem);

      const solution = el("p", "", "");
      solution.innerHTML = `<strong>Solution:</strong> ${project.solution}`;
      card.appendChild(solution);

      const chips = el("div", "portfolio-chip-row");
      for (const item of project.stack) chips.appendChild(el("span", "", item));
      card.appendChild(chips);

      const why = el("p", "project-why", project.why);
      card.appendChild(why);

      const button = el("button", "view-terminal", "View in terminal");
      button.type = "button";
      button.addEventListener("click", () => {
        if (handlers.runCommand) handlers.runCommand(project.command);
      });
      card.appendChild(button);

      projectGrid.appendChild(card);
    }
    projects.appendChild(projectGrid);
    container.appendChild(projects);

    return container;
  }

  return { render };
})();
