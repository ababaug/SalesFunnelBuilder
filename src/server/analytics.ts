"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function trackEvent(data: { funnelId: string, eventName: string, properties?: any }) {
  try {
    const funnel = await prisma.funnel.findUnique({
      where: { id: data.funnelId },
      select: { workspaceId: true }
    });

    if (!funnel) return { error: "Funnel not found" };

    await prisma.analyticsEvent.create({
      data: {
        workspaceId: funnel.workspaceId,
        name: data.eventName,
        properties: data.properties ? JSON.stringify(data.properties) : null
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Track event error:", error);
    return { error: "Failed to track event" };
  }
}

export async function getDashboardAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: { userId: session.user.id }
    });

    if (!workspaceMember) return null;

    const workspaceId = workspaceMember.workspaceId;

    const [totalLeads, totalOrders, pageViews] = await Promise.all([
      prisma.lead.count({ where: { workspaceId } }),
      prisma.order.count({ where: { workspaceId } }),
      prisma.analyticsEvent.count({ where: { workspaceId, name: "page_view" } })
    ]);

    const recentOrders = await prisma.order.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { funnel: { select: { name: true } } }
    });

    return {
      totalLeads,
      totalOrders,
      pageViews,
      recentOrders
    };
  } catch (error) {
    console.error("Fetch analytics error:", error);
    return null;
  }
}
