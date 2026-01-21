---
description: "Start a TDD workflow - write tests first, then implement"
---

# /tdd Command

Start a Test-Driven Development workflow for implementing a feature.

## Usage

```
/tdd <feature or function description>
```

## What This Command Does

1. Clarifies requirements and expected behavior
2. Writes failing tests first
3. Implements minimal code to pass tests
4. Refactors while keeping tests green
5. Adds edge case tests

## TDD Cycle

```
┌─────────────────────────────────────────┐
│                                         │
│   RED → GREEN → REFACTOR → (repeat)     │
│                                         │
│   1. Write failing test                 │
│   2. Write minimal code to pass         │
│   3. Refactor, keep tests green         │
│                                         │
└─────────────────────────────────────────┘
```

## Example

```
/tdd Create a function to validate email addresses
```

### Step 1: RED - Write Failing Tests

```typescript
// email-validator.test.ts
import { validateEmail } from './email-validator';

describe('validateEmail', () => {
  describe('valid emails', () => {
    it('should accept standard email format', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });

    it('should accept email with subdomain', () => {
      expect(validateEmail('user@mail.example.com')).toBe(true);
    });

    it('should accept email with plus sign', () => {
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });
  });

  describe('invalid emails', () => {
    it('should reject email without @', () => {
      expect(validateEmail('userexample.com')).toBe(false);
    });

    it('should reject email without domain', () => {
      expect(validateEmail('user@')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });
});
```

### Step 2: GREEN - Minimal Implementation

```typescript
// email-validator.ts
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Step 3: REFACTOR - Improve Code Quality

```typescript
// email-validator.ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  if (typeof email !== 'string' || !email.trim()) {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}
```

### Step 4: Add Edge Cases

```typescript
describe('edge cases', () => {
  it('should handle whitespace-only input', () => {
    expect(validateEmail('   ')).toBe(false);
  });

  it('should trim whitespace from valid email', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });

  it('should reject multiple @ symbols', () => {
    expect(validateEmail('user@@example.com')).toBe(false);
  });
});
```

## Output Format

After running `/tdd`:

```markdown
## TDD Session: Email Validator

### Requirements Clarified
- Must validate format: user@domain.tld
- Should handle subdomains
- Should trim whitespace
- Should reject obviously invalid formats

### Test Cases (8 total)
✅ Valid: standard format
✅ Valid: with subdomain
✅ Valid: with plus sign
✅ Invalid: missing @
✅ Invalid: missing domain
✅ Invalid: empty string
✅ Edge: whitespace only
✅ Edge: multiple @

### Implementation
- File: `src/utils/email-validator.ts`
- Tests: `src/utils/email-validator.test.ts`
- Coverage: 100%

### Run Tests
```bash
npm test -- email-validator
```
```

## Guidelines

When using TDD:
- Start with the simplest test case
- Only write enough code to pass the current test
- Refactor only when tests are green
- Test behavior, not implementation
- Name tests descriptively (should_do_X_when_Y)
