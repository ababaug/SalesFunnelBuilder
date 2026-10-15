import { HeroSection } from "./sections/HeroSection";
import { ProblemSection } from "./sections/ProblemSection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { OfferSection } from "./sections/OfferSection";
import { FaqSection } from "./sections/FaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";

interface FunnelRendererProps {
  sections: any[];
  isEditing?: boolean;
}

export function FunnelRenderer({ sections, isEditing = false }: FunnelRendererProps) {
  if (!sections || sections.length === 0) {
    return <div className="p-12 text-center text-muted-foreground">No content generated yet.</div>;
  }

  // Sort sections by their 'order' field just in case
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      {sortedSections.map((section) => {
        const type = section.type;
        const content = section.content;

        switch (type) {
          case "HERO":
            return <HeroSection key={section.id} content={content} isEditing={isEditing} />;
          case "PROBLEM":
            return <ProblemSection key={section.id} content={content} isEditing={isEditing} />;
          case "BENEFITS":
            return <BenefitsSection key={section.id} content={content} isEditing={isEditing} />;
          case "FEATURES":
            return <FeaturesSection key={section.id} content={content} isEditing={isEditing} />;
          case "OFFER":
            return <OfferSection key={section.id} content={content} isEditing={isEditing} />;
          case "FAQ":
            return <FaqSection key={section.id} content={content} isEditing={isEditing} />;
          case "FINAL_CTA":
            return <FinalCtaSection key={section.id} content={content} isEditing={isEditing} />;
          default:
            return (
              <div key={section.id} className="p-4 border border-dashed border-red-500 m-4 text-center">
                Unknown Section Type: {type}
              </div>
            );
        }
      })}
    </div>
  );
}
