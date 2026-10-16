"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLead } from "@/server/leads";

export function LeadCaptureForm({ funnelId, ctaText }: { funnelId: string, ctaText?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Stub funnelId for preview if none provided
    const id = funnelId || "preview-id";

    try {
      const res = await createLead({ name, email, phone, funnelId: id });
      if (res.error) throw new Error(res.error);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 bg-green-50 text-green-800 rounded-lg text-center border border-green-200">
        <h4 className="text-xl font-bold mb-2">Thank You!</h4>
        <p>Your information has been received. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
      <div className="space-y-2">
        <Input
          placeholder="Your Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="bg-background text-foreground"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="bg-background text-foreground"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="tel"
          placeholder="Phone Number (Optional)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="bg-background text-foreground"
        />
      </div>
      <Button type="submit" className="w-full text-lg h-12" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : (ctaText || "Get Access Now")}
      </Button>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2">Failed to submit. Please try again.</p>
      )}
    </form>
  );
}
