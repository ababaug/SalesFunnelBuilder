"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function SocialProof({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  const form = useForm({
    defaultValues: {
      testimonials: data.testimonials || "",
    },
  });

  const handleSave = () => {
    updateData(form.getValues());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Social Proof</h3>
        <p className="text-sm text-muted-foreground">Paste existing reviews or testimonials.</p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onBlur={handleSave}>
          <FormField
            control={form.control}
            name="testimonials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw Testimonials</FormLabel>
                <FormControl>
                  <Textarea className="h-32" placeholder='"This product changed my life!" - Jane D.' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
