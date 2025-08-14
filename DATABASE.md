# Database Setup Guide

This project uses PostgreSQL with Prisma ORM for the database.

## Quick Start

### 1. Start Database Services

```bash
# Start PostgreSQL and Redis using Docker
docker-compose up -d
```

### 2. Setup Database Schema

```bash
# Push the schema to the database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 3. Seed Database

```bash
# Populate with sample data
npm run db:seed
```

## Database Credentials

- **Host**: localhost
- **Port**: 5432
- **Database**: sass_ecommerce
- **Username**: postgres
- **Password**: postgres

## Sample Users

After seeding, you can login with:

### Super Admin

- **Email**: admin@example.com
- **Password**: admin123
- **Role**: SUPER_ADMIN

### Store Admin

- **Email**: store@example.com
- **Password**: admin123
- **Role**: TENANT_ADMIN

## Database Management

### View Database

```bash
# Open Prisma Studio
npx prisma studio
```

### Reset Database

```bash
# Reset and reseed
npx prisma db push --force-reset
npm run db:seed
```

### Migrations (for production)

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Deploy migrations
npx prisma migrate deploy
```

## Environment Variables

Make sure your `.env` file contains:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sass_ecommerce"
```

## Troubleshooting

### Database Connection Issues

1. Ensure Docker is running
2. Check if containers are up: `docker-compose ps`
3. Restart containers: `docker-compose restart`

### Prisma Issues

1. Regenerate client: `npx prisma generate`
2. Reset database: `npx prisma db push --force-reset`
3. Check schema: `npx prisma validate`
