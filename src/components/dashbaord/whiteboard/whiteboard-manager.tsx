"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

const ExcalidrawWrapper = dynamic(
  () => import("./excalidraw-wrapper"),
  { ssr: false }
);

export default function WhiteboardManager() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Excalidraw Canvas */}
      <ExcalidrawWrapper onAPIReady={setExcalidrawAPI} />


    </div>
  );
}
