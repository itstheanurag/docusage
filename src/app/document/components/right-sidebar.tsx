import React from "react";
import UserPresence from "../user";

interface DocumentRightSidebarProps {
  wordCount: number;
  characterCount: number;
  pageSizeLabel: string;
}

export function DocumentRightSidebar({
  wordCount,
  characterCount,
  pageSizeLabel,
}: DocumentRightSidebarProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-sm text-muted-foreground">
        <div className="font-medium text-foreground mb-2">Document Stats</div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span>Words</span>
          <span className="font-mono">{wordCount}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span>Characters</span>
          <span className="font-mono">{characterCount}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span>Size</span>
          <span className="font-mono">{pageSizeLabel}</span>
        </div>
      </div>
      <UserPresence />
    </div>
  );
}
