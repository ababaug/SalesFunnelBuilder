import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import { PublishForm } from "./PublishForm";

export const instant = false;

export default async function PublishPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedParams = await params;

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
  });

  if (!workspaceMember) redirect("/dashboard");

  const funnel = await prisma.funnel.findFirst({
    where: {
      id: resolvedParams.id,
      workspaceId: workspaceMember.workspaceId,
    },
    include: {
      domain: true
    }
  });

  if (!funnel) {
    redirect("/dashboard/funnels");
  }

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <PublishForm funnelId={funnel.id} currentDomain={funnel.domain?.domain} status={funnel.status} />
    </div>
  );
}
