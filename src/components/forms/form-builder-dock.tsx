"use client";

import React from "react";
import {
  LayoutTemplate,
  Settings,
  Eye,
  EyeOff,
  Send,
  Share2,
} from "lucide-react";

import { BuilderDock, DockSeparator } from "@/components/builders/shared/builder-dock";
import { DockIconButton } from "@/components/builders/shared/dock-icon-button";

interface FormBuilderDockProps {
  activeTab: "build" | "settings";
  onTabChange: (tab: "build" | "settings") => void;
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onPublish?: () => void;
  onSendEmail?: () => void;
}

export function FormBuilderDock({
  activeTab,
  onTabChange,
  isPreviewMode,
  onTogglePreview,
  onPublish,
  onSendEmail,
}: FormBuilderDockProps) {
  return (
    <BuilderDock className="mx-auto">
      {/* Mode Toggle */}
      <DockIconButton
        icon={LayoutTemplate}
        label="Build Mode"
        onClick={() => onTabChange("build")}
        isActive={activeTab === "build" && !isPreviewMode}
        disabled={isPreviewMode}
      />
      <DockIconButton
        icon={Settings}
        label="Settings"
        onClick={() => onTabChange("settings")}
        isActive={activeTab === "settings" && !isPreviewMode}
        disabled={isPreviewMode}
      />

      <DockSeparator />

      {/* Preview Toggle */}
      <DockIconButton
        icon={isPreviewMode ? EyeOff : Eye}
        label={isPreviewMode ? "Exit Preview" : "Preview Form"}
        shortcut="Ctrl+P"
        onClick={onTogglePreview}
        isActive={isPreviewMode}
      />

      <DockSeparator />

      {/* Actions */}
      <DockIconButton
        icon={Share2}
        label="Publish"
        onClick={onPublish}
        disabled={isPreviewMode}
      />
      <DockIconButton
        icon={Send}
        label="Send Email"
        onClick={onSendEmail}
        disabled={isPreviewMode}
      />
    </BuilderDock>
  );
}

export default FormBuilderDock;
