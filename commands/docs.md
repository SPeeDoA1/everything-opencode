---
description: "Generate or update documentation for code"
---

# /docs Command

Generate or update documentation for code, APIs, or the project.

## Usage

```
/docs                        # Generate project README
/docs src/api/               # Document API endpoints
/docs src/utils/helpers.ts   # Document specific file
/docs --api                  # Generate API documentation
/docs --jsdoc                # Add JSDoc comments to code
```

## What This Command Does

1. Analyzes code structure and purpose
2. Generates appropriate documentation
3. Creates examples from tests
4. Updates existing docs to match code
5. Validates documentation accuracy

## Documentation Types

### README Generation

```markdown
# Project Name

Brief description of what this project does.

## Features

- Feature 1: Description
- Feature 2: Description

## Quick Start

```bash
npm install
npm run dev
```

## Usage

```typescript
import { main } from 'project';
main();
```

## API Reference

See [API Documentation](./docs/api.md)

## Contributing

See [Contributing Guide](./CONTRIBUTING.md)

## License

MIT
```

### API Documentation

```markdown
# API Reference

## Authentication

All endpoints require Bearer token authentication.

```
Authorization: Bearer <token>
```

## Endpoints

### Users

#### GET /api/users

List all users with pagination.

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| page | number | No | Page number (default: 1) |
| limit | number | No | Items per page (default: 20) |

**Response**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### POST /api/users

Create a new user.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
```

### JSDoc Comments

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
 * // Returns: { subtotal: 200, tax: 20, total: 220 }
 * ```
 *
 * @throws {ValidationError} If items array is empty
 * @see {@link applyDiscount} for discount logic
 */
function calculateTotal(
  items: CartItem[],
  options: CalculationOptions
): TotalBreakdown {
  // ...
}
```

## Output Format

```markdown
## Documentation Generated

### Files Created/Updated

| File | Action | Description |
|------|--------|-------------|
| README.md | Updated | Added Quick Start section |
| docs/api.md | Created | Full API reference |
| src/utils/helpers.ts | Updated | Added JSDoc comments |

### README.md Changes
```diff
+ ## Quick Start
+ 
+ ```bash
+ npm install
+ npm run dev
+ ```
```

### API Documentation
Generated documentation for 12 endpoints:
- GET /api/users (list)
- POST /api/users (create)
- GET /api/users/:id (get)
- ...

### Code Comments Added
- `src/utils/helpers.ts`: 5 functions documented
- `src/services/auth.ts`: 3 functions documented

### Validation
- ✅ All code examples compile
- ✅ API examples match actual responses
- ✅ Links are valid
```

## Example

```
/docs src/api/users.ts --api
```

Output:
```markdown
## API Documentation: Users

### Endpoints

#### `GET /api/users`
List users with optional filtering.

**Query Parameters:**
- `status` (string): Filter by status (active/inactive)
- `role` (string): Filter by role
- `page` (number): Page number
- `limit` (number): Results per page

**Example Request:**
```bash
curl -X GET "https://api.example.com/api/users?status=active&page=1" \
  -H "Authorization: Bearer <token>"
```

**Example Response:**
```json
{
  "data": [
    {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### `POST /api/users`
Create a new user account.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "user"
}
```

**Response (201):**
```json
{
  "data": {
    "id": "usr_456",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

**Errors:**
- `400`: Invalid request body
- `409`: Email already exists
- `422`: Validation error
```

## Documentation Standards

### Good Documentation Has:
- Clear purpose statement
- Installation/setup instructions
- Usage examples
- API reference
- Error handling guide
- Contributing guidelines

### JSDoc Best Practices:
- Describe what, not how
- Include examples
- Document parameters and returns
- Note exceptions thrown
- Link related functions

## Guidelines

When documenting:
- Write for your audience (developer, user, admin)
- Include working code examples
- Keep examples up to date with code
- Document edge cases and errors
- Use consistent formatting
