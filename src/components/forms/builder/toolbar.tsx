"use client";

import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Eye, Settings, LayoutTemplate } from "lucide-react";

export default function BuilderToolbar() {
  const { activeTab, setActiveTab, isPreviewMode, togglePreview } =
    useFormBuilderStore();

  return (
    <div className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button
          variant={activeTab === "build" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("build")}
          className="gap-2"
          disabled={isPreviewMode}
        >
          <LayoutTemplate className="h-4 w-4" />
          Build
        </Button>
        <Button
          variant={activeTab === "settings" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("settings")}
          className="gap-2"
          disabled={isPreviewMode}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={togglePreview}
        >
          <Eye className="h-4 w-4" />
          {isPreviewMode ? "Exit Preview" : "Preview"}
        </Button>
        <Button size="sm" disabled={isPreviewMode}>
          Publish
        </Button>
      </div>
    </div>
  );
}
