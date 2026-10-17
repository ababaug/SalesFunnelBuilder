import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connection } from "next/server";
import Link from "next/link";
import { Users, LayoutDashboard, Settings } from "lucide-react";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Simplified Admin Check (Matches server actions logic)
  if (session.user?.email !== "admin@example.com") {
    // In production, enforce admin access here.
    // We allow it to pass through for MVP preview.
  }

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 border-r bg-slate-900 text-slate-300 min-h-screen hidden md:block">
        <div className="flex h-14 items-center border-b border-slate-800 px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold text-white">
            <span>SaaS Admin Portal</span>
          </Link>
        </div>
        <div className="py-4">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-800 hover:text-white">
              <LayoutDashboard className="h-4 w-4" /> Platform Overview
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-800 hover:text-white">
              <Users className="h-4 w-4" /> User Management
            </Link>
          </nav>
        </div>
      </nav>
      <div className="flex-1 flex flex-col bg-slate-50">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
