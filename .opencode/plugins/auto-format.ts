import type { Plugin } from "@opencode-ai/plugin"

const FORMATTING_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.md']

const plugin: Plugin = (context) => {
  return {
    "file.edit": async (filePath) => {
      const ext = filePath.substring(filePath.lastIndexOf('.'))
      if (!FORMATTING_EXTENSIONS.includes(ext)) return

      try {
        const { $ } = context
        await $`npx prettier --write ${filePath}`
      } catch {
        // Prettier not available, skip formatting
      }
    },

    "file.create": async (filePath) => {
      const ext = filePath.substring(filePath.lastIndexOf('.'))
      if (!FORMATTING_EXTENSIONS.includes(ext)) return

      try {
        const { $ } = context
        await $`npx prettier --write ${filePath}`
      } catch {
        // Prettier not available, skip formatting
      }
    },
  }
}

export default plugin
