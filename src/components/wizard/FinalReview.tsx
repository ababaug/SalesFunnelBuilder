export function FinalReview({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Final Review</h3>
        <p className="text-sm text-muted-foreground">Review your information before generating the funnel.</p>
      </div>
      <div className="bg-muted p-4 rounded-md overflow-auto max-h-[300px]">
        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>
      <p className="text-sm">Click <strong>Generate Funnel</strong> below to create your sales page using AI.</p>
    </div>
  );
}
