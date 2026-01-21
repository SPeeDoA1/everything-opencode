import type { Plugin } from "@opencode-ai/plugin"

const TEST_PATTERNS = {
  jest: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
  vitest: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
  playwright: /\.spec\.(ts|js)$/,
}

const plugin: Plugin = (context) => {
  const modifiedTestFiles = new Set<string>()

  return {
    "file.edit": async (filePath) => {
      for (const pattern of Object.values(TEST_PATTERNS)) {
        if (pattern.test(filePath)) {
          modifiedTestFiles.add(filePath)
          break
        }
      }
    },

    "file.create": async (filePath) => {
      for (const pattern of Object.values(TEST_PATTERNS)) {
        if (pattern.test(filePath)) {
          modifiedTestFiles.add(filePath)
          break
        }
      }
    },

    "session.complete": async () => {
      if (modifiedTestFiles.size === 0) return

      const files = Array.from(modifiedTestFiles)
      modifiedTestFiles.clear()

      console.log(`\n📝 Modified test files this session:`)
      files.forEach(f => console.log(`   - ${f}`))
      console.log(`\n💡 Run tests: npm test -- ${files.join(' ')}`)
    },
  }
}

export default plugin
