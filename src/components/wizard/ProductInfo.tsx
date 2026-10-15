"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveFunnelDescription } from "@/server/funnels";

const formSchema = z.object({
  productName: z.string().min(2),
  productDescription: z.string().min(10),
});

export function ProductInfo({ data, updateData, funnelId }: { data: any, updateData: (d: any) => void, funnelId: string }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: data.productName || "",
      productDescription: data.productDescription || "",
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    const values = form.getValues();
    updateData(values);

    const merged = { ...data, ...values };
    await saveFunnelDescription(funnelId, JSON.stringify(merged));

    setIsSaving(false);
    setSaveMessage("Saved");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Product Information</h3>
        <p className="text-sm text-muted-foreground">
          What are you selling? Be descriptive so the AI can highlight the best features.
        </p>
      </div>

      <div className="flex justify-end text-sm text-muted-foreground h-5">
        {isSaving ? "Saving..." : saveMessage}
      </div>

      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product/Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="Super Widget 3000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description & Benefits</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what it is, who it's for, and the main problems it solves..."
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
