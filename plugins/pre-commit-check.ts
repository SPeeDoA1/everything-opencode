import type { Plugin } from "@opencode-ai/plugin"

const GIT_COMMIT_PATTERN = /git\s+commit/

const plugin: Plugin = (context) => {
  return {
    "tool.execute.before": async (tool, args) => {
      if (tool !== 'bash') return
      if (!args.command) return
      if (!GIT_COMMIT_PATTERN.test(args.command)) return

      try {
        const { $ } = context
        
        const lintResult = await $`npm run lint --silent 2>/dev/null || true`
        if (lintResult.exitCode !== 0) {
          console.warn(`⚠️  Lint errors detected. Consider fixing before commit.`)
        }

        const testResult = await $`npm test --silent 2>/dev/null || true`
        if (testResult.exitCode !== 0) {
          console.warn(`⚠️  Test failures detected. Consider fixing before commit.`)
        }
      } catch {
        // Lint/test commands not available, skip
      }
    },

    "tool.execute.after": async (tool, args, result) => {
      if (tool !== 'bash') return
      if (!args.command) return
      if (!GIT_COMMIT_PATTERN.test(args.command)) return

      if (result.exitCode === 0) {
        console.log(`✅ Commit successful`)
        
        try {
          const { $ } = context
          const status = await $`git log -1 --pretty=format:"%h %s"`
          console.log(`   ${status.stdout}`)
        } catch {
          // Git not available
        }
      }
    },
  }
}

export default plugin
