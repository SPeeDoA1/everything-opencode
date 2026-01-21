---
description: "Run E2E tests using Playwright"
---

# /e2e Command

Run end-to-end tests with Playwright for browser automation testing.

## Usage

```
/e2e                         # Run all E2E tests
/e2e auth                    # Run tests matching "auth"
/e2e --headed                # Run with visible browser
/e2e --debug                 # Debug mode with inspector
/e2e --ui                    # Interactive UI mode
```

## What This Command Does

1. Starts the development/test server if needed
2. Runs Playwright E2E tests
3. Captures screenshots on failure
4. Generates test report
5. Provides debugging assistance

## Test Structure

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid credentials');
  });
});
```

## Output Format

```markdown
## E2E Test Results

### Summary
| Status | Count |
|--------|-------|
| ✅ Passed | 23 |
| ❌ Failed | 2 |
| ⏭️ Skipped | 1 |
| **Total** | 26 |

**Duration**: 45.2s
**Browsers**: chromium, firefox, webkit

---

### ❌ Failed Tests

#### 1. Authentication › should redirect after login
**File**: `tests/e2e/auth.spec.ts:45`
**Browser**: chromium

**Error**:
```
Expected: "/dashboard"
Received: "/login"
```

**Screenshot**: [View](./test-results/auth-should-redirect-screenshot.png)

**Possible Causes**:
- Login API returning error
- Session not being set
- Redirect logic failing

**Debug Command**:
```bash
npx playwright test auth.spec.ts:45 --debug
```

---

#### 2. Checkout › should complete purchase
**File**: `tests/e2e/checkout.spec.ts:78`
**Browser**: webkit

**Error**:
```
Timeout waiting for selector "[data-testid=confirmation]"
```

**Trace**: [View](./test-results/checkout-trace.zip)

---

### ✅ Passed Tests (23)
<details>
<summary>Click to expand</summary>

- Authentication › should login with valid credentials
- Authentication › should show error for invalid credentials
- Authentication › should logout successfully
- Dashboard › should display user stats
- ...
</details>

### Commands
```bash
# View HTML report
npx playwright show-report

# Run failed tests only
npx playwright test --last-failed

# Debug specific test
npx playwright test auth.spec.ts:45 --debug
```
```

## Common Commands

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/e2e/auth.spec.ts

# Run tests with specific tag
npx playwright test --grep @smoke

# Run in headed mode (see browser)
npx playwright test --headed

# Run in UI mode (interactive)
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Generate tests interactively
npx playwright codegen localhost:3000

# View last report
npx playwright show-report
```

## Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## Example

```
/e2e auth --headed
```

Output:
```markdown
## E2E Test Results: auth

### Running
```bash
npx playwright test auth --headed
```

### Results
✅ All tests passed (5/5)

| Test | Duration |
|------|----------|
| should login with valid credentials | 2.3s |
| should show error for invalid credentials | 1.8s |
| should logout successfully | 1.5s |
| should persist session | 2.1s |
| should redirect to requested page after login | 2.4s |

**Total Duration**: 10.1s
**Browser**: chromium (headed)

### View Report
```bash
npx playwright show-report
```
```

## Debugging Tips

### When Tests Fail

1. **View screenshot**: Check `test-results/` folder
2. **View trace**: `npx playwright show-trace trace.zip`
3. **Run in debug mode**: `npx playwright test --debug`
4. **Add pause**: `await page.pause();` in test

### Common Issues

| Issue | Solution |
|-------|----------|
| Element not found | Add `await expect(locator).toBeVisible()` |
| Timing issues | Use `waitFor` instead of fixed timeouts |
| Flaky tests | Add retries, use stable selectors |
| Auth issues | Use `storageState` for session reuse |

## Guidelines

When writing E2E tests:
- Use stable selectors (data-testid, roles, labels)
- Test user journeys, not implementation
- Keep tests independent
- Use Page Object Model for complex apps
- Run tests in CI on every PR
