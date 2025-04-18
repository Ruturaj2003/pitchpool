import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import PitchUploadForm from "../../../pitch/pitchUploadForm";
  
  export function UploadModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Your Pitch</DialogTitle>
          </DialogHeader>
          <PitchUploadForm />
        </DialogContent>
      </Dialog>
    );
  }
  