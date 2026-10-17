"use client";
import { TrackingScript } from "../TrackingScript";
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
  contentObj,
  children,
  isEditing
}: {
  section: any,
  contentObj: any,
  children: React.ReactNode,
  isEditing: boolean
}) {
  const [contentStr, setContentStr] = useState(JSON.stringify(contentObj, null, 2));
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const parsed = JSON.parse(contentStr);
      // Backend expects stringified JSON for the content field due to sqlite db fallback constraints
      await updateFunnelSectionContent(section.id, JSON.stringify(parsed));
      setIsOpen(false);
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
          <DialogTrigger >
            <Button variant="secondary" size="sm">Edit Section Content</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit {section.type} Content</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                value={contentStr}
                onChange={(e) => setContentStr(e.target.value)}
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
      {!isEditing && funnelId && <TrackingScript funnelId={funnelId} />}
      {sortedSections.map((section) => {
        const type = section.type;
        // safely parse the sqlite string representation back to an object
        let contentObj: any = {};
        try {
            contentObj = typeof section.content === 'string' ? JSON.parse(section.content) : section.content;
        } catch(e) {
            console.error("Failed to parse section content", section.content);
        }

        let renderedSection = null;
        switch (type) {
          case "HERO":
            renderedSection = <HeroSection content={contentObj} />; break;
          case "PROBLEM":
            renderedSection = <ProblemSection content={contentObj} />; break;
          case "BENEFITS":
            renderedSection = <BenefitsSection content={contentObj} />; break;
          case "FEATURES":
            renderedSection = <FeaturesSection content={contentObj} />; break;
          case "OFFER":
            renderedSection = <OfferSection content={contentObj} funnelId={funnelId} />; break;
          case "FAQ":
            renderedSection = <FaqSection content={contentObj} />; break;
          case "FINAL_CTA":
            renderedSection = <FinalCtaSection content={contentObj} funnelId={funnelId} />; break;
          default:
            renderedSection = (
              <div className="p-4 border border-dashed border-red-500 m-4 text-center">
                Unknown Section Type: {type}
              </div>
            );
        }

        return (
          <EditableSectionWrapper key={section.id} section={section} contentObj={contentObj} isEditing={isEditing}>
            {renderedSection}
          </EditableSectionWrapper>
        );
      })}
    </div>
  );
}
