# Security Rules

Guidelines for maintaining security throughout the codebase.

## Authentication

### Password Handling
- NEVER store passwords in plain text
- Use bcrypt with cost factor ≥ 12
- Implement rate limiting on auth endpoints
- Require strong passwords (8+ chars, mixed case, numbers)

```typescript
// ✅ Correct password hashing
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### Session Management
- Use secure, httpOnly cookies
- Implement session expiration
- Rotate session IDs after login
- Provide logout functionality

```typescript
// ✅ Secure cookie settings
res.cookie('session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});
```

### JWT Best Practices
- Use strong secrets (256+ bits)
- Set appropriate expiration
- Validate all claims
- Use asymmetric keys for distributed systems

## Input Validation

### Always Validate User Input
```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150).optional(),
});

// Validate before using
const result = UserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(422).json({ errors: result.error.issues });
}
```

### SQL Injection Prevention
```typescript
// ❌ NEVER do this
db.query(`SELECT * FROM users WHERE email = '${email}'`);

// ✅ Always use parameterized queries
db.query('SELECT * FROM users WHERE email = $1', [email]);
```

### XSS Prevention
```typescript
// ❌ NEVER inject user content as HTML
element.innerHTML = userInput;

// ✅ Use text content
element.textContent = userInput;

// ✅ Or sanitize if HTML is required
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

## Secrets Management

### Never Commit Secrets
```bash
# .gitignore
.env
.env.local
*.pem
*.key
credentials.json
```

### Use Environment Variables
```typescript
// ✅ Load from environment
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;

// ✅ Validate at startup
if (!process.env.API_KEY) {
  throw new Error('API_KEY is required');
}
```

### Secret Detection
```bash
# Pre-commit hook with gitleaks
npx gitleaks detect --source . --verbose
```

## HTTP Security Headers

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
}));
```

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Global limiter
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// Stricter for auth
app.use('/api/auth/', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
}));
```

## File Upload Security

```typescript
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  },
});
```

## Dependency Security

```bash
# Regular audits
npm audit

# Fix vulnerabilities
npm audit fix

# Check before adding new packages
npm audit <package-name>
```

## Logging Security Events

```typescript
// Log security-relevant events
logger.info('User login', { userId, ip: req.ip });
logger.warn('Failed login attempt', { email, ip: req.ip });
logger.error('Unauthorized access attempt', { userId, resource });

// Never log sensitive data
// ❌ logger.info('Login', { password });
// ❌ logger.info('Payment', { creditCard });
```

## Checklist

- [ ] Passwords hashed with bcrypt
- [ ] Sessions expire appropriately
- [ ] Input validation on all endpoints
- [ ] Parameterized queries only
- [ ] No secrets in code
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Dependencies audited
- [ ] Security events logged
