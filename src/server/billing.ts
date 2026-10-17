"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentSubscription() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: { userId: session.user.id }
    });

    if (!workspaceMember) return null;

    // For Phase 10 MVP, we fetch the active subscription or mock a FREE plan if none exists
    const subscription = await prisma.subscription.findFirst({
      where: {
        workspaceId: workspaceMember.workspaceId,
        status: "ACTIVE"
      },
      include: { plan: true }
    });

    if (subscription) {
      return subscription;
    }

    // Return a virtual FREE plan if no active subscription
    return {
      status: "ACTIVE",
      plan: {
        name: "FREE",
        price: 0,
      },
      entitlements: {
        publishedFunnels: 0,
        aiGenerations: 5,
        customDomains: false
      }
    };
  } catch (error) {
    console.error("Fetch subscription error:", error);
    return null;
  }
}

export async function checkEntitlement(feature: string) {
  // Utility function to be called before server actions (e.g. before publishing a funnel)
  const sub = await getCurrentSubscription();
  if (!sub) return false;

  if (sub.plan.name === "FREE") {
      if (feature === "publishFunnels") return false;
      if (feature === "customDomains") return false;
      return true;
  }

  // PRO or STARTER plans
  return true;
}
