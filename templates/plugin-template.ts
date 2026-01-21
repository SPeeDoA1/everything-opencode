# Plugin Template

Use this template to create new OpenCode plugins.

## File Location

Plugins should be placed in: `plugins/<plugin-name>.ts`

## Template

```typescript
import { definePlugin } from '@opencode-ai/plugin'

/**
 * Plugin Name
 * 
 * Brief description of what this plugin does.
 */
export default definePlugin({
  name: 'plugin-name',
  version: '1.0.0',
  
  // Called when plugin is loaded
  setup(context) {
    console.log('Plugin initialized')
  },

  hooks: {
    // Before a file is read
    'file:beforeRead': async ({ filePath }) => {
      // Return false to block, true to allow
      return true
    },

    // After a file is read
    'file:afterRead': async ({ filePath, content }) => {
      // Can modify content
      return { content }
    },

    // Before a file is written
    'file:beforeWrite': async ({ filePath, content }) => {
      // Return false to block, modified content to change
      return { content }
    },

    // After a file is written
    'file:afterWrite': async ({ filePath }) => {
      // Post-write actions
    },

    // Before a bash command is executed
    'bash:beforeExecute': async ({ command }) => {
      // Return false to block, modified command to change
      return { command }
    },

    // After a bash command completes
    'bash:afterExecute': async ({ command, exitCode, stdout, stderr }) => {
      // Post-execution actions
    },

    // Before a commit is created
    'git:beforeCommit': async ({ message, files }) => {
      // Return false to block
      return true
    },

    // After a commit is created
    'git:afterCommit': async ({ hash, message }) => {
      // Post-commit actions
    },

    // When the session starts
    'session:start': async ({ sessionId }) => {
      // Session initialization
    },

    // When the session ends
    'session:end': async ({ sessionId, duration }) => {
      // Session cleanup
    },

    // Before a message is sent to the model
    'message:beforeSend': async ({ content }) => {
      // Can modify message content
      return { content }
    },

    // After a response is received
    'message:afterReceive': async ({ content }) => {
      // Process response
    },
  },
})
```

## Available Hooks

| Hook | Description | Can Block | Can Modify |
|------|-------------|-----------|------------|
| `file:beforeRead` | Before reading a file | Yes | No |
| `file:afterRead` | After reading a file | No | Yes (content) |
| `file:beforeWrite` | Before writing a file | Yes | Yes (content) |
| `file:afterWrite` | After writing a file | No | No |
| `bash:beforeExecute` | Before running command | Yes | Yes (command) |
| `bash:afterExecute` | After command completes | No | No |
| `git:beforeCommit` | Before creating commit | Yes | Yes (message) |
| `git:afterCommit` | After commit created | No | No |
| `session:start` | Session begins | No | No |
| `session:end` | Session ends | No | No |
| `message:beforeSend` | Before sending to model | No | Yes (content) |
| `message:afterReceive` | After response received | No | No |

## Context Object

The `context` object in `setup()` provides:

```typescript
interface PluginContext {
  // Project root directory
  projectRoot: string
  
  // OpenCode configuration
  config: OpenCodeConfig
  
  // Logger instance
  logger: Logger
  
  // Storage for plugin data
  storage: {
    get<T>(key: string): T | undefined
    set<T>(key: string, value: T): void
    delete(key: string): void
  }
}
```

## Best Practices

1. **Single responsibility** - One plugin, one purpose
2. **Handle errors gracefully** - Don't crash the session
3. **Use async/await** - All hooks are async
4. **Log appropriately** - Use context.logger
5. **Clean up resources** - Use session:end hook
6. **Document behavior** - Explain what the plugin does
7. **Test thoroughly** - Verify all edge cases

## Example: Simple Logger Plugin

```typescript
import { definePlugin } from '@opencode-ai/plugin'

export default definePlugin({
  name: 'simple-logger',
  version: '1.0.0',

  setup(context) {
    context.storage.set('startTime', Date.now())
  },

  hooks: {
    'file:afterWrite': async ({ filePath }) => {
      console.log(`[Logger] File written: ${filePath}`)
    },

    'bash:afterExecute': async ({ command, exitCode }) => {
      console.log(`[Logger] Command: ${command} (exit: ${exitCode})`)
    },

    'session:end': async ({ sessionId }) => {
      const startTime = this.context.storage.get<number>('startTime')
      const duration = Date.now() - (startTime || 0)
      console.log(`[Logger] Session ${sessionId} lasted ${duration}ms`)
    },
  },
})
```
