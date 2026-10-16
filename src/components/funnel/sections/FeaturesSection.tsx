import { Star } from "lucide-react";

export function FeaturesSection({ content }: { content: any }) {
  const features = content.features || [
    { title: "Feature 1", description: "Detail 1" },
    { title: "Feature 2", description: "Detail 2" },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30 relative group">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
          {content.headline || "Features"}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          {features.map((f: any, i: number) => (
            <div key={i} className="flex items-start space-x-4">
              <Star className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
