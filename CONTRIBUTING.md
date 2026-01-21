# Contributing to Everything OpenCode

Thank you for your interest in contributing! This project aims to be the most comprehensive collection of OpenCode configurations for the community.

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/everything-opencode.git
cd everything-opencode
```

### 2. Create a Branch

```bash
git checkout -b feature/my-new-agent
```

### 3. Make Your Changes

Follow the structure and patterns established in this repo.

### 4. Submit a Pull Request

- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
- Include a clear description of what you added
- Test your configurations before submitting

---

## Contribution Guidelines

### Agents

- Place primary agents in `agents/primary/`
- Place subagents in `agents/subagents/`
- Use the template in `templates/agent-template.md`
- Include clear descriptions and tool configurations
- Test with real-world scenarios

### Commands

- Place in `commands/`
- Use the template in `templates/command-template.md`
- Keep commands focused on a single workflow
- Include helpful descriptions

### Skills

- Core skills go in `skills/core/<name>/SKILL.md`
- Stack-specific skills go in `skills/stacks/<name>/SKILL.md`
- Use the template in `templates/skill-template.md`
- Follow the naming convention: lowercase with hyphens

### Plugins

- Place in `plugins/`
- Use the template in `templates/plugin-template.ts`
- Include TypeScript types
- Document what the plugin does

### Rules

- Place in `rules/`
- Keep rules modular and focused
- Can be combined in AGENTS.md

---

## Code of Conduct

- Be respectful and constructive
- Focus on helping the community
- Test your contributions
- Document your additions

---

## Questions?

Open an issue or start a discussion. We're here to help!
