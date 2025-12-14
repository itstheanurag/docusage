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
  // Internal props passed by BuilderDock
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
  const ref = React.useRef<HTMLButtonElement>(null);
  const fallbackMouseX = useMotionValue(Infinity);
  const actualMouseX = mouseX ?? fallbackMouseX;

  const distanceCalc = useTransform(actualMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          style={{ width }}
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "flex aspect-square cursor-pointer items-center justify-center rounded-full transition-colors",
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
