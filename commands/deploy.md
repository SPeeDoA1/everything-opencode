---
description: "Deploy application to staging or production"
---

# /deploy Command

Deploy the application to staging or production environments.

## Usage

```
/deploy staging             # Deploy to staging
/deploy production          # Deploy to production (with confirmation)
/deploy --dry-run           # Preview deployment changes
/deploy --rollback          # Rollback to previous version
```

## What This Command Does

1. Runs pre-deployment checks
2. Builds the application
3. Runs tests
4. Deploys to target environment
5. Runs post-deployment verification
6. Reports deployment status

## Pre-Deployment Checklist

```markdown
### Automated Checks
- [ ] Git working directory is clean
- [ ] On correct branch (main for prod, develop for staging)
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No security vulnerabilities (npm audit)
- [ ] Environment variables configured

### Manual Checks (Production)
- [ ] Changes reviewed and approved
- [ ] Database migrations tested
- [ ] Rollback plan in place
- [ ] Team notified
```

## Output Format

```markdown
## Deployment: Staging

### Pre-Deployment Checks
| Check | Status |
|-------|--------|
| Clean git state | ✅ |
| Correct branch (develop) | ✅ |
| Tests passing | ✅ (124/124) |
| Build successful | ✅ |
| Security audit | ✅ (0 vulnerabilities) |
| Env vars configured | ✅ |

### Build
```
Building for production...
✓ Compiled successfully in 12.3s
✓ Bundle size: 245 KB (gzipped)
```

### Deployment
```
Deploying to staging.example.com...
✓ Uploaded build artifacts
✓ Updated environment variables
✓ Restarted services
✓ Health check passed
```

### Post-Deployment Verification
| Check | Status |
|-------|--------|
| Health endpoint | ✅ 200 OK |
| Homepage loads | ✅ < 2s |
| API responding | ✅ |
| Database connected | ✅ |

### Summary
✅ **Deployment Successful**

- **Environment**: staging
- **Version**: v1.2.3 (abc1234)
- **URL**: https://staging.example.com
- **Duration**: 2m 34s
- **Deployed by**: user@example.com
- **Time**: 2024-01-15 14:30:00 UTC
```

## Production Deployment

```markdown
## Deployment: Production

⚠️ **Production Deployment Requires Confirmation**

### Changes to Deploy
- 3 commits since last deploy
- 12 files changed
- Database migrations: 1 pending

### Commits
```
abc1234 feat: Add user profile page
def5678 fix: Login timeout issue
ghi9012 chore: Update dependencies
```

### Confirmation Required
Type `DEPLOY PRODUCTION` to proceed:
> _

---

### Deployment in Progress...

| Step | Status | Duration |
|------|--------|----------|
| Build | ✅ | 45s |
| Tests | ✅ | 2m 10s |
| Database migration | ✅ | 5s |
| Blue-green deploy | ✅ | 1m 20s |
| Health checks | ✅ | 30s |
| Traffic switch | ✅ | 10s |

### ✅ Production Deployment Complete

**Version**: v1.2.3
**URL**: https://example.com
**Previous version retained for rollback**

### Monitoring
- [Grafana Dashboard](https://grafana.example.com)
- [Error Tracking](https://sentry.example.com)
- [Logs](https://logs.example.com)
```

## Rollback

```
/deploy --rollback production
```

Output:
```markdown
## Rollback: Production

### Current Version
- v1.2.3 (deployed 2 hours ago)

### Rolling Back To
- v1.2.2 (deployed 3 days ago)

### Confirmation
Type `ROLLBACK PRODUCTION` to proceed:
> _

---

### Rollback in Progress...
✓ Switching traffic to previous version
✓ Health checks passed

### ✅ Rollback Complete
- **Now running**: v1.2.2
- **Time**: 45 seconds
```

## Platform-Specific Commands

### Vercel
```bash
# Deploy preview
vercel

# Deploy production
vercel --prod

# Rollback
vercel rollback
```

### AWS (ECS)
```bash
# Update service
aws ecs update-service --cluster prod --service app --force-new-deployment

# Check status
aws ecs describe-services --cluster prod --services app
```

### Docker/Kubernetes
```bash
# Apply deployment
kubectl apply -f k8s/deployment.yaml

# Check rollout status
kubectl rollout status deployment/app

# Rollback
kubectl rollout undo deployment/app
```

## Example

```
/deploy staging
```

Output:
```markdown
## Deploying to Staging

### Running pre-deployment checks...
✅ All checks passed

### Building...
✅ Build successful (234 KB)

### Deploying...
✅ Deployed to staging.example.com

### Verifying...
✅ All health checks passed

---

**Deployment Complete**
- URL: https://staging.example.com
- Version: v1.2.3-beta
- Duration: 1m 45s
```

## Environment Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        run: |
          # Platform-specific deploy command
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

## Guidelines

When deploying:
- Always deploy to staging first
- Run full test suite before production
- Have rollback plan ready
- Monitor metrics after deploy
- Deploy during low-traffic periods
- Communicate with team about production deploys
