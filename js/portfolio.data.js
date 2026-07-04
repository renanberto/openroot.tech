window.OPENROOT_PORTFOLIO = {
  "version": "Release 0.2.4-content-engine",
  "profile": {
    "name": "Renan Berto",
    "role": "DevOps Engineer",
    "headline": "Cloud, Kubernetes, automation, observability, security and practical AI workflows.",
    "summary": "I build and operate production systems where reliability, visibility and automation matter. My work sits between engineering and operations: cloud infrastructure, Kubernetes, Linux, CI/CD, edge security, monitoring and tooling.",
    "location": "Brazil",
    "email": "renanbertoo@gmail.com",
    "github": "https://github.com/renanberto",
    "linkedin": "https://www.linkedin.com/in/renan-berto",
    "photo": "assets/profile.png"
  },
  "recruiter": {
    "summary": "DevOps Engineer with strong Linux and cloud background, comfortable with production operations, Kubernetes, automation, security hardening and AI-assisted engineering workflows.",
    "bestFit": [
      "DevOps Engineer",
      "Platform Engineer",
      "Cloud Engineer",
      "SRE-oriented infrastructure roles",
      "Automation and internal tooling roles"
    ],
    "signals": [
      "Connects architecture, implementation and runtime behavior.",
      "Comfortable with production constraints and incident context.",
      "Uses automation to reduce toil and increase consistency.",
      "Follows modern AI tooling from a practical engineering perspective.",
      "Documents systems so other people can operate them."
    ]
  },
  "skills": [
    {
      "category": "Cloud and AWS",
      "tone": "green",
      "description": "AWS environments, production operations, access patterns, edge protection and automation.",
      "items": [
        "AWS",
        "EKS",
        "Lambda",
        "CloudFront",
        "WAF",
        "IAM",
        "DynamoDB",
        "SSM",
        "SNS",
        "CloudWatch"
      ]
    },
    {
      "category": "Kubernetes and Containers",
      "tone": "blue",
      "description": "Runtime behavior, scaling, Helm, probes, resources and production troubleshooting.",
      "items": [
        "Kubernetes",
        "Docker",
        "Helm",
        "HPA",
        "Ingress",
        "Probes",
        "Requests/Limits",
        "Container Insights"
      ]
    },
    {
      "category": "DevOps and Automation",
      "tone": "yellow",
      "description": "Pipelines, scripts, repeatable workflows, validation and operational hygiene.",
      "items": [
        "GitHub Actions",
        "CI/CD",
        "Bash",
        "Python",
        "Runbooks",
        "Release workflows",
        "Linux automation"
      ]
    },
    {
      "category": "Security and Edge",
      "tone": "red",
      "description": "Practical controls to slow abuse, improve visibility and protect accounts.",
      "items": [
        "AWS WAF",
        "Bot Control",
        "CAPTCHA",
        "Credential stuffing mitigation",
        "IAM",
        "Certificates",
        "Traffic analysis"
      ]
    },
    {
      "category": "Observability and Operations",
      "tone": "purple",
      "description": "Metrics, logs, dashboards, incident investigation and service health.",
      "items": [
        "Grafana",
        "CloudWatch",
        "Logs",
        "Metrics",
        "Alarms",
        "Dashboards",
        "Incident analysis"
      ]
    },
    {
      "category": "AI Engineering Workflows",
      "tone": "cyan",
      "description": "AI used as engineering leverage: agents, local models, retrieval and repository understanding.",
      "items": [
        "OpenAI",
        "Anthropic",
        "Ollama",
        "LiteLLM",
        "RAG",
        "Embeddings",
        "AI Agents",
        "LLM-assisted development"
      ]
    }
  ],
  "projects": [
    {
      "id": "waf",
      "title": "AWS WAF Security Cases",
      "tag": "Security",
      "problem": "Credential stuffing and abusive traffic patterns threaten account safety.",
      "solution": "Edge controls using AWS WAF, CloudFront, Bot Control, CAPTCHA strategy and operational visibility.",
      "stack": [
        "AWS WAF",
        "CloudFront",
        "Bot Control",
        "CAPTCHA",
        "CloudWatch"
      ],
      "why": "Shows practical security engineering with tradeoffs, telemetry and production rollout.",
      "command": "read waf"
    },
    {
      "id": "certs",
      "title": "AWS Certificate Validator",
      "tag": "Automation",
      "problem": "Certificates can expire silently across endpoints, files, keystores and AWS accounts.",
      "solution": "Multi-account validation workflow with DynamoDB persistence and SNS notifications.",
      "stack": [
        "Lambda",
        "SSM",
        "DynamoDB",
        "SNS",
        "IAM AssumeRole"
      ],
      "why": "Reduces operational risk and turns hidden certificate state into visible signals.",
      "command": "read certs"
    },
    {
      "id": "bemod",
      "title": "Bemod",
      "tag": "AI Infrastructure",
      "problem": "Different AI tasks need different models, costs, latency and runtime strategies.",
      "solution": "Local/cloud model routing experiment using Ollama, LiteLLM and FastAPI.",
      "stack": [
        "Docker",
        "FastAPI",
        "LiteLLM",
        "Ollama",
        "Local LLMs"
      ],
      "why": "Explores AI engineering beyond prompts: routing, abstraction and runtime design.",
      "command": "read bemod"
    },
    {
      "id": "jira",
      "title": "Jira + Confluence AI Integration",
      "tag": "AI Workflow",
      "problem": "Support teams repeat answers already documented in Confluence or previous tickets.",
      "solution": "Webhook-driven retrieval workflow with evidence-based recommendations.",
      "stack": [
        "Jira",
        "Confluence",
        "AWS",
        "OpenSearch-ready",
        "RAG"
      ],
      "why": "Uses AI as targeted operational leverage grounded in internal knowledge.",
      "command": "read jira"
    },
    {
      "id": "corly",
      "title": "Corly",
      "tag": "Product",
      "problem": "Real estate and financing workflows are often scattered across tools and spreadsheets.",
      "solution": "CRM/workflow product concept for leads, proposals, contracts and commissions.",
      "stack": [
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "MySQL",
        "React",
        "Docker"
      ],
      "why": "Shows product thinking applied to operational workflows.",
      "command": "read corly"
    },
    {
      "id": "hermes",
      "title": "Hermes / Remote Management",
      "tag": "Architecture",
      "problem": "Remote operations require controlled commands, authorization and auditability.",
      "solution": "Command orchestration and get-data architecture using templates and authorities.",
      "stack": [
        "DynamoDB",
        "Cognito",
        "REST APIs",
        "Command Templates"
      ],
      "why": "Demonstrates architecture thinking for safe remote operations.",
      "command": "read hermes"
    }
  ],
  "highlights": [
    {
      "label": "10+ years",
      "value": "Engineering experience"
    },
    {
      "label": "Cloud native",
      "value": "AWS, Kubernetes and Linux"
    },
    {
      "label": "Security-aware",
      "value": "WAF, IAM and certificates"
    },
    {
      "label": "AI-current",
      "value": "Agents, RAG, local/cloud LLMs"
    }
  ]
};
