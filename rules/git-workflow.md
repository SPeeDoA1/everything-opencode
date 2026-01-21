# Git Workflow Rules

Standards for version control and collaboration.

## Commit Messages

### Format
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types
| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Formatting (no code change) |
| refactor | Code restructure |
| perf | Performance improvement |
| test | Tests |
| chore | Maintenance |

### Examples
```bash
# Feature
git commit -m "feat(auth): add OAuth2 login support"

# Bug fix
git commit -m "fix(api): handle null response from payment provider"

# Breaking change
git commit -m "feat(api)!: change user endpoint response format

BREAKING CHANGE: User endpoint now returns nested profile object"

# With body
git commit -m "refactor(db): migrate to connection pooling

- Replace individual connections with pool
- Add connection timeout handling
- Update all queries to use pool"
```

### Rules
- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at end
- Limit subject to 50 characters
- Wrap body at 72 characters

## Branch Strategy

### Branch Naming
```
feature/add-user-authentication
fix/login-timeout-issue
hotfix/critical-payment-bug
release/v1.2.0
docs/update-api-readme
```

### Git Flow
```
main         ─────────────●─────────────●─────────
                         ↑             ↑
release      ──────●────/───────●────/
                  ↑            ↑
develop      ●────●────●────●──●────●────●────●──
            ↑         ↑              ↑
feature     ●────●───/  ●───────●───/  ●───●───/
```

### Simplified Flow (for smaller teams)
```
main         ─────────────●─────────────●─────────
                         ↑             ↑
feature      ●────●────●─/  ●───────●─/
```

## Pull Requests

### PR Title Format
```
feat(scope): Brief description
fix(scope): Brief description
```

### PR Description Template
```markdown
## Summary
Brief description of changes.

## Changes
- Change 1
- Change 2

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if UI)
[Before/After screenshots]

## Related Issues
Closes #123
```

### PR Rules
- Keep PRs small (< 400 lines ideally)
- One logical change per PR
- All tests must pass
- Require at least one approval
- Squash commits when merging

## Code Review

### Review Checklist
- [ ] Code follows project conventions
- [ ] Tests exist and are meaningful
- [ ] No security issues
- [ ] No obvious performance issues
- [ ] Documentation updated if needed

### Comment Prefixes
```
blocking: Must fix before merge
suggestion: Improvement idea
question: Need clarification
nit: Minor style preference
```

## Merging

### Merge Strategy
```bash
# Feature branches → Squash merge
# Keeps history clean

# Release branches → Merge commit
# Preserves release history

# Hotfixes → Merge commit
# Preserves fix history
```

### Before Merging
```bash
# Update from main
git checkout feature/my-feature
git fetch origin
git rebase origin/main

# Or merge (if prefer)
git merge origin/main
```

## Protected Branches

### Main Branch Rules
- No direct pushes
- Require PR approval
- Require status checks to pass
- Require branch to be up to date
- Include administrators

### Release Branch Rules
- No direct pushes
- Require 2+ approvals
- Require all status checks

## Tags & Releases

### Semantic Versioning
```
MAJOR.MINOR.PATCH

1.0.0 → 2.0.0  # Breaking changes
1.0.0 → 1.1.0  # New features
1.0.0 → 1.0.1  # Bug fixes
```

### Creating Releases
```bash
# Tag a release
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Or use npm version
npm version minor
git push origin main --follow-tags
```

## Git Configuration

### Recommended Settings
```bash
# Set default branch name
git config --global init.defaultBranch main

# Auto-setup remote tracking
git config --global push.autoSetupRemote true

# Prune deleted remote branches
git config --global fetch.prune true

# Use rebase for pull
git config --global pull.rebase true
```

### .gitignore Essentials
```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment
.env
.env.local

# IDE
.idea/
.vscode/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
```

## Common Operations

### Fix Last Commit
```bash
# Amend message
git commit --amend -m "New message"

# Add forgotten file
git add forgotten-file.ts
git commit --amend --no-edit

# Only if NOT pushed yet!
```

### Undo Changes
```bash
# Discard uncommitted changes
git checkout -- file.ts
git restore file.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert pushed commit
git revert <commit-hash>
```

### Clean Up
```bash
# Remove untracked files
git clean -fd

# Remove merged branches
git branch --merged | grep -v main | xargs git branch -d
```

## Checklist

- [ ] Commits follow conventional format
- [ ] Branch named appropriately
- [ ] PR is reasonably sized
- [ ] All tests pass
- [ ] Code reviewed and approved
- [ ] No merge conflicts
- [ ] Changelog updated (if release)
