"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: any) {
  try {
    const { name, email, password } = data;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    // Auto-create a default workspace for the user
    const workspaceName = `${name || email.split('@')[0]}'s Workspace`;
    let slug = workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Ensure slug is unique (simple implementation)
    const existingSlug = await prisma.workspace.findUnique({ where: { slug } });
    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    await prisma.workspace.create({
      data: {
        name: workspaceName,
        slug,
        members: {
          create: {
            userId: user.id,
            role: "OWNER",
          },
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred during registration" };
  }
}
