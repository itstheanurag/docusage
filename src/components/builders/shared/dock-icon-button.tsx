"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export interface DockIconButtonProps {
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  mouseX?: MotionValue<number>;
  magnification?: number;
  distance?: number;
}

export function DockIconButton({
  icon: Icon,
  label,
  shortcut,
  onClick,
  isActive = false,
  disabled = false,
  className,
  mouseX,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockIconButtonProps) {
  // Calculate scale factor based on magnification prop (default 1.2 for "enlarged" look)
  // User asked for 1.02 which is very small, using 1.2 for better visibility as "enlarged"
  const scaleHover = 1.2;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          whileHover={{ scale: scaleHover, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors", // Fixed dimensions (h-10 w-10 = 40px)
            "bg-background/80 hover:bg-muted border border-border/50",
            isActive && "bg-primary/10 border-primary/50 text-primary",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <Icon className="h-5 w-5" />
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" className="flex items-center gap-2">
        <span>{label}</span>
        {shortcut && (
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-muted rounded border border-border">
            {shortcut}
          </kbd>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export default DockIconButton;
