"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  MousePointer2,
  Square,
  Circle,
  ArrowRight,
  Minus,
  Type,
  Pencil,
  Eraser,
  Image,
  Undo2,
  Redo2,
  Download,
  Trash2,
} from "lucide-react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

interface WhiteboardDockProps {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
}

const tools = [
  { icon: MousePointer2, label: "Selection", tool: "selection" },
  { icon: Square, label: "Rectangle", tool: "rectangle" },
  { icon: Circle, label: "Ellipse", tool: "ellipse" },
  { icon: ArrowRight, label: "Arrow", tool: "arrow" },
  { icon: Minus, label: "Line", tool: "line" },
  { icon: Pencil, label: "Freedraw", tool: "freedraw" },
  { icon: Type, label: "Text", tool: "text" },
  { icon: Eraser, label: "Eraser", tool: "eraser" },
  { icon: Image, label: "Image", tool: "image" },
];

const actions = [
  { icon: Undo2, label: "Undo", action: "undo" },
  { icon: Redo2, label: "Redo", action: "redo" },
  { icon: Trash2, label: "Clear", action: "clear" },
  { icon: Download, label: "Export", action: "export" },
];

export default function WhiteboardDock({ excalidrawAPI }: WhiteboardDockProps) {
  const handleToolSelect = (tool: string) => {
    if (!excalidrawAPI) return;
    excalidrawAPI.setActiveTool({ type: tool as any });
  };

  const handleAction = async (action: string) => {
    if (!excalidrawAPI) return;

    switch (action) {
      case "undo":
        // Excalidraw handles undo via keyboard shortcuts internally
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "z", ctrlKey: true })
        );
        break;
      case "redo":
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "z", ctrlKey: true, shiftKey: true })
        );
        break;
      case "clear":
        excalidrawAPI.resetScene();
        break;
      case "export":
        // Trigger export dialog
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "e", ctrlKey: true, shiftKey: true })
        );
        break;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <TooltipProvider delayDuration={100}>
        <Dock direction="middle" magnification={55} distance={100}>
          {/* Drawing Tools */}
          {tools.map((item) => (
            <DockIcon key={item.tool}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleToolSelect(item.tool)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 rounded-full hover:bg-white/10"
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="size-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* Separator */}
          <div className="h-8 w-px bg-border/50 mx-1" />

          {/* Action buttons */}
          {actions.map((item) => (
            <DockIcon key={item.action}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleAction(item.action)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 rounded-full hover:bg-white/10"
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="size-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
