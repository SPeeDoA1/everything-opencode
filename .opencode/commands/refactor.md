---
description: "Refactor code to improve quality without changing behavior"
---

# /refactor Command

Refactor code to improve readability, maintainability, and performance.

## Usage

```
/refactor <file or function>
/refactor src/utils/helpers.ts
/refactor --extract-function src/api/users.ts:50-80
/refactor --simplify src/services/order.ts
```

## What This Command Does

1. Analyzes code structure and complexity
2. Identifies refactoring opportunities
3. Applies safe transformations
4. Verifies tests still pass
5. Documents changes made

## Refactoring Patterns

### Extract Function

```typescript
// Before: Long function with multiple responsibilities
function processOrder(order: Order) {
  // Validate (15 lines)
  if (!order.items.length) throw new Error('Empty order');
  if (!order.customer) throw new Error('No customer');
  // ... more validation
  
  // Calculate totals (20 lines)
  let subtotal = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
  }
  // ... more calculations
  
  // Save (10 lines)
  await db.orders.create(order);
  // ... more save logic
}

// After: Extracted into focused functions
function processOrder(order: Order) {
  validateOrder(order);
  const totals = calculateTotals(order);
  await saveOrder(order, totals);
}

function validateOrder(order: Order) {
  if (!order.items.length) throw new Error('Empty order');
  if (!order.customer) throw new Error('No customer');
}

function calculateTotals(order: Order): OrderTotals {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  return { subtotal, tax: subtotal * 0.1, total: subtotal * 1.1 };
}
```

### Simplify Conditionals

```typescript
// Before: Nested conditionals
function getDiscount(user: User, order: Order) {
  if (user.isPremium) {
    if (order.total > 100) {
      if (order.items.length > 5) {
        return 0.2;
      }
      return 0.15;
    }
    return 0.1;
  }
  if (order.total > 200) {
    return 0.05;
  }
  return 0;
}

// After: Early returns and clear conditions
function getDiscount(user: User, order: Order) {
  if (!user.isPremium && order.total <= 200) return 0;
  if (!user.isPremium) return 0.05;
  if (order.total <= 100) return 0.1;
  if (order.items.length <= 5) return 0.15;
  return 0.2;
}
```

### Replace Magic Numbers

```typescript
// Before
if (password.length < 8) { ... }
if (attempts > 5) { ... }
setTimeout(fn, 300000);

// After
const MIN_PASSWORD_LENGTH = 8;
const MAX_LOGIN_ATTEMPTS = 5;
const SESSION_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

if (password.length < MIN_PASSWORD_LENGTH) { ... }
if (attempts > MAX_LOGIN_ATTEMPTS) { ... }
setTimeout(fn, SESSION_TIMEOUT_MS);
```

### Remove Duplication

```typescript
// Before: Duplicated validation
function createUser(data) {
  if (!data.email?.includes('@')) throw new Error('Invalid email');
  if (!data.name?.trim()) throw new Error('Name required');
  // ...
}

function updateUser(data) {
  if (!data.email?.includes('@')) throw new Error('Invalid email');
  if (!data.name?.trim()) throw new Error('Name required');
  // ...
}

// After: Shared validation
function validateUserData(data: UserData) {
  if (!data.email?.includes('@')) throw new Error('Invalid email');
  if (!data.name?.trim()) throw new Error('Name required');
}

function createUser(data) {
  validateUserData(data);
  // ...
}

function updateUser(data) {
  validateUserData(data);
  // ...
}
```

## Output Format

```markdown
## Refactoring Report: src/services/order.ts

### Analysis
- **Cyclomatic Complexity**: 15 → 6 (60% reduction)
- **Lines of Code**: 180 → 145 (19% reduction)
- **Functions**: 3 → 7 (smaller, focused functions)

### Changes Applied

#### 1. Extract Function: `validateOrder`
**Lines**: 12-35 → extracted to new function
**Reason**: Validation logic was mixed with business logic

```diff
- function processOrder(order) {
-   if (!order.items.length) throw new Error('Empty');
-   if (!order.customer) throw new Error('No customer');
-   // ... 20 more lines of validation
-   
-   // business logic
- }
+ function processOrder(order) {
+   validateOrder(order);
+   // business logic
+ }
+
+ function validateOrder(order) {
+   if (!order.items.length) throw new Error('Empty');
+   if (!order.customer) throw new Error('No customer');
+ }
```

#### 2. Simplify Conditional: `getDiscount`
**Lines**: 45-68
**Reason**: Reduced nesting from 4 levels to 1

#### 3. Replace Magic Numbers
**Lines**: Various
**Constants added**:
- `MAX_ORDER_ITEMS = 100`
- `MIN_ORDER_TOTAL = 1`
- `DEFAULT_TAX_RATE = 0.1`

### Verification
- ✅ All 24 tests passing
- ✅ No type errors
- ✅ Behavior unchanged

### Metrics
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Complexity | 15 | 6 | -60% |
| LOC | 180 | 145 | -19% |
| Duplication | 12% | 3% | -75% |
```

## Example

```
/refactor src/api/users.ts --simplify
```

Output:
```markdown
## Refactoring: src/api/users.ts

### Opportunities Found
1. ⚠️ `getUserById` - Complexity 12, could be simplified
2. ⚠️ `updateUser` - Duplicate validation with createUser
3. 💡 Magic numbers on lines 34, 56, 78

### Applied Changes
1. Simplified `getUserById` conditionals
2. Extracted shared `validateUserInput` function
3. Created constants for magic numbers

### Tests
✅ All tests pass (15/15)

### Review the changes?
The refactored code is ready. Would you like me to show the diff?
```

## Safety Checks

Before refactoring:
- [ ] Tests exist and pass
- [ ] Git working directory is clean
- [ ] Refactoring scope is defined

After refactoring:
- [ ] All tests still pass
- [ ] No type errors introduced
- [ ] Behavior is unchanged
- [ ] Code is more readable

## Guidelines

When refactoring:
- Make one type of change at a time
- Run tests after each change
- Don't mix refactoring with feature changes
- Keep commits atomic and well-described
- If tests fail, revert and investigate
