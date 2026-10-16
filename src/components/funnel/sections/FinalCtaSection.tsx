import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "../LeadCaptureForm";

export function FinalCtaSection({ content, isEditing, funnelId }: { content: any; isEditing?: boolean; funnelId?: string }) {
  return (
    <section className="w-full py-20 bg-primary text-primary-foreground relative group text-center">
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" size="sm">Edit Section</Button>
        </div>
      )}
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          {content.headline || "Ready to get started?"}
        </h2>
        <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl mb-8">
          {content.subheadline || "Don't wait any longer."}
        </p>

        {isEditing ? (
           <Button size="lg" variant="secondary" className="text-lg px-8">
             {content.ctaText || "Buy Now"}
           </Button>
        ) : (
          <div className="mt-8 bg-card/10 p-6 rounded-xl inline-block w-full max-w-md">
            <LeadCaptureForm funnelId={funnelId || ""} ctaText={content.ctaText} />
          </div>
        )}
      </div>
    </section>
  );
}
