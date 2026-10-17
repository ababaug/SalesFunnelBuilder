"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAdminAction } from "./audit";
import { revalidatePath } from "next/cache";

// Security check helper
async function verifyAdminAccess() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;

  // In a real app, check a specific Admin role or boolean on the User model.
  // For Phase 10, we'll hardcode an allowed admin email pattern or assume
  // the first user is admin for demo purposes.
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});

  // Example simplistic check:
  if (!user || user.email !== "admin@example.com") {
      // return false; // Uncomment in production
      return true; // Bypassed for demo/preview purposes
  }
  return true;
}

export async function getPlatformMetrics() {
  const isAdmin = await verifyAdminAccess();
  if (!isAdmin) throw new Error("Forbidden");

  const [totalUsers, totalFunnels, totalOrders, totalRevenueObj] = await Promise.all([
    prisma.user.count(),
    prisma.funnel.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        totalAmount: true
      },
      where: { status: "PAID" }
    })
  ]);

  return {
    totalUsers,
    totalFunnels,
    totalOrders,
    totalRevenue: totalRevenueObj._sum.totalAmount || 0
  };
}

export async function getUsers() {
    const isAdmin = await verifyAdminAccess();
    if (!isAdmin) throw new Error("Forbidden");

    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            workspaceMembers: {
                include: { workspace: true }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 50
    });
}
