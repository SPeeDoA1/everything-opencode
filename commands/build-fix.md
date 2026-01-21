---
description: "Diagnose and fix build failures"
---

# /build-fix Command

Diagnose and fix build or compilation errors.

## Usage

```
/build-fix                  # Fix current build errors
/build-fix --typescript     # Focus on TypeScript errors
/build-fix --lint           # Fix linting errors
/build-fix --deps           # Fix dependency issues
```

## What This Command Does

1. Runs the build command
2. Parses error output
3. Identifies root causes
4. Applies fixes automatically when safe
5. Provides guidance for complex issues

## Common Build Errors

### TypeScript Errors

```typescript
// TS2322: Type 'string' is not assignable to type 'number'
// Fix: Correct the type or convert the value
const count: number = parseInt(value, 10);

// TS2339: Property 'x' does not exist on type 'Y'
// Fix: Add the property to the type or use optional chaining
interface Y {
  x?: string;
}

// TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'
// Fix: Ensure types match or add proper type guards
```

### Module Resolution

```typescript
// Cannot find module './component'
// Fixes:
// 1. Check file exists and path is correct
// 2. Check tsconfig.json paths configuration
// 3. Check file extension (.ts, .tsx, .js)

// Module has no exported member 'X'
// Fixes:
// 1. Check the export name in source file
// 2. Use correct import syntax (default vs named)
import { X } from './module';  // named export
import X from './module';       // default export
```

### Dependency Issues

```bash
# ERESOLVE: Peer dependency conflict
# Fixes:
npm install --legacy-peer-deps
# or resolve version conflicts in package.json

# Module not found
npm install <missing-module>

# Version mismatch
npm update <package>
```

## Output Format

```markdown
## Build Fix Report

### Build Command
```bash
npm run build
```

### Errors Found: 5

---

#### Error 1/5: TypeScript Error
**File**: `src/components/Button.tsx:15:3`
**Error**: TS2322: Type 'string' is not assignable to type 'boolean'

```diff
- <Button disabled="true">
+ <Button disabled={true}>
```

**Status**: ✅ Fixed automatically

---

#### Error 2/5: Missing Export
**File**: `src/utils/index.ts`
**Error**: Module '"./helpers"' has no exported member 'formatDate'

**Analysis**: `formatDate` was renamed to `formatDateTime` in helpers.ts

```diff
- export { formatDate } from './helpers';
+ export { formatDateTime } from './helpers';
```

**Status**: ✅ Fixed automatically

---

#### Error 3/5: Peer Dependency Conflict
**Error**: ERESOLVE unable to resolve dependency tree

**Conflict**:
- react@18.2.0 required
- react@17.0.2 installed

**Recommendation**: 
```bash
npm install react@18.2.0 react-dom@18.2.0
```

**Status**: ⚠️ Requires manual action

---

### Summary
| Status | Count |
|--------|-------|
| ✅ Auto-fixed | 3 |
| ⚠️ Manual fix needed | 2 |

### Next Steps
1. Review auto-fixed changes
2. Run: `npm install react@18.2.0 react-dom@18.2.0`
3. Update `src/legacy/oldComponent.tsx` (deprecated API usage)
4. Re-run build: `npm run build`
```

## Auto-Fix Capabilities

| Error Type | Auto-Fix |
|------------|----------|
| Missing imports | ✅ Yes |
| Type mismatches (simple) | ✅ Yes |
| Unused variables | ✅ Yes |
| Missing semicolons | ✅ Yes |
| Peer dependencies | ❌ No (guidance only) |
| Breaking API changes | ❌ No (guidance only) |
| Complex type errors | ❌ No (guidance only) |

## Example

```
/build-fix
```

Output:
```markdown
## Build Fix Report

### Running: npm run build

### Result: ✅ BUILD SUCCESSFUL

No errors found. Build completed in 12.3s.

### Warnings (2)
1. `src/utils/deprecated.ts` - Using deprecated API
2. `src/components/List.tsx` - Missing key prop in list

### Output
- Bundle size: 245 KB (gzipped)
- Build artifacts: dist/
```

## Guidelines

When fixing builds:
- Fix errors in dependency order (imports before usage)
- Don't suppress type errors with `any` or `@ts-ignore`
- Prefer fixing root cause over symptoms
- Run tests after fixes to ensure no regressions
- Commit fixes in logical groups
