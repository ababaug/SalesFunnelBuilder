import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FunnelRenderer } from "@/components/funnel/FunnelRenderer";

// Because we're using a single Next.js app to serve both the dashboard and the published sites
// locally, we'll map the dynamic route /[subdomain] to fetch the domain record.
// In a true multi-tenant deployment on Vercel, this would use Next.js Middleware to rewrite
// hostnames (e.g. my-product.platform.com) to a dynamic route like /_sites/[subdomain].

export const instant = false;

export default async function PublishedFunnelPage({ params }: { params: Promise<{ subdomain: string }> }) {
  await connection();
  const resolvedParams = await params;

  // Guard against known static routes getting caught here
  const reservedRoutes = ["dashboard", "login", "register", "features", "pricing", "templates", "about", "contact"];
  if (reservedRoutes.includes(resolvedParams.subdomain)) {
    return notFound();
  }

  const domain = await prisma.domain.findUnique({
    where: { domain: resolvedParams.subdomain },
    include: {
      funnels: {
        where: { status: "PUBLISHED" },
        include: {
          versions: {
            where: { isPublished: true },
            orderBy: { version: 'desc' },
            take: 1,
            include: {
              sections: {
                orderBy: { order: 'asc' }
              }
            }
          }
        }
      }
    }
  });

  if (!domain || domain.funnels.length === 0 || domain.funnels[0].versions.length === 0) {
    return notFound();
  }

  const funnel = domain.funnels[0];
  const activeVersion = funnel.versions[0];

  return (
    <div className="bg-background min-h-screen">
      <FunnelRenderer funnelId={funnel.id} sections={activeVersion.sections} isEditing={false} />
    </div>
  );
}
