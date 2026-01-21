# Skill Template

Use this template to create new OpenCode skills.

## File Location

Skills should be placed in:
- **Core skills**: `skills/core/<skill-name>/SKILL.md`
- **Stack skills**: `skills/stacks/<stack-name>/SKILL.md`

## Template

```markdown
---
name: skill-name
description: Brief description of what this skill provides
license: MIT
---

# Skill Title

Overview paragraph explaining what this skill covers and when to use it.

## When to Use

- Scenario 1 where this skill applies
- Scenario 2
- Scenario 3

## Prerequisites

List any required tools, dependencies, or knowledge.

## Core Concepts

### Concept 1

Explanation with code examples:

\`\`\`typescript
// Code example
function example() {
  return 'hello'
}
\`\`\`

### Concept 2

More detailed explanation.

## Patterns

### Pattern Name

Description of the pattern.

\`\`\`typescript
// Implementation example
\`\`\`

## Best Practices

1. **Practice 1** - explanation
2. **Practice 2** - explanation
3. **Practice 3** - explanation

## Common Pitfalls

\`\`\`typescript
// Bad: What not to do
badExample()

// Good: What to do instead
goodExample()
\`\`\`

## Checklist

- [ ] Item 1 to verify
- [ ] Item 2 to verify
- [ ] Item 3 to verify

## Resources

- [Link to documentation](https://example.com)
- [Related resource](https://example.com)
```

## YAML Frontmatter

The frontmatter is required and must include:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Kebab-case skill identifier |
| `description` | Yes | Brief description (< 100 chars) |
| `license` | Yes | License type (usually MIT) |

## Best Practices

1. **Use real code examples** - Not pseudocode
2. **Show good AND bad patterns** - Teach by contrast
3. **Include checklists** - Actionable verification steps
4. **Keep it practical** - Focus on real-world usage
5. **Update regularly** - Keep examples current
