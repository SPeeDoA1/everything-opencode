---
description: "Run a security audit on the codebase or specific files"
---

# /security Command

Perform a security audit to identify vulnerabilities and security issues.

## Usage

```
/security                   # Full codebase audit
/security src/auth/         # Audit specific directory
/security --deps            # Focus on dependencies
/security --secrets         # Scan for exposed secrets
```

## What This Command Does

1. Scans for common vulnerabilities
2. Checks for exposed secrets
3. Reviews authentication/authorization
4. Audits dependencies for known CVEs
5. Validates input handling

## Security Checks

### OWASP Top 10 Coverage

| Risk | Check |
|------|-------|
| Injection | SQL, NoSQL, Command, LDAP injection |
| Broken Auth | Session management, credential storage |
| Sensitive Data | Encryption, secure transmission |
| XXE | XML parser configuration |
| Broken Access | Authorization checks, IDOR |
| Misconfig | Default credentials, verbose errors |
| XSS | Output encoding, CSP |
| Deserialization | Unsafe deserialization |
| Vulnerable Components | Dependency audit |
| Logging | Sensitive data in logs |

### Secret Detection Patterns

```
# Patterns scanned:
- API keys: api[_-]?key.*['\"][a-zA-Z0-9]{20,}
- AWS keys: AKIA[0-9A-Z]{16}
- Private keys: -----BEGIN (RSA|DSA|EC) PRIVATE KEY-----
- Passwords: password\s*[:=]\s*['\"][^'\"]+
- Tokens: token.*['\"][a-zA-Z0-9-_.]{20,}
- Connection strings: mongodb://.*:.*@
```

## Output Format

```markdown
## Security Audit Report

### Summary
- **Critical**: 2
- **High**: 3
- **Medium**: 5
- **Low**: 8
- **Info**: 12

---

### 🔴 Critical Vulnerabilities

#### SEC-001: SQL Injection
**File**: `src/api/users.ts:45`
**CVSS**: 9.8

```typescript
// Vulnerable
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);

// Fixed
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
```

**Impact**: Attackers can read/modify/delete database content
**Remediation**: Use parameterized queries

---

#### SEC-002: Hardcoded API Key
**File**: `src/services/payment.ts:12`

```typescript
// Found
const STRIPE_KEY = 'sk_live_abc123...';  // EXPOSED!

// Should be
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
```

**Impact**: API key compromise, unauthorized charges
**Remediation**: Move to environment variables, rotate key immediately

---

### 🟠 High Severity

#### SEC-003: Missing Rate Limiting
**File**: `src/api/auth/login.ts`

Login endpoint has no rate limiting - vulnerable to brute force attacks.

**Remediation**: Add rate limiting (e.g., 5 attempts per minute per IP)

---

### 📦 Dependency Vulnerabilities

| Package | Version | Vulnerability | Severity | Fix |
|---------|---------|---------------|----------|-----|
| lodash | 4.17.15 | Prototype Pollution | High | Upgrade to 4.17.21 |
| axios | 0.21.0 | SSRF | Medium | Upgrade to 1.6.0 |

### ✅ Security Best Practices Found
- HTTPS enforced
- Passwords hashed with bcrypt
- JWT tokens have expiration
- CORS properly configured

### 📋 Recommendations
1. **Immediate**: Fix critical SQL injection and rotate exposed key
2. **This Sprint**: Add rate limiting, update dependencies
3. **Backlog**: Implement CSP headers, add security logging
```

## Example

```
/security src/api/
```

Output:
```markdown
## Security Audit: src/api/

### Summary
✅ No critical vulnerabilities found

### Findings

#### ⚠️ SEC-001: Missing Input Validation (Medium)
**File**: `src/api/posts.ts:34`

Request body not validated before use.

```typescript
// Add validation
import { z } from 'zod';
const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});
```

#### 💡 SEC-002: Consider CSRF Protection (Low)
State-changing endpoints should have CSRF tokens for browser clients.

### Passed Checks ✅
- No SQL injection vulnerabilities
- No hardcoded secrets
- Authentication properly implemented
- Authorization checks present
```

## Automated Checks

The command runs these tools when available:

```bash
# Dependency audit
npm audit

# Secret scanning
gitleaks detect

# Static analysis
semgrep --config auto

# SAST
npx eslint --plugin security
```

## Guidelines

When auditing:
- Check all user input paths
- Review authentication flows
- Verify authorization on every endpoint
- Scan for secrets in code and git history
- Audit third-party dependencies
- Check error messages for info leakage
