"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export interface DockIconDropdownProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
  // Internal props passed by BuilderDock
  mouseX?: MotionValue<number>;
  magnification?: number;
  distance?: number;
}

export function DockIconDropdown({
  icon: Icon,
  label,
  children,
  className,
  contentClassName,
  side = "top",
  mouseX,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockIconDropdownProps) {
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
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <motion.button
              ref={ref}
              style={{ width }}
              className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-full transition-colors",
                "bg-background/80 hover:bg-muted border border-border/50",
                className
              )}
            >
              <Icon className="h-5 w-5" />
            </motion.button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side={side} className={cn("min-w-[120px]", contentClassName)}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DockIconDropdown;
