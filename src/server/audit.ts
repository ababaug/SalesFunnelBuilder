import { prisma } from "@/lib/prisma";

export async function logAdminAction(userId: string, action: string, resource: string, resourceId?: string) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId
      }
    });
  } catch (error) {
    console.error("Failed to log audit action", error);
  }
}
