import React from "react";

interface DocumentLeftSidebarProps {
  onInsertField: (type: string, label: string) => void;
}

export function DocumentLeftSidebar({ onInsertField }: DocumentLeftSidebarProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="grid gap-3">
        <button
          onClick={() => onInsertField("text-input", "Text Input")}
          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
        >
          <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
            T
          </span>
          Text Field
        </button>
        <button
          onClick={() => onInsertField("checkbox", "Checkbox")}
          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
        >
          <span className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
            ☑
          </span>
          Checkbox
        </button>
        <button
          onClick={() => onInsertField("date", "Date")}
          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
        >
          <span className="p-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded">
            📅
          </span>
          Date Picker
        </button>
        <button
          onClick={() => onInsertField("signature", "Signature")}
          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
        >
          <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
            ✍️
          </span>
          Signature
        </button>
      </div>
    </div>
  );
}
