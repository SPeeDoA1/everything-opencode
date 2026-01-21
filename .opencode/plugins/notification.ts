/**
 * Session Notification Plugin
 * 
 * Sends desktop notifications when sessions complete.
 * Useful for long-running tasks where you want to be notified.
 * 
 * Installation:
 * 1. Copy to .opencode/plugin/notification.ts
 * 2. Install dependencies: npm install node-notifier
 * 3. Add to opencode.json: { "plugin": ["./plugin/notification.ts"] }
 */

import type { Plugin } from "@opencode-ai/plugin"

// Configuration
const CONFIG = {
  // Only notify for sessions longer than this (ms)
  minDuration: 30_000, // 30 seconds
  
  // Notification sound (macOS)
  sound: true,
  
  // Include session summary in notification
  includeSummary: true,
}

const plugin: Plugin = (context) => {
  const sessionStartTimes = new Map<string, number>()

  return {
    "session.create": async (session) => {
      sessionStartTimes.set(session.id, Date.now())
    },

    "session.complete": async (session) => {
      const startTime = sessionStartTimes.get(session.id)
      if (!startTime) return

      const duration = Date.now() - startTime
      sessionStartTimes.delete(session.id)

      // Only notify for sessions longer than minDuration
      if (duration < CONFIG.minDuration) return

      try {
        // Dynamic import to handle missing dependency gracefully
        const notifier = await import('node-notifier')
        
        const durationStr = formatDuration(duration)
        const title = "OpenCode Session Complete"
        let message = `Session finished in ${durationStr}`

        if (CONFIG.includeSummary && session.summary) {
          message += `\n${session.summary.slice(0, 100)}`
        }

        notifier.default.notify({
          title,
          message,
          sound: CONFIG.sound,
          icon: undefined, // Add path to custom icon if desired
          timeout: 10,
        })
      } catch (error) {
        // node-notifier not installed, skip notification
        console.debug('Notification skipped: node-notifier not installed')
      }
    },
  }
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  }
  return `${seconds}s`
}

export default plugin
