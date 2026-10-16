"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { publishFunnel } from "@/server/publishing";

export function PublishForm({ funnelId, currentDomain, status }: { funnelId: string, currentDomain?: string, status: string }) {
  const [subdomain, setSubdomain] = useState(currentDomain || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subdomain) return;

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await publishFunnel(funnelId, subdomain);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Your Funnel</CardTitle>
        <CardDescription>Make your funnel live on the internet.</CardDescription>
      </CardHeader>
      <form onSubmit={handlePublish}>
        <CardContent className="space-y-4">
          {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">{error}</div>}
          {success && (
            <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">
              Funnel successfully published! You can view it at: <br />
              <a href={`/${subdomain}`} className="font-bold underline" target="_blank" rel="noreferrer">
                {subdomain} (Local Preview)
              </a>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Subdomain Path (for preview)</label>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground bg-muted p-2 rounded-md">localhost:3000/</span>
              <Input
                placeholder="my-awesome-product"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">In a real app, this maps to my-product.yourplatform.com</p>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center">
              <span className="font-medium">Current Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {status}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Publishing..." : (status === "PUBLISHED" ? "Update Published Version" : "Publish Now")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
