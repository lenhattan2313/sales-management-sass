import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tenants = await prisma.tenant.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      where: {
        subscriptionStatus: "active",
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      tenants,
    });
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tenants" },
      { status: 500 }
    );
  }
}
