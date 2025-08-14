import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { USER_ROLES } from "@/constants";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create a default tenant
  const defaultTenant = await prisma.tenant.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      name: "Default Store",
      slug: "default",
      description: "Default e-commerce store",
      subscriptionTier: "free",
      subscriptionStatus: "active",
      maxProducts: 100,
      maxCustomers: 1000,
      maxStorage: 1024,
    },
  });

  console.log("✅ Created default tenant:", defaultTenant.name);

  // Create a super admin user
  const hashedPassword = await hash("admin123", 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Super Admin",
      password: hashedPassword,
      role: USER_ROLES.SUPER_ADMIN,
      emailVerified: new Date(),
      isActive: true,
    },
  });

  console.log("✅ Created super admin user:", superAdmin.email);

  // Create a tenant admin user
  const tenantAdmin = await prisma.user.upsert({
    where: { email: "store@example.com" },
    update: {},
    create: {
      email: "store@example.com",
      name: "Store Admin",
      password: hashedPassword,
      role: USER_ROLES.TENANT_ADMIN,
      tenantId: defaultTenant.id,
      emailVerified: new Date(),
      isActive: true,
    },
  });

  console.log("✅ Created tenant admin user:", tenantAdmin.email);

  // Create some sample categories
  const electronicsCategory = await prisma.category.upsert({
    where: {
      tenantId_slug: {
        tenantId: defaultTenant.id,
        slug: "electronics",
      },
    },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and gadgets",
      tenantId: defaultTenant.id,
      isActive: true,
    },
  });

  const clothingCategory = await prisma.category.upsert({
    where: {
      tenantId_slug: {
        tenantId: defaultTenant.id,
        slug: "clothing",
      },
    },
    update: {},
    create: {
      name: "Clothing",
      slug: "clothing",
      description: "Fashion and apparel",
      tenantId: defaultTenant.id,
      isActive: true,
    },
  });

  console.log(
    "✅ Created categories:",
    electronicsCategory.name,
    clothingCategory.name
  );

  // Create some sample products
  const sampleProducts = [
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 99.99,
      comparePrice: 129.99,
      sku: "WH-001",
      stock: 50,
      categoryId: electronicsCategory.id,
      tenantId: defaultTenant.id,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Smartphone Case",
      slug: "smartphone-case",
      description: "Durable protective case for smartphones",
      price: 19.99,
      comparePrice: 24.99,
      sku: "SC-001",
      stock: 100,
      categoryId: electronicsCategory.id,
      tenantId: defaultTenant.id,
      isActive: true,
    },
    {
      name: "Cotton T-Shirt",
      slug: "cotton-tshirt",
      description: "Comfortable cotton t-shirt in various colors",
      price: 24.99,
      comparePrice: 29.99,
      sku: "CT-001",
      stock: 200,
      categoryId: clothingCategory.id,
      tenantId: defaultTenant.id,
      isActive: true,
    },
  ];

  for (const productData of sampleProducts) {
    await prisma.product.upsert({
      where: {
        tenantId_slug: {
          tenantId: productData.tenantId,
          slug: productData.slug,
        },
      },
      update: {},
      create: productData,
    });
  }

  console.log("✅ Created sample products");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch(e => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
