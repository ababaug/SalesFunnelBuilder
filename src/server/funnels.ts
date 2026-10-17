"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFunnel(data: { name: string }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Unauthorized" };

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!workspaceMember) return { error: "No workspace found" };

    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

    const funnel = await prisma.funnel.create({
      data: {
        workspaceId: workspaceMember.workspaceId,
        name: data.name,
        slug,
        status: "DRAFT",
      },
    });

    revalidatePath("/dashboard/funnels");
    return { success: true, funnelId: funnel.id };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create funnel" };
  }
}

export async function getFunnel(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: { userId: session.user.id },
    });

    if (!workspaceMember) return null;

    const funnel = await prisma.funnel.findFirst({
      where: {
        id,
        workspaceId: workspaceMember.workspaceId,
      },
    });

    return funnel;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function saveFunnelDescription(id: string, description: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return { error: "Unauthorized" };

        const workspaceMember = await prisma.workspaceMember.findFirst({
          where: { userId: session.user.id },
        });

        if (!workspaceMember) return { error: "Unauthorized workspace" };

        const funnel = await prisma.funnel.findFirst({
            where: { id, workspaceId: workspaceMember.workspaceId }
        });

        if (!funnel) return { error: "Not found or unauthorized" };

        await prisma.funnel.update({
          where: { id },
          data: { description }
        });

        return { success: true };
      } catch (error) {
        console.error(error);
        return { error: "Failed to autosave" };
      }
}

export async function updateFunnelSectionContent(sectionId: string, content: any) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return { error: "Unauthorized" };

        const workspaceMember = await prisma.workspaceMember.findFirst({
            where: { userId: session.user.id },
        });

        if (!workspaceMember) return { error: "Unauthorized workspace" };

        // Ensure user owns this section
        const section = await prisma.funnelSection.findUnique({
            where: { id: sectionId },
            include: { funnelVersion: { include: { funnel: true } } }
        });

        if (!section || section.funnelVersion.funnel.workspaceId !== workspaceMember.workspaceId) {
             return { error: "Not found or unauthorized" };
        }

        const updatedSection = await prisma.funnelSection.update({
            where: { id: sectionId },
            data: { content: content as any }
        });

        revalidatePath(`/dashboard/funnels/${section.funnelVersion.funnel.id}/editor`);
        return { success: true, section: updatedSection };

    } catch (error) {
        console.error("Update section error:", error);
        return { error: "Failed to update section" };
    }
}
