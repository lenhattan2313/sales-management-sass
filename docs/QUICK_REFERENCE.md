# Quick Reference Memory

## 🚀 Essential Commands

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Database

```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev # Create and apply migration
```

### Testing

```bash
npm test             # Run all tests (when implemented)
npm run test:watch   # Run tests in watch mode (when implemented)
npm run test:e2e     # Run E2E tests (when implemented)
npm run test:coverage # Run tests with coverage (when implemented)
```

## 📝 Code Patterns

### Component Template

```typescript
interface ComponentProps {
  // Define props
}

export function Component({ prop1, prop2 }: ComponentProps) {
  return <div>{/* Component content */}</div>;
}
```

### API Route Template

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  // Define validation schema
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Business logic

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### Database Query Template

```typescript
import { prisma } from "@/lib/prisma";

export async function getData(tenantId: string) {
  return prisma.model.findMany({
    where: { tenantId },
    include: { relation: true },
  });
}
```

## 🎨 Styling Patterns

### Tailwind CSS Classes

```typescript
// Layout
const layoutClasses = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-12 sm:py-16 lg:py-20",
  card: "bg-white rounded-lg shadow-sm border border-gray-200 p-6",
};

// Responsive
const responsiveClasses = {
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  text: "text-sm sm:text-base lg:text-lg",
  spacing: "p-4 sm:p-6 lg:p-8",
};
```

### Component Variants

```typescript
import { cn } from "@/lib/utils";

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

## 🔐 Authentication Patterns

### Protected Route

```typescript
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return <div>Protected content</div>;
}
```

### Role-Based Access

```typescript
import { hasPermission } from "@/lib/auth/permissions";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session?.user || !hasPermission(session.user, "admin")) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
```

## 📊 Performance Patterns

### Image Optimization

```typescript
import Image from "next/image";

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="rounded-lg"
      priority={false}
    />
  );
}
```

### Code Splitting and Lazy Loading

```typescript
import dynamic from "next/dynamic";

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
// Efficient tenant data isolation with pagination
export async function getProducts(tenantId: string, page = 1) {
  return prisma.product.findMany({
    where: { tenantId },
    include: { category: true },
    take: 20,
    skip: (page - 1) * 20,
  });
}
```

## 🧪 Testing Patterns

### Testing Strategy

- Testing will be implemented when specifically requested
- Focus on feature development and functionality
- Testing patterns available when needed

### Component Test (When Requested)

```typescript
import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("Expected text")).toBeInTheDocument();
  });
});
```

### API Test (When Requested)

```typescript
import { createMocks } from "node-mocks-http";
import { GET } from "@/app/api/route";

describe("/api/route", () => {
  it("returns correct response", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await GET(req);
    expect(res._getStatusCode()).toBe(200);
  });
});
```

## 🔧 Utility Functions

### Error Handling

```typescript
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return { error: error.message, status: error.statusCode };
  }
  return { error: "Internal server error", status: 500 };
}
```

### Validation

```typescript
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
```

## 📁 File Structure

### Feature-Based Organization

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

### App Router

```
app/
├── api/             # API routes by feature
├── (auth)/          # Authentication pages
├── (dashboard)/     # Dashboard pages
├── (store)/         # Store frontend
└── globals.css      # Global styles
```

## 🎯 Key Principles

### Remember These

- **Server-first**: Use React Server Components by default
- **Type safety**: Strict TypeScript everywhere
- **Performance**: Optimize for Core Web Vitals
- **Security**: Validate inputs, handle errors
- **Accessibility**: Follow WCAG guidelines
- **Multi-tenant**: Always consider tenant isolation
- **Scalability**: Design for thousands of customers
- **Bundle size**: Minimize client-side JavaScript
- **Caching**: Implement at multiple levels
- **Database**: Use connection pooling and read replicas
- **Feature organization**: Separate types, UI, logic, and hooks by feature
- **Code organization**: Keep related code together in feature folders

### Avoid These

- Using `any` type in TypeScript
- Client components when server components work
- Inline styles over Tailwind classes
- Hardcoded values over environment variables
- Skipping error handling
- Ignoring performance implications
- Large client-side bundles
- Unnecessary client-side data fetching
- Missing pagination for large datasets
- Ignoring multi-tenant isolation
- **Mixing different features in single files**
- **Gathering all types in one file**
- **Putting all components in one folder**
- **Mixing business logic with UI components**

## 🔄 Common Workflows

### Adding New Feature

1. Create feature branch
2. **Create feature-specific types** in `src/types/feature.ts`
3. **Create feature components** in `src/components/feature/`
4. **Create feature logic** in `src/lib/feature/`
5. **Create feature hooks** in `src/hooks/feature/`
6. **Create feature API routes** in `src/app/api/feature/`
7. Implement server component first
8. Add client interactivity if needed
9. Focus on functionality and performance
10. Update documentation when requested
11. Submit PR

### Database Changes

1. Update Prisma schema
2. Generate client: `npx prisma generate`
3. Create migration: `npx prisma migrate dev`
4. Update types if needed
5. Test database operations

### API Development

1. Define validation schema with Zod
2. Implement route handler
3. Add error handling
4. Write integration tests
5. Update API documentation

## 📚 Quick Links

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://stripe.com/docs)

---

**Remember**: This is Tan's project. Follow established patterns, prioritize performance and security, and maintain clean code.
