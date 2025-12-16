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
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex items-center gap-1 px-2 py-2 rounded-2xl",
          "bg-background/80 backdrop-blur-xl",
          "border border-border/50",
          "shadow-lg",
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
