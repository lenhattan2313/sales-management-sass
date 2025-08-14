// Pagination configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
  DEFAULT_PAGE: 1,
} as const;

// Pagination options for different contexts
export const PAGINATION_OPTIONS = {
  PRODUCTS: {
    DEFAULT: 12,
    MAX: 50,
    OPTIONS: [12, 24, 36, 48],
  },
  ORDERS: {
    DEFAULT: 20,
    MAX: 100,
    OPTIONS: [10, 20, 50, 100],
  },
  CUSTOMERS: {
    DEFAULT: 25,
    MAX: 100,
    OPTIONS: [10, 25, 50, 100],
  },
  ANALYTICS: {
    DEFAULT: 30,
    MAX: 365,
    OPTIONS: [7, 30, 90, 365],
  },
} as const;
