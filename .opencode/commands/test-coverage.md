---
description: "Analyze and improve test coverage"
---

# /test-coverage Command

Analyze test coverage and identify gaps that need testing.

## Usage

```
/test-coverage                    # Full coverage report
/test-coverage src/auth/          # Coverage for directory
/test-coverage --threshold 80     # Check against threshold
/test-coverage --untested         # Show only untested code
```

## What This Command Does

1. Runs test suite with coverage
2. Analyzes coverage report
3. Identifies untested code paths
4. Prioritizes what to test next
5. Generates test stubs for gaps

## Coverage Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Statements | Lines executed | 80%+ |
| Branches | Decision paths (if/else) | 75%+ |
| Functions | Functions called | 80%+ |
| Lines | Source lines covered | 80%+ |

## Output Format

```markdown
## Test Coverage Report

### Summary
| Metric | Coverage | Target | Status |
|--------|----------|--------|--------|
| Statements | 76.5% | 80% | ⚠️ Below |
| Branches | 68.2% | 75% | ⚠️ Below |
| Functions | 82.1% | 80% | ✅ Met |
| Lines | 77.3% | 80% | ⚠️ Below |

### Coverage by Directory
| Directory | Stmts | Branch | Funcs | Lines |
|-----------|-------|--------|-------|-------|
| src/api/ | 89% | 82% | 91% | 88% |
| src/auth/ | 45% | 38% | 52% | 46% |
| src/utils/ | 95% | 90% | 100% | 95% |
| src/services/ | 72% | 65% | 78% | 73% |

### ⚠️ Critical Gaps (High Priority)

#### 1. `src/auth/login.ts` - 45% coverage

**Untested code:**
- Lines 45-67: Error handling for invalid credentials
- Lines 78-92: Rate limiting logic
- Lines 100-115: Session creation

**Suggested tests:**
```typescript
describe('login', () => {
  it('should reject invalid credentials', async () => {
    const result = await login('user@test.com', 'wrong-password');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid credentials');
  });

  it('should rate limit after 5 failed attempts', async () => {
    for (let i = 0; i < 5; i++) {
      await login('user@test.com', 'wrong');
    }
    const result = await login('user@test.com', 'wrong');
    expect(result.error).toBe('Too many attempts');
  });
});
```

#### 2. `src/services/payment.ts` - 62% coverage

**Untested branches:**
- Line 34: `if (amount <= 0)` - negative amount handling
- Line 56: `catch` block - payment provider errors
- Line 78: `if (!customer.verified)` - unverified customer

---

### 💡 Quick Wins (Easy to Test)

| File | Current | Effort | Impact |
|------|---------|--------|--------|
| utils/format.ts | 85% | Low | +3% overall |
| api/health.ts | 60% | Low | +1% overall |
| services/email.ts | 70% | Medium | +2% overall |

### 📈 Coverage Trend
```
Last 5 runs:
Run 5: 76.5% ████████░░ (current)
Run 4: 75.2% ████████░░
Run 3: 74.8% ███████░░░
Run 2: 72.1% ███████░░░
Run 1: 70.0% ███████░░░
```

### Commands
```bash
# Run coverage
npm test -- --coverage

# View HTML report
open coverage/lcov-report/index.html

# Run specific file
npm test -- --coverage src/auth/login.test.ts
```
```

## Test Generation

The command can generate test stubs:

```typescript
// Generated stub for src/auth/login.ts

import { login, logout, refreshToken } from './login';

describe('login', () => {
  describe('login()', () => {
    it.todo('should successfully log in with valid credentials');
    it.todo('should reject invalid email format');
    it.todo('should reject wrong password');
    it.todo('should handle rate limiting');
    it.todo('should create session on success');
  });

  describe('logout()', () => {
    it.todo('should invalidate session');
    it.todo('should clear refresh token');
  });

  describe('refreshToken()', () => {
    it.todo('should issue new access token');
    it.todo('should reject expired refresh token');
  });
});
```

## Example

```
/test-coverage src/utils/
```

Output:
```markdown
## Test Coverage: src/utils/

### Summary
✅ Coverage meets threshold (92% > 80%)

| Metric | Coverage |
|--------|----------|
| Statements | 92.3% |
| Branches | 88.5% |
| Functions | 95.0% |
| Lines | 91.8% |

### File Breakdown
| File | Coverage | Status |
|------|----------|--------|
| format.ts | 100% | ✅ |
| validate.ts | 95% | ✅ |
| helpers.ts | 88% | ✅ |
| date.ts | 82% | ✅ |

### Minor Gaps
- `helpers.ts:45` - Edge case for empty array
- `date.ts:23` - Timezone handling branch

All critical paths are covered.
```

## Configuration

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Stricter for critical paths
    './src/auth/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};
```

## Guidelines

When improving coverage:
- Focus on critical business logic first
- Test error paths and edge cases
- Don't test implementation details
- Aim for meaningful tests, not just coverage numbers
- Consider mutation testing for true coverage quality
