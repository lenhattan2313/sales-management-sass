import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Role-based access control
    const userRole = token?.role as string;

    // Admin routes - only accessible by SUPER_ADMIN
    if (pathname.startsWith("/admin") && userRole !== "SUPER_ADMIN") {
      return NextResponse.redirect(
        new URL("/auth/error?error=AccessDenied", req.url)
      );
    }

    // Tenant admin routes - accessible by TENANT_ADMIN and SUPER_ADMIN
    if (
      pathname.startsWith("/dashboard") &&
      !["TENANT_ADMIN", "SUPER_ADMIN"].includes(userRole)
    ) {
      return NextResponse.redirect(
        new URL("/auth/error?error=AccessDenied", req.url)
      );
    }

    // API routes protection
    if (pathname.startsWith("/api/admin") && userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (
      pathname.startsWith("/api/dashboard") &&
      !["TENANT_ADMIN", "SUPER_ADMIN"].includes(userRole)
    ) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth routes (handled separately)
     * - tenants API (public)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|auth|api/tenants).*)",
  ],
};
