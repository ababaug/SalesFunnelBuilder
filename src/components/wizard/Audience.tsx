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
import { Textarea } from "@/components/ui/textarea";

export function Audience({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  const form = useForm({
    defaultValues: {
      targetAudience: data.targetAudience || "",
      painPoints: data.painPoints || "",
    },
  });

  const handleSave = () => {
    updateData(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Target Audience</h3>
        <p className="text-sm text-muted-foreground">Who is this funnel for?</p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Small business owners, stay-at-home moms" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="painPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Pain Points</FormLabel>
                <FormControl>
                  <Textarea placeholder="What problems are they trying to solve?" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
