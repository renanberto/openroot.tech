var OPENROOT_CONTENT = {
  "system": {
    "name": "openroot.tech",
    "version": "Release 0.2.1-content-mobile",
    "edition": "OpenRoot OS Release 0.2.1-content-mobile",
    "defaultCwd": "/home/visitor",
    "defaultOpen": "/etc/bio.md"
  },
  "files": [
    {
      "path": "/home/visitor/README.md",
      "title": "Welcome",
      "body": "# Welcome to openroot.tech\n\nThis is Release 0.2.0-prod-prep.\n\nThe initial screen now opens the bio.\n\nTry:\n\n`cat /etc/bio.md`\n`cd /usr/projects`\n`cat /usr/projects/waf/README.md`\n`themes`\n`nonroot`"
    },
    {
      "path": "/etc/bio.md",
      "title": "Bio",
      "body": "# Bio\n\n[[bio-hero]]\n\nRenan Berto\nDevOps Engineer\n\nI build and operate cloud infrastructure, automation workflows and production systems with a strong Linux and DevOps foundation.\n\nMy work usually sits between engineering and operations: the place where architecture diagrams become pods, logs, alarms, certificates, WAF rules, deployment windows and real users.\n\n## What I do\n\nI work with cloud infrastructure, Kubernetes, automation, security hardening, observability and internal tooling.\nI like systems that are boring in production, easy to reason about and honest when something breaks.\n\n## What OpenRoot is\n\nOpenRoot is both a portfolio and a small operating-system metaphor.\n\nInstead of a traditional page with sections, this site behaves like a static terminal OS.\nThe filesystem is the navigation model:\n\n- `/etc` contains identity, skills and configuration\n- `/usr/projects` contains project work\n- `/var/log` contains timeline and release history\n- `/dev/contact` contains contact endpoints\n- `nonroot` opens a clean guided version for humans who do not want to type commands\n\n## Current focus\n\n- building reliable cloud and Kubernetes systems\n- turning manual operations into repeatable automation\n- using AI practically in engineering workflows\n- improving documentation, observability and production readiness\n- designing technical products with a memorable identity\n\n## Good commands to start\n\n`cat /etc/skills.md`\n\n`ls /usr/projects`\n\n`cat /usr/projects/waf/README.md`\n\n`nonroot`\n\nPhoto placeholder:\nReplace `assets/profile-placeholder.svg` with a real image later.\n"
    },
    {
      "path": "/etc/profile",
      "title": "Profile",
      "body": "# /etc/profile\n\nRenan Berto\nDevOps Engineer\n\nFor the human-readable portfolio version, run:\n\n`cat /etc/bio.md`"
    },
    {
      "path": "/etc/openroot.json",
      "title": "OpenRoot Config",
      "body": "{\n  \"name\": \"openroot.tech\",\n  \"version\": \"Release 0.2.0-prod-prep\",\n  \"architecture\": \"service-aware-plugin-terminal-os\"\n}"
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
      "path": "/etc/motd",
      "title": "Message of the Day",
      "body": "# Message of the Day\n\nWelcome, visitor.\n\nUse `cat /etc/bio.md` for the bio.\nUse `nonroot` for guided mode."
    },
    {
      "path": "/usr/projects/README.md",
      "title": "Projects",
      "body": "# Projects\n\nThis directory is a catalog of selected technical work and product experiments.\n\nEach project page follows the same idea:\n\n- what the project is\n- what problem it solves\n- which technologies are involved\n- what kind of engineering thinking it demonstrates\n\n## Available projects\n\n### Corly\n\nCRM and workflow platform for real estate, brokers and banking correspondents.\n\n`cat /usr/projects/corly/README.md`\n\n### Bemod\n\nMulti-model AI router experiment for local and cloud LLMs.\n\n`cat /usr/projects/bemod/README.md`\n\n### AWS Certificate Validator\n\nMulti-account certificate validation workflow using AWS automation.\n\n`cat /usr/projects/certs/README.md`\n\n### AWS WAF Security Cases\n\nCredential stuffing mitigation and edge protection patterns.\n\n`cat /usr/projects/waf/README.md`\n\n### Hermes / Remote Management\n\nCommand orchestration and device operation architecture.\n\n`cat /usr/projects/hermes/README.md`\n\n### Jira + Confluence AI Integration\n\nSupport automation concept using knowledge retrieval and evidence.\n\n`cat /usr/projects/jira/README.md`\n"
    },
    {
      "path": "/usr/projects/corly/README.md",
      "title": "Corly",
      "body": "# Corly\n\nCorly is a CRM and workflow platform concept for real estate agencies, brokers and banking correspondents.\n\n## Problem\n\nReal estate and financing workflows often spread information across spreadsheets, chats, email and disconnected tools.\nThat makes visibility, ownership, deadlines and follow-up harder than they should be.\n\n## What it covers\n\n- lead and customer registration\n- proposal and contract stages\n- commission tracking\n- credit consultation flows\n- simulation and financing workflows\n- role-based access for different business profiles\n\n## Stack\n\n- Python\n- FastAPI\n- SQLAlchemy\n- MySQL\n- React-ready frontend\n- Docker\n\n## What it demonstrates\n\nCorly demonstrates product thinking applied to operational workflows: not just building forms, but modeling the stages, roles and dependencies that make the business move.\n"
    },
    {
      "path": "/usr/projects/bemod/README.md",
      "title": "Bemod",
      "body": "# Bemod\n\nBemod is a multi-model AI routing experiment.\n\n## Problem\n\nDifferent tasks need different models.\nSome jobs are better handled locally, some need stronger cloud models, and some need routing based on cost, speed or context.\n\n## What it explores\n\n- local models with Ollama\n- LiteLLM as a provider abstraction layer\n- OpenAI-ready and Anthropic-ready model paths\n- routing by task type\n- Dockerized local AI infrastructure\n- foundations for agents and tool runtime\n\n## Stack\n\n- Docker\n- FastAPI\n- LiteLLM\n- Ollama\n- local LLMs\n- cloud model integration-ready\n\n## What it demonstrates\n\nBemod shows interest in AI infrastructure beyond prompt usage: model routing, runtime design, local/cloud tradeoffs and practical developer workflows.\n"
    },
    {
      "path": "/usr/projects/certs/README.md",
      "title": "Certs",
      "body": "# AWS Certificate Validator\n\nA multi-account certificate validation workflow for AWS environments.\n\n## Problem\n\nCertificates expire quietly until they do not.\nIn distributed environments, certificates can exist in files, keystores, instances, external endpoints and different AWS accounts.\n\n## What it does\n\n- validates internal certificates\n- validates external TLS endpoints\n- validates keystore-style certificate sources\n- stores validation output\n- notifies before expiration\n- supports multi-account execution patterns\n\n## Stack\n\n- AWS Lambda\n- SSM\n- DynamoDB\n- SNS\n- IAM AssumeRole\n- shell and certificate tooling\n\n## What it demonstrates\n\nThis project demonstrates operational automation, certificate hygiene, AWS orchestration and alerting around a real production risk.\n"
    },
    {
      "path": "/usr/projects/waf/README.md",
      "title": "Waf",
      "body": "# AWS WAF Security Cases\n\nCredential stuffing mitigation and edge protection patterns.\n\n## Problem\n\nCredential stuffing attacks often arrive through noisy, repetitive traffic patterns.\nThe goal is to slow down abusive behavior without damaging legitimate users.\n\n## What it covers\n\n- AWS WAF rules\n- CloudFront protection\n- Bot Control and CAPTCHA strategy\n- user-agent and request behavior filtering\n- operational visibility through logs and metrics\n- security tradeoffs for real-world applications\n\n## Stack\n\n- AWS WAF\n- CloudFront\n- Bot Control\n- CAPTCHA\n- CloudWatch\n\n## What it demonstrates\n\nThis project shows practical security engineering: understanding traffic, choosing controls, measuring impact and protecting accounts at the edge.\n"
    },
    {
      "path": "/usr/projects/hermes/README.md",
      "title": "Hermes",
      "body": "# Hermes / Remote Management\n\nRemote command and get-data architecture for device operations.\n\n## Problem\n\nOperational teams often need controlled ways to request actions from remote devices and inspect the result.\nThat requires command modeling, authorization, auditability and integration with upstream systems.\n\n## What it covers\n\n- command templates\n- remote management actions\n- get-data flows\n- Cognito-based authorization concepts\n- device operation patterns\n- API integration and response filtering\n\n## Stack\n\n- DynamoDB\n- Cognito\n- REST APIs\n- command templates\n- operational integration design\n\n## What it demonstrates\n\nHermes demonstrates architecture thinking for remote operations: command definition, permissions, payload shape and operational safety.\n"
    },
    {
      "path": "/usr/projects/jira/README.md",
      "title": "Jira",
      "body": "# Jira + Confluence AI Integration\n\nAn automation concept to reduce repeated support tickets and improve answer quality.\n\n## Problem\n\nSupport teams often receive tickets that already have answers in documentation, previous tickets or known behavior.\nThe challenge is finding the right evidence quickly and responding with confidence.\n\n## What it explores\n\n- Jira webhook-driven automation\n- Confluence knowledge retrieval\n- duplicate detection\n- evidence-based recommendations\n- RAG-style architecture\n- AI-assisted ticket response\n\n## Stack\n\n- Jira\n- Confluence\n- AWS\n- OpenSearch-ready architecture\n- Bedrock/RAG-ready concepts\n- Lambda or event-driven runtime\n\n## What it demonstrates\n\nThis project demonstrates AI used as an engineering workflow accelerator: not a generic chatbot, but a targeted assistant grounded in internal knowledge.\n"
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
      "body": "# /var/log/releases.log\n\nRelease 0.2.1-content-mobile  Human-readable content and mobile responsiveness pass\nRelease 0.2.0-prod-prep  Production prep, workflow and structured sidebar\nRelease 0.1.9  GitHub Pages workflow and terminal transcript\nRelease 0.1.8  UX and nonroot catalog redesign\n"
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
      "body": "# /proc/status\n\nsystem: openroot.tech\nversion: Release 0.2.0-prod-prep\nstate: online"
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
    },
    {
      "path": "/etc/skills.md",
      "title": "Skills",
      "body": "# Skills\n\nThis is a human-readable map of the technical areas I work with.\nThe point is not to list buzzwords, but to show the operating range: infrastructure, automation, platforms, security, observability and AI-enabled engineering.\n\n## Cloud and AWS\n\nI work across AWS environments with a focus on production operations, reliability and security.\n\n- AWS account structure, IAM and cross-account access\n- EKS and Kubernetes workloads\n- Lambda and event-driven automation\n- CloudFront, WAF and edge protection\n- DynamoDB, SSM, SNS and operational workflows\n- CloudWatch, logs, metrics and alarm design\n- Infrastructure patterns for multi-account environments\n\n## Kubernetes, containers and platform engineering\n\nI am comfortable with the operational side of container platforms: scaling, deployment behavior, runtime issues and production readiness.\n\n- Kubernetes and EKS operations\n- Deployments, Services, Ingress and workload debugging\n- HPA, requests, limits and scaling behavior\n- Helm charts and environment-specific configuration\n- Docker and local development environments\n- Capacity, node behavior and production troubleshooting\n\n## DevOps, automation and delivery\n\nMy focus is making engineering work repeatable, observable and safer to operate.\n\n- CI/CD pipelines and release workflows\n- GitHub Actions and automation routines\n- Shell scripting and Linux-based tooling\n- Python automation and operational scripts\n- Environment promotion and deployment hygiene\n- Runbooks, rollback thinking and operational documentation\n\n## Security and edge protection\n\nI work with practical security controls that reduce risk without turning delivery into concrete.\n\n- AWS WAF rules, Bot Control and CAPTCHA flows\n- Credential stuffing mitigation patterns\n- User-agent and traffic behavior analysis\n- IAM least privilege and assume-role patterns\n- Certificate validation and expiration monitoring\n- Security visibility through logs and metrics\n\n## Observability and production operations\n\nI care about knowing what is happening before a system starts screaming in ancient dialects.\n\n- CloudWatch dashboards, metrics and alarms\n- Grafana and Container Insights\n- Kubernetes pod, node and HPA analysis\n- Incident investigation and signal correlation\n- Liveness/readiness behavior\n- Operational health checks and status reporting\n\n## Backend and product engineering\n\nI also build product-facing systems when needed, especially internal platforms and automation products.\n\n- Python, FastAPI and SQLAlchemy\n- REST APIs and service integration\n- MySQL and DynamoDB usage patterns\n- React-ready frontend collaboration\n- Dockerized local stacks\n- Product thinking for technical tools\n\n## AI and modern engineering workflows\n\nI actively follow and experiment with AI tooling, especially where it improves engineering velocity, code understanding and operational workflows.\n\n- LLM-assisted development and code review workflows\n- Multi-model routing concepts\n- Local models with Ollama\n- LiteLLM and provider abstraction\n- OpenAI and Anthropic-ready architecture\n- RAG concepts, embeddings and knowledge retrieval\n- AI agents for repository understanding and automation\n- Practical use of AI in DevOps, documentation and incident support\n\n## How I like to work\n\n- Prefer simple systems with clear failure modes.\n- Automate repeated work, but keep escape hatches.\n- Make production observable before calling it production.\n- Write documentation that helps the next person, not just the current ticket.\n- Treat infrastructure as a product, not a pile of YAML.\n"
    }
  ],
  "git": {
    "branch": "main",
    "commits": [
      "r015fix Release 0.2.0-prod-prep terminal autocomplete bio home",
      "r014fix Release 0.2.0-prod-prep sidebar terminal fixes",
      "r011fix Release 0.2.0-prod-prep sidebar bio portfolio layer",
      "r01e001 Release 0.2.0-prod-prep naming tree ascii ssh themes"
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
