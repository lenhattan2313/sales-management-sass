// Business logic constants
export const BUSINESS_CONFIG = {
  DEFAULT_TAX_RATE: 0.1, // 10%
  DEFAULT_SHIPPING_COST: 0,
  FREE_SHIPPING_THRESHOLD: 50,
  ORDER_NUMBER_PREFIX: "ORD",
  PRODUCT_SKU_PREFIX: "PROD",
} as const;

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month" as const,
    features: [
      "Up to 10 products",
      "Basic analytics",
      "Email support",
      "Standard checkout",
    ],
    limits: {
      products: 10,
      customers: 100,
      storage: 100, // MB
      orders: 50,
      apiCalls: 1000,
    },
  },
  STARTER: {
    id: "starter",
    name: "Starter",
    price: 29,
    interval: "month" as const,
    features: [
      "Up to 100 products",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Discount codes",
      "Abandoned cart recovery",
    ],
    limits: {
      products: 100,
      customers: 1000,
      storage: 1024, // MB
      orders: 500,
      apiCalls: 10000,
    },
  },
  PROFESSIONAL: {
    id: "professional",
    name: "Professional",
    price: 99,
    interval: "month" as const,
    features: [
      "Unlimited products",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "API access",
      "White-label option",
      "Multi-currency",
      "Advanced shipping",
    ],
    limits: {
      products: -1, // Unlimited
      customers: -1, // Unlimited
      storage: 10240, // 10GB
      orders: -1, // Unlimited
      apiCalls: 100000,
    },
  },
} as const;

// User roles and permissions
export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  TENANT_ADMIN: "TENANT_ADMIN",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
} as const;

// Order statuses
export const ORDER_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
} as const;

// Payment statuses
export const PAYMENT_STATUSES = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
  CANCELLED: "CANCELLED",
} as const;

// Product statuses
export const PRODUCT_STATUSES = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

// Inventory statuses
export const INVENTORY_STATUSES = {
  IN_STOCK: "IN_STOCK",
  LOW_STOCK: "LOW_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DISCONTINUED: "DISCONTINUED",
} as const;
