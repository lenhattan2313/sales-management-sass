import { hash, compare } from "bcryptjs";
import { prisma } from "../prisma";
import { USER_ROLES } from "@/constants";
import { isValidEmail, validatePassword } from "@/utils/validation";

/**
 * Hash password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(password, hashedPassword);
}

/**
 * Create a new user with proper validation
 */
export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
  tenantId?: string;
  role?: string;
}): Promise<{ success: boolean; user?: unknown; error?: string }> {
  try {
    // Validate email
    if (!isValidEmail(data.email)) {
      return { success: false, error: "Invalid email address" };
    }

    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors[0] };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        tenantId: data.tenantId,
        role: (data.role as keyof typeof USER_ROLES) || USER_ROLES.CUSTOMER,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        tenantId: true,
        createdAt: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

/**
 * Get user by email with tenant information
 */
export async function getUserByEmail(email: string, tenantId?: string) {
  return await prisma.user.findFirst({
    where: {
      email,
      ...(tenantId && { tenantId }),
    },
    include: {
      tenant: true,
    },
  });
}

/**
 * Get user by ID with tenant information
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      tenant: true,
    },
  });
}

/**
 * Update user password
 */
export async function updateUserPassword(
  userId: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors[0] };
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Failed to update password" };
  }
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    [USER_ROLES.SUPER_ADMIN]: 4,
    [USER_ROLES.TENANT_ADMIN]: 3,
    [USER_ROLES.STAFF]: 2,
    [USER_ROLES.CUSTOMER]: 1,
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel =
    roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
}

/**
 * Check if user can access tenant
 */
export function canAccessTenant(
  userTenantId: string | null,
  targetTenantId: string,
  userRole: string
): boolean {
  // Super admin can access all tenants
  if (userRole === USER_ROLES.SUPER_ADMIN) {
    return true;
  }

  // Other users can only access their own tenant
  return userTenantId === targetTenantId;
}

/**
 * Generate password reset token
 */
export async function generatePasswordResetToken(
  email: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Generate a secure token
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in database (you might want to create a separate table for this)
    // For now, we'll use the existing VerificationToken model
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    return { success: true, token };
  } catch (error) {
    console.error("Error generating reset token:", error);
    return { success: false, error: "Failed to generate reset token" };
  }
}

/**
 * Verify password reset token
 */
export async function verifyPasswordResetToken(
  email: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid or expired token" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying reset token:", error);
    return { success: false, error: "Failed to verify token" };
  }
}
