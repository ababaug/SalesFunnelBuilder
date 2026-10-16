import { CheckCircle2 } from "lucide-react";

export function BenefitsSection({ content }: { content: any }) {
  const benefits = content.benefits || [
    { title: "Benefit 1", description: "Description 1" },
    { title: "Benefit 2", description: "Description 2" },
    { title: "Benefit 3", description: "Description 3" },
  ];

  return (
    <section className="w-full py-12 md:py-24 relative group">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
          {content.headline || "Why You Need This"}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((b: any, i: number) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3 p-6 border rounded-xl bg-card">
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
