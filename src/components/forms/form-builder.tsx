"use client";

import { useFormBuilderStore } from "@/store/form-builder-store";
import { BuilderLayout, BuilderHeader, BuilderSidebar, BuilderCanvas } from "../builders/shared/builder-layout";
import BuilderCanvasContent from "./builder/canvas";
import PropertiesPanel from "./builder/properties-panel";
import SettingsPanel from "./builder/settings";
import LeftSidebar from "./builder/left-sidebar";
import FormPreview from "./builder/form-preview";
import { Button } from "@/components/ui/button";
import { Eye, Settings, LayoutTemplate } from "lucide-react";


export function FormBuilder() {
  const { activeTab, setActiveTab, isPreviewMode, togglePreview } = useFormBuilderStore();

  return (
    <BuilderLayout
      header={
        <BuilderHeader 
          title="Form Builder" 
          backHref="/dashboard"
        >
          {/* Left Controls */}
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

          {/* Right Actions */}
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
            <Button variant="outline" size="sm" disabled={isPreviewMode}>
              Send Email
            </Button>
          </div>
        </BuilderHeader>
      }
      leftSidebar={
        !isPreviewMode && (
          <BuilderSidebar header="Add Fields">
            <LeftSidebar />
          </BuilderSidebar>
        )
      }
      rightSidebar={
        !isPreviewMode && (
          <BuilderSidebar header="Properties">
            <PropertiesPanel />
          </BuilderSidebar>
        )
      }
    >
      {isPreviewMode ? (
        <FormPreview />
      ) : (
        <BuilderCanvas>
          {activeTab === "build" ? <BuilderCanvasContent /> : <SettingsPanel />}
        </BuilderCanvas>
      )}
    </BuilderLayout>
  );
}

export default FormBuilder;
