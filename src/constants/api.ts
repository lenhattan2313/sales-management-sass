// API endpoint configurations
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    VERIFY: "/api/auth/verify",
    RESET_PASSWORD: "/api/auth/reset-password",
    REFRESH_TOKEN: "/api/auth/refresh",
    CHANGE_PASSWORD: "/api/auth/change-password",
  },
  PRODUCTS: {
    LIST: "/api/products",
    CREATE: "/api/products",
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
    DETAIL: (id: string) => `/api/products/${id}`,
    SEARCH: "/api/products/search",
    CATEGORIES: "/api/products/categories",
    INVENTORY: (id: string) => `/api/products/${id}/inventory`,
  },
  ORDERS: {
    LIST: "/api/orders",
    CREATE: "/api/orders",
    UPDATE: (id: string) => `/api/orders/${id}`,
    DETAIL: (id: string) => `/api/orders/${id}`,
    CANCEL: (id: string) => `/api/orders/${id}/cancel`,
    REFUND: (id: string) => `/api/orders/${id}/refund`,
    TRACKING: (id: string) => `/api/orders/${id}/tracking`,
  },
  CART: {
    GET: "/api/cart",
    ADD_ITEM: "/api/cart/add",
    UPDATE_ITEM: "/api/cart/update",
    REMOVE_ITEM: "/api/cart/remove",
    CLEAR: "/api/cart/clear",
    APPLY_COUPON: "/api/cart/apply-coupon",
    REMOVE_COUPON: "/api/cart/remove-coupon",
  },
  CUSTOMERS: {
    LIST: "/api/customers",
    CREATE: "/api/customers",
    UPDATE: (id: string) => `/api/customers/${id}`,
    DETAIL: (id: string) => `/api/customers/${id}`,
    DELETE: (id: string) => `/api/customers/${id}`,
    ORDERS: (id: string) => `/api/customers/${id}/orders`,
  },
  TENANTS: {
    LIST: "/api/tenants",
    CREATE: "/api/tenants",
    UPDATE: (id: string) => `/api/tenants/${id}`,
    DETAIL: (id: string) => `/api/tenants/${id}`,
    SETTINGS: (id: string) => `/api/tenants/${id}/settings`,
    ANALYTICS: (id: string) => `/api/tenants/${id}/analytics`,
    SUBSCRIPTION: (id: string) => `/api/tenants/${id}/subscription`,
  },
  PAYMENTS: {
    CREATE_INTENT: "/api/payments/create-intent",
    CONFIRM: "/api/payments/confirm",
    REFUND: "/api/payments/refund",
    WEBHOOK: "/api/payments/webhook",
  },
  ANALYTICS: {
    DASHBOARD: "/api/analytics/dashboard",
    SALES: "/api/analytics/sales",
    PRODUCTS: "/api/analytics/products",
    CUSTOMERS: "/api/analytics/customers",
    EXPORT: "/api/analytics/export",
  },
  FILES: {
    UPLOAD: "/api/files/upload",
    DELETE: (id: string) => `/api/files/${id}`,
    GET: (id: string) => `/api/files/${id}`,
  },
} as const;

// API response status codes
export const API_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// API rate limiting configuration
export const API_RATE_LIMITS = {
  AUTH: {
    LOGIN: { requests: 5, window: 15 * 60 * 1000 }, // 5 requests per 15 minutes
    REGISTER: { requests: 3, window: 60 * 60 * 1000 }, // 3 requests per hour
    RESET_PASSWORD: { requests: 3, window: 60 * 60 * 1000 }, // 3 requests per hour
  },
  GENERAL: {
    DEFAULT: { requests: 100, window: 60 * 1000 }, // 100 requests per minute
    STRICT: { requests: 10, window: 60 * 1000 }, // 10 requests per minute
  },
} as const;

// API error messages
export const API_ERROR_MESSAGES = {
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "The requested resource was not found",
  VALIDATION_ERROR: "Please check your input and try again",
  SERVER_ERROR: "An unexpected error occurred. Please try again later",
  NETWORK_ERROR: "Network error. Please check your connection",
  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "An account with this email already exists",
  WEAK_PASSWORD: "Password must be at least 8 characters long",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_TOKEN: "Invalid or expired token",
  INSUFFICIENT_PERMISSIONS: "You don't have permission to perform this action",
  RESOURCE_CONFLICT: "This resource already exists",
  PAYMENT_FAILED: "Payment processing failed. Please try again",
  INVENTORY_UNAVAILABLE: "Requested quantity not available in stock",
} as const;

// API success messages
export const API_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in",
  REGISTER_SUCCESS: "Account created successfully",
  PASSWORD_RESET_SENT: "Password reset email sent",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  PASSWORD_CHANGED: "Password changed successfully",
  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",
  ORDER_CREATED: "Order placed successfully",
  ORDER_UPDATED: "Order updated successfully",
  ORDER_CANCELLED: "Order cancelled successfully",
  CART_UPDATED: "Cart updated successfully",
  CUSTOMER_CREATED: "Customer created successfully",
  CUSTOMER_UPDATED: "Customer updated successfully",
  SETTINGS_SAVED: "Settings saved successfully",
  PAYMENT_SUCCESS: "Payment processed successfully",
  FILE_UPLOADED: "File uploaded successfully",
} as const;
