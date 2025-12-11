"use client";

import React, { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BuilderLayoutProps {
  children: ReactNode;
  header: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  className?: string;
}

// Enhanced Builder Layout with Premium Styling

export function BuilderLayout({
  children,
  header,
  leftSidebar,
  rightSidebar,
  className,
}: BuilderLayoutProps) {
  return (
    <div className={cn("flex flex-col h-screen overflow-hidden bg-background font-sans", className)}>
      {/* Header Area */}
      <div className="flex-none z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sticky top-0">
        {header}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {leftSidebar && (
          <aside className="w-72 flex-none border-r border-border/60 bg-card/30 backdrop-blur-sm hidden md:flex flex-col z-20 shadow-[1px_0_20px_0px_rgba(0,0,0,0.02)]">
            {leftSidebar}
          </aside>
        )}

        {/* Canvas / Center */}
        <main className="flex-1 relative overflow-hidden flex flex-col min-w-0 bg-muted/30">
          {/* Dot Pattern Background */}
           <div 
            className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
          {children}
        </main>

        {/* Right Sidebar */}
        {rightSidebar && (
          <aside className="w-80 flex-none border-l border-border/60 bg-card/30 backdrop-blur-sm hidden lg:flex flex-col z-20 shadow-[-1px_0_20px_0px_rgba(0,0,0,0.02)]">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
}

interface BuilderHeaderProps {
  title?: ReactNode;
  backHref?: string;
  children?: ReactNode;
  className?: string;
}

export function BuilderHeader({
  title,
  backHref,
  children,
  className,
}: BuilderHeaderProps) {
  return (
    <header className={cn("h-16 flex items-center px-6 w-full gap-6", className)}>
      <div className="flex items-center gap-3 flex-none">
        {backHref && (
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 -ml-2 hover:bg-muted/60">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </Link>
          </Button>
        )}
        {title && <div className="font-semibold text-lg tracking-tight text-foreground/90">{title}</div>}
      </div>
      
      <div className="flex-1 flex items-center justify-between gap-4">
          {children}
      </div>
    </header>
  );
}

interface BuilderSidebarProps {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}

export function BuilderSidebar({ children, header, className }: BuilderSidebarProps) {
  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      {header && (
         <div className="flex-none p-4 py-3 border-b border-border/40 font-medium text-xs text-muted-foreground uppercase tracking-wider bg-muted/5 select-none">
          {header}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-border/60 scrollbar-track-transparent">
        {children}
      </div>
    </div>
  );
}

interface BuilderCanvasProps {
  children: ReactNode;
  className?: string;
}

export function BuilderCanvas({ children, className }: BuilderCanvasProps) {
  return (
    <div className={cn("flex-1 overflow-auto p-8 lg:p-12 flex justify-center w-full h-full relative z-10", className)}>
      <div className="w-full h-full relative flex flex-col items-center max-w-[1600px] mx-auto transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}
