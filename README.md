<p align="center">
  <img src="https://raw.githubusercontent.com/SPeeDoA1/everything-opencode/main/assets/logo.png" alt="Everything OpenCode" width="200"/>
</p>

<h1 align="center">Everything OpenCode</h1>

<p align="center">
  <strong>The ultimate collection of production-ready OpenCode configurations for the community.</strong>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-whats-inside">What's Inside</a> •
  <a href="#-agents">Agents</a> •
  <a href="#-commands">Commands</a> •
  <a href="#-skills">Skills</a> •
  <a href="#-plugins">Plugins</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/agents-15-blue?style=flat-square" alt="Agents"/>
  <img src="https://img.shields.io/badge/commands-12-green?style=flat-square" alt="Commands"/>
  <img src="https://img.shields.io/badge/skills-15-orange?style=flat-square" alt="Skills"/>
  <img src="https://img.shields.io/badge/plugins-10-purple?style=flat-square" alt="Plugins"/>
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" alt="License"/>
</p>

---

## 👋 About

Created by **[SPeeDoA1](https://github.com/SPeeDoA1)** — inspired by **[Affaan Mustafa](https://github.com/affaan-m)**'s incredible work on [Everything Claude Code](https://github.com/anthropics/courses).

This repository contains battle-tested agents, skills, commands, rules, plugins, and MCP configurations for [OpenCode](https://github.com/opencode-ai/opencode). Whether you're building with Next.js, React Native, Django, FastAPI, or any other stack, these configs will supercharge your AI-assisted development workflow.

> **"Standing on the shoulders of giants."** This project exists because of the amazing OpenCode and Claude Code communities. Give back when you can.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/SPeeDoA1/everything-opencode.git
cd everything-opencode
```

### 2. Install what you need

```bash
# Global installation (available in all projects)
cp -r agents/* ~/.config/opencode/agents/
cp -r commands/* ~/.config/opencode/commands/
cp -r skills/* ~/.config/opencode/skills/
cp -r plugins/* ~/.config/opencode/plugins/

# Or project-specific installation
mkdir -p .opencode
cp -r agents commands skills plugins rules .opencode/
```

### 3. Configure your opencode.json

Check out `examples/` for ready-to-use configurations:
- `basic-opencode.json` - Minimal setup
- `full-opencode.json` - Full-featured configuration
- `minimal-opencode.json` - Just the essentials

---

## 📦 What's Inside

```
everything-opencode/
│
├── 🤖 agents/              # 15 AI agents
│   ├── primary/            # Main agents (Tab to switch)
│   │   └── enhancer.md     # Code improvement & optimization
│   │
│   └── subagents/          # 14 specialized agents (@mention)
│       ├── code-reviewer.md
│       ├── security-auditor.md
│       ├── tdd-guide.md
│       ├── architect.md
│       ├── debug-investigator.md
│       └── ... (9 more)
│
├── ⚡ commands/             # 12 slash commands
│   ├── /review             # Code review
│   ├── /security           # Security audit
│   ├── /tdd                # Test-driven development
│   ├── /refactor           # Code cleanup
│   └── ... (8 more)
│
├── 🎯 skills/              # 15 workflow skills
│   ├── core/               # 8 universal skills
│   │   ├── tdd-workflow/
│   │   ├── security-review/
│   │   ├── code-review/
│   │   └── ... (5 more)
│   │
│   └── stacks/             # 7 stack-specific skills
│       ├── nextjs-patterns/
│       ├── react-native/
│       ├── typescript-strict/
│       └── ... (4 more)
│
├── 📜 rules/               # 7 modular guidelines
│   ├── security.md
│   ├── coding-style.md
│   ├── testing.md
│   └── ... (4 more)
│
├── 🔌 plugins/             # 10 automation plugins
│   ├── notification.ts
│   ├── env-protection.ts
│   ├── auto-format.ts
│   └── ... (7 more)
│
├── 🔧 mcp-configs/         # MCP server configurations
├── 📝 examples/            # Example configurations
└── 📋 templates/           # Starter templates
```

---

## 🤖 Agents

### Primary Agent

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| **enhancer** | Code improvement & optimization | Refactoring, optimization, security hardening |

> **Note:** OpenCode's built-in `build` and `plan` agents are not modified. The `enhancer` agent complements them.

### Subagents (14 specialists)

Invoke by **@mentioning** them:

```
@code-reviewer please review src/auth/
@security-auditor check for vulnerabilities
@architect design a caching layer
```

| Agent | Specialty |
|-------|-----------|
| `@code-reviewer` | Code quality & best practices |
| `@security-auditor` | Vulnerability scanning, OWASP |
| `@tdd-guide` | Test-driven development |
| `@architect` | System design & architecture |
| `@e2e-runner` | Playwright E2E tests |
| `@refactor-cleaner` | Dead code removal |
| `@doc-writer` | Documentation |
| `@performance-optimizer` | Performance tuning |
| `@debug-investigator` | Bug hunting |
| `@api-designer` | REST/GraphQL design |
| `@database-expert` | Schema & query optimization |
| `@devops-engineer` | CI/CD & infrastructure |
| `@accessibility-checker` | a11y compliance |
| `@dependency-manager` | Dependency updates |

---

## ⚡ Commands

| Command | Description |
|---------|-------------|
| `/plan` | Create implementation plan |
| `/tdd` | Start TDD workflow |
| `/review` | Code review |
| `/security` | Security audit |
| `/build-fix` | Fix build errors |
| `/test-coverage` | Coverage analysis |
| `/refactor` | Code cleanup |
| `/docs` | Update documentation |
| `/e2e` | Generate E2E tests |
| `/deploy` | Deployment checklist |
| `/perf` | Performance analysis |
| `/debug` | Debug assistance |

---

## 🎯 Skills

### Core Skills (8)

| Skill | Description |
|-------|-------------|
| `tdd-workflow` | Complete TDD cycle |
| `security-review` | OWASP security checklist |
| `code-review` | Review guidelines |
| `git-release` | Release management |
| `api-design` | REST/GraphQL patterns |
| `database-migration` | Safe migrations |
| `performance-audit` | Optimization checklist |
| `accessibility-check` | WCAG compliance |

### Stack-Specific Skills (7)

| Skill | Stack |
|-------|-------|
| `nextjs-patterns` | Next.js 14+ App Router |
| `react-native` | Expo & React Native |
| `react-patterns` | React hooks & patterns |
| `node-patterns` | Express/Fastify |
| `django-patterns` | Django & DRF |
| `fastapi-patterns` | FastAPI & Pydantic |
| `typescript-strict` | Strict TypeScript |

---

## 🔌 Plugins

| Plugin | Function |
|--------|----------|
| `notification.ts` | Desktop notifications |
| `env-protection.ts` | Block .env access |
| `auto-format.ts` | Auto-format on save |
| `console-log-warning.ts` | Warn on console.log |
| `test-watcher.ts` | Auto-run tests |
| `pr-helper.ts` | PR creation helper |
| `type-checker.ts` | TypeScript checking |
| `session-summary.ts` | Session summaries |
| `dangerous-command-blocker.ts` | Block dangerous commands |
| `pre-commit-check.ts` | Pre-commit validation |

---

## 📜 Rules

Modular guidelines to mix and match:

- **security.md** - No secrets, input validation
- **coding-style.md** - Clean code principles
- **testing.md** - TDD, 80% coverage
- **git-workflow.md** - Conventional commits
- **performance.md** - Optimization guidelines
- **documentation.md** - Doc requirements
- **agents.md** - Agent orchestration

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

### Ideas for Contributions

- 🦀 **New stacks** - Rust, Go, Swift, Kotlin
- 🚀 **Frameworks** - Laravel, Rails, Spring
- ☁️ **DevOps** - Kubernetes, Terraform, AWS
- 🤖 **Domains** - ML, data engineering
- 🔌 **Plugins** - New automations

---

## 🙏 Acknowledgments

- **[OpenCode](https://github.com/opencode-ai/opencode)** - The amazing AI coding assistant this is built for
- **[Affaan Mustafa](https://github.com/affaan-m)** - Inspiration from Everything Claude Code
- **The open source community** - For making all this possible

---

## 📄 License

MIT - Use freely, modify as needed, contribute back if you can.

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://github.com/SPeeDoA1">SPeeDoA1</a></strong>
</p>

<p align="center">
  ⭐ Star this repo if it helps. Build something great.
</p>
