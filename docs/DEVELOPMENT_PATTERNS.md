# Development Patterns Memory

## Code Style & Structure Memory

### TypeScript Patterns

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use utility types for common patterns
- Avoid `any` - use proper typing or `unknown`
- Use path aliases for clean imports

### Component Patterns

```typescript
// Preferred component structure
interface ComponentProps {
  // Props interface
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}

// Subcomponents
function SubComponent() {
  // Subcomponent logic
}

// Helper functions
function helperFunction() {
  // Helper logic
}

// Types
interface LocalType {
  // Local type definition
}
```

### File Naming Conventions

- Components: PascalCase (`ProductCard.tsx`)
- Utilities: camelCase (`formatPrice.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- Directories: kebab-case (`product-management/`)

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
- Focus on feature development and functionality
- Use Tailwind CSS for styling
- Implement proper authentication and authorization
- Optimize for performance and accessibility
- Testing and documentation when specifically requested
