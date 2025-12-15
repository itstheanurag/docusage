"use client";

import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BuilderPanelProps {
  title?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

/**
 * A reusable panel component for all builders with glassmorphic styling.
 * Provides consistent visual treatment across Form, Invoice, and Document builders.
 */
export function BuilderPanel({
  title,
  icon: Icon,
  children,
  className,
  headerAction,
}: BuilderPanelProps) {
  return (
    <div
      className={cn(
        // Base panel styling
        "relative rounded-xl overflow-hidden",
        // Glassmorphism effect
        "bg-card/60 backdrop-blur-md",
        "border border-border/40",
        // Subtle shadow for depth
        "shadow-lg shadow-black/5",
        // Smooth transitions
        "transition-all duration-200",
        // Hover enhancement
        "hover:shadow-xl hover:shadow-black/[0.07] hover:border-border/60",
        className
      )}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 bg-muted/20">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <Icon className="h-4 w-4 text-muted-foreground/80" />
            )}
            <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">
              {title}
            </h3>
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

export default BuilderPanel;
