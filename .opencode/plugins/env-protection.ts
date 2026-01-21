/**
 * Environment Protection Plugin
 * 
 * Prevents accidental exposure of sensitive environment files.
 * Blocks read/write operations on .env files and other sensitive configs.
 * 
 * Installation:
 * 1. Copy to .opencode/plugin/env-protection.ts
 * 2. Add to opencode.json: { "plugin": ["./plugin/env-protection.ts"] }
 */

import type { Plugin } from "@opencode-ai/plugin"
import * as path from "path"

// Patterns for sensitive files
const SENSITIVE_PATTERNS = [
  /\.env$/,
  /\.env\..+$/,           // .env.local, .env.production, etc.
  /credentials\.json$/,
  /secrets\.json$/,
  /\.pem$/,
  /\.key$/,
  /id_rsa/,
  /id_ed25519/,
  /\.p12$/,
  /\.pfx$/,
  /keystore/,
]

// Files that are allowed (overrides patterns)
const ALLOWED_FILES = [
  '.env.example',
  '.env.template',
  '.env.sample',
]

function isSensitiveFile(filePath: string): boolean {
  const basename = path.basename(filePath)
  
  // Check if explicitly allowed
  if (ALLOWED_FILES.includes(basename)) {
    return false
  }
  
  // Check against sensitive patterns
  return SENSITIVE_PATTERNS.some(pattern => pattern.test(basename))
}

const plugin: Plugin = (context) => {
  return {
    "tool.execute.before": async (tool, args) => {
      // Check read operations
      if (tool === 'read' && args.filePath) {
        if (isSensitiveFile(args.filePath)) {
          throw new Error(
            `🔒 Access denied: "${path.basename(args.filePath)}" contains sensitive data.\n` +
            `If you need to reference environment variables, use .env.example as a template.`
          )
        }
      }

      // Check write operations
      if ((tool === 'write' || tool === 'edit') && args.filePath) {
        if (isSensitiveFile(args.filePath)) {
          throw new Error(
            `🔒 Write denied: Cannot modify sensitive file "${path.basename(args.filePath)}".\n` +
            `Manually edit this file or use .env.example for templates.`
          )
        }
      }

      // Check for secrets in content being written
      if ((tool === 'write' || tool === 'edit') && args.content) {
        const secretPatterns = [
          /api[_-]?key\s*[:=]\s*["'][a-zA-Z0-9]{20,}["']/i,
          /secret[_-]?key\s*[:=]\s*["'][a-zA-Z0-9]{20,}["']/i,
          /password\s*[:=]\s*["'][^"']{8,}["']/i,
          /AKIA[0-9A-Z]{16}/,  // AWS Access Key
          /-----BEGIN (RSA |DSA |EC )?PRIVATE KEY-----/,
        ]

        for (const pattern of secretPatterns) {
          if (pattern.test(args.content)) {
            throw new Error(
              `🔒 Secret detected: Content appears to contain hardcoded credentials.\n` +
              `Please use environment variables instead of hardcoding secrets.`
            )
          }
        }
      }
    },

    // Also check bash commands
    "tool.execute.before": async (tool, args) => {
      if (tool === 'bash' && args.command) {
        const dangerousCommands = [
          /cat\s+.*\.env/,
          /echo\s+.*\$\{?[A-Z_]*KEY/i,
          /echo\s+.*\$\{?[A-Z_]*SECRET/i,
          /echo\s+.*\$\{?[A-Z_]*PASSWORD/i,
          /printenv/,
          /export\s+.*=.*["'][^"']{20,}["']/,
        ]

        for (const pattern of dangerousCommands) {
          if (pattern.test(args.command)) {
            throw new Error(
              `🔒 Command blocked: This command may expose sensitive data.\n` +
              `Avoid printing or echoing environment variables with secrets.`
            )
          }
        }
      }
    },
  }
}

export default plugin
