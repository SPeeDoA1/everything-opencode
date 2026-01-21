import type { Plugin } from "@opencode-ai/plugin"

const CONSOLE_PATTERNS = [
  /console\.log\(/g,
  /console\.debug\(/g,
  /console\.info\(/g,
]

const ALLOWED_PATTERNS = [
  /console\.error\(/,
  /console\.warn\(/,
  /console\.time/,
  /console\.table\(/,
]

function containsConsoleLog(content: string): { found: boolean; lines: number[] } {
  const lines: number[] = []
  const contentLines = content.split('\n')

  contentLines.forEach((line, index) => {
    const isAllowed = ALLOWED_PATTERNS.some(p => p.test(line))
    if (isAllowed) return

    const hasConsole = CONSOLE_PATTERNS.some(p => p.test(line))
    if (hasConsole) {
      lines.push(index + 1)
    }
  })

  return { found: lines.length > 0, lines }
}

const plugin: Plugin = (context) => {
  return {
    "tool.execute.after": async (tool, args, result) => {
      if (tool !== 'write' && tool !== 'edit') return
      if (!args.filePath) return

      const ext = args.filePath.substring(args.filePath.lastIndexOf('.'))
      if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) return

      const content = args.content || args.newString || ''
      const { found, lines } = containsConsoleLog(content)

      if (found) {
        console.warn(
          `⚠️  Console.log detected in ${args.filePath} at line(s): ${lines.join(', ')}\n` +
          `   Consider using a proper logger or removing before commit.`
        )
      }
    },
  }
}

export default plugin
