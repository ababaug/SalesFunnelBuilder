"use client";

import { useState, useEffect } from "react";
import { BusinessInfo } from "./BusinessInfo";
import { ProductInfo } from "./ProductInfo";
import { Audience } from "./Audience";
import { Pricing } from "./Pricing";
import { MediaUpload } from "./MediaUpload";
import { SocialProof } from "./SocialProof";
import { Objective } from "./Objective";
import { Branding } from "./Branding";
import { FinalReview } from "./FinalReview";
import { Button } from "@/components/ui/button";
import { initiateGenerationJob, checkJobStatus } from "@/server/ai/generation-job";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FunnelWizard({ funnelId, initialData }: { funnelId: string, initialData: any }) {
  const [step, setStep] = useState(1);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const router = useRouter();

  // Try to load parsed state from funnel description, else initialize empty
  const [wizardData, setWizardData] = useState<any>(() => {
    try {
      return initialData?.description ? JSON.parse(initialData.description) : {};
    } catch {
      return {};
    }
  });

  const totalSteps = 9;

  const updateData = (stepData: any) => {
    setWizardData((prev: any) => ({ ...prev, ...stepData }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Poll job status
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const result = await checkJobStatus(jobId);
      if (result) {
        setJobStatus(result.status);
        if (result.status === "COMPLETED") {
          clearInterval(interval);
          router.push(`/dashboard/funnels/${funnelId}/editor`);
        } else if (result.status === "FAILED") {
          clearInterval(interval);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, funnelId, router]);

  const handleGenerate = async () => {
    try {
      const result = await initiateGenerationJob(funnelId, wizardData);
      setJobId(result.jobId);
      setJobStatus("PROCESSING");
    } catch (error) {
      console.error(error);
      setJobStatus("FAILED");
    }
  };

  if (jobStatus) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle>AI Generation Status</CardTitle>
            <CardDescription>We are building your funnel.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            {jobStatus === "PROCESSING" && (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 font-medium">Analyzing product and writing copy...</p>
              </div>
            )}
            {jobStatus === "COMPLETED" && (
              <div className="text-green-600 font-medium">Generation complete! Redirecting...</div>
            )}
            {jobStatus === "FAILED" && (
              <div className="text-red-600 text-center">
                <p className="font-medium">Generation failed.</p>
                <p className="text-sm mt-2">Please ensure you have set OPENAI_API_KEY in your environment.</p>
                <Button className="mt-4" onClick={() => { setJobId(null); setJobStatus(null); }}>
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <BusinessInfo data={wizardData} updateData={updateData} funnelId={funnelId} />;
      case 2: return <ProductInfo data={wizardData} updateData={updateData} funnelId={funnelId} />;
      case 3: return <Audience data={wizardData} updateData={updateData} />;
      case 4: return <Pricing data={wizardData} updateData={updateData} />;
      case 5: return <MediaUpload data={wizardData} updateData={updateData} />;
      case 6: return <SocialProof data={wizardData} updateData={updateData} />;
      case 7: return <Objective data={wizardData} updateData={updateData} />;
      case 8: return <Branding data={wizardData} updateData={updateData} />;
      case 9: return <FinalReview data={wizardData} />;
      default: return null;
    }
  };

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

      <div className="bg-card border rounded-lg p-6 shadow-sm min-h-[400px]">
        {renderStep()}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
        >
          Previous
        </Button>
        {step === totalSteps ? (
          <Button onClick={handleGenerate}>
            Generate Funnel
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
}
