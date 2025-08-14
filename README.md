# E-commerce SaaS Platform

A modern, multi-tenant e-commerce SaaS platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Project Context

This is **Tan's e-commerce SaaS project** - a platform that allows businesses to quickly set up their own online stores with subscription-based access to advanced features.

### Key Characteristics

- **Multi-tenant architecture** - Each business has isolated data
- **Modern tech stack** - Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Performance focused** - Optimized for Core Web Vitals
- **Security first** - GDPR compliant, PCI DSS ready
- **Scalable design** - Built for growth and enterprise use

## 🏗️ Architecture Memory

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js / Auth.js
- **Payments**: Stripe
- **Deployment**: Vercel

### Core Patterns

- **Server-first approach** - React Server Components by default
- **Multi-tenant isolation** - Data separation per business
- **Type safety** - Strict TypeScript throughout
- **Performance optimization** - Web Vitals focus
- **Security compliance** - GDPR, PCI DSS ready

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── (store)/           # Store frontend
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities and helpers
├── types/                # TypeScript type definitions
├── docs/                 # Documentation and memory files
└── prisma/               # Database schema and migrations
```

## 🧠 Memory Patterns for Cursor

### What to Remember

- **User**: Tan (TypeScript expert, performance focused)
- **Project**: E-commerce SaaS with multi-tenant architecture
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Architecture**: Server-first with strategic client components
- **Business Model**: Subscription-based SaaS for e-commerce

### Coding Standards

- Use TypeScript with strict mode
- Prefer functional components over classes
- Use React Server Components by default
- Implement proper error handling
- Follow established naming conventions
- Optimize for performance and accessibility

### File Organization

- Use kebab-case for directories
- Group related components together
- Keep components focused and single-responsibility
- Use index files for clean imports
- Co-locate related files when possible

### State Management

- Server state with React Server Components
- Client state only when necessary
- Use `nuqs` for URL search parameters
- Prefer server state over client state

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sass

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all code
- Follow ESLint and Prettier configuration
- Write meaningful commit messages
- Document complex business logic
- Test critical functionality

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
```

### API Patterns

```typescript
// Route handlers with proper error handling
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = schema.parse(body);

    // Business logic

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

## 🧪 Testing

### Test Structure

- Testing will be implemented when specifically requested
- Focus on feature development and functionality
- Testing patterns available when needed

### Running Tests (When Implemented)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📊 Performance Monitoring

### Core Web Vitals Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimization Strategies

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Caching at multiple levels
- CDN for static assets

## 🔒 Security

### Data Protection

- GDPR compliance for EU users
- PCI DSS for payment processing
- Data encryption at rest and in transit
- Regular security audits
- Input validation with Zod

### Authentication

- JWT tokens with secure storage
- Role-based access control
- API route protection
- CSRF protection
- Rate limiting

## 📈 Business Features

### Core E-commerce

- Product catalog with categories
- Shopping cart and checkout
- Order management and tracking
- Payment processing with Stripe
- Customer accounts and profiles

### SaaS Features

- Multi-tenant architecture
- Subscription management
- Admin dashboard
- Analytics and reporting
- API for integrations

## 🤝 Contributing

### Development Workflow

1. Create feature branch from main
2. Implement feature following established patterns
3. Focus on functionality and performance
4. Update documentation when requested
5. Submit pull request with clear description

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] Error handling is implemented
- [ ] Performance considerations addressed
- [ ] Security best practices followed
- [ ] Testing when specifically requested
- [ ] Documentation when specifically requested

## 📚 Documentation

### Memory Files

- [`.cursorrules`](./.cursorrules) - Cursor AI rules and patterns
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) - Technical architecture
- [`docs/DEVELOPMENT_PATTERNS.md`](./docs/DEVELOPMENT_PATTERNS.md) - Development patterns
- [`docs/PROJECT_CONTEXT.md`](./docs/PROJECT_CONTEXT.md) - Business context

### Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Components](https://ui.shadcn.com/)

## 📄 License

This project is proprietary and confidential.

---

**Remember**: This is Tan's e-commerce SaaS project. Follow established patterns, prioritize performance and security, and maintain clean, maintainable code.
