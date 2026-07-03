window.OpenRootGitPlugin = {
  name: "git",
  description: "Portfolio git simulation commands.",
  commands: [
    {
      name: "git",
      description: "Show git-like metadata.",
      usage: "git status",
      run: (args, raw, ctx) => {
        const sub = args.trim() || "status";
        if (sub === "status") {
          const projects = ctx.fs.list("/usr/projects").filter(i => i.type === "dir").length;
          return `On branch ${ctx.content.git.branch}

Working tree clean.

${projects} project directories mounted
${ctx.fs.allFiles("/").length} total content files indexed
Release 0.1 active
host: GitHub Pages ready`;
        }
        if (sub === "log") return ctx.content.git.commits.map(c => "commit " + c).join("\n");
        if (sub === "branch") return `* ${ctx.content.git.branch}\n  lab\n  experiments\n  release-0.1`;
        return `git: unknown subcommand '${sub}'`;
      }
    }
  ],
  completions() { return ["git status", "git log", "git branch"]; }
};
