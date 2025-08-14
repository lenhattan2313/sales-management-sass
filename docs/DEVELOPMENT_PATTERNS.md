# Development Patterns Memory

## Code Style & Structure Memory

### TypeScript Patterns

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use utility types for common patterns
- Avoid `any` - use proper typing or `unknown`
- Use path aliases for clean imports

### Feature-Based Organization

**File Structure by Feature:**

```
src/
├── types/                    # Feature-specific types
│   ├── auth.ts              # Authentication types
│   ├── product.ts           # Product management types
│   ├── order.ts             # Order management types
│   ├── tenant.ts            # Multi-tenant types
│   └── index.ts             # Main types export
├── components/              # UI components by feature
│   ├── ui/                  # Reusable UI components (Shadcn)
│   ├── auth/                # Authentication components
│   ├── product/             # Product management components
│   ├── order/               # Order management components
│   └── tenant/              # Multi-tenant components
├── lib/                     # Business logic by feature
│   ├── auth/                # Authentication logic
│   ├── product/             # Product management logic
│   ├── order/               # Order management logic
│   └── tenant/              # Multi-tenant logic
├── hooks/                   # Custom hooks by feature
│   ├── auth/                # Authentication hooks
│   ├── product/             # Product management hooks
│   ├── order/               # Order management hooks
│   └── tenant/              # Multi-tenant hooks
└── app/api/                 # API routes by feature
    ├── auth/                # Authentication API
    ├── products/            # Product management API
    ├── orders/              # Order management API
    └── tenants/             # Multi-tenant API
```

### Separation of Concerns

**Types Organization:**

- Each feature has its own types file
- No mixing of types from different features
- Common types in shared files only when necessary

**UI Components Organization:**

- Components grouped by feature domain
- Reusable UI components in shared ui/ folder
- Feature-specific components in their own folders
- **NEVER put multiple components in a single file** - each component should have its own file
- **Separate components by feature and responsibility**
- **Use index files for clean imports** when multiple related components exist

**Component Separation Rules:**

- ✅ **One component per file** - Each component gets its own `.tsx` file
- ✅ **Feature-based organization** - Group related components in feature folders
- ✅ **Clear naming** - Component file name should match the component name
- ✅ **Index exports** - Use `index.ts` files to export multiple components from a folder
- ❌ **Multiple components in one file** - Never put `ProductList`, `ProductCard`, and `ProductSkeleton` in the same file
- ❌ **Mixed responsibilities** - Don't mix different feature components in the same file
- ❌ **Unclear naming** - Avoid generic names like `components.tsx` or `index.tsx` for component files

**Example of Proper Component Separation:**

```
src/components/features/products/
├── index.ts                 # Export all product components
├── product-list.tsx         # Main ProductList component only
├── product-card.tsx         # ProductCard component only
├── product-skeleton.tsx     # ProductSkeleton component only
├── product-filters.tsx      # ProductFilters component only
└── product-search.tsx       # ProductSearch component only
```

**Example of Improper Component Organization (AVOID):**

```typescript
// ❌ DON'T DO THIS - Multiple components in one file
// src/components/features/products/product-list.tsx
export function ProductList() { /* ... */ }
export function ProductCard() { /* ... */ }
export function ProductSkeleton() { /* ... */ }
```

**Example of Proper Component Organization (DO THIS):**

```typescript
// ✅ DO THIS - One component per file
// src/components/features/products/product-list.tsx
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";

export function ProductList() {
  // Only ProductList logic here
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// src/components/features/products/product-card.tsx
export function ProductCard({ product }: ProductCardProps) {
  // Only ProductCard logic here
  return <div>{/* ProductCard JSX */}</div>;
}

// src/components/features/products/product-skeleton.tsx
export function ProductSkeleton() {
  // Only ProductSkeleton logic here
  return <div>{/* Skeleton JSX */}</div>;
}

// src/components/features/products/index.ts
export { ProductList } from "./product-list";
export { ProductCard } from "./product-card";
export { ProductSkeleton } from "./product-skeleton";
```

**UI Component Development Workflow:**

1. **ALWAYS check Shadcn UI first** - Visit [ui.shadcn.com](https://ui.shadcn.com/) before creating any new UI component
2. **Install from Shadcn** - Use `npx shadcn@latest add [component-name]` to install existing components
3. **Customize Shadcn components** - Extend and customize Shadcn components rather than building from scratch
4. **Only create custom components** when Shadcn doesn't provide what you need
5. **Follow Shadcn patterns** - Use the same styling and structure patterns as Shadcn components
6. **Maintain consistency** - Ensure all UI components follow the same design system

**Shadcn UI Priority:**

- ✅ **Use Shadcn components** for all common UI elements (buttons, inputs, cards, etc.)
- ✅ **Extend Shadcn components** for feature-specific needs
- ✅ **Follow Shadcn conventions** for styling and structure
- ❌ **Avoid building from scratch** when Shadcn provides the component
- ❌ **Don't mix different UI libraries** - stick to Shadcn + Radix + Tailwind

**Business Logic Organization:**

- Server-side logic separated by feature
- Database operations grouped by domain
- Validation logic with feature-specific schemas

**Custom Hooks Organization:**

- Client-side logic organized by feature
- State management hooks per feature
- API integration hooks per feature

**API Routes Organization:**

- RESTful endpoints grouped by feature
- Each feature has its own API folder
- Consistent naming and structure across features

### File Naming Conventions

- Components: PascalCase (`ProductCard.tsx`)
- Utilities: camelCase (`formatPrice.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- Directories: kebab-case (`product-management/`)

### Feature-Specific File Organization

**Authentication Feature:**

```
src/
├── types/auth.ts
├── components/auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── AuthProvider.tsx
├── lib/auth/
│   ├── auth-service.ts
│   ├── auth-validation.ts
│   └── auth-utils.ts
├── hooks/auth/
│   ├── useAuth.ts
│   ├── useLogin.ts
│   └── useRegister.ts
└── app/api/auth/
    ├── login/route.ts
    ├── register/route.ts
    └── logout/route.ts
```

**Product Management Feature:**

```
src/
├── types/product.ts
├── components/product/
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── ProductList.tsx
├── lib/product/
│   ├── product-service.ts
│   ├── product-validation.ts
│   └── product-utils.ts
├── hooks/product/
│   ├── useProducts.ts
│   ├── useProduct.ts
│   └── useProductForm.ts
└── app/api/products/
    ├── route.ts
    └── [id]/route.ts
```

**Order Management Feature:**

```
src/
├── types/order.ts
├── components/product/
│   ├── OrderCard.tsx
│   ├── OrderForm.tsx
│   └── OrderList.tsx
├── lib/order/
│   ├── order-service.ts
│   ├── order-validation.ts
│   └── order-utils.ts
├── hooks/order/
│   ├── useOrders.ts
│   ├── useOrder.ts
│   └── useCart.ts
└── app/api/orders/
    ├── route.ts
    └── [id]/route.ts
```

**Multi-Tenant Feature:**

```
src/
├── types/tenant.ts
├── components/tenant/
│   ├── TenantCard.tsx
│   ├── TenantForm.tsx
│   └── TenantList.tsx
├── lib/tenant/
│   ├── tenant-service.ts
│   ├── tenant-validation.ts
│   └── tenant-utils.ts
├── hooks/tenant/
│   ├── useTenants.ts
│   ├── useTenant.ts
│   └── useTenantSettings.ts
└── app/api/tenants/
    ├── route.ts
    └── [id]/route.ts
```

## State Management Patterns

### Server State (Preferred)

```typescript
// Use React Server Components for data fetching
async function ProductList() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}

// For large datasets, use streaming
async function ProductListStreaming() {
  const products = await getProducts();
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductGrid products={products} />
    </Suspense>
  );
}
```

### Client State (When Needed)

```typescript
"use client";

// Use nuqs for URL state
import { useQueryState } from "nuqs";

function SearchFilter() {
  const [search, setSearch] = useQueryState("search");
  // Component logic
}
```

### Form State

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  // Schema definition
});

export function ProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  // Form logic
}
```

## React Query Patterns Memory

### Query Organization

**API Layer Structure:**

```
src/
├── lib/api/
│   ├── auth/
│   │   ├── auth-queries.ts
│   │   ├── auth-mutations.ts
│   │   └── auth-types.ts
│   ├── products/
│   │   ├── product-queries.ts
│   │   ├── product-mutations.ts
│   │   └── product-types.ts
│   ├── orders/
│   │   ├── order-queries.ts
│   │   ├── order-mutations.ts
│   │   └── order-types.ts
│   └── query-client.ts
```

### Query Patterns

**Query Keys Structure:**

```typescript
// Consistent query key patterns
export const queryKeys = {
  auth: {
    user: ["auth", "user"] as const,
    session: ["auth", "session"] as const,
  },
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: ProductFilters) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    list: (filters: OrderFilters) =>
      [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },
};
```

**Query Functions:**

```typescript
// Example query function pattern
export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

**Mutation Patterns:**

```typescript
// Example mutation pattern
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: newProduct => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists(),
      });

      // Optimistic update
      queryClient.setQueryData(
        queryKeys.products.detail(newProduct.id),
        newProduct
      );
    },
    onError: error => {
      // Handle error
      console.error("Failed to create product:", error);
    },
  });
};
```

### React Query Best Practices

**Performance Optimization:**

- Use `staleTime` to control refetch frequency
- Implement `gcTime` for cache garbage collection
- Use `enabled` option for conditional queries
- Leverage `select` for data transformation

**Error Handling:**

- Implement global error boundaries
- Use `onError` callbacks in mutations
- Provide user-friendly error messages
- Implement retry logic where appropriate

**Optimistic Updates:**

- Update cache immediately for better UX
- Revert on error with `onError` callback
- Use `setQueryData` for instant updates
- Implement rollback mechanisms

**Background Refetching:**

- Enable background refetching for real-time data
- Use `refetchOnWindowFocus` for critical data
- Implement `refetchOnMount` for fresh data
- Configure `refetchOnReconnect` for network recovery

### Integration with Server Components

**Hybrid Approach:**

- Use Server Components for initial data loading
- Hydrate with React Query for client-side updates
- Implement progressive enhancement
- Maintain SEO benefits with SSR

**Data Flow Pattern:**

```typescript
// Server Component loads initial data
async function ProductList() {
  const initialProducts = await fetchProducts()

  return (
    <ProductListClient initialData={initialProducts} />
  )
}

// Client Component handles updates
function ProductListClient({ initialData }: { initialData: Product[] }) {
  const { data: products } = useProducts(
    {},
    { initialData }
  )

  return <ProductGrid products={products} />
}
```

## API Patterns

### Route Handlers

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  // Validation schema
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = productSchema.parse(body);

    // Business logic

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### Database Operations

```typescript
// lib/db/products.ts
import { prisma } from "@/lib/prisma";

export async function getProducts(tenantId: string) {
  return prisma.product.findMany({
    where: { tenantId },
    include: { category: true },
  });
}
```

## Error Handling Patterns

### API Error Handling

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
  }
}

// Usage in API routes
export async function GET() {
  try {
    // Logic
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Component Error Boundaries

```typescript
"use client";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-600">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export function ProductListWithErrorBoundary() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProductList />
    </ErrorBoundary>
  );
}
```

## Authentication Patterns

### Protected Routes

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Custom middleware logic
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Authorization logic
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

### Role-Based Access

```typescript
// lib/auth/permissions.ts
export function hasPermission(user: User, permission: string): boolean {
  return user.role === "admin" || user.permissions.includes(permission);
}

// Usage in components
export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session?.user || !hasPermission(session.user, "admin")) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
```

## Performance Patterns

### Image Optimization

```typescript
import Image from "next/image";

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="rounded-lg"
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

### Code Splitting and Lazy Loading

```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Route-based code splitting
const AdminDashboard = dynamic(() => import("./AdminDashboard"), {
  loading: () => <DashboardSkeleton />,
});
```

### Bundle Optimization

```typescript
// Use tree-shaking friendly imports
import { Button } from "@/components/ui/button"; // ✅ Good
import * as UI from "@/components/ui"; // ❌ Avoid

// Avoid large libraries in client components
// Use server-side processing when possible
```

### Multi-Tenant Optimization

```typescript
// Efficient tenant data isolation
export async function getProducts(tenantId: string) {
  return prisma.product.findMany({
    where: { tenantId },
    include: { category: true },
    // Add pagination for large datasets
    take: 20,
    skip: 0,
  });
}

// Use connection pooling
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pooling for scalability
  log: ["query", "info", "warn", "error"],
});
```

### Caching Patterns

```typescript
// lib/cache.ts
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  // Implement caching logic
  return fetcher();
}

// Usage
const products = await getCachedData(
  `products:${tenantId}`,
  () => getProducts(tenantId),
  1800 // 30 minutes
);
```

## Testing Patterns

### Testing Strategy

- Testing will be implemented when specifically requested
- Focus on feature development and functionality
- Testing patterns available when needed

### Component Testing (When Requested)

```typescript
// __tests__/ProductCard.test.tsx
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    const product = {
      id: "1",
      name: "Test Product",
      price: 99.99,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });
});
```

### API Testing (When Requested)

```typescript
// __tests__/api/products.test.ts
import { createMocks } from "node-mocks-http";
import { GET, POST } from "@/app/api/products/route";

describe("/api/products", () => {
  it("GET returns products list", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await GET(req);

    expect(res._getStatusCode()).toBe(200);
  });
});
```

## Styling Patterns

### Tailwind CSS Patterns

```typescript
// Consistent spacing and sizing
const spacingClasses = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-12 sm:py-16 lg:py-20",
  card: "bg-white rounded-lg shadow-sm border border-gray-200",
  button: "px-4 py-2 rounded-md font-medium transition-colors",
};

// Responsive design patterns
const responsiveClasses = {
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  text: "text-sm sm:text-base lg:text-lg",
  spacing: "p-4 sm:p-6 lg:p-8",
};
```

### Component Variants

```typescript
// lib/utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage with variants
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
```

## Git Patterns

### Commit Messages

```
feat: add product search functionality
fix: resolve cart item duplication issue
style: improve button component styling
refactor: extract product card component
chore: update dependencies
```

### Branch Naming

```
feature/product-search
bugfix/cart-duplication
hotfix/payment-processing
refactor/auth-system
```

## Remember These Patterns

- Always use TypeScript with proper typing
- Prefer server components over client components
- Implement proper error handling
- Follow consistent naming conventions
- **Organize by feature, not by type**
- **Separate types, UI, logic, and hooks by feature**
- **Keep related code together in feature folders**
- **Avoid mixing different features in single files**
- **NEVER put multiple components in a single file** - each component should have its own file
- **Separate components by feature and responsibility**
- Focus on feature development and functionality
- Use Tailwind CSS for styling
- Implement proper authentication and authorization
- Optimize for performance and accessibility
- Testing and documentation when specifically requested
