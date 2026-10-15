import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getFunnel } from "@/server/funnels";
import { FunnelWizard } from "@/components/wizard/FunnelWizard";

export default async function FunnelSetupPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const resolvedParams = await params;
  const funnel = await getFunnel(resolvedParams.id);

  if (!funnel) {
    redirect("/dashboard/funnels");
  }

  return (
    <div className="container mx-auto">
      <FunnelWizard funnelId={funnel.id} initialData={funnel} />
    </div>
  );
}
