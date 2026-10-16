"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function publishFunnel(funnelId: string, domainName: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Unauthorized" };

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!workspaceMember) return { error: "Unauthorized workspace" };

    // Check if domain exists or is already taken by someone else
    let domain = await prisma.domain.findUnique({
      where: { domain: domainName }
    });

    if (domain && domain.workspaceId !== workspaceMember.workspaceId) {
      return { error: "Domain name is already taken" };
    }

    if (!domain) {
      domain = await prisma.domain.create({
        data: {
          domain: domainName,
          workspaceId: workspaceMember.workspaceId,
          isVerified: true, // Auto-verify subdomains for phase 8
        }
      });
    }

    // Find the funnel
    const funnel = await prisma.funnel.findFirst({
      where: {
        id: funnelId,
        workspaceId: workspaceMember.workspaceId,
      }
    });

    if (!funnel) return { error: "Funnel not found" };

    // Publish the latest version
    const latestVersion = await prisma.funnelVersion.findFirst({
      where: { funnelId },
      orderBy: { version: 'desc' }
    });

    if (latestVersion) {
      await prisma.funnelVersion.update({
        where: { id: latestVersion.id },
        data: { isPublished: true }
      });
    }

    // Update funnel status and attach domain
    await prisma.funnel.update({
      where: { id: funnelId },
      data: {
        status: "PUBLISHED",
        domainId: domain.id
      }
    });

    revalidatePath(`/dashboard/funnels/${funnelId}/publish`);
    return { success: true };
  } catch (error) {
    console.error("Publishing error:", error);
    return { error: "Failed to publish funnel" };
  }
}
