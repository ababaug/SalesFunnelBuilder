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

export function Objective({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  const form = useForm({
    defaultValues: {
      conversionObjective: data.conversionObjective || "",
    },
  });

  const handleSave = () => {
    updateData(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Conversion Objective</h3>
        <p className="text-sm text-muted-foreground">What do you want visitors to do?</p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="conversionObjective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Goal</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Buy product, Fill form, WhatsApp message" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
