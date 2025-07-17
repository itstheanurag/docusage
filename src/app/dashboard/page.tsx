// sidebar.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Create", key: "create" },
  { label: "Forms", key: "forms" },
  { label: "Analytics", key: "analytics" },
  { label: "User", key: "user" },
];

export default function Sidebar({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={cn(
        "h-screen overflow-hidden flex-shrink-0 border-r transition-all duration-300 bg-background text-foreground",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg truncate">
          {open ? "Dashboard" : ""}
        </span>
        <button
          className="dark:hover:bg-neutral-700 p-1 rounded"
          onClick={() => setOpen(!open)}
        >
          {open ? "←" : "→"}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-2 px-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={cn(
              "w-full text-left block py-2 px-3 rounded text-sm border-b transition",
              selected === item.key
                ? "bg-muted text-primary font-medium"
                : "hover:bg-muted"
            )}
            onClick={() => setSelected(item.key)}
          >
            {open ? item.label : item.label[0]}
          </button>
        ))}
      </nav>
    </aside>
  );
}
