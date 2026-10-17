"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/server/analytics";

export function TrackingScript({ funnelId }: { funnelId: string }) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current) {
      // Fire a page view event when the script mounts on the client
      trackEvent({ funnelId, eventName: "page_view" }).catch(console.error);
      hasTrackedView.current = true;
    }
  }, [funnelId]);

  return null; // This is an invisible utility component
}
