import type { Plugin } from "@opencode-ai/plugin"

const TS_EXTENSIONS = ['.ts', '.tsx']

const plugin: Plugin = (context) => {
  const modifiedTsFiles = new Set<string>()

  return {
    "file.edit": async (filePath) => {
      const ext = filePath.substring(filePath.lastIndexOf('.'))
      if (TS_EXTENSIONS.includes(ext)) {
        modifiedTsFiles.add(filePath)
      }
    },

    "file.create": async (filePath) => {
      const ext = filePath.substring(filePath.lastIndexOf('.'))
      if (TS_EXTENSIONS.includes(ext)) {
        modifiedTsFiles.add(filePath)
      }
    },

    "session.complete": async () => {
      if (modifiedTsFiles.size === 0) return

      try {
        const { $ } = context
        console.log(`\n🔍 Running TypeScript check on ${modifiedTsFiles.size} modified files...`)
        
        const result = await $`npx tsc --noEmit`
        
        if (result.exitCode === 0) {
          console.log(`✅ No TypeScript errors found`)
        }
      } catch (error: any) {
        console.log(`\n❌ TypeScript errors detected:`)
        console.log(error.stderr || error.message)
        console.log(`\n💡 Run 'npx tsc --noEmit' to see all errors`)
      } finally {
        modifiedTsFiles.clear()
      }
    },
  }
}

export default plugin
