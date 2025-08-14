// Application metadata and configuration
export const APP_CONFIG = {
  NAME: "E-commerce SaaS",
  DESCRIPTION: "Modern multi-tenant e-commerce platform",
  VERSION: "1.0.0",
  AUTHOR: "Your Company",
  WEBSITE: "https://yourcompany.com",
} as const;

// Environment configuration
export const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TEST: process.env.NODE_ENV === "test",
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ANALYTICS_ENABLED: true,
  STRIPE_ENABLED: true,
  EMAIL_ENABLED: true,
  MULTI_TENANT: true,
  API_RATE_LIMITING: true,
} as const;
