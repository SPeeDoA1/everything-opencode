# Documentation Rules

Standards for writing and maintaining documentation.

## Code Documentation

### When to Comment

```typescript
// ✅ Explain WHY, not WHAT
// Using exponential backoff because the payment API has strict rate limits
const result = await retryWithBackoff(processPayment, 3);

// ✅ Document complex algorithms
// Fisher-Yates shuffle for O(n) random ordering
function shuffle<T>(array: T[]): T[] { ... }

// ✅ Note non-obvious behavior
// Returns null instead of throwing for invalid IDs to support optional lookups
function findUser(id: string): User | null { ... }

// ✅ Mark temporary code
// TODO(#123): Remove after feature flag rollout on 2024-03-01
if (featureFlags.oldFlow) { ... }
```

### When NOT to Comment

```typescript
// ❌ Don't state the obvious
// Increment counter by one
counter++;

// ❌ Don't leave commented-out code
// function oldImplementation() { ... }

// ❌ Don't duplicate the code
// Loop through users and check if active
users.forEach(user => {
  if (user.isActive) { ... }
});
```

### JSDoc for Public APIs

```typescript
/**
 * Calculates the total price including tax and discounts.
 *
 * @param items - Array of cart items
 * @param options - Calculation options
 * @returns Breakdown of totals
 *
 * @example
 * ```ts
 * const totals = calculateTotal(
 *   [{ price: 100, quantity: 2 }],
 *   { taxRate: 0.1 }
 * );
 * // { subtotal: 200, tax: 20, total: 220 }
 * ```
 *
 * @throws {ValidationError} If items array is empty
 */
function calculateTotal(
  items: CartItem[],
  options: CalculationOptions
): TotalBreakdown { ... }
```

## README Structure

```markdown
# Project Name

One-line description of what this project does.

## Features

- Feature 1
- Feature 2

## Quick Start

```bash
npm install
npm run dev
```

## Usage

Basic usage example.

## Configuration

Available configuration options.

## API Reference

Link to detailed API docs.

## Contributing

Link to contributing guide.

## License

MIT
```

## API Documentation

### Endpoint Documentation

```markdown
## POST /api/users

Create a new user account.

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Response (201)

```json
{
  "data": {
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Errors

| Status | Code | Description |
|--------|------|-------------|
| 400 | INVALID_JSON | Malformed request body |
| 409 | EMAIL_EXISTS | Email already registered |
| 422 | VALIDATION_ERROR | Invalid input data |
```

### OpenAPI/Swagger

```yaml
paths:
  /users:
    post:
      summary: Create user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: User created
        '422':
          description: Validation error
```

## Architecture Documentation

```markdown
# System Architecture

## Overview

High-level description with diagram.

## Components

### User Service
- **Purpose**: Handles user management
- **Location**: `src/services/user/`
- **Dependencies**: Database, Cache
- **API**: REST endpoints

## Data Flow

1. Request → API Gateway
2. API Gateway → Service
3. Service → Database
4. Response → Client

## Design Decisions

### ADR-001: Use PostgreSQL

**Context**: Need relational database for user data.
**Decision**: Use PostgreSQL.
**Consequences**: 
- Mature ecosystem
- Need to manage migrations
```

## Documentation Maintenance

### Keep Docs Near Code

```
src/
├── auth/
│   ├── login.ts
│   ├── login.test.ts
│   └── README.md      # Module docs
├── api/
│   └── README.md      # API overview
```

### Version Documentation

```markdown
## Changelog

### v2.0.0 (2024-01-15)

#### Breaking Changes
- Changed user endpoint response format

#### Features
- Added OAuth support

#### Fixes
- Fixed login timeout issue
```

### Link to Code

```markdown
See [`calculateDiscount`](../src/utils/pricing.ts#L45) 
for the implementation.
```

## Writing Style

### Be Concise

```markdown
<!-- ❌ Wordy -->
In order to be able to start the application, you will 
need to first make sure you have installed all the 
necessary dependencies.

<!-- ✅ Direct -->
Install dependencies:
```bash
npm install
```
```

### Use Active Voice

```markdown
<!-- ❌ Passive -->
The configuration file should be created in the root directory.

<!-- ✅ Active -->
Create the configuration file in the root directory.
```

### Structure for Scanning

```markdown
## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| port | number | 3000 | Server port |
| debug | boolean | false | Debug mode |

## Environment Variables

- `DATABASE_URL` - Database connection string
- `API_KEY` - External API key (required)
```

## Documentation Checklist

- [ ] README has quick start guide
- [ ] Public APIs have JSDoc comments
- [ ] Complex code has explanatory comments
- [ ] Architecture documented for new developers
- [ ] API endpoints documented
- [ ] Changelog maintained
- [ ] Examples are working and up-to-date
- [ ] No commented-out code
- [ ] Links are valid
