---
description: "Create a structured implementation plan with detailed tasks"
---

# /plan Command

Create a comprehensive implementation plan for a feature or task.

## Usage

```
/plan <description of feature or task>
```

## What This Command Does

1. Analyzes the requested feature/task
2. Breaks it down into actionable steps
3. Identifies dependencies between tasks
4. Estimates complexity for each step
5. Creates a prioritized todo list

## Output Format

```markdown
## Implementation Plan: [Feature Name]

### Overview
Brief description of what we're building and why.

### Prerequisites
- [ ] Dependency 1
- [ ] Dependency 2

### Phase 1: Foundation
| Task | Complexity | Dependencies |
|------|------------|--------------|
| Task 1 | Low | None |
| Task 2 | Medium | Task 1 |

### Phase 2: Core Implementation
...

### Phase 3: Polish & Testing
...

### Risks & Considerations
- Risk 1: Mitigation strategy
- Risk 2: Mitigation strategy

### Estimated Timeline
- Phase 1: X hours
- Phase 2: Y hours
- Phase 3: Z hours
- **Total**: X+Y+Z hours
```

## Example

```
/plan Add user authentication with OAuth2 support for Google and GitHub
```

Output:
```markdown
## Implementation Plan: OAuth2 Authentication

### Overview
Add social login capability using OAuth2, supporting Google and GitHub providers.

### Prerequisites
- [ ] Google Cloud Console project with OAuth credentials
- [ ] GitHub OAuth App registered
- [ ] Environment variables configured

### Phase 1: Foundation (2 hours)
| Task | Complexity | Dependencies |
|------|------------|--------------|
| Install auth dependencies | Low | None |
| Set up auth configuration | Low | Dependencies |
| Create User model updates | Medium | Config |

### Phase 2: Provider Integration (4 hours)
| Task | Complexity | Dependencies |
|------|------------|--------------|
| Implement Google OAuth | Medium | Foundation |
| Implement GitHub OAuth | Medium | Foundation |
| Create callback handlers | Medium | Providers |

### Phase 3: UI & Testing (3 hours)
| Task | Complexity | Dependencies |
|------|------------|--------------|
| Add login buttons | Low | Handlers |
| Handle auth state | Medium | Handlers |
| Write integration tests | Medium | All above |

### Risks & Considerations
- Rate limiting: Implement token refresh logic
- Account linking: Handle same email from different providers

### Estimated Timeline
- Phase 1: 2 hours
- Phase 2: 4 hours  
- Phase 3: 3 hours
- **Total**: ~9 hours
```

## Guidelines

When creating plans:
- Break tasks into 1-4 hour chunks
- Identify blocking dependencies clearly
- Include testing as explicit tasks
- Consider edge cases and error handling
- Note any required external setup (API keys, services)
