import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
       return new NextResponse("Missing signature", { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
        console.error("PAYSTACK_SECRET_KEY is not configured.");
        return new NextResponse("Server Configuration Error", { status: 500 });
    }

    // Verify Paystack signature
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
       return new NextResponse("Invalid signature", { status: 400 });
    }

    const body = JSON.parse(rawBody);

    if (body.event === "charge.success") {
      const { reference, metadata } = body.data;

      if (metadata?.orderId) {
        await prisma.order.update({
          where: { id: metadata.orderId },
          data: {
            status: "PAID",
            paymentMethod: "PAYSTACK"
          }
        });
      }
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
