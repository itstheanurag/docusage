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
        <BuilderHeader 
          title="Form Builder" 
          backHref="/dashboard/forms" 
        />
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
      <div className="h-full pb-24 overflow-y-auto">
        {isPreviewMode ? (
          <FormPreview />
        ) : (
          <BuilderCanvas>
            {activeTab === "build" ? <BuilderCanvasContent /> : <SettingsPanel />}
          </BuilderCanvas>
        )}
      </div>

      {/* Dock Toolbar - Fixed at bottom */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
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
    </BuilderLayout>
  );
}

export default FormBuilder;

