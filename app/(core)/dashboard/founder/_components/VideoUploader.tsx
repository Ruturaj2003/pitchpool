import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function VideoUploader() {
  return (
    <Card className="border-2 border-dashed bg-white/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-semibold">Upload your pitch</h3>
          <p className="text-sm text-muted-foreground">
            Drop your video here or click to upload (max 1 minute)
          </p>
        </div>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Select Video
        </Button>
      </div>
    </Card>
  );
}