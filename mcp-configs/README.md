# MCP Server Configurations

Example configurations for common MCP (Model Context Protocol) servers.

## What is MCP?

MCP allows OpenCode to connect to external tools and services through a standardized protocol. This enables features like:

- File system access
- GitHub integration
- Database queries
- Web browsing
- And more...

## Configuration Location

Add MCP servers to your `opencode.json`:

```json
{
  "mcp": {
    "servers": {
      "server-name": {
        "command": "npx",
        "args": ["-y", "@package/mcp-server"],
        "env": {
          "API_KEY": "${API_KEY}"
        }
      }
    }
  }
}
```

## Available Configurations

See individual files in this directory for specific server configurations:

- `filesystem.json` - File system access
- `github.json` - GitHub API integration
- `postgres.json` - PostgreSQL database
- `sqlite.json` - SQLite database
- `browser.json` - Web browsing capabilities
- `memory.json` - Persistent memory/knowledge base

## Environment Variables

Many servers require API keys or tokens. Set these as environment variables:

```bash
# In your shell profile or .env file
export GITHUB_TOKEN="your-token"
export DATABASE_URL="your-connection-string"
```

Reference them in config with `${VAR_NAME}` syntax.

## Security Notes

1. **Never commit secrets** - Use environment variables
2. **Limit file system access** - Only allow necessary directories
3. **Use read-only when possible** - Minimize write permissions
4. **Audit server permissions** - Understand what each server can do
