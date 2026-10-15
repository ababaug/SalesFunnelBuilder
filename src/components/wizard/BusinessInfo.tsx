"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { saveFunnelDescription } from "@/server/funnels";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Must be a valid email.",
  }),
});

export function BusinessInfo({ funnelId, initialData }: { funnelId: string, initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      contactEmail: "",
    },
  });

  // Simple autosave implementation on blur
  const handleSave = async () => {
    setIsSaving(true);
    const values = form.getValues();
    // In a real app we'd save this to a JSON structure in the Funnel model
    // Here we'll just repurpose the description field for the demo
    const dataStr = JSON.stringify(values);
    await saveFunnelDescription(funnelId, dataStr);
    setIsSaving(false);
    setSaveMessage("Saved");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Information</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your business. This helps the AI write accurate copy.
        </p>
      </div>

      <div className="flex justify-end text-sm text-muted-foreground h-5">
        {isSaving ? "Saving..." : saveMessage}
      </div>

      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@acme.com" {...field} />
                </FormControl>
                <FormDescription>
                  This will be displayed in the footer of your funnel.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
