# Agent Rules

Guidelines for configuring and using OpenCode agents effectively.

## Agent Types

### Primary Agents

Primary agents are switchable using Tab key:

- **build**: Full development capabilities, all tools enabled
- **plan**: Analysis-only mode, write/edit disabled by default

### Subagents

Subagents are invoked via @mention or delegation:

```markdown
@code-reviewer Review this PR
@security-auditor Check for vulnerabilities
@doc-writer Generate API documentation
```

## Creating Custom Agents

### Markdown Configuration

Place in `.opencode/agent/<name>.md` or `~/.config/opencode/agent/<name>.md`:

```markdown
---
description: Brief description of what this agent does
mode: subagent
temperature: 0.3
tools:
  write: false
  edit: false
  bash: true
  read: true
permission: read
---

You are a specialized agent for [purpose].

## Your Role

Describe the agent's responsibilities.

## Guidelines

- Guideline 1
- Guideline 2

## Output Format

Describe expected output format.
```

### JSON Configuration

In `opencode.json`:

```json
{
  "agent": {
    "reviewer": {
      "description": "Code review specialist",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4",
      "temperature": 0.2,
      "tools": {
        "write": false,
        "edit": false
      }
    }
  }
}
```

## Agent Design Principles

### Single Responsibility

Each agent should have ONE clear purpose:

```markdown
// ✅ Good: Focused purpose
---
description: Reviews code for security vulnerabilities
---

// ❌ Bad: Too broad
---
description: Reviews code, writes docs, and fixes bugs
---
```

### Appropriate Permissions

Grant minimum necessary permissions:

```yaml
# Read-only agent (analysis)
tools:
  read: true
  glob: true
  grep: true
  write: false
  edit: false
  bash: false

# Write-capable agent (modifications)
tools:
  read: true
  write: true
  edit: true
  bash: true
```

### Clear Instructions

Provide specific guidance:

```markdown
## Your Role

You are a code reviewer. Your job is to:
1. Identify bugs and issues
2. Suggest improvements
3. Ensure code follows project conventions

## What to Check

- Code quality and readability
- Error handling
- Test coverage
- Security concerns

## Output Format

Provide feedback in this format:

### Summary
Overall assessment.

### Issues
1. [severity] Description
   - Location: file:line
   - Fix: Suggested solution

### Positive Notes
- What was done well
```

## Permission Levels

### Read Permission

```yaml
permission: read
# Can: Read files, search code, analyze
# Cannot: Modify files, run commands
```

### Write Permission

```yaml
permission: write
# Can: Read, write, edit files
# Cannot: Run arbitrary bash commands
```

### Full Permission

```yaml
permission: full
# Can: Everything including bash commands
# Use with caution
```

## Tool Configuration

### Enabling/Disabling Tools

```yaml
tools:
  # File operations
  read: true
  write: true
  edit: true
  glob: true
  grep: true
  
  # System operations
  bash: false          # Disable shell access
  
  # Web operations
  webfetch: true
  websearch: true
```

### Tool Restrictions

```json
{
  "permission": {
    "allow": [
      "read:**",
      "glob:**",
      "grep:**"
    ],
    "deny": [
      "write:**",
      "edit:**",
      "bash:**"
    ]
  }
}
```

## Model Selection

### Choosing Models

```yaml
# High-quality, expensive
model: anthropic/claude-sonnet-4

# Fast, cost-effective
model: anthropic/claude-haiku-4

# For specific providers
model: openai/gpt-4o
model: google/gemini-2.0-flash
```

### Temperature Settings

```yaml
# Low temperature (0.0-0.3): Consistent, deterministic
# Good for: Code generation, analysis, following instructions
temperature: 0.2

# Medium temperature (0.4-0.7): Balanced
# Good for: General tasks
temperature: 0.5

# High temperature (0.8-1.0): Creative, varied
# Good for: Brainstorming, creative writing
temperature: 0.9
```

## Agent Invocation

### Direct Mention

```
@security-auditor Check this file for vulnerabilities
```

### In Commands

```markdown
---
description: Security check command
agent: security-auditor
---

Check the following files for security issues: $ARGUMENTS
```

### Delegation from Primary Agent

The build agent can delegate to subagents:

```
Review this code using the code-reviewer agent.
```

## Best Practices

### Use Descriptive Names

```
// ✅ Good
code-reviewer
security-auditor
api-designer

// ❌ Bad
agent1
helper
misc
```

### Document Capabilities

```markdown
---
description: Reviews code for quality, security, and performance issues
---

## Capabilities

- Identify bugs and anti-patterns
- Check for security vulnerabilities
- Suggest performance improvements
- Ensure code style compliance

## Limitations

- Cannot modify code directly
- Cannot access external services
- Cannot run tests
```

### Test Agents

Before deploying, test agents with:

1. Simple tasks within their scope
2. Edge cases
3. Tasks outside their scope (should decline)
4. Multi-step workflows

## Common Patterns

### Review Agent

```markdown
---
description: Code review specialist
mode: subagent
tools:
  write: false
  edit: false
---

Review code for quality, security, and maintainability.
Provide actionable feedback without making changes.
```

### Documentation Agent

```markdown
---
description: Documentation writer
mode: subagent
tools:
  write: true
  edit: true
---

Generate and update documentation.
Only modify markdown files.
Follow project documentation standards.
```

### Research Agent

```markdown
---
description: Codebase researcher
mode: subagent
tools:
  read: true
  glob: true
  grep: true
  webfetch: true
---

Research and answer questions about the codebase.
Do not modify any files.
```

## Checklist

- [ ] Agent has clear, single purpose
- [ ] Permissions are minimized
- [ ] Instructions are specific
- [ ] Output format is defined
- [ ] Agent is tested
- [ ] Documentation is complete
