---
description: "Debug and investigate issues in the codebase"
---

# /debug Command

Systematically investigate and debug issues in the codebase.

## Usage

```
/debug <error message or description>
/debug "TypeError: Cannot read property 'x' of undefined"
/debug --trace src/api/users.ts
/debug --memory                    # Memory leak investigation
```

## What This Command Does

1. Analyzes the error or symptom
2. Identifies potential root causes
3. Traces code execution paths
4. Suggests debugging strategies
5. Provides fix recommendations

## Debugging Workflow

```
1. REPRODUCE → 2. ISOLATE → 3. IDENTIFY → 4. FIX → 5. VERIFY
```

## Output Format

```markdown
## Debug Investigation

### Issue
```
TypeError: Cannot read property 'map' of undefined
at UserList (src/components/UserList.tsx:15)
```

### Analysis

#### Root Cause Identified
The `users` prop is undefined when the component first renders, but `.map()` is called without a null check.

#### Code Location
**File**: `src/components/UserList.tsx:15`

```typescript
// Problem code
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Data Flow Trace
```
1. App.tsx renders UserList
2. useUsers() hook returns { users: undefined, loading: true }
3. UserList receives users=undefined
4. users.map() throws TypeError
```

### Fixes

#### Option 1: Add null check (Quick fix)
```typescript
function UserList({ users }) {
  return (
    <ul>
      {users?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

#### Option 2: Default parameter (Better)
```typescript
function UserList({ users = [] }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

#### Option 3: Loading state (Best)
```typescript
function UserList({ users, loading }) {
  if (loading) return <Skeleton />;
  if (!users?.length) return <EmptyState />;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Prevention
- Add TypeScript strict null checks
- Use default values for optional props
- Consider loading states in components

### Verification
```bash
npm test -- UserList
```
```

## Common Error Patterns

### TypeError: Cannot read property of undefined

```typescript
// Problem: Accessing nested property without checks
const name = user.profile.name;

// Fix: Optional chaining
const name = user?.profile?.name;

// Better: With fallback
const name = user?.profile?.name ?? 'Unknown';
```

### Async/Await Errors

```typescript
// Problem: Unhandled promise rejection
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// Fix: Proper error handling
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
```

### Race Conditions

```typescript
// Problem: Stale closure
useEffect(() => {
  fetch('/api/user/' + userId)
    .then(res => res.json())
    .then(setUser);
}, [userId]);

// Fix: Abort controller
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/user/' + userId, { signal: controller.signal })
    .then(res => res.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });
  
  return () => controller.abort();
}, [userId]);
```

### Memory Leaks

```typescript
// Problem: Event listener not cleaned up
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// Fix: Cleanup function
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## Debug Commands

```bash
# Node.js debugging
node --inspect app.js
node --inspect-brk app.js  # Break on first line

# Chrome DevTools
# Open chrome://inspect

# VS Code
# Add to launch.json and press F5

# Debug tests
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Example

```
/debug "Login button does nothing when clicked"
```

Output:
```markdown
## Debug Investigation: Login Button

### Symptom
Login button click has no visible effect.

### Investigation Steps

#### 1. Check Click Handler
**File**: `src/components/LoginForm.tsx:34`

```typescript
<button onClick={handleLogin}>Login</button>
```

Handler is attached. ✅

#### 2. Check Handler Implementation
**File**: `src/components/LoginForm.tsx:12`

```typescript
const handleLogin = async () => {
  await login(email, password);
};
```

No error handling, no loading state, no feedback. ⚠️

#### 3. Check login() Function
**File**: `src/services/auth.ts:45`

```typescript
export async function login(email, password) {
  const response = await fetch('/api/login', { ... });
  // No return statement!
}
```

Found issue: No return, no error handling. ❌

### Root Cause
1. `login()` doesn't return success/failure
2. `handleLogin()` doesn't handle the result
3. No user feedback on success or error

### Fix

```typescript
// auth.ts
export async function login(email: string, password: string) {
  const response = await fetch('/api/login', { ... });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}

// LoginForm.tsx
const handleLogin = async () => {
  setLoading(true);
  setError(null);
  
  try {
    await login(email, password);
    router.push('/dashboard');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Verification
1. Click login with valid credentials → redirects to dashboard
2. Click login with invalid credentials → shows error message
3. Button shows loading state while processing
```

## Guidelines

When debugging:
- Reproduce the issue consistently first
- Check the obvious things first
- Use binary search to narrow down the problem
- Add logging strategically, not everywhere
- Fix the root cause, not symptoms
- Add tests to prevent regression
