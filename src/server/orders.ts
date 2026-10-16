"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function createOrder(data: { customerName: string, customerEmail?: string, customerPhone?: string, funnelId: string, amount: number, currency: string, items: any[] }) {
  try {
    const funnel = await prisma.funnel.findUnique({
      where: { id: data.funnelId },
      select: { workspaceId: true }
    });

    if (!funnel) return { error: "Funnel not found" };

    const order = await prisma.order.create({
      data: {
        workspaceId: funnel.workspaceId,
        funnelId: data.funnelId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        totalAmount: data.amount,
        currency: data.currency,
        status: "PENDING",
        items: {
          create: data.items.map(item => ({
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price
          }))
        }
      }
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Create order error:", error);
    return { error: "Failed to create order" };
  }
}
