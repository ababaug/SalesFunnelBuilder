import { getPlatformMetrics } from "@/server/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connection } from "next/server";

export const instant = false;

export default async function AdminOverview() {
  await connection();
  const metrics = await getPlatformMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Platform Overview</h2>
        <p className="text-muted-foreground">High-level metrics for the entire SaaS.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Funnels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalFunnels}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders (Global)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gross Revenue Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(metrics.totalRevenue / 100).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
