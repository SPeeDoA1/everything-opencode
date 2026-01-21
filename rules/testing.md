# Testing Rules

Standards for writing effective, maintainable tests.

## Test Structure

### Arrange-Act-Assert
```typescript
it('should apply discount for premium users', () => {
  // Arrange
  const user = createUser({ isPremium: true });
  const order = createOrder({ total: 100 });

  // Act
  const result = applyDiscount(user, order);

  // Assert
  expect(result.total).toBe(90);
});
```

### Naming Convention
```typescript
// Format: should_[behavior]_when_[condition]
describe('calculateDiscount', () => {
  it('should return 0 when order total is under $50', () => {});
  it('should apply 10% when user is premium', () => {});
  it('should throw ValidationError when amount is negative', () => {});
});
```

## Test Organization

### File Structure
```
src/
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts     # Co-located
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx    # Co-located
tests/
├── e2e/                       # E2E tests separate
│   └── auth.spec.ts
└── integration/               # Integration tests
    └── api.test.ts
```

### Test Grouping
```typescript
describe('UserService', () => {
  describe('create', () => {
    it('should create user with valid data', () => {});
    it('should hash password before saving', () => {});
    it('should throw on duplicate email', () => {});
  });

  describe('findById', () => {
    it('should return user when found', () => {});
    it('should return null when not found', () => {});
  });
});
```

## What to Test

### Unit Tests
- Pure functions
- Business logic
- Data transformations
- Edge cases
- Error conditions

```typescript
describe('validateEmail', () => {
  it('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('should reject email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('should reject empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

### Integration Tests
- API endpoints
- Database operations
- External service interactions

```typescript
describe('POST /api/users', () => {
  it('should create user and return 201', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
  });
});
```

### E2E Tests
- Critical user journeys
- Happy paths
- Key error scenarios

```typescript
test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await page.fill('#email', 'user@example.com');
  await page.click('[data-testid="place-order"]');
  
  await expect(page.locator('[data-testid="confirmation"]')).toBeVisible();
});
```

## Test Quality

### Avoid Testing Implementation
```typescript
// ❌ Tests implementation details
it('should call fetch with correct URL', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');
  getUser(123);
  expect(fetchSpy).toHaveBeenCalledWith('/api/users/123');
});

// ✅ Tests behavior
it('should return user data', async () => {
  const user = await getUser(123);
  expect(user.name).toBe('John');
});
```

### Keep Tests Independent
```typescript
// ❌ Tests depend on each other
let userId;
it('should create user', () => {
  userId = createUser({ name: 'John' });
});
it('should find created user', () => {
  const user = findUser(userId); // Depends on previous test!
});

// ✅ Each test is independent
it('should create user', () => {
  const userId = createUser({ name: 'John' });
  expect(userId).toBeDefined();
});

it('should find user', () => {
  const userId = createUser({ name: 'Jane' }); // Own setup
  const user = findUser(userId);
  expect(user.name).toBe('Jane');
});
```

### Use Factories
```typescript
// ✅ Factory functions for test data
function createUser(overrides = {}) {
  return {
    id: 'user_123',
    name: 'John Doe',
    email: 'john@example.com',
    ...overrides,
  };
}

it('should apply premium discount', () => {
  const user = createUser({ isPremium: true });
  // ...
});
```

## Mocking

### Mock External Dependencies
```typescript
// ✅ Mock external services
jest.mock('./emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

it('should send welcome email', async () => {
  await createUser({ email: 'user@example.com' });
  expect(sendEmail).toHaveBeenCalledWith(
    'user@example.com',
    expect.stringContaining('Welcome')
  );
});
```

### Don't Over-Mock
```typescript
// ❌ Mocking everything
jest.mock('./database');
jest.mock('./cache');
jest.mock('./logger');
jest.mock('./utils');

// ✅ Only mock what's necessary
// Use real implementations when possible
// Integration tests should use real database (test instance)
```

## Coverage

### Meaningful Coverage
```typescript
// Coverage targets
{
  "coverageThreshold": {
    "global": {
      "branches": 75,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### What NOT to Measure
- Generated code
- Type definitions
- Configuration files
- Index/barrel files

```typescript
// jest.config.js
{
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/*.stories.tsx"
  ]
}
```

## Test Commands

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific file
npm test -- path/to/file.test.ts

# Run in watch mode
npm test -- --watch

# Run matching pattern
npm test -- -t "should create user"
```

## Checklist

- [ ] Tests exist for all business logic
- [ ] Tests cover happy path and errors
- [ ] Tests are independent
- [ ] Tests are readable and maintainable
- [ ] No implementation details tested
- [ ] Appropriate mocking (not too much)
- [ ] Coverage meets thresholds
- [ ] E2E tests for critical flows
