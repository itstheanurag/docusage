"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";

interface SaveCancelBarProps {
  onCancel: () => void;
  onSave: () => void;
}

const SaveCancelBar = ({ onCancel, onSave }: SaveCancelBarProps) => {
  return (
    <div className="fixed bottom-6 right-6 flex gap-2 z-50">
      <Button variant="outline" onClick={onCancel} className="shadow-lg">
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>

      <Button onClick={onSave} className="shadow-lg">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};

export default React.memo(SaveCancelBar);
