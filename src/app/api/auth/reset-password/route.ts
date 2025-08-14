import { NextRequest, NextResponse } from "next/server";
import {
  generatePasswordResetToken,
  verifyPasswordResetToken,
  updateUserPassword,
} from "@/lib/auth/auth-utils";
import { z } from "zod";

const requestResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "request") {
      // Request password reset
      const validation = requestResetSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { success: false, error: validation.error.issues[0].message },
          { status: 400 }
        );
      }

      const { email } = validation.data;
      const result = await generatePasswordResetToken(email);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }

      // TODO: Send email with reset token
      // For now, we'll return the token (in production, this should be sent via email)
      return NextResponse.json({
        success: true,
        message: "Password reset token generated",
        token: result.token, // Remove this in production
      });
    } else if (action === "reset") {
      // Reset password with token
      const validation = resetPasswordSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { success: false, error: validation.error.issues[0].message },
          { status: 400 }
        );
      }

      const { email, token, newPassword } = validation.data;

      // Verify token
      const tokenVerification = await verifyPasswordResetToken(email, token);
      if (!tokenVerification.success) {
        return NextResponse.json(
          { success: false, error: tokenVerification.error },
          { status: 400 }
        );
      }

      // Get user and update password
      const { prisma } = await import("@/lib/prisma");
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }

      const updateResult = await updateUserPassword(user.id, newPassword);
      if (!updateResult.success) {
        return NextResponse.json(
          { success: false, error: updateResult.error },
          { status: 400 }
        );
      }

      // Delete the used token
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: email,
          token,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Password reset successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
