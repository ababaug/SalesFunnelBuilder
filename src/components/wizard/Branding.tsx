"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function Branding({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  const form = useForm({
    defaultValues: {
      primaryColor: data.primaryColor || "",
      brandPersonality: data.brandPersonality || "",
    },
  });

  const handleSave = () => {
    updateData(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Branding</h3>
        <p className="text-sm text-muted-foreground">Set your brand's look and feel.</p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color (Hex)</FormLabel>
                <FormControl>
                  <Input placeholder="#2563eb" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandPersonality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Personality</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Professional, Playful, Luxury" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
