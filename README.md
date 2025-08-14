# E-commerce SaaS Platform

A modern, multi-tenant e-commerce platform built with Next.js 15, TypeScript, and Prisma. Designed for businesses to create and manage their own online stores with subscription-based SaaS features.

## 🚀 Features

- **Multi-tenant Architecture** - Complete data isolation between tenants
- **Subscription Management** - Tiered subscription plans with billing
- **Product Management** - Full CRUD operations with inventory tracking
- **Order Management** - Complete order lifecycle management
- **Payment Processing** - Stripe integration for secure payments
- **Analytics Dashboard** - Business intelligence and reporting
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Role-based Access** - Admin, Tenant Admin, Staff, and Customer roles

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **State Management**: React Server Components + nuqs + React Query
- **Validation**: Zod
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)
- Email service (for notifications)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd sass
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_saas"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"

# Other services...
```

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── features/          # Feature-specific components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── constants/             # Application constants
│   ├── app.ts            # App configuration
│   ├── api.ts            # API endpoints
│   ├── business.ts       # Business logic
│   ├── currencies.ts     # Currency configuration
│   ├── pagination.ts     # Pagination settings
│   └── validation.ts     # Validation rules
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations
│   ├── analytics/        # Analytics utilities
│   ├── auth/             # Authentication utilities
│   ├── customer/         # Customer utilities
│   ├── order/            # Order utilities
│   ├── payment/          # Payment utilities
│   ├── product/          # Product utilities
│   ├── tenant/           # Tenant utilities
│   └── prisma.ts         # Prisma client
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── analytics.ts      # Analytics utilities
│   ├── common.ts         # Common utilities
│   ├── ecommerce.ts      # E-commerce utilities
│   ├── formatting.ts     # Formatting utilities
│   └── validation.ts     # Validation utilities
└── utils/                # Additional utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database

## 🏗 Architecture

### Multi-Tenant Design

- Complete data isolation between tenants
- Tenant-specific configurations and settings
- Resource quotas and limits per subscription tier

### Database Schema

- **Tenants**: Multi-tenant isolation
- **Users**: Authentication and role management
- **Products**: Product catalog with variants
- **Orders**: Order management and tracking
- **Customers**: Customer management
- **Categories**: Product categorization

### API Structure

- RESTful API design
- Proper error handling and validation
- Rate limiting and security measures
- Multi-tenant API isolation

## 🔐 Security

- JWT-based authentication
- Role-based access control
- CSRF protection
- Input validation and sanitization
- Secure payment processing
- Multi-tenant data isolation

## 📊 Performance

- Server-side rendering with Next.js
- Optimized images and assets
- Database query optimization
- Caching strategies
- Bundle optimization

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Self-hosted

1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Run with PM2 or similar process manager

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Development Patterns](./docs/DEVELOPMENT_PATTERNS.md)
- [Project Context](./docs/PROJECT_CONTEXT.md)
- [Project Flows](./docs/PROJECT_FLOWS.md)
- [Project Phases](./docs/PROJECT_PHASES.md)
- [Quick Reference](./docs/QUICK_REFERENCE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the project phases for roadmap

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
