"use client";

import { useState } from "react";
import { BusinessInfo } from "./BusinessInfo";
import { ProductInfo } from "./ProductInfo";
import { Button } from "@/components/ui/button";

export function FunnelWizard({ funnelId, initialData }: { funnelId: string, initialData: any }) {
  const [step, setStep] = useState(1);
  const totalSteps = 2; // For phase 4 we'll do 2 basic steps to establish the framework

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Funnel Setup Wizard</h2>
        <p className="text-muted-foreground">Step {step} of {totalSteps}</p>
        <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6 shadow-sm">
        {step === 1 && <BusinessInfo funnelId={funnelId} initialData={initialData} />}
        {step === 2 && <ProductInfo funnelId={funnelId} initialData={initialData} />}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={step === totalSteps}
        >
          {step === totalSteps ? "Generate Funnel" : "Next Step"}
        </Button>
      </div>
    </div>
  );
}
