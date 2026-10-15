import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connection } from "next/server";

export const instant = false;

export default async function OnboardingPage() {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container py-12 px-4 md:px-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to AI Funnel Builder</h1>
      <p className="text-muted-foreground mb-8">Let's set up your first workspace.</p>

      {/* Workspace creation form will go here */}
      <div className="max-w-md p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Workspace</h2>
        <p className="text-sm text-muted-foreground mb-4">
          A workspace is where you manage your funnels, leads, and settings.
        </p>
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Create Default Workspace (Coming Soon)
        </button>
      </div>
    </div>
  );
}
