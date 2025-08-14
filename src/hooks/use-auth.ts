"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { USER_ROLES } from "@/constants";

export function useAuth() {
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const user = session?.user;
  const isAuthenticated = !!user;
  const isAdmin = user?.role === USER_ROLES.SUPER_ADMIN;
  const isTenantAdmin = user?.role === USER_ROLES.TENANT_ADMIN;
  const isStaff = user?.role === USER_ROLES.STAFF;
  const isCustomer = user?.role === USER_ROLES.CUSTOMER;

  const login = async (email: string, password: string, tenantId?: string) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        tenantId,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name?: string;
    tenantId?: string;
    role?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return { success: true, user: result.user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "request",
          email,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return { success: true, message: result.message };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Password reset request failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    token: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "reset",
          email,
          token,
          newPassword,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return { success: true, message: result.message };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Password reset failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (requiredRole: string): boolean => {
    if (!user?.role) return false;

    const roleHierarchy = {
      [USER_ROLES.SUPER_ADMIN]: 4,
      [USER_ROLES.TENANT_ADMIN]: 3,
      [USER_ROLES.STAFF]: 2,
      [USER_ROLES.CUSTOMER]: 1,
    };

    const userLevel =
      roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
    const requiredLevel =
      roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    return userLevel >= requiredLevel;
  };

  const canAccessTenant = (targetTenantId: string): boolean => {
    if (!user?.role || !user?.tenantId) return false;

    // Super admin can access all tenants
    if (user.role === USER_ROLES.SUPER_ADMIN) {
      return true;
    }

    // Other users can only access their own tenant
    return user.tenantId === targetTenantId;
  };

  return {
    // State
    user,
    session,
    status,
    isLoading,
    isAuthenticated,
    isAdmin,
    isTenantAdmin,
    isStaff,
    isCustomer,

    // Actions
    login,
    loginWithGoogle,
    logout,
    register,
    requestPasswordReset,
    resetPassword,

    // Utilities
    hasRole,
    canAccessTenant,
  };
}
