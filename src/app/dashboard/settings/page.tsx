import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connection } from "next/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentSubscription } from "@/server/billing";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function SettingsPage() {
  await connection();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const subscription = await getCurrentSubscription();

  // Get usage metrics
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id }
  });

  const funnelCount = workspaceMember
    ? await prisma.funnel.count({ where: { workspaceId: workspaceMember.workspaceId } })
    : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings & Billing</h2>
        <p className="text-muted-foreground">Manage your workspace and subscription plan.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the <strong>{subscription?.plan.name}</strong> plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">${(subscription?.plan.price || 0) / 100} / month</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-green-600">{subscription?.status}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Funnels Used</span>
              <span className="font-medium">{funnelCount}</span>
            </div>
          </CardContent>
          <CardFooter>
             <Button variant="outline" className="w-full">Upgrade Plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Upgrades</CardTitle>
            <CardDescription>Unlock more funnels and custom domains.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 border rounded-lg border-primary/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-0.5 rounded-bl text-xs">Popular</div>
                <h4 className="font-bold">STARTER - $29/mo</h4>
                <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                    <li>✓ Publish up to 3 funnels</li>
                    <li>✓ Custom domain support</li>
                    <li>✓ Basic analytics</li>
                </ul>
                <Button className="w-full mt-4" size="sm">Subscribe to Starter</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
