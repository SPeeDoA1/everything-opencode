# Agent Template

Use this template to create new OpenCode agents (primary or subagents).

## File Location

- **Primary agents**: `agents/primary/<name>.md`
- **Subagents**: `agents/subagents/<name>.md`

## Template

```markdown
# Agent Name

Brief description of what this agent does (1-2 sentences).

## Role

Define the agent's primary responsibility and expertise area.

## Capabilities

- Capability 1
- Capability 2
- Capability 3

## Guidelines

### When to Activate

Describe the conditions or triggers for this agent.

### Process

1. Step one of the agent's workflow
2. Step two
3. Step three

### Output Format

Describe the expected output format.

## Examples

### Example Input

\`\`\`
User request example
\`\`\`

### Example Output

\`\`\`
Agent response example
\`\`\`

## Constraints

- What the agent should NOT do
- Limitations to respect
- Boundaries to maintain
```

## Best Practices

1. **Be specific** - Clearly define the agent's scope
2. **Provide examples** - Help the agent understand expected behavior
3. **Set boundaries** - Define what the agent should NOT do
4. **Keep it focused** - One agent, one responsibility
5. **Test thoroughly** - Verify the agent behaves as expected
