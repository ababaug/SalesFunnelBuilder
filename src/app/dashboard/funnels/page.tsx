import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { connection } from "next/server";

export const instant = false;

export default async function FunnelsPage() {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  // Assuming we get the user's first workspace for now
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: { workspace: true }
  });

  const workspaceId = workspaceMember?.workspaceId;

  const funnels = workspaceId
    ? await prisma.funnel.findMany({ where: { workspaceId }, orderBy: { updatedAt: 'desc' } })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Funnels</h2>
          <p className="text-muted-foreground">Manage and create your sales funnels.</p>
        </div>
        <Link href="/dashboard/funnels/new">
          <Button>Create Funnel</Button>
        </Link>
      </div>

      {funnels.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold">No funnels created</h3>
            <p className="text-sm text-muted-foreground">
              You haven't created any funnels yet. Click the button below to start generating your first AI funnel.
            </p>
            <Link href="/dashboard/funnels/new">
              <Button size="lg" className="mt-4">Create Your First Funnel</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {funnels.map((funnel) => (
            <Card key={funnel.id}>
              <CardHeader>
                <CardTitle>{funnel.name}</CardTitle>
                <CardDescription>Status: {funnel.status}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/funnels/${funnel.id}/setup`}>
                  <Button variant="outline" className="w-full">Edit Setup</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
