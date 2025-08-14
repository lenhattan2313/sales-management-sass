# Project Context Memory

## User Profile: Tan

- **Name**: Tan
- **Role**: Full-stack developer building e-commerce SaaS
- **Preferences**:
  - TypeScript expert
  - Next.js App Router advocate
  - Shadcn UI + Tailwind CSS enthusiast
  - Performance and security focused
  - Clean, maintainable code

## Project Vision Memory

### Business Context

This is a **modern e-commerce SaaS platform** that allows businesses to:

- Set up their own online stores quickly
- Manage products, orders, and customers
- Process payments securely
- Access analytics and insights
- Scale their business with subscription-based features

### Target Users

1. **Small to Medium Businesses** - Need quick e-commerce setup
2. **Entrepreneurs** - Want to start selling online fast
3. **Existing Businesses** - Looking to expand online presence
4. **Agencies** - Managing multiple client stores

### Competitive Advantages

- **Multi-tenant architecture** - Isolated data per business
- **Subscription-based pricing** - Predictable revenue model
- **Modern tech stack** - Performance and developer experience
- **Scalable infrastructure** - Handles growth efficiently

## Technical Preferences Memory

### Tan's Coding Style

- **Functional programming** over classes
- **TypeScript strict mode** - No `any` types
- **Server-first approach** - React Server Components
- **Component composition** - Reusable, focused components
- **Performance optimization** - Web Vitals focus

### Framework Preferences

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn UI** for components
- **Prisma** for database operations
- **React Query** for API state management and caching

### Development Workflow

- **Git flow** with feature branches
- **Conventional commits** for clean history
- **Testing** for critical paths
- **Code reviews** for quality
- **Documentation** for maintainability

## Architecture Decisions Memory

### Why These Choices?

1. **Next.js 15 App Router**
   - Server-first rendering
   - Built-in performance optimizations
   - Excellent developer experience
   - Strong TypeScript support

2. **Multi-tenant Architecture**
   - Scalable business model
   - Data isolation for security
   - Resource sharing for efficiency
   - Subscription-based access control

3. **PostgreSQL + Prisma**
   - Reliable and performant
   - Excellent TypeScript integration
   - Rich ecosystem and tooling
   - ACID compliance for transactions

4. **Stripe Integration**
   - Industry standard for payments
   - Comprehensive API
   - Excellent documentation
   - Strong security practices

## Business Logic Memory

### Core Features Priority

1. **User Authentication & Authorization**
   - Secure login/signup
   - Role-based access control
   - Multi-tenant isolation

2. **Product Management**
   - CRUD operations
   - Category management
   - Inventory tracking
   - Image optimization

3. **Shopping Experience**
   - Product catalog
   - Search and filtering
   - Shopping cart
   - Checkout process

4. **Order Management**
   - Order processing
   - Status tracking
   - Customer notifications
   - Admin dashboard

5. **Payment Processing**
   - Stripe integration
   - Multiple payment methods
   - Subscription billing
   - Refund handling

6. **Analytics & Reporting**
   - Sales analytics
   - Customer insights
   - Performance metrics
   - Business intelligence

## User Experience Memory

### Design Principles

- **Mobile-first** responsive design
- **Fast loading** times (< 3 seconds)
- **Intuitive navigation** - Easy to find products
- **Accessible** - WCAG 2.1 compliance
- **Consistent** - Unified design system

### Key User Flows

1. **Store Setup**
   - Quick onboarding
   - Template selection
   - Basic configuration
   - Payment setup

2. **Customer Shopping**
   - Browse products
   - Add to cart
   - Secure checkout
   - Order confirmation

3. **Store Management**
   - Dashboard overview
   - Product management
   - Order processing
   - Customer support

## Performance Requirements Memory

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies

- **Server-side rendering** for SEO
- **Image optimization** with Next.js Image
- **Code splitting** for faster loading
- **Caching** at multiple levels
- **CDN** for static assets

## Security Requirements Memory

### Data Protection

- **GDPR compliance** for EU users
- **PCI DSS** for payment processing
- **Data encryption** at rest and in transit
- **Regular security audits**
- **Vulnerability monitoring**

### Authentication & Authorization

- **JWT tokens** with secure storage
- **Role-based access control**
- **Multi-factor authentication** (future)
- **Session management**
- **API rate limiting**

## Scalability Considerations Memory

### Infrastructure

- **Horizontal scaling** capability
- **Database optimization** for growth
- **Caching strategies** for performance
- **Load balancing** for reliability
- **Monitoring and alerting**

### Business Growth

- **Feature flags** for gradual rollouts
- **A/B testing** framework
- **Analytics integration**
- **API versioning** strategy
- **Third-party integrations**

## Development Priorities Memory

### Phase 1: MVP (Core Features)

- Basic authentication
- Product management
- Shopping cart
- Checkout process
- Order management

### Phase 2: Enhancement

- Advanced search
- Customer accounts
- Email notifications
- Basic analytics
- Admin dashboard

### Phase 3: Scale

- Advanced analytics
- Marketing tools
- API for integrations
- Mobile app
- Advanced features

## Quality Standards Memory

### Code Quality

- **TypeScript strict mode**
- **ESLint + Prettier** configuration
- **Testing when specifically requested**
- **Code review process**
- **Documentation when specifically requested**

### User Experience

- **Performance monitoring**
- **Error tracking**
- **User feedback collection**
- **Accessibility testing**
- **Cross-browser testing**

## Remember These Context Points

- This is Tan's e-commerce SaaS project
- Focus on modern, performant, secure code
- Multi-tenant architecture is core to the business model
- User experience and performance are top priorities
- Scalability and maintainability are essential
- Follow established patterns and conventions
- Document decisions and maintain clean code
