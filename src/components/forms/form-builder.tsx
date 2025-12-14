"use client";

import { useFormBuilderStore } from "@/store/form-builder-store";
import { BuilderLayout, BuilderHeader, BuilderSidebar, BuilderCanvas } from "../builders/shared/builder-layout";
import BuilderCanvasContent from "./builder/canvas";
import PropertiesPanel from "./builder/properties-panel";
import SettingsPanel from "./builder/settings";
import LeftSidebar from "./builder/left-sidebar";
import FormPreview from "./builder/form-preview";
import FormBuilderDock from "./form-builder-dock";


export function FormBuilder() {
  const { activeTab, setActiveTab, isPreviewMode, togglePreview } = useFormBuilderStore();

  return (
    <BuilderLayout
      header={
        <div className="flex flex-col">
          <BuilderHeader 
            title="Form Builder" 
            backHref="/dashboard"
          />
          
          {/* Dock Toolbar */}
          <div className="bg-background/20 backdrop-blur-md border-t border-border/40 p-1.5 flex justify-center shadow-sm z-10">
            <FormBuilderDock
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isPreviewMode={isPreviewMode}
              onTogglePreview={togglePreview}
              onPublish={() => console.log("Publish form")}
              onSendEmail={() => console.log("Send email")}
            />
          </div>
        </div>
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

