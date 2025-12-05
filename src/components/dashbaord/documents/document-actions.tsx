"use client";

import { Button } from "@/components/ui/button";
import { Eye, Edit, Download, Trash2 } from "lucide-react";
import React from "react";

const DocumentActions = () => {
  return (
    <div className="flex space-x-1">
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default React.memo(DocumentActions);
