import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { USER_ROLES } from "@/constants";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: USER_ROLES.CUSTOMER,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        tenantId: { label: "Tenant ID", type: "text" },
      },
      async authorize(credentials) {
        console.log(
          "🔐 Auth attempt - Email:",
          credentials?.email,
          "TenantId:",
          credentials?.tenantId
        );

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true },
        });

        console.log(
          "👤 User found:",
          !!user,
          "User tenantId:",
          user?.tenantId,
          "User role:",
          user?.role
        );

        if (!user || !user.password) {
          console.log("❌ User not found or no password");
          return null;
        }

        // Check if user belongs to the specified tenant (if provided)
        if (
          credentials.tenantId &&
          credentials.tenantId.trim() !== "" &&
          user.tenantId !== credentials.tenantId
        ) {
          console.log(
            "❌ Tenant mismatch - provided:",
            credentials.tenantId,
            "user has:",
            user.tenantId
          );
          return null;
        }

        console.log("✅ Tenant validation passed");

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        console.log("🔑 Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          console.log("❌ Invalid password");
          return null;
        }

        console.log("✅ Authorization successful for:", user.email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          tenantId: user.tenantId,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || USER_ROLES.CUSTOMER;
        token.tenantId = user.tenantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.tenantId = token.tenantId as string | null;
      }
      return session;
    },
    async signIn({ user, profile }) {
      // Handle Google OAuth sign-in
      if (profile) {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Create new user with default role
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              role: USER_ROLES.CUSTOMER,
              emailVerified: new Date(),
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
