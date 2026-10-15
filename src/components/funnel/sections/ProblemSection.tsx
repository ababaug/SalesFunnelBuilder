import { Button } from "@/components/ui/button";

export function ProblemSection({ content, isEditing }: { content: any; isEditing?: boolean }) {
  return (
    <section className="w-full py-12 md:py-24 bg-red-50/50 dark:bg-red-950/20 relative group">
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="outline" size="sm">Edit Section</Button>
        </div>
      )}
      <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
          {content.headline || "Are you struggling with this?"}
        </h2>
        <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
          {content.description || "The problem description goes here."}
        </p>
      </div>
    </section>
  );
}
