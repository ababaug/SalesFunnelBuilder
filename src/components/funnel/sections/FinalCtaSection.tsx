import { Button } from "@/components/ui/button";

export function FinalCtaSection({ content, isEditing }: { content: any; isEditing?: boolean }) {
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
        <Button size="lg" variant="secondary" className="text-lg px-8">
          {content.ctaText || "Buy Now"}
        </Button>
      </div>
    </section>
  );
}
