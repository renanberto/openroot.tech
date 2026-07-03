var OPENROOT_CONTENT = {
  "system": {
    "name": "openroot.tech",
    "version": "Release 0.1.6",
    "edition": "OpenRoot OS Release 0.1.6",
    "defaultCwd": "/home/visitor",
    "defaultOpen": "/etc/bio.md"
  },
  "files": [
    {
      "path": "/home/visitor/README.md",
      "title": "Welcome",
      "body": "# Welcome to openroot.tech\n\nThis is Release 0.1.6.\n\nThe initial screen now opens the bio.\n\nTry:\n\n`cat /etc/bio.md`\n`cd /usr/projects`\n`cat /usr/projects/waf/README.md`\n`themes`\n`nonroot`"
    },
    {
      "path": "/etc/bio.md",
      "title": "Bio",
      "body": "# Bio\n\n[[bio-hero]]\n\nRenan Berto\nDevOps Engineer\n\nI build and operate cloud infrastructure, automation workflows and production systems with a strong Linux and DevOps foundation.\n\nMy work usually sits where engineering meets operations:\n\n- cloud architecture and AWS services\n- Kubernetes and container platforms\n- security hardening and edge protection\n- observability and production readiness\n- internal tools and automation\n- Python backends and pragmatic product engineering\n\nOpenRoot is both a portfolio and an operating-system metaphor.\nThe terminal is not just a visual trick: it is the navigation model for exploring projects, notes, skills and technical identity.\n\nCurrent focus:\n\n- turning infrastructure experience into reusable systems\n- building tools that reduce manual operational work\n- keeping production boring, observable and recoverable\n- designing technical products with a strong identity\n\nPortfolio paths:\n\n`cat /usr/projects/corly/README.md`\n`cat /usr/projects/bemod/README.md`\n`cat /usr/projects/certs/README.md`\n`cat /usr/projects/waf/README.md`\n\nPhoto placeholder:\nReplace `assets/profile-placeholder.svg` with your real image later, or update the placeholder component in `js/core/renderer.js`."
    },
    {
      "path": "/etc/profile",
      "title": "Profile",
      "body": "# /etc/profile\n\nRenan Berto\nDevOps Engineer\n\nFor the human-readable portfolio version, run:\n\n`cat /etc/bio.md`"
    },
    {
      "path": "/etc/openroot.json",
      "title": "OpenRoot Config",
      "body": "{\n  \"name\": \"openroot.tech\",\n  \"version\": \"Release 0.1.6\",\n  \"architecture\": \"service-aware-plugin-terminal-os\"\n}"
    },
    {
      "path": "/etc/themes.json",
      "title": "Theme Registry",
      "body": "{\n  \"available\": [\n    \"terminal\",\n    \"matrix\",\n    \"nord\",\n    \"tokyo\",\n    \"dracula\",\n    \"gruvbox\",\n    \"catppuccin\",\n    \"ubuntu\",\n    \"arch\",\n    \"fedora\",\n    \"mac\",\n    \"powershell\",\n    \"solarized\"\n  ],\n  \"usage\": \"theme <name>\"\n}"
    },
    {
      "path": "/etc/plugins.json",
      "title": "Plugin Registry",
      "body": "{\n  \"filesystem\": [\n    \"pwd\",\n    \"ls\",\n    \"cd\",\n    \"cat\",\n    \"open\",\n    \"less\",\n    \"tree\",\n    \"find\",\n    \"grep\",\n    \"man\"\n  ],\n  \"git\": [\n    \"git\"\n  ],\n  \"system\": [\n    \"ascii\",\n    \"neofetch\",\n    \"ps\",\n    \"uptime\",\n    \"status\",\n    \"logs\",\n    \"theme\",\n    \"themes\"\n  ],\n  \"fun\": [\n    \"fortune\",\n    \"coffee\",\n    \"matrix\",\n    \"ssh\"\n  ],\n  \"navigation\": [\n    \"nonroot\",\n    \"help\",\n    \"plugins\",\n    \"plugin\",\n    \"commands\",\n    \"whoami\",\n    \"history\",\n    \"alias\",\n    \"aliases\",\n    \"unalias\",\n    \"clear\"\n  ],\n  \"services\": [\n    \"services\",\n    \"systemctl\",\n    \"journalctl\"\n  ]\n}"
    },
    {
      "path": "/etc/services.json",
      "title": "Service Registry",
      "body": "{\n  \"bootloader\": \"sleeping\",\n  \"content-filesystem\": \"running\",\n  \"openroot-shell\": \"running\",\n  \"plugin-manager\": \"running\",\n  \"service-manager\": \"running\",\n  \"nonroot-gateway\": \"standby\",\n  \"github-sync\": \"mocked\",\n  \"search-index\": \"running\"\n}"
    },
    {
      "path": "/etc/skills.json",
      "title": "Skills",
      "body": "{\n  \"cloud\": [\n    \"AWS\",\n    \"EKS\",\n    \"Lambda\",\n    \"CloudFront\",\n    \"WAF\",\n    \"IAM\",\n    \"DynamoDB\",\n    \"SSM\"\n  ],\n  \"containers\": [\n    \"Docker\",\n    \"Kubernetes\",\n    \"Helm\"\n  ],\n  \"backend\": [\n    \"Python\",\n    \"FastAPI\",\n    \"SQLAlchemy\"\n  ],\n  \"frontend\": [\n    \"HTML\",\n    \"CSS\",\n    \"JavaScript\",\n    \"React-ready\",\n    \"Astro-ready\"\n  ],\n  \"observability\": [\n    \"CloudWatch\",\n    \"Grafana\",\n    \"Container Insights\"\n  ],\n  \"security\": [\n    \"WAF\",\n    \"Bot Control\",\n    \"CAPTCHA\",\n    \"IAM\",\n    \"edge protection\"\n  ],\n  \"ai\": [\n    \"LiteLLM\",\n    \"Ollama\",\n    \"OpenAI-ready\",\n    \"Anthropic-ready\"\n  ]\n}"
    },
    {
      "path": "/etc/motd",
      "title": "Message of the Day",
      "body": "# Message of the Day\n\nWelcome, visitor.\n\nUse `cat /etc/bio.md` for the bio.\nUse `nonroot` for guided mode."
    },
    {
      "path": "/usr/projects/README.md",
      "title": "Projects",
      "body": "# /usr/projects\n\nProject directories:\n\n- corly\n- bemod\n- certs\n- waf\n- hermes\n- jira\n\nTry:\n\n`cd /usr/projects`\n`ls`\n`cat corly/README.md`"
    },
    {
      "path": "/usr/projects/corly/README.md",
      "title": "Corly",
      "body": "# Corly\n\nCRM platform for real estate, brokers and banking correspondents.\n\nStack:\nPython, FastAPI, React, MySQL, Docker\n\nStatus:\nWIP\n\nDescription:\nDesigned to manage leads, proposals, contracts, commissions and financing workflows."
    },
    {
      "path": "/usr/projects/bemod/README.md",
      "title": "Bemod",
      "body": "# Bemod\n\nMulti-model AI router for local and cloud LLMs.\n\nStack:\nDocker, FastAPI, LiteLLM, Ollama, OpenAI-ready, Anthropic-ready\n\nStatus:\nWIP"
    },
    {
      "path": "/usr/projects/certs/README.md",
      "title": "AWS Certificate Validator",
      "body": "# AWS Certificate Validator\n\nMulti-account certificate validation workflow.\n\nStack:\nAWS Lambda, SSM, DynamoDB, SNS, IAM AssumeRole\n\nStatus:\nMVP"
    },
    {
      "path": "/usr/projects/waf/README.md",
      "title": "AWS WAF Security Cases",
      "body": "# AWS WAF Security Cases\n\nCredential stuffing mitigation and edge protection patterns.\n\nStack:\nAWS WAF, CloudFront, Bot Control, CAPTCHA, CloudWatch\n\nStatus:\nProduction cases"
    },
    {
      "path": "/usr/projects/hermes/README.md",
      "title": "Hermes / Remote Management",
      "body": "# Hermes / Remote Management\n\nRemote command and get-data flows for device operations.\n\nStack:\nDynamoDB, Cognito, REST APIs, command templates\n\nStatus:\nArchitecture"
    },
    {
      "path": "/usr/projects/jira/README.md",
      "title": "Jira + Confluence AI Integration",
      "body": "# Jira + Confluence AI Integration\n\nAutomation concept to reduce repeated support tickets.\n\nStack:\nJira, Confluence, AWS, OpenSearch, Bedrock/RAG-ready architecture\n\nStatus:\nArchitecture"
    },
    {
      "path": "/usr/lab/README.md",
      "title": "Lab",
      "body": "# /usr/lab\n\nExperiments, drafts and technical notes."
    },
    {
      "path": "/usr/blog/README.md",
      "title": "Blog",
      "body": "# /usr/blog\n\nFuture home for public technical articles."
    },
    {
      "path": "/var/log/releases.log",
      "title": "Release Log",
      "body": "# /var/log/releases.log\n\nRelease 0.1.6  Terminal flow, autocomplete, bio home\nRelease 0.1.6  Sidebar and terminal box fixes\nRelease 0.1.6  Curated sidebar tree and portfolio bio layer\nRelease 0.1.6    Naming, tree fix, ASCII, SSH and full themes"
    },
    {
      "path": "/var/log/journal.log",
      "title": "Journal",
      "body": "# /var/log/journal.log\n\n00:00:01 bootloader: initialized\n00:00:02 content-filesystem: mounted\n00:00:03 plugin-manager: registered plugins\n00:00:04 bio: mounted as default screen"
    },
    {
      "path": "/var/log/career.log",
      "title": "Career Log",
      "body": "# /var/log/career.log\n\n[INFO] Cloud engineering profile initialized\n[INFO] Kubernetes and AWS work mounted\n[TODO] Replace links, resume and project URLs"
    },
    {
      "path": "/proc/status",
      "title": "System Status",
      "body": "# /proc/status\n\nsystem: openroot.tech\nversion: Release 0.1.6\nstate: online"
    },
    {
      "path": "/proc/github",
      "title": "GitHub Process",
      "body": "# /proc/github\n\nGitHub integration status:\nmocked"
    },
    {
      "path": "/dev/contact",
      "title": "Contact Device",
      "body": "# /dev/contact\n\nEmail:\nhello@openroot.tech\n\nGitHub:\nhttps://github.com/your-user\n\nLinkedIn:\nhttps://linkedin.com/in/your-user\n\nResume:\nassets/resume.pdf"
    },
    {
      "path": "/man/README.md",
      "title": "Manual",
      "body": "# Manual\n\nTry:\n\n`man themes`\n`man ssh`\n`man cd`"
    },
    {
      "path": "/man/themes.md",
      "title": "man themes",
      "body": "# NAME\n\nthemes - list available themes\n\n# USAGE\n\nthemes\ntheme dracula"
    },
    {
      "path": "/man/ssh.md",
      "title": "man ssh",
      "body": "# NAME\n\nssh - fake SSH handshake\n\n# USAGE\n\nssh openroot.tech"
    },
    {
      "path": "/man/cd.md",
      "title": "man cd",
      "body": "# NAME\n\ncd - change directory\n\n# USAGE\n\ncd /usr/projects"
    },
    {
      "path": "/man/ls.md",
      "title": "man ls",
      "body": "# NAME\n\nls - list directory contents"
    },
    {
      "path": "/man/cat.md",
      "title": "man cat",
      "body": "# NAME\n\ncat - read a file"
    },
    {
      "path": "/man/systemctl.md",
      "title": "man systemctl",
      "body": "# NAME\n\nsystemctl - inspect service status"
    },
    {
      "path": "/man/journalctl.md",
      "title": "man journalctl",
      "body": "# NAME\n\njournalctl - show OpenRoot service journal"
    }
  ],
  "git": {
    "branch": "main",
    "commits": [
      "r015fix Release 0.1.6 terminal autocomplete bio home",
      "r014fix Release 0.1.6 sidebar terminal fixes",
      "r011fix Release 0.1.6 sidebar bio portfolio layer",
      "r01e001 Release 0.1.6 naming tree ascii ssh themes"
    ]
  },
  "fortunes": [
    "Automate the boring, document the strange.",
    "A clean rollback plan is a love letter to production.",
    "If it cannot be observed, it is not done yet.",
    "Small systems, sharp edges, calm operations.",
    "Root is not a title. It is a responsibility."
  ]
};
window.OPENROOT_CONTENT = OPENROOT_CONTENT;
