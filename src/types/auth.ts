// Authentication types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordResetFormData {
  email: string;
}

export interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

// User profile types
export interface UserProfileFormData {
  name: string;
  email: string;
  image?: string;
}

export interface UserWithTenant {
  id: string;
  email: string;
  name?: string;
  role: "SUPER_ADMIN" | "TENANT_ADMIN" | "STAFF" | "CUSTOMER";
  tenantId?: string;
  tenant?: {
    id: string;
    name: string;
    slug: string;
  };
}

// Session types
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "TENANT_ADMIN" | "STAFF" | "CUSTOMER";
  tenantId?: string;
  tenant?: {
    id: string;
    name: string;
    slug: string;
  };
}

// Permission types
export interface Permission {
  resource: string;
  action: string;
}

export interface RolePermissions {
  role: "SUPER_ADMIN" | "TENANT_ADMIN" | "STAFF" | "CUSTOMER";
  permissions: Permission[];
}

// Auth API response types
export interface AuthResponse {
  success: boolean;
  user?: SessionUser;
  error?: string;
  message?: string;
}

export interface LoginResponse extends AuthResponse {
  redirectTo?: string;
}

export interface RegisterResponse extends AuthResponse {
  requiresVerification?: boolean;
}
