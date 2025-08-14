# E-commerce SaaS Architecture Memory

## Project Overview

This is a modern e-commerce SaaS platform designed for businesses that need subscription-based e-commerce solutions.

## Technical Stack Memory

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js / Auth.js
- **Payments**: Stripe
- **Deployment**: Vercel (preferred) or similar

### Key Libraries

- **State Management**: React Server Components + nuqs for URL state + React Query for API state
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Shadcn UI + Radix UI primitives
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Built-in Next.js fetch with React Query for caching and state management

## Architecture Patterns

### 1. Server-First Architecture

- Prefer React Server Components (RSC) over client components
- Use `use client` only when necessary (interactivity, browser APIs)
- Implement data fetching at the server level
- Leverage Next.js caching and revalidation

### 2. React Query Integration

- Use React Query for client-side API state management
- Implement optimistic updates for better UX
- Leverage React Query's caching and background refetching
- Use React Query DevTools for debugging
- Combine with Server Components for optimal performance

### 3. Component Architecture

```
components/
├── ui/           # Reusable UI components (Shadcn)
├── forms/        # Form components and validations
├── layout/       # Layout components
├── features/     # Feature-specific components
└── providers/    # Context providers
```

### 4. API Architecture

```
app/
├── api/
│   ├── auth/     # Authentication endpoints
│   ├── products/ # Product management
│   ├── orders/   # Order processing
│   ├── payments/ # Payment processing
│   └── webhooks/ # External service webhooks
```

### 4. Database Schema Memory

```sql
-- Core entities to remember
users (id, email, name, role, tenant_id)
tenants (id, name, subscription_tier, settings)
products (id, name, description, price, tenant_id)
orders (id, user_id, status, total, tenant_id)
order_items (id, order_id, product_id, quantity, price)
subscriptions (id, user_id, plan_id, status, current_period_end)
```

## Business Logic Memory

### Multi-Tenant Architecture

- Each business (tenant) has isolated data
- Shared infrastructure with tenant isolation
- Subscription-based access control
- Tenant-specific configurations

### E-commerce Flow

1. **Product Management**: CRUD operations for products
2. **Shopping Cart**: Session-based cart management
3. **Checkout**: Stripe integration for payments
4. **Order Processing**: Order confirmation and fulfillment
5. **Subscription Management**: SaaS billing and access control

### User Roles

- **Super Admin**: Platform management
- **Tenant Admin**: Store management
- **Customer**: Shopping and account management

## Performance Patterns

### Caching Strategy

- Next.js built-in caching for static content
- Redis for session and cart data
- Database query optimization with Prisma
- CDN for static assets
- React Query caching for API data

### Optimization Techniques

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Server-side rendering for SEO
- Progressive enhancement
- **Minimize client-side JavaScript** - Only send what's absolutely necessary
- **Server-side rendering** for all static content
- **Code splitting** by routes and features
- **Tree shaking** to eliminate unused code
- **Bundle analysis** to identify large dependencies
- **Streaming** for large data sets
- **Progressive enhancement** - work without JavaScript

## Security Patterns

### Authentication & Authorization

- JWT tokens with secure storage
- Role-based access control (RBAC)
- API route protection
- CSRF protection

### Data Protection

- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection
- Rate limiting on API routes

## Development Workflow

### Code Organization

- Feature-based folder structure
- Shared utilities in `lib/`
- Type definitions in `types/`
- Constants in `constants/`

### Testing Strategy

- Testing will be implemented when specifically requested
- Focus on feature development and functionality
- Testing patterns available when needed

## Deployment Memory

### Environment Configuration

- Development: Local PostgreSQL
- Staging: Vercel preview deployments
- Production: Vercel with production database

### Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXTAUTH_URL=
```

## Monitoring & Analytics

### Performance Monitoring

- Vercel Analytics
- Core Web Vitals tracking
- Error monitoring with Sentry
- Database query monitoring

### Business Metrics

- Conversion rates
- Revenue tracking
- User engagement
- Subscription metrics

## Future Considerations

### Scalability

- Horizontal scaling with load balancers
- Database read replicas
- Microservices architecture (future)
- Event-driven architecture
- **Multi-tenant data isolation** - Ensure complete separation
- **Database connection pooling** - Efficient resource usage
- **Read replicas** for scaling database reads
- **Horizontal scaling** of application servers
- **Load balancing** across multiple instances
- **Resource quotas** per tenant to prevent abuse
- **Caching strategies** at multiple levels
- **CDN** for static assets and media

### Feature Roadmap

- Advanced analytics dashboard
- Multi-language support
- Mobile app development
- API for third-party integrations

## Remember These Patterns

- Always consider multi-tenant isolation
- Prioritize performance and security
- Follow established naming conventions
- Maintain clean separation of concerns
- Document architectural decisions
