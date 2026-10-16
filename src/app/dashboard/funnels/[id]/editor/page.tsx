import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FunnelEditor } from "@/components/editor/FunnelEditor";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function FunnelEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedParams = await params;

  // Verify access
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
      versions: {
        orderBy: { version: 'desc' },
        take: 1,
        include: {
          sections: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!funnel) {
    redirect("/dashboard/funnels");
  }

  const latestVersion = funnel.versions[0];
  const sections = latestVersion?.sections || [];

  return (
    <div className="flex flex-col h-full -m-4 md:-m-8">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-background">
        <div className="flex items-center space-x-4">
          <h1 className="font-semibold">{funnel.name}</h1>
          <span className="px-2 py-1 text-xs font-medium bg-muted rounded-md text-muted-foreground">Draft</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/dashboard/funnels/${funnel.id}/publish`}>
            <Button size="sm">Publish</Button>
          </Link>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex-1 overflow-auto bg-muted/10 relative">
        <FunnelEditor funnelId={funnel.id} initialSections={sections} />
      </div>
    </div>
  );
}
