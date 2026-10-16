"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/server/orders";

interface OrderFormProps {
  funnelId: string;
  productName: string;
  price: number;
  currency: string;
  ctaText?: string;
}

export function OrderForm({ funnelId, productName, price, currency, ctaText }: OrderFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const id = funnelId || "preview-id";

    try {
      const res = await createOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        funnelId: id,
        amount: price,
        currency,
        items: [{ name: productName, price, quantity: 1 }]
      });

      if (res.error) throw new Error(res.error);

      // In a real flow, redirect to payment gateway (Paystack/Stripe) here
      // For Phase 7, we simulate a successful Cash on Delivery/Manual order
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 bg-green-50 text-green-800 rounded-lg text-center border border-green-200 w-full mt-6">
        <h4 className="text-xl font-bold mb-2">Order Confirmed!</h4>
        <p>Thank you for your purchase. We will process your order immediately.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mt-6 text-left">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
        <Input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>{currency}{price}</span>
        </div>
        <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={status === "submitting"}>
          {status === "submitting" ? "Processing..." : (ctaText || "Complete Order")}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2 text-center">Failed to process order. Please try again.</p>
      )}
    </form>
  );
}
