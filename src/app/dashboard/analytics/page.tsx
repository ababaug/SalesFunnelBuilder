import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connection } from "next/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getDashboardAnalytics } from "@/server/analytics";

export const instant = false;

export default async function AnalyticsPage() {
  await connection();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const analytics = await getDashboardAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Monitor your funnel performance and conversion rates.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.pageViews || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.pageViews ? (( (analytics.totalOrders + analytics.totalLeads) / analytics.pageViews ) * 100).toFixed(1) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4 mt-8">
        <CardHeader>
          <CardTitle>Event Timeline</CardTitle>
          <CardDescription>
            Historical charts and granular event tracking will be implemented in future phases.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md bg-muted/20">
          <p className="text-muted-foreground">Advanced Analytics Visualization (Coming Soon)</p>
        </CardContent>
      </Card>
    </div>
  );
}
