"use client";

import React from "react";
import {
  Download,
  Send,
  Eye,
  Printer,
  Save,
} from "lucide-react";

import { BuilderDock, DockSeparator } from "@/components/builders/shared/builder-dock";
import { DockIconButton } from "@/components/builders/shared/dock-icon-button";
import { ThemeSelector } from "./theme-selector";

interface InvoiceBuilderDockProps {
  onPreview?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
  onSend?: () => void;
  onPrint?: () => void;
}

export function InvoiceBuilderDock({
  onPreview,
  onSave,
  onDownload,
  onSend,
  onPrint,
}: InvoiceBuilderDockProps) {
  return (
    <BuilderDock className="mx-auto">
      {/* View Actions */}
      <DockIconButton
        icon={Eye}
        label="Preview Invoice"
        shortcut="Ctrl+P"
        onClick={onPreview}
      />

      <DockSeparator />

      {/* Save & Export */}
      <DockIconButton
        icon={Save}
        label="Save Draft"
        shortcut="Ctrl+S"
        onClick={onSave}
      />
      
      <DockSeparator />

      {/* Theme Settings */}
      <ThemeSelector />

      <DockSeparator />

      <DockIconButton
        icon={Download}
        label="Download PDF"
        onClick={onDownload}
      />
      <DockIconButton
        icon={Printer}
        label="Print"
        onClick={onPrint}
      />

      <DockSeparator />

      {/* Send */}
      <DockIconButton
        icon={Send}
        label="Send Invoice"
        onClick={onSend}
      />
    </BuilderDock>
  );
}

export default InvoiceBuilderDock;
