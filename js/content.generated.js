var OPENROOT_CONTENT = {
  "system": {
    "name": "openroot.tech",
    "version": "Release 0.2.4-content-engine",
    "edition": "OpenRoot OS Release 0.2.4-content-engine",
    "defaultCwd": "/home/visitor",
    "defaultOpen": "/etc/bio.md"
  },
  "files": [
    {
      "path": "/home/visitor/README.md",
      "title": "Welcome",
      "body": "# Welcome to openroot.tech\n\nThis is Release 0.2.4-content-engine.\n\nThe initial screen now opens the bio.\n\nTry:\n\n`cat /etc/bio.md`\n`cd /usr/projects`\n`cat /usr/projects/waf/README.md`\n`themes`\n`nonroot`"
    },
    {
      "path": "/etc/bio.md",
      "title": "Bio",
      "body": "# Bio\n\n[[bio-hero]]\n\n::status[portfolio online]\n::stack[DevOps \u00b7 Cloud \u00b7 Linux \u00b7 Automation \u00b7 AI]\n\n## Who I am\n\nI am Renan Berto, a DevOps Engineer focused on cloud infrastructure, Kubernetes, Linux systems, automation, observability and security-minded operations.\n\nI like systems that are boring in production, visible when they fail and simple enough for the next person to operate without summoning ancient spirits.\n\n## What I build\n\n:::grid\n:::card[Cloud Platforms]\nAWS environments, EKS workloads, edge protection, account operations and production infrastructure.\n:::\n\n:::card[Automation]\nScripts, pipelines, operational workflows and tools that reduce repetitive manual work.\n:::\n\n:::card[Reliability]\nMonitoring, scaling behavior, incident investigation, rollback thinking and production readiness.\n:::\n\n:::card[AI Workflows]\nPractical AI usage for development, documentation, repository understanding and operational support.\n:::\n:::\n\n## Engineering style\n\n- Prefer clear systems over clever systems.\n- Treat infrastructure as a product.\n- Automate the repeated work, document the risky work.\n- Make production observable before calling it stable.\n- Use AI as a force multiplier, not a magic fog machine.\n\n## Contact\n\n::link[Email|mailto:renanbertoo@gmail.com]\n::link[GitHub|https://github.com/renanberto]\n::link[LinkedIn|https://www.linkedin.com/in/renan-berto]\n\n## Start here\n\n`read skills`\n\n`read projects`\n\n`recruiter`\n"
    },
    {
      "path": "/etc/profile",
      "title": "Profile",
      "body": "# /etc/profile\n\nRenan Berto\nDevOps Engineer\n\nFor the human-readable portfolio version, run:\n\n`cat /etc/bio.md`"
    },
    {
      "path": "/etc/openroot.json",
      "title": "OpenRoot Config",
      "body": "{\n  \"name\": \"openroot.tech\",\n  \"version\": \"Release 0.2.4-content-engine\",\n  \"architecture\": \"service-aware-plugin-terminal-os\"\n}"
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
      "body": "# Projects\n\n::status[case-study catalog]\n::stack[Architecture \u00b7 Automation \u00b7 Cloud \u00b7 AI \u00b7 Security]\n\nEach project is written as a short case study: problem, solution, stack and why it matters.\n\n## Available case studies\n\n:::grid\n:::card[Corly]\nCRM and workflow platform for real estate, brokers and banking correspondents.\n\n`read corly`\n:::\n\n:::card[Bemod]\nMulti-model AI router experiment for local and cloud LLM workflows.\n\n`read bemod`\n:::\n\n:::card[AWS Certificate Validator]\nMulti-account certificate validation and alerting workflow.\n\n`read certs`\n:::\n\n:::card[AWS WAF Security Cases]\nCredential stuffing mitigation and edge protection patterns.\n\n`read waf`\n:::\n\n:::card[Hermes]\nRemote management and get-data command orchestration architecture.\n\n`read hermes`\n:::\n\n:::card[Jira + Confluence AI]\nAI-assisted support automation grounded in documentation and evidence.\n\n`read jira`\n:::\n:::\n\n## Fast path\n\n`recruiter`\n\n`read skills`\n\n`read contact`\n"
    },
    {
      "path": "/usr/projects/corly/README.md",
      "title": "Corly",
      "body": "# Corly\n\n::status[product experiment]\n::stack[Python \u00b7 FastAPI \u00b7 React \u00b7 MySQL \u00b7 Docker]\n\n## Problem\n\nReal estate and financing workflows often depend on scattered spreadsheets, chats, emails and disconnected systems.\nThat makes ownership, deadlines, proposals, contracts and commissions harder to track.\n\n## Solution\n\nCorly models the workflow as a CRM platform for agencies, brokers and banking correspondents.\n\n:::grid\n:::card[Workflow]\nLead, proposal, contract and commission stages.\n:::\n\n:::card[Roles]\nDifferent business profiles with role-based visibility.\n:::\n\n:::card[Financing]\nCredit checks, simulations and proposal flows.\n:::\n:::\n\n## Stack\n\n::badge[Python]\n::badge[FastAPI]\n::badge[SQLAlchemy]\n::badge[MySQL]\n::badge[React]\n::badge[Docker]\n\n## Why it matters\n\nCorly shows product thinking applied to operations: not just screens and forms, but workflow, ownership, visibility and repeatability.\n"
    },
    {
      "path": "/usr/projects/bemod/README.md",
      "title": "Bemod",
      "body": "# Bemod\n\n::status[AI infrastructure experiment]\n::stack[Docker \u00b7 FastAPI \u00b7 LiteLLM \u00b7 Ollama \u00b7 Local LLMs]\n\n## Problem\n\nNot every AI task needs the same model.\nSome tasks need speed, some need cost control, some need stronger reasoning and some can run locally.\n\n## Solution\n\nBemod explores a routing layer between user intent and model execution.\n\n:::grid\n:::card[Local-first]\nUse local models through Ollama when possible.\n:::\n\n:::card[Provider abstraction]\nUse LiteLLM to normalize different model providers.\n:::\n\n:::card[Routing]\nChoose model paths based on task type and context.\n:::\n:::\n\n## Stack\n\n::badge[Ollama]\n::badge[LiteLLM]\n::badge[FastAPI]\n::badge[Docker]\n::badge[OpenAI-ready]\n::badge[Anthropic-ready]\n\n## Why it matters\n\nBemod demonstrates AI engineering beyond prompts: routing, runtime, local/cloud tradeoffs and developer workflow design.\n"
    },
    {
      "path": "/usr/projects/certs/README.md",
      "title": "Certs",
      "body": "# AWS Certificate Validator\n\n::status[operations automation]\n::stack[AWS Lambda \u00b7 SSM \u00b7 DynamoDB \u00b7 SNS \u00b7 IAM]\n\n## Problem\n\nCertificates can expire quietly across instances, files, keystores, endpoints and accounts.\nWhen they finally fail, the blast radius is rarely polite.\n\n## Solution\n\nA multi-account AWS workflow validates certificate sources, stores results and alerts before expiration.\n\n:::grid\n:::card[Internal]\nValidate certificates stored on instances or paths.\n:::\n\n:::card[External]\nValidate public or private TLS endpoints.\n:::\n\n:::card[Keystores]\nSupport keystore-oriented certificate checks.\n:::\n:::\n\n## Stack\n\n::badge[Lambda]\n::badge[SSM]\n::badge[DynamoDB]\n::badge[SNS]\n::badge[AssumeRole]\n::badge[Shell]\n\n## Why it matters\n\nThis is production hygiene: reduce hidden certificate risk, create visibility and automate an operational pain point.\n"
    },
    {
      "path": "/usr/projects/waf/README.md",
      "title": "Waf",
      "body": "# AWS WAF Security Cases\n\n::status[security case study]\n::stack[AWS WAF \u00b7 CloudFront \u00b7 Bot Control \u00b7 CAPTCHA \u00b7 CloudWatch]\n\n## Problem\n\nCredential stuffing attacks create noisy, repetitive traffic and can threaten user accounts.\nThe challenge is blocking abuse without punishing legitimate users.\n\n## Solution\n\nUse edge protection patterns with AWS WAF and CloudFront to identify suspicious traffic and apply targeted controls.\n\n:::grid\n:::card[Detection]\nAnalyze user-agent, behavior and request patterns.\n:::\n\n:::card[Mitigation]\nUse WAF rules, Bot Control and CAPTCHA where appropriate.\n:::\n\n:::card[Visibility]\nUse logs and metrics to understand impact.\n:::\n:::\n\n## Stack\n\n::badge[AWS WAF]\n::badge[CloudFront]\n::badge[Bot Control]\n::badge[CAPTCHA]\n::badge[CloudWatch]\n\n## Why it matters\n\nThis project shows practical security engineering: controls, tradeoffs, observability and operational rollout.\n"
    },
    {
      "path": "/usr/projects/hermes/README.md",
      "title": "Hermes",
      "body": "# Hermes / Remote Management\n\n::status[architecture]\n::stack[DynamoDB \u00b7 Cognito \u00b7 REST APIs \u00b7 Command Templates]\n\n## Problem\n\nRemote device operations need controlled commands, authorization, response handling and auditability.\n\n## Solution\n\nHermes models command execution and get-data flows using templates, authorities and integration contracts.\n\n:::grid\n:::card[Commands]\nReboot, reset, scan, speed test and diagnostics.\n:::\n\n:::card[Authorization]\nAuthority-based access with identity context.\n:::\n\n:::card[Integration]\nStructured request and response handling.\n:::\n:::\n\n## Stack\n\n::badge[DynamoDB]\n::badge[Cognito]\n::badge[REST]\n::badge[Command Templates]\n::badge[Operations]\n\n## Why it matters\n\nHermes demonstrates architecture for remote operations where control, safety and repeatability matter.\n"
    },
    {
      "path": "/usr/projects/jira/README.md",
      "title": "Jira",
      "body": "# Jira + Confluence AI Integration\n\n::status[AI workflow architecture]\n::stack[Jira \u00b7 Confluence \u00b7 AWS \u00b7 Retrieval \u00b7 AI Agents]\n\n## Problem\n\nSupport teams often receive tickets that already have answers in documentation, previous tickets or known behavior.\nFinding the right evidence quickly is the hard part.\n\n## Solution\n\nAn event-driven workflow searches knowledge sources, detects duplicates and suggests evidence-backed responses.\n\n:::grid\n:::card[Ingestion]\nUse Jira and Confluence as knowledge sources.\n:::\n\n:::card[Retrieval]\nFind relevant documents, tickets and evidence.\n:::\n\n:::card[Recommendation]\nGenerate a grounded support recommendation.\n:::\n:::\n\n## Stack\n\n::badge[Jira]\n::badge[Confluence]\n::badge[AWS]\n::badge[OpenSearch-ready]\n::badge[RAG]\n::badge[AI Agents]\n\n## Why it matters\n\nThis is AI used as operational leverage: targeted, contextual and grounded in existing knowledge.\n"
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
      "body": "# /var/log/releases.log\n\nRelease 0.2.4-content-engine  Structured content engine for nonroot portfolio UI\nRelease 0.2.3-content-polish  Markdown polish, case studies, recruiter and read commands\nRelease 0.2.2-mobile-nonroot  Mobile terminal disabled, nonroot portfolio mode and real contact links\n"
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
      "body": "# /proc/status\n\nsystem: openroot.tech\nversion: Release 0.2.4-content-engine\nstate: online"
    },
    {
      "path": "/proc/github",
      "title": "GitHub Process",
      "body": "# /proc/github\n\nGitHub integration status:\nmocked"
    },
    {
      "path": "/dev/contact",
      "title": "Contact",
      "body": "# Contact\n\n::status[available endpoints]\n::stack[Email \u00b7 GitHub \u00b7 LinkedIn]\n\n## Email\n\n::link[renanbertoo@gmail.com|mailto:renanbertoo@gmail.com]\n\n## GitHub\n\n::link[github.com/renanberto|https://github.com/renanberto]\n\n## LinkedIn\n\n::link[linkedin.com/in/renan-berto|https://www.linkedin.com/in/renan-berto]\n\n## Suggested path\n\n`recruiter`\n\n`read bio`\n\n`read skills`\n\n`read projects`\n"
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
      "body": "# Skills\n\n::status[human-readable skills map]\n::stack[Cloud \u00b7 Kubernetes \u00b7 DevOps \u00b7 Security \u00b7 Observability \u00b7 AI]\n\nThis page is organized by engineering area instead of being a raw JSON dump.\n\n## Cloud and AWS\n\n::badge[AWS]\n::badge[EKS]\n::badge[Lambda]\n::badge[CloudFront]\n::badge[WAF]\n::badge[IAM]\n::badge[DynamoDB]\n::badge[SSM]\n\n:::callout[green]\nI work with AWS from the operational side: real workloads, permissions, logs, scaling, edge protection, automation and production behavior.\n:::\n\n- Multi-account AWS environments\n- IAM, AssumeRole and access boundaries\n- EKS and Kubernetes workload operations\n- Lambda and event-driven automation\n- CloudFront and AWS WAF protection\n- DynamoDB, SSM, SNS and operational workflows\n- CloudWatch metrics, logs and alarms\n\n## Kubernetes and platform engineering\n\n::badge[Kubernetes]\n::badge[Docker]\n::badge[Helm]\n::badge[HPA]\n::badge[Linux]\n\n:::grid\n:::card[Runtime]\nPods, deployments, services, ingress, probes, requests, limits and workload troubleshooting.\n:::\n\n:::card[Scaling]\nHPA behavior, node capacity, rollout strategy, production traffic and resource tuning.\n:::\n\n:::card[Delivery]\nHelm charts, environment configuration, Dockerized stacks and repeatable deployment patterns.\n:::\n:::\n\n## DevOps and automation\n\n::badge[GitHub Actions]\n::badge[CI/CD]\n::badge[Bash]\n::badge[Python]\n::badge[Runbooks]\n\n- Pipeline design and release workflows\n- Shell scripting and Linux automation\n- Python tools for operational workflows\n- Repeatable deployment and validation routines\n- Documentation that helps during incidents, not only during demos\n\n## Security and edge protection\n\n::badge[AWS WAF]\n::badge[Bot Control]\n::badge[CAPTCHA]\n::badge[Certificates]\n::badge[IAM]\n\n:::callout[yellow]\nSecurity work is usually a balance between blocking abuse, preserving legitimate users and keeping enough telemetry to know the difference.\n:::\n\n- Credential stuffing mitigation\n- User-agent and traffic behavior analysis\n- WAF rules and CloudFront edge controls\n- Certificate validation and expiration alerting\n- IAM least privilege and cross-account access patterns\n\n## Observability and production operations\n\n::badge[CloudWatch]\n::badge[Grafana]\n::badge[Container Insights]\n::badge[Logs]\n::badge[Metrics]\n\n- Dashboards and alerts\n- Incident investigation\n- Kubernetes pod and node analysis\n- Readiness and liveness behavior\n- Operational health checks\n- Signal correlation across logs, metrics and runtime state\n\n## Backend and product engineering\n\n::badge[Python]\n::badge[FastAPI]\n::badge[SQLAlchemy]\n::badge[MySQL]\n::badge[React-ready]\n\n- APIs and service integration\n- Internal tools and automation products\n- Dockerized local environments\n- Product thinking for engineering workflows\n\n## AI and modern engineering workflows\n\n::badge[OpenAI]\n::badge[Anthropic]\n::badge[Ollama]\n::badge[LiteLLM]\n::badge[RAG]\n::badge[AI Agents]\n\n:::callout[purple]\nI follow and experiment with AI tooling from an engineering workflow perspective: agents, local models, retrieval, model routing, repository understanding and automation.\n:::\n\n- LLM-assisted development and code review\n- Multi-model routing concepts\n- Local-first experiments with Ollama\n- LiteLLM and provider abstraction\n- RAG, embeddings and knowledge retrieval\n- AI agents for codebase and operational workflows\n- Documentation and incident support with AI assistance\n"
    },
    {
      "path": "/usr/recruiter.md",
      "title": "Recruiter View",
      "body": "# Recruiter View\n\n::status[quick profile]\n::stack[DevOps Engineer \u00b7 Cloud \u00b7 Kubernetes \u00b7 Automation \u00b7 AI]\n\n## Summary\n\nRenan Berto is a DevOps Engineer with a strong background in cloud infrastructure, Linux systems, Kubernetes, automation, observability, security hardening and modern AI-assisted engineering workflows.\n\n## Best fit\n\n:::grid\n:::card[DevOps / Platform Engineering]\nCloud platforms, CI/CD, Kubernetes, automation and developer experience.\n:::\n\n:::card[Cloud Operations]\nAWS environments, production readiness, monitoring, scaling and incident support.\n:::\n\n:::card[Security-minded DevOps]\nWAF, edge protection, certificate monitoring, IAM and operational visibility.\n:::\n\n:::card[AI-enabled Engineering]\nAgents, model routing, local LLMs, RAG concepts and AI-assisted documentation/workflows.\n:::\n:::\n\n## Strong signals\n\n- Comfortable with production systems and operational constraints.\n- Able to connect architecture, implementation and runtime behavior.\n- Interested in automation that actually reduces toil.\n- Understands both traditional DevOps and current AI engineering trends.\n- Builds with a product mindset, not only task execution.\n\n## Contact\n\n::link[Email|mailto:renanbertoo@gmail.com]\n::link[GitHub|https://github.com/renanberto]\n::link[LinkedIn|https://www.linkedin.com/in/renan-berto]\n"
    },
    {
      "path": "/data/portfolio.json",
      "title": "Portfolio Data",
      "body": "{\n  \"version\": \"Release 0.2.4-content-engine\",\n  \"profile\": {\n    \"name\": \"Renan Berto\",\n    \"role\": \"DevOps Engineer\",\n    \"headline\": \"Cloud, Kubernetes, automation, observability, security and practical AI workflows.\",\n    \"summary\": \"I build and operate production systems where reliability, visibility and automation matter. My work sits between engineering and operations: cloud infrastructure, Kubernetes, Linux, CI/CD, edge security, monitoring and tooling.\",\n    \"location\": \"Brazil\",\n    \"email\": \"renanbertoo@gmail.com\",\n    \"github\": \"https://github.com/renanberto\",\n    \"linkedin\": \"https://www.linkedin.com/in/renan-berto\",\n    \"photo\": \"assets/profile.png\"\n  },\n  \"recruiter\": {\n    \"summary\": \"DevOps Engineer with strong Linux and cloud background, comfortable with production operations, Kubernetes, automation, security hardening and AI-assisted engineering workflows.\",\n    \"bestFit\": [\n      \"DevOps Engineer\",\n      \"Platform Engineer\",\n      \"Cloud Engineer\",\n      \"SRE-oriented infrastructure roles\",\n      \"Automation and internal tooling roles\"\n    ],\n    \"signals\": [\n      \"Connects architecture, implementation and runtime behavior.\",\n      \"Comfortable with production constraints and incident context.\",\n      \"Uses automation to reduce toil and increase consistency.\",\n      \"Follows modern AI tooling from a practical engineering perspective.\",\n      \"Documents systems so other people can operate them.\"\n    ]\n  },\n  \"skills\": [\n    {\n      \"category\": \"Cloud and AWS\",\n      \"tone\": \"green\",\n      \"description\": \"AWS environments, production operations, access patterns, edge protection and automation.\",\n      \"items\": [\n        \"AWS\",\n        \"EKS\",\n        \"Lambda\",\n        \"CloudFront\",\n        \"WAF\",\n        \"IAM\",\n        \"DynamoDB\",\n        \"SSM\",\n        \"SNS\",\n        \"CloudWatch\"\n      ]\n    },\n    {\n      \"category\": \"Kubernetes and Containers\",\n      \"tone\": \"blue\",\n      \"description\": \"Runtime behavior, scaling, Helm, probes, resources and production troubleshooting.\",\n      \"items\": [\n        \"Kubernetes\",\n        \"Docker\",\n        \"Helm\",\n        \"HPA\",\n        \"Ingress\",\n        \"Probes\",\n        \"Requests/Limits\",\n        \"Container Insights\"\n      ]\n    },\n    {\n      \"category\": \"DevOps and Automation\",\n      \"tone\": \"yellow\",\n      \"description\": \"Pipelines, scripts, repeatable workflows, validation and operational hygiene.\",\n      \"items\": [\n        \"GitHub Actions\",\n        \"CI/CD\",\n        \"Bash\",\n        \"Python\",\n        \"Runbooks\",\n        \"Release workflows\",\n        \"Linux automation\"\n      ]\n    },\n    {\n      \"category\": \"Security and Edge\",\n      \"tone\": \"red\",\n      \"description\": \"Practical controls to slow abuse, improve visibility and protect accounts.\",\n      \"items\": [\n        \"AWS WAF\",\n        \"Bot Control\",\n        \"CAPTCHA\",\n        \"Credential stuffing mitigation\",\n        \"IAM\",\n        \"Certificates\",\n        \"Traffic analysis\"\n      ]\n    },\n    {\n      \"category\": \"Observability and Operations\",\n      \"tone\": \"purple\",\n      \"description\": \"Metrics, logs, dashboards, incident investigation and service health.\",\n      \"items\": [\n        \"Grafana\",\n        \"CloudWatch\",\n        \"Logs\",\n        \"Metrics\",\n        \"Alarms\",\n        \"Dashboards\",\n        \"Incident analysis\"\n      ]\n    },\n    {\n      \"category\": \"AI Engineering Workflows\",\n      \"tone\": \"cyan\",\n      \"description\": \"AI used as engineering leverage: agents, local models, retrieval and repository understanding.\",\n      \"items\": [\n        \"OpenAI\",\n        \"Anthropic\",\n        \"Ollama\",\n        \"LiteLLM\",\n        \"RAG\",\n        \"Embeddings\",\n        \"AI Agents\",\n        \"LLM-assisted development\"\n      ]\n    }\n  ],\n  \"projects\": [\n    {\n      \"id\": \"waf\",\n      \"title\": \"AWS WAF Security Cases\",\n      \"tag\": \"Security\",\n      \"problem\": \"Credential stuffing and abusive traffic patterns threaten account safety.\",\n      \"solution\": \"Edge controls using AWS WAF, CloudFront, Bot Control, CAPTCHA strategy and operational visibility.\",\n      \"stack\": [\n        \"AWS WAF\",\n        \"CloudFront\",\n        \"Bot Control\",\n        \"CAPTCHA\",\n        \"CloudWatch\"\n      ],\n      \"why\": \"Shows practical security engineering with tradeoffs, telemetry and production rollout.\",\n      \"command\": \"read waf\"\n    },\n    {\n      \"id\": \"certs\",\n      \"title\": \"AWS Certificate Validator\",\n      \"tag\": \"Automation\",\n      \"problem\": \"Certificates can expire silently across endpoints, files, keystores and AWS accounts.\",\n      \"solution\": \"Multi-account validation workflow with DynamoDB persistence and SNS notifications.\",\n      \"stack\": [\n        \"Lambda\",\n        \"SSM\",\n        \"DynamoDB\",\n        \"SNS\",\n        \"IAM AssumeRole\"\n      ],\n      \"why\": \"Reduces operational risk and turns hidden certificate state into visible signals.\",\n      \"command\": \"read certs\"\n    },\n    {\n      \"id\": \"bemod\",\n      \"title\": \"Bemod\",\n      \"tag\": \"AI Infrastructure\",\n      \"problem\": \"Different AI tasks need different models, costs, latency and runtime strategies.\",\n      \"solution\": \"Local/cloud model routing experiment using Ollama, LiteLLM and FastAPI.\",\n      \"stack\": [\n        \"Docker\",\n        \"FastAPI\",\n        \"LiteLLM\",\n        \"Ollama\",\n        \"Local LLMs\"\n      ],\n      \"why\": \"Explores AI engineering beyond prompts: routing, abstraction and runtime design.\",\n      \"command\": \"read bemod\"\n    },\n    {\n      \"id\": \"jira\",\n      \"title\": \"Jira + Confluence AI Integration\",\n      \"tag\": \"AI Workflow\",\n      \"problem\": \"Support teams repeat answers already documented in Confluence or previous tickets.\",\n      \"solution\": \"Webhook-driven retrieval workflow with evidence-based recommendations.\",\n      \"stack\": [\n        \"Jira\",\n        \"Confluence\",\n        \"AWS\",\n        \"OpenSearch-ready\",\n        \"RAG\"\n      ],\n      \"why\": \"Uses AI as targeted operational leverage grounded in internal knowledge.\",\n      \"command\": \"read jira\"\n    },\n    {\n      \"id\": \"corly\",\n      \"title\": \"Corly\",\n      \"tag\": \"Product\",\n      \"problem\": \"Real estate and financing workflows are often scattered across tools and spreadsheets.\",\n      \"solution\": \"CRM/workflow product concept for leads, proposals, contracts and commissions.\",\n      \"stack\": [\n        \"Python\",\n        \"FastAPI\",\n        \"SQLAlchemy\",\n        \"MySQL\",\n        \"React\",\n        \"Docker\"\n      ],\n      \"why\": \"Shows product thinking applied to operational workflows.\",\n      \"command\": \"read corly\"\n    },\n    {\n      \"id\": \"hermes\",\n      \"title\": \"Hermes / Remote Management\",\n      \"tag\": \"Architecture\",\n      \"problem\": \"Remote operations require controlled commands, authorization and auditability.\",\n      \"solution\": \"Command orchestration and get-data architecture using templates and authorities.\",\n      \"stack\": [\n        \"DynamoDB\",\n        \"Cognito\",\n        \"REST APIs\",\n        \"Command Templates\"\n      ],\n      \"why\": \"Demonstrates architecture thinking for safe remote operations.\",\n      \"command\": \"read hermes\"\n    }\n  ],\n  \"highlights\": [\n    {\n      \"label\": \"10+ years\",\n      \"value\": \"Engineering experience\"\n    },\n    {\n      \"label\": \"Cloud native\",\n      \"value\": \"AWS, Kubernetes and Linux\"\n    },\n    {\n      \"label\": \"Security-aware\",\n      \"value\": \"WAF, IAM and certificates\"\n    },\n    {\n      \"label\": \"AI-current\",\n      \"value\": \"Agents, RAG, local/cloud LLMs\"\n    }\n  ]\n}"
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
