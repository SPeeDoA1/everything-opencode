# New Project Template

Use this template when setting up OpenCode for a new project.

## Quick Start

1. Create project structure:

```bash
mkdir -p .opencode/{agents/subagents,commands,skills,rules,plugins}
touch .opencode/opencode.json
```

2. Copy the base configuration:

```json
{
  "$schema": "https://opencode.ai/schema/opencode.json",
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",

  "rules": [
    "./.opencode/rules/project-rules.md"
  ],

  "commands": {
    "/review": "./.opencode/commands/review.md"
  },

  "context": {
    "include": [
      "src/**/*",
      "package.json",
      "tsconfig.json"
    ],
    "exclude": [
      "node_modules",
      "dist",
      ".git"
    ]
  }
}
```

3. Create your project rules (`.opencode/rules/project-rules.md`):

```markdown
# Project Rules

## Code Style

- Use TypeScript strict mode
- Prefer functional patterns
- Use meaningful variable names

## Architecture

- Follow feature-based structure
- Keep components small and focused
- Use dependency injection

## Testing

- Write tests for all new features
- Maintain >80% coverage
- Use descriptive test names
```

## Recommended Structure

```
your-project/
├── .opencode/
│   ├── opencode.json          # Main configuration
│   ├── agents/
│   │   └── subagents/         # Custom subagents
│   ├── commands/              # Custom commands
│   │   └── review.md
│   ├── skills/                # Project-specific skills
│   ├── rules/                 # Project rules
│   │   └── project-rules.md
│   └── plugins/               # Custom plugins
├── src/
├── tests/
├── package.json
└── tsconfig.json
```

## Scaling Up

As your project grows, add more configurations:

### Add Custom Commands

```json
{
  "commands": {
    "/review": "./.opencode/commands/review.md",
    "/deploy": "./.opencode/commands/deploy.md",
    "/test": "./.opencode/commands/test.md"
  }
}
```

### Add Subagents

```json
{
  "agents": {
    "subagents": {
      "domain-expert": "./.opencode/agents/subagents/domain-expert.md"
    }
  }
}
```

### Add Plugins

```json
{
  "plugins": [
    "./.opencode/plugins/custom-formatter.ts"
  ]
}
```

## Team Sharing

Commit `.opencode/` to version control so the whole team benefits:

```bash
git add .opencode/
git commit -m "Add OpenCode configuration"
```

## Next Steps

1. [ ] Customize rules for your project
2. [ ] Add project-specific commands
3. [ ] Create domain-specific subagents if needed
4. [ ] Set up MCP servers for external integrations
5. [ ] Document your configuration for the team
