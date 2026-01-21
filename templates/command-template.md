# Command Template

Use this template to create new OpenCode slash commands.

## File Location

Commands should be placed in: `commands/<command-name>.md`

## Template

```markdown
# /command-name

Brief description of what this command does.

## Usage

\`\`\`
/command-name [arguments]
\`\`\`

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `arg1` | Yes | Description of first argument |
| `arg2` | No | Description of optional argument |

## Description

Detailed explanation of what the command does, step by step.

## Process

1. First step the command performs
2. Second step
3. Third step
4. Final output

## Examples

### Basic Usage

\`\`\`
/command-name file.ts
\`\`\`

### With Options

\`\`\`
/command-name file.ts --verbose
\`\`\`

## Output

Describe what output the user should expect.

## Related Commands

- `/related-command` - Description
- `/another-command` - Description
```

## Best Practices

1. **Use verb-based names** - `/review`, `/build`, `/deploy`
2. **Keep it simple** - One command, one purpose
3. **Document all arguments** - Even optional ones
4. **Provide examples** - Show real usage patterns
5. **Link related commands** - Help users discover features
