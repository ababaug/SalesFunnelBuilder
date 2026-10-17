import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connection } from "next/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardAnalytics } from "@/server/analytics";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const instant = false;

export default async function DashboardPage() {
  await connection();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const analytics = await getDashboardAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back, {session.user.name || "User"}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.pageViews || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Captured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalLeads || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalOrders || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(!analytics?.recentOrders || analytics.recentOrders.length === 0) ? (
                 <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                analytics.recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.funnel?.name}</p>
                    </div>
                    <div className="font-medium text-right">
                      <p>{order.currency}{order.totalAmount}</p>
                      <p className="text-xs text-muted-foreground">{order.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/funnels/new" className="block w-full">
              <Button className="w-full justify-start" variant="outline">Create New Funnel</Button>
            </Link>
            <Link href="/dashboard/leads" className="block w-full">
              <Button className="w-full justify-start" variant="outline">View All Leads</Button>
            </Link>
            <Link href="/dashboard/settings" className="block w-full">
              <Button className="w-full justify-start" variant="outline">Workspace Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
