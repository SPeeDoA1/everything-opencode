# Performance Rules

Guidelines for building performant applications.

## Frontend Performance

### Bundle Size

```typescript
// ❌ Import entire library
import _ from 'lodash';
import moment from 'moment';

// ✅ Import only what you need
import debounce from 'lodash/debounce';
import { format } from 'date-fns';
```

### Code Splitting

```typescript
// ✅ Route-based splitting (automatic in Next.js)
// Each page is a separate chunk

// ✅ Component-based splitting
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// ✅ Conditional loading
const AdminPanel = React.lazy(() => 
  user.isAdmin ? import('./AdminPanel') : import('./UserPanel')
);
```

### Image Optimization

```tsx
// ✅ Use optimized image components
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority  // Above the fold
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ✅ Lazy load below-fold images
<Image
  src="/product.jpg"
  loading="lazy"
/>
```

### React Performance

```typescript
// ✅ Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// ✅ Memoize callbacks
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);

// ✅ Memoize components
const MemoizedList = React.memo(ItemList);

// ✅ Virtualize long lists
import { FixedSizeList } from 'react-window';

<FixedSizeList height={400} itemCount={10000} itemSize={50}>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

### Avoid Re-renders

```typescript
// ❌ Object created every render
<Component style={{ color: 'red' }} />
<Component onClick={() => handleClick(id)} />

// ✅ Stable references
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback((id) => { ... }, []);

<Component style={style} />
<Component onClick={handleClick} />
```

## API Performance

### Pagination

```typescript
// ✅ Always paginate list endpoints
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const offset = (page - 1) * limit;

  const [users, total] = await Promise.all([
    db.users.findMany({ skip: offset, take: limit }),
    db.users.count(),
  ]);

  res.json({
    data: users,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});
```

### Field Selection

```typescript
// ✅ Allow clients to request specific fields
app.get('/api/users/:id', async (req, res) => {
  const fields = req.query.fields?.split(',') || ['id', 'name', 'email'];
  const select = Object.fromEntries(fields.map(f => [f, true]));
  
  const user = await db.users.findById(req.params.id, { select });
  res.json({ data: user });
});
```

### Caching

```typescript
// ✅ Cache expensive operations
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedData(key, fetchFn) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// ✅ HTTP caching headers
res.set('Cache-Control', 'public, max-age=300');
res.set('ETag', generateETag(data));
```

### Compression

```typescript
import compression from 'compression';

app.use(compression({
  threshold: 1024, // Only compress > 1KB
}));
```

## Database Performance

### Indexing

```sql
-- ✅ Index frequently queried columns
CREATE INDEX idx_users_email ON users(email);

-- ✅ Composite index for multi-column queries
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- ✅ Partial index for filtered queries
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';
```

### Query Optimization

```sql
-- ✅ Always use EXPLAIN
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;

-- ❌ Avoid N+1 queries
-- Don't: Loop and query for each user
-- Do: Single query with JOIN

-- ✅ JOIN instead of multiple queries
SELECT u.*, o.* FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.id IN (1, 2, 3);

-- ✅ Select only needed columns
SELECT id, name, email FROM users;
-- Not: SELECT * FROM users;
```

### Connection Pooling

```typescript
// ✅ Use connection pool
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## General Rules

### Avoid Blocking Operations

```typescript
// ❌ Blocking file read
const data = fs.readFileSync('large-file.txt');

// ✅ Async file read
const data = await fs.promises.readFile('large-file.txt');

// ✅ Stream for large files
const stream = fs.createReadStream('huge-file.txt');
stream.pipe(res);
```

### Batch Operations

```typescript
// ❌ Individual operations
for (const item of items) {
  await db.insert(item);
}

// ✅ Batch insert
await db.batchInsert(items);

// ✅ Parallel with concurrency limit
import pLimit from 'p-limit';
const limit = pLimit(10);

await Promise.all(
  items.map(item => limit(() => processItem(item)))
);
```

### Debounce/Throttle

```typescript
// ✅ Debounce user input
const debouncedSearch = useMemo(
  () => debounce(search, 300),
  [search]
);

// ✅ Throttle scroll handlers
const throttledScroll = useMemo(
  () => throttle(handleScroll, 100),
  [handleScroll]
);
```

## Performance Budget

```json
{
  "bundles": {
    "main": "100 KB",
    "vendor": "150 KB"
  },
  "metrics": {
    "LCP": "2500ms",
    "FID": "100ms",
    "CLS": "0.1"
  }
}
```

## Monitoring

```typescript
// ✅ Track key metrics
performance.mark('operation-start');
await expensiveOperation();
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');

// ✅ Log slow operations
const start = Date.now();
const result = await query();
const duration = Date.now() - start;

if (duration > 1000) {
  logger.warn('Slow query', { query, duration });
}
```

## Checklist

- [ ] Bundle size within budget
- [ ] Images optimized and lazy-loaded
- [ ] Lists virtualized if > 100 items
- [ ] API responses paginated
- [ ] Database queries indexed
- [ ] No N+1 query patterns
- [ ] Caching implemented
- [ ] Performance monitored
