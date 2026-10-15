"use client";

import { useState } from "react";
import { FunnelRenderer } from "@/components/funnel/FunnelRenderer";

export function FunnelEditor({ funnelId, initialSections }: { funnelId: string, initialSections: any[] }) {
  const [sections, setSections] = useState(initialSections);

  return (
    <div className="mx-auto w-full max-w-[1200px] bg-background shadow-xl min-h-screen my-8 border rounded-lg overflow-hidden">
      <FunnelRenderer sections={sections} isEditing={true} />
    </div>
  );
}
