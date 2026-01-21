---
description: "Analyze and optimize application performance"
---

# /perf Command

Analyze application performance and identify optimization opportunities.

## Usage

```
/perf                        # Full performance audit
/perf --bundle               # Analyze bundle size
/perf --runtime              # Profile runtime performance
/perf --lighthouse           # Run Lighthouse audit
/perf src/components/        # Analyze specific directory
```

## What This Command Does

1. Runs performance profiling tools
2. Analyzes bundle size and composition
3. Identifies performance bottlenecks
4. Measures Core Web Vitals
5. Provides optimization recommendations

## Performance Metrics

### Core Web Vitals

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | < 4s | > 4s |
| FID (First Input Delay) | < 100ms | < 300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | < 500ms | > 500ms |

### Bundle Size Targets

| Type | Target | Warning |
|------|--------|---------|
| Initial JS | < 100 KB | > 200 KB |
| Total JS | < 300 KB | > 500 KB |
| CSS | < 50 KB | > 100 KB |
| Images | Optimized | Unoptimized |

## Output Format

```markdown
## Performance Report

### Summary
| Category | Score | Status |
|----------|-------|--------|
| Performance | 72 | ⚠️ Needs Work |
| Bundle Size | 85 | ✅ Good |
| Runtime | 68 | ⚠️ Needs Work |

---

### Core Web Vitals

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| LCP | 3.2s | < 2.5s | ⚠️ |
| FID | 45ms | < 100ms | ✅ |
| CLS | 0.05 | < 0.1 | ✅ |
| TTFB | 0.8s | < 0.8s | ✅ |

---

### Bundle Analysis

**Total Size**: 287 KB (gzipped)

| Chunk | Size | % of Total |
|-------|------|------------|
| main.js | 145 KB | 50% |
| vendor.js | 98 KB | 34% |
| styles.css | 44 KB | 16% |

**Largest Dependencies**:
| Package | Size | Used By |
|---------|------|---------|
| lodash | 45 KB | 3 files |
| moment | 38 KB | 2 files |
| chart.js | 32 KB | 1 file |

---

### 🔴 Critical Issues

#### 1. Large Contentful Paint too slow (3.2s)
**Impact**: Users perceive slow loading
**Cause**: Hero image not optimized, render-blocking CSS

**Fixes**:
```tsx
// Use Next.js Image with priority
import Image from 'next/image';
<Image src="/hero.jpg" priority />

// Inline critical CSS
<style jsx>{`/* critical styles */`}</style>
```

---

### ⚠️ Warnings

#### 2. Lodash fully imported (45 KB → 4 KB possible)
**File**: `src/utils/helpers.ts`

```typescript
// Current (imports entire library)
import _ from 'lodash';
_.debounce(fn, 300);

// Optimized (imports only what's needed)
import debounce from 'lodash/debounce';
debounce(fn, 300);
```

#### 3. Moment.js can be replaced (38 KB → 2 KB)
**Files**: `src/components/DatePicker.tsx`

```typescript
// Replace with date-fns or native
import { format } from 'date-fns';
// or
new Intl.DateTimeFormat('en-US').format(date);
```

---

### 💡 Recommendations

1. **Code Splitting** - Lazy load Chart.js component
   ```typescript
   const Chart = dynamic(() => import('./Chart'), { ssr: false });
   ```

2. **Image Optimization** - Convert to WebP, add srcset

3. **Font Loading** - Add `font-display: swap`

---

### Optimization Impact

| Optimization | Size Reduction | LCP Improvement |
|--------------|----------------|-----------------|
| Tree-shake lodash | -41 KB | -0.3s |
| Replace moment | -36 KB | -0.2s |
| Lazy load chart | -32 KB | -0.2s |
| **Total** | **-109 KB** | **-0.7s** |
```

## Bundle Analysis Commands

```bash
# Webpack bundle analyzer
npx webpack-bundle-analyzer stats.json

# Source map explorer
npx source-map-explorer dist/**/*.js

# Next.js specific
ANALYZE=true npm run build

# Package size check
npx package-phobia lodash
```

## Example

```
/perf --bundle
```

Output:
```markdown
## Bundle Analysis

### Size Summary
| Metric | Size | Status |
|--------|------|--------|
| Total (gzipped) | 187 KB | ✅ Good |
| Initial JS | 89 KB | ✅ Good |
| Total JS | 156 KB | ✅ Good |
| CSS | 31 KB | ✅ Good |

### Composition
```
main.js (89 KB)
├── react (42 KB)
├── app code (32 KB)
└── other (15 KB)

vendor.js (67 KB)
├── react-dom (38 KB)
├── zod (12 KB)
└── other (17 KB)
```

### Tree-Shaking Analysis
✅ All imports are tree-shakeable
✅ No unused exports detected

### Recommendations
- Consider lazy loading routes > 20 KB
- Move large dependencies to dynamic imports
```

## Performance Budget

```javascript
// performance-budget.json
{
  "bundles": [
    {
      "name": "main",
      "maxSize": "100 KB"
    },
    {
      "name": "vendor",
      "maxSize": "150 KB"
    }
  ],
  "metrics": {
    "LCP": "2.5s",
    "FID": "100ms",
    "CLS": "0.1"
  }
}
```

## Guidelines

When optimizing performance:
- Measure before and after every change
- Focus on user-perceived performance
- Optimize the critical rendering path
- Lazy load below-the-fold content
- Use performance budgets in CI
- Monitor real user metrics (RUM)
