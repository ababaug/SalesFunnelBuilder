import { Button } from "@/components/ui/button";

export function HeroSection({ content, isEditing }: { content: any; isEditing?: boolean }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden group">
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="outline" size="sm">Edit Section</Button>
        </div>
      )}
      <div className="container px-4 md:px-6 mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {content.headline || "Headline Here"}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {content.subheadline || "Subheadline goes here."}
            </p>
          </div>
          <div className="space-x-4">
            <Button size="lg">{content.primaryCtaText || "Get Started"}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
