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

export function Pricing({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  const form = useForm({
    defaultValues: {
      price: data.price || "",
      originalPrice: data.originalPrice || "",
      currency: data.currency || "$",
    },
  });

  const handleSave = () => {
    updateData(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pricing & Offer</h3>
        <p className="text-sm text-muted-foreground">Set your price and currency.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="99" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="199" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency Symbol</FormLabel>
                <FormControl>
                  <Input placeholder="$" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
