"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DockIconButtonProps } from "./dock-icon-button";
import { DockIconDropdownProps } from "./dock-icon-dropdown";

export interface BuilderDockProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export function BuilderDock({
  children,
  className,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: BuilderDockProps) {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<DockIconButtonProps | DockIconDropdownProps>(child)) {
        return React.cloneElement(child, {
          mouseX,
          magnification,
          distance,
        } as Partial<DockIconButtonProps | DockIconDropdownProps>);
      }
      return child;
    });
  };

  return (
    <TooltipProvider delayDuration={100}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          // Base dock styling
          "flex items-end gap-2 p-2 rounded-2xl",
          // Glassmorphism effect
          "border border-border/40 bg-background/60 backdrop-blur-xl",
          "shadow-lg shadow-black/5",
          className
        )}
      >
        {renderChildren()}
      </motion.div>
    </TooltipProvider>
  );
}

// Separator for visual grouping within the dock
export function DockSeparator({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "w-px h-8 bg-border/60 mx-1 self-center",
        className
      )} 
    />
  );
}

export default BuilderDock;
