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

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative p-3 rounded-xl transition-all duration-200 cursor-pointer",
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
