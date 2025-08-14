import "next-auth";
import "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      tenantId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: string;
    tenantId?: string | null;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role?: string;
    tenantId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    tenantId?: string | null;
  }
}
