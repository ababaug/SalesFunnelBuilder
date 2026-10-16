"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function createLead(data: { name: string, email?: string, phone?: string, funnelId: string }) {
  try {
    const funnel = await prisma.funnel.findUnique({
      where: { id: data.funnelId },
      select: { workspaceId: true }
    });

    if (!funnel) return { error: "Funnel not found" };

    const lead = await prisma.lead.create({
      data: {
        workspaceId: funnel.workspaceId,
        funnelId: data.funnelId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: "NEW"
      }
    });

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("Create lead error:", error);
    return { error: "Failed to create lead" };
  }
}
