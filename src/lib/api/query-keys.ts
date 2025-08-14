// Centralized query keys for consistent React Query usage

export const queryKeys = {
  // Authentication
  auth: {
    user: ["auth", "user"] as const,
    session: ["auth", "session"] as const,
    profile: ["auth", "profile"] as const,
  },

  // Products
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    categories: ["products", "categories"] as const,
  },

  // Orders
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
    status: (status: string) =>
      [...queryKeys.orders.all, "status", status] as const,
  },

  // Customers
  customers: {
    all: ["customers"] as const,
    lists: () => [...queryKeys.customers.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.customers.lists(), filters] as const,
    details: () => [...queryKeys.customers.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.customers.details(), id] as const,
  },

  // Payments
  payments: {
    all: ["payments"] as const,
    lists: () => [...queryKeys.payments.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.payments.lists(), filters] as const,
    details: () => [...queryKeys.payments.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.payments.details(), id] as const,
    methods: ["payments", "methods"] as const,
  },

  // Tenants
  tenants: {
    all: ["tenants"] as const,
    details: () => [...queryKeys.tenants.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.tenants.details(), id] as const,
    settings: (id: string) =>
      [...queryKeys.tenants.detail(id), "settings"] as const,
    subscription: (id: string) =>
      [...queryKeys.tenants.detail(id), "subscription"] as const,
  },

  // Analytics
  analytics: {
    all: ["analytics"] as const,
    sales: (period: string) =>
      [...queryKeys.analytics.all, "sales", period] as const,
    revenue: (period: string) =>
      [...queryKeys.analytics.all, "revenue", period] as const,
    customers: (period: string) =>
      [...queryKeys.analytics.all, "customers", period] as const,
    products: (period: string) =>
      [...queryKeys.analytics.all, "products", period] as const,
  },

  // Cart
  cart: {
    all: ["cart"] as const,
    items: () => [...queryKeys.cart.all, "items"] as const,
    total: () => [...queryKeys.cart.all, "total"] as const,
  },
} as const;
