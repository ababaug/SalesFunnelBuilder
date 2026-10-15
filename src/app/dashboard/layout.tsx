import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connection } from "next/server";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export const instant = false;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-14rem)] md:min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
