"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { UploadModal } from "../_components/UploadModal";

export function VideoUploader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="border-2 border-dashed bg-white/50 backdrop-blur-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
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
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation(); // prevents card click from firing again
              setOpen(true);
            }}
          >
            Create pitch
          </Button>
        </div>
      </Card>

      <UploadModal open={open} onOpenChange={setOpen} />
    </>
  );
}
