"use client";

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { useTheme } from "next-themes";

interface ExcalidrawWrapperProps {
  onAPIReady?: (api: ExcalidrawImperativeAPI) => void;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ onAPIReady }) => {
  const theme = useTheme()
  return (
    <div className="h-full w-full">
      <Excalidraw
        excalidrawAPI={(api) => {
          if (onAPIReady) {
            onAPIReady(api);
          }
        }}
        theme={theme.theme === "dark" ? "dark" : "light"}
        UIOptions={{
          canvasActions: {
            export: { saveFileToDisk: true },
          },
        }}
      />
    </div>
  );
};

export default ExcalidrawWrapper;
