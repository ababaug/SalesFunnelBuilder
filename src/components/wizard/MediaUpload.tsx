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

export function MediaUpload({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  const form = useForm({
    defaultValues: {
      heroImageUrl: data.heroImageUrl || "",
      productImageUrl: data.productImageUrl || "",
    },
  });

  const handleSave = () => {
    updateData(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Media Assets</h3>
        <p className="text-sm text-muted-foreground">Provide URLs to your product images. (Direct upload coming soon).</p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="heroImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/hero.jpg" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Showcase URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/product.jpg" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
