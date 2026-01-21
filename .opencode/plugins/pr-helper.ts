import type { Plugin } from "@opencode-ai/plugin"

const plugin: Plugin = (context) => {
  const changedFiles = new Set<string>()
  let sessionStartBranch: string | null = null

  return {
    "session.create": async () => {
      try {
        const { $ } = context
        const result = await $`git branch --show-current`
        sessionStartBranch = result.stdout.trim()
      } catch {
        sessionStartBranch = null
      }
    },

    "file.edit": async (filePath) => {
      changedFiles.add(filePath)
    },

    "file.create": async (filePath) => {
      changedFiles.add(filePath)
    },

    "session.complete": async () => {
      if (changedFiles.size === 0) return

      const files = Array.from(changedFiles)
      changedFiles.clear()

      console.log(`\n📋 PR Helper Summary`)
      console.log(`${'─'.repeat(40)}`)
      
      if (sessionStartBranch) {
        console.log(`Branch: ${sessionStartBranch}`)
      }
      
      console.log(`\nFiles changed (${files.length}):`)
      files.slice(0, 10).forEach(f => console.log(`  • ${f}`))
      if (files.length > 10) {
        console.log(`  ... and ${files.length - 10} more`)
      }

      console.log(`\n📝 Suggested PR commands:`)
      console.log(`   git add -A`)
      console.log(`   git commit -m "feat: <description>"`)
      console.log(`   git push -u origin HEAD`)
      console.log(`   gh pr create --fill`)
    },
  }
}

export default plugin
