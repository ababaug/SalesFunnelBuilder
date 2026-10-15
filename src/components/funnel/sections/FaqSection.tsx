import { Button } from "@/components/ui/button";

export function FaqSection({ content, isEditing }: { content: any; isEditing?: boolean }) {
  const faqs = content.questions || [
    { question: "Question 1?", answer: "Answer 1." },
    { question: "Question 2?", answer: "Answer 2." },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-muted/10 relative group">
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="outline" size="sm">Edit Section</Button>
        </div>
      )}
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          {content.headline || "Frequently Asked Questions"}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq: any, i: number) => (
            <div key={i} className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
