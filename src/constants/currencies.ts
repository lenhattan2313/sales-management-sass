// Currency configurations
export const CURRENCIES = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    position: "before" as const,
    decimalPlaces: 2,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    position: "before" as const,
    decimalPlaces: 2,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    position: "before" as const,
    decimalPlaces: 2,
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    position: "before" as const,
    decimalPlaces: 2,
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    position: "before" as const,
    decimalPlaces: 2,
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    position: "before" as const,
    decimalPlaces: 0,
  },
} as const;

// Countries with their default currencies
export const COUNTRIES = [
  { code: "US", name: "United States", currency: "USD", phoneCode: "+1" },
  { code: "CA", name: "Canada", currency: "CAD", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", currency: "GBP", phoneCode: "+44" },
  { code: "AU", name: "Australia", currency: "AUD", phoneCode: "+61" },
  { code: "DE", name: "Germany", currency: "EUR", phoneCode: "+49" },
  { code: "FR", name: "France", currency: "EUR", phoneCode: "+33" },
  { code: "IT", name: "Italy", currency: "EUR", phoneCode: "+39" },
  { code: "ES", name: "Spain", currency: "EUR", phoneCode: "+34" },
  { code: "NL", name: "Netherlands", currency: "EUR", phoneCode: "+31" },
  { code: "JP", name: "Japan", currency: "JPY", phoneCode: "+81" },
  { code: "MX", name: "Mexico", currency: "MXN", phoneCode: "+52" },
  { code: "BR", name: "Brazil", currency: "BRL", phoneCode: "+55" },
  { code: "IN", name: "India", currency: "INR", phoneCode: "+91" },
  { code: "CN", name: "China", currency: "CNY", phoneCode: "+86" },
  { code: "KR", name: "South Korea", currency: "KRW", phoneCode: "+82" },
] as const;

// Default currency for the application
export const DEFAULT_CURRENCY = "USD" as const;

// Currency exchange rate cache duration (in minutes)
export const CURRENCY_CACHE_DURATION = 60; // 1 hour
