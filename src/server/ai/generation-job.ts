"use server";

import { prisma } from "@/lib/prisma";
import { generateFunnelContent } from "./index";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function initiateGenerationJob(funnelId: string, inputData: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
  });

  if (!workspaceMember) throw new Error("Unauthorized workspace");

  // Verify the funnel belongs to the user's workspace
  const funnel = await prisma.funnel.findFirst({
    where: {
      id: funnelId,
      workspaceId: workspaceMember.workspaceId
    }
  });

  if (!funnel) {
    throw new Error("Funnel not found or unauthorized");
  }

  // Create the job record
  const job = await prisma.funnelGenerationJob.create({
    data: {
      workspaceId: workspaceMember.workspaceId,
      status: "PROCESSING",
      inputData: inputData,
    },
  });

  // Start the background process
  processJob(job.id, funnel.id, inputData).catch(console.error);

  return { jobId: job.id };
}

async function processJob(jobId: string, funnelId: string, inputData: any) {
  try {
    // 1. Call AI
    const generatedContent = await generateFunnelContent(inputData);

    if (!generatedContent) {
      throw new Error("AI returned null or failed schema validation.");
    }

    // 2. Save result to Funnel as a new Version
    const version = await prisma.funnelVersion.create({
      data: {
        funnelId: funnelId,
        version: 1,
      }
    });

    // 3. Create Sections
    const sectionPromises = generatedContent.sections.map((section, index) => {
      return prisma.funnelSection.create({
        data: {
          funnelVersionId: version.id,
          type: section.type,
          order: index,
          content: section as any,
        }
      });
    });

    await Promise.all(sectionPromises);

    // Update job status
    await prisma.funnelGenerationJob.update({
      where: { id: jobId },
      data: {
        status: "COMPLETED",
        resultData: generatedContent as any,
      }
    });

    // Mark Funnel as generated
    await prisma.funnel.update({
      where: { id: funnelId },
      data: { status: "GENERATED" }
    });

  } catch (error: any) {
    console.error("Job processing error:", error);
    await prisma.funnelGenerationJob.update({
      where: { id: jobId },
      data: {
        status: "FAILED",
        error: error.message || "Unknown error occurred",
      }
    });
  }
}

export async function checkJobStatus(jobId: string) {
  const job = await prisma.funnelGenerationJob.findUnique({
    where: { id: jobId },
    select: { status: true, error: true }
  });
  return job;
}
