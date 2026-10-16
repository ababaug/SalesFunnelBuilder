import { HeroSection } from "./sections/HeroSection";
import { ProblemSection } from "./sections/ProblemSection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { OfferSection } from "./sections/OfferSection";
import { FaqSection } from "./sections/FaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { updateFunnelSectionContent } from "@/server/funnels";

interface FunnelRendererProps {
  funnelId?: string;
  sections: any[];
  isEditing?: boolean;
}

function EditableSectionWrapper({
  section,
  children,
  isEditing
}: {
  section: any,
  children: React.ReactNode,
  isEditing: boolean
}) {
  const [content, setContent] = useState(JSON.stringify(section.content, null, 2));
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const parsed = JSON.parse(content);
      await updateFunnelSectionContent(section.id, parsed);
      setIsOpen(false);
      // Let server action revalidate the page
    } catch (e) {
      alert("Invalid JSON content");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) return <>{children}</>;

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button variant="secondary" size="sm">Edit Section Content</Button>} />
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit {section.type} Content</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-64 font-mono text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {children}
    </div>
  );
}

export function FunnelRenderer({ funnelId, sections, isEditing = false }: FunnelRendererProps) {
  if (!sections || sections.length === 0) {
    return <div className="p-12 text-center text-muted-foreground">No content generated yet.</div>;
  }

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      {sortedSections.map((section) => {
        const type = section.type;
        const content = section.content;

        let renderedSection = null;
        switch (type) {
          case "HERO":
            renderedSection = <HeroSection content={content} />; break;
          case "PROBLEM":
            renderedSection = <ProblemSection content={content} />; break;
          case "BENEFITS":
            renderedSection = <BenefitsSection content={content} />; break;
          case "FEATURES":
            renderedSection = <FeaturesSection content={content} />; break;
          case "OFFER":
            renderedSection = <OfferSection content={content} funnelId={funnelId} />; break;
          case "FAQ":
            renderedSection = <FaqSection content={content} />; break;
          case "FINAL_CTA":
            renderedSection = <FinalCtaSection content={content} funnelId={funnelId} />; break;
          default:
            renderedSection = (
              <div className="p-4 border border-dashed border-red-500 m-4 text-center">
                Unknown Section Type: {type}
              </div>
            );
        }

        return (
          <EditableSectionWrapper key={section.id} section={section} isEditing={isEditing}>
            {renderedSection}
          </EditableSectionWrapper>
        );
      })}
    </div>
  );
}
