// Tenant configuration types
export interface TenantConfig {
  name: string;
  slug: string;
  domain?: string;
  description?: string;
  logo?: string;
  settings: Record<string, any>;
}

export interface TenantFormData {
  name: string;
  slug: string;
  domain?: string;
  description?: string;
  logo?: string;
  settings: Record<string, any>;
}

// Tenant data types
export interface TenantData {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  description?: string;
  logo?: string;
  settings: Record<string, any>;
  subscriptionTier: string;
  subscriptionStatus: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  maxProducts: number;
  maxCustomers: number;
  maxStorage: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tenant settings types
export interface TenantSettings {
  // Store settings
  storeName: string;
  storeDescription?: string;
  storeLogo?: string;
  storeFavicon?: string;

  // Contact information
  contactEmail: string;
  contactPhone?: string;
  contactAddress?: string;

  // Social media
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };

  // Payment settings
  currency: string;
  taxRate: number;
  shippingMethods: ShippingMethod[];

  // Email settings
  emailSettings: {
    fromName: string;
    fromEmail: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPassword?: string;
  };

  // SEO settings
  seoSettings: {
    metaTitle?: string;
    metaDescription?: string;
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };

  // Theme settings
  themeSettings: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    customCss?: string;
  };
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  description?: string;
}

// Subscription types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  limits: {
    products: number;
    customers: number;
    storage: number;
  };
  isPopular?: boolean;
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  planId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  plan: SubscriptionPlan;
}

// Tenant API response types
export interface TenantResponse {
  success: boolean;
  tenant?: TenantData;
  error?: string;
  message?: string;
}

export interface TenantsResponse {
  success: boolean;
  tenants?: TenantData[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
  message?: string;
}

export interface TenantSettingsResponse {
  success: boolean;
  settings?: TenantSettings;
  error?: string;
  message?: string;
}

// Tenant onboarding types
export interface TenantOnboardingData {
  step: number;
  completed: boolean;
  data: Record<string, any>;
}

export interface TenantOnboardingResponse {
  success: boolean;
  onboarding?: TenantOnboardingData;
  error?: string;
  message?: string;
}
