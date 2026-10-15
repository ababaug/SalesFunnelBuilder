export function MediaUpload({ data, updateData }: { data: any, updateData: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Media Assets (Coming Soon)</h3>
        <p className="text-sm text-muted-foreground">Upload images and videos for your funnel.</p>
      </div>
      <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
        Media upload functionality will be implemented in a future phase.
      </div>
    </div>
  );
}
