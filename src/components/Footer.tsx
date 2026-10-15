"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="font-bold">
              AI Funnel Builder
            </Link>
            <p className="text-sm text-muted-foreground">
              Build high-converting sales funnels in minutes with the power of AI.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Product</h3>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Legal</h3>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} AI Funnel Builder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
