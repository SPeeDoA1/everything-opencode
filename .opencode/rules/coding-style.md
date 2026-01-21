# Coding Style Rules

Consistent coding standards for maintainable code.

## Naming Conventions

### Variables & Functions
```typescript
// camelCase for variables and functions
const userName = 'John';
const isActive = true;
function getUserById(id: string) { }

// PascalCase for classes and components
class UserService { }
function UserProfile() { }

// SCREAMING_SNAKE_CASE for constants
const MAX_RETRIES = 3;
const API_BASE_URL = '/api/v1';

// Prefix booleans with is/has/should/can
const isLoading = true;
const hasPermission = false;
const shouldRefresh = true;
const canEdit = false;
```

### Files & Directories
```
# Components: PascalCase
UserProfile.tsx
UserProfile.test.tsx
UserProfile.module.css

# Utilities/hooks: camelCase
useAuth.ts
formatDate.ts

# Directories: kebab-case
user-management/
api-client/
```

## Code Structure

### Function Length
- Functions should do ONE thing
- Aim for < 30 lines per function
- Extract when function has multiple responsibilities

```typescript
// ❌ Too long, multiple responsibilities
function processOrder(order) {
  // 100 lines of validation, calculation, saving, emailing
}

// ✅ Single responsibility
function processOrder(order) {
  validateOrder(order);
  const totals = calculateTotals(order);
  await saveOrder(order, totals);
  await sendConfirmation(order);
}
```

### Early Returns
```typescript
// ❌ Nested conditionals
function getDiscount(user, order) {
  if (user) {
    if (user.isPremium) {
      if (order.total > 100) {
        return 0.2;
      }
    }
  }
  return 0;
}

// ✅ Early returns
function getDiscount(user, order) {
  if (!user) return 0;
  if (!user.isPremium) return 0;
  if (order.total <= 100) return 0;
  return 0.2;
}
```

### Avoid Magic Numbers
```typescript
// ❌ Magic numbers
if (retries > 3) { ... }
setTimeout(fn, 86400000);

// ✅ Named constants
const MAX_RETRIES = 3;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

if (retries > MAX_RETRIES) { ... }
setTimeout(fn, ONE_DAY_MS);
```

## TypeScript

### Prefer Interfaces for Objects
```typescript
// ✅ Interface for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Type for unions, intersections, utilities
type Status = 'pending' | 'active' | 'inactive';
type UserWithRole = User & { role: string };
```

### Avoid `any`
```typescript
// ❌ Never use any
function process(data: any) { }

// ✅ Use unknown with type guards
function process(data: unknown) {
  if (isUser(data)) {
    // data is typed as User
  }
}

// ✅ Or define proper types
function process(data: UserInput) { }
```

### Use Strict Null Checks
```typescript
// ✅ Handle null/undefined explicitly
function getUser(id: string): User | null {
  return users.find(u => u.id === id) ?? null;
}

const user = getUser(id);
if (user) {
  // user is typed as User (not null)
}
```

## Imports

### Order
```typescript
// 1. External libraries
import React from 'react';
import { z } from 'zod';

// 2. Internal modules (absolute paths)
import { Button } from '@/components';
import { useAuth } from '@/hooks';

// 3. Relative imports
import { formatDate } from './utils';
import type { User } from './types';

// 4. Styles
import styles from './Component.module.css';
```

### Named vs Default Exports
```typescript
// ✅ Prefer named exports
export function formatDate() { }
export const API_URL = '/api';

// Use default for main component in file
export default function UserProfile() { }
```

## Comments

### When to Comment
```typescript
// ✅ Explain WHY, not WHAT
// Using retry with backoff because the API is flaky under load
const result = await retryWithBackoff(fetchData, 3);

// ✅ Document complex algorithms
// Fisher-Yates shuffle for O(n) random ordering
function shuffle(array) { ... }

// ✅ Mark TODOs with context
// TODO(#123): Remove after feature flag rollout
```

### When NOT to Comment
```typescript
// ❌ Don't explain obvious code
// Increment counter by 1
counter++;

// ❌ Don't leave commented-out code
// function oldImplementation() { ... }
```

## Error Handling

```typescript
// ✅ Always handle errors
try {
  const data = await fetchData();
} catch (error) {
  logger.error('Failed to fetch', { error });
  throw new AppError('Data unavailable', { cause: error });
}

// ✅ Use custom error classes
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

## Async/Await

```typescript
// ✅ Always use async/await over .then()
async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// ✅ Handle errors with try/catch
async function fetchUser(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    throw new AppError('Failed to fetch user', { cause: error });
  }
}
```

## Formatting

Use automated formatting (Prettier):

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Linting

Use ESLint with strict rules:

```json
// .eslintrc
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```
