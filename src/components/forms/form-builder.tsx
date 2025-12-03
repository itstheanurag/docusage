"use client";

import { useFormBuilderStore } from "@/store/form-builder-store";
import BuilderCanvas from "./builder/canvas";
import PropertiesPanel from "./builder/properties-panel";
import SettingsPanel from "./builder/settings";
import LeftSidebar from "./builder/left-sidebar";
import BuilderToolbar from "./builder/toolbar";
import FormPreview from "./builder/form-preview";

export function FormBuilder() {
  const { activeTab, isPreviewMode } = useFormBuilderStore();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <BuilderToolbar />

      {isPreviewMode ? (
        <FormPreview />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT */}
          <LeftSidebar />

          {/* CENTER */}
          {activeTab === "build" ? <BuilderCanvas /> : <SettingsPanel />}

          {/* RIGHT */}
          <PropertiesPanel />
        </div>
      )}
    </div>
  );
}

export default FormBuilder;
