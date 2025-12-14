"use client";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Type,
  Palette,
  Highlighter,
} from "lucide-react";

import { BuilderDock, DockSeparator } from "@/components/builders/shared/builder-dock";
import { DockIconButton } from "@/components/builders/shared/dock-icon-button";
import { DockIconDropdown } from "@/components/builders/shared/dock-icon-dropdown";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FormatCommandEvent } from "@/types/document";

interface DocumentDockProps {
  onFormat: (data: FormatCommandEvent) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const FONT_SIZES = [
  { value: "1", label: "Small (10px)" },
  { value: "2", label: "Regular (13px)" },
  { value: "3", label: "Normal (16px)" },
  { value: "4", label: "Medium (18px)" },
  { value: "5", label: "Large (24px)" },
  { value: "6", label: "Huge (32px)" },
  { value: "7", label: "Giant (48px)" },
];

const PRESET_COLORS = [
  { color: "#000000", label: "Black" },
  { color: "#374151", label: "Gray" },
  { color: "#dc2626", label: "Red" },
  { color: "#ea580c", label: "Orange" },
  { color: "#ca8a04", label: "Yellow" },
  { color: "#16a34a", label: "Green" },
  { color: "#2563eb", label: "Blue" },
  { color: "#7c3aed", label: "Purple" },
];

export function DocumentDock({
  onFormat,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: DocumentDockProps) {
  return (
    <BuilderDock className="mx-auto">
      {/* History */}
      <DockIconButton
        icon={Undo}
        label="Undo"
        shortcut="Ctrl+Z"
        onClick={onUndo}
        disabled={!canUndo}
      />
      <DockIconButton
        icon={Redo}
        label="Redo"
        shortcut="Ctrl+Y"
        onClick={onRedo}
        disabled={!canRedo}
      />

      <DockSeparator />

      {/* Font Size */}
      <DockIconDropdown icon={Type} label="Font Size">
        <DropdownMenuLabel>Font Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {FONT_SIZES.map((size) => (
          <DropdownMenuItem
            key={size.value}
            onClick={() => onFormat({ command: "fontSize", value: size.value })}
          >
            {size.label}
          </DropdownMenuItem>
        ))}
      </DockIconDropdown>

      <DockSeparator />

      {/* Text Formatting */}
      <DockIconButton
        icon={Bold}
        label="Bold"
        shortcut="Ctrl+B"
        onClick={() => onFormat({ command: "bold" })}
      />
      <DockIconButton
        icon={Italic}
        label="Italic"
        shortcut="Ctrl+I"
        onClick={() => onFormat({ command: "italic" })}
      />
      <DockIconButton
        icon={Underline}
        label="Underline"
        shortcut="Ctrl+U"
        onClick={() => onFormat({ command: "underline" })}
      />

      <DockSeparator />

      {/* Text Color */}
      <DockIconDropdown icon={Palette} label="Text Color">
        <DropdownMenuLabel>Text Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-4 gap-1 p-2">
          {PRESET_COLORS.map(({ color, label }) => (
            <button
              key={color}
              className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={label}
              onClick={() => onFormat({ command: "foreColor", value: color })}
            />
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 pb-2">
          <label className="text-xs text-muted-foreground">Custom</label>
          <input
            type="color"
            className="w-full h-8 cursor-pointer rounded border border-border"
            onChange={(e) => onFormat({ command: "foreColor", value: e.target.value })}
          />
        </div>
      </DockIconDropdown>

      {/* Highlight Color */}
      <DockIconDropdown icon={Highlighter} label="Highlight Color">
        <DropdownMenuLabel>Highlight</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-4 gap-1 p-2">
          {[
            "#fef08a", "#bbf7d0", "#bfdbfe", "#e9d5ff",
            "#fecaca", "#fed7aa", "#f5f5f5", "#ffffff",
          ].map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => onFormat({ command: "backColor", value: color })}
            />
          ))}
        </div>
      </DockIconDropdown>

      <DockSeparator />

      {/* Alignment */}
      <DockIconDropdown icon={AlignLeft} label="Alignment">
        <DropdownMenuItem onClick={() => onFormat({ command: "justifyLeft" })}>
          <AlignLeft className="h-4 w-4 mr-2" /> Align Left
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFormat({ command: "justifyCenter" })}>
          <AlignCenter className="h-4 w-4 mr-2" /> Align Center
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFormat({ command: "justifyRight" })}>
          <AlignRight className="h-4 w-4 mr-2" /> Align Right
        </DropdownMenuItem>
      </DockIconDropdown>

      {/* Lists */}
      <DockIconDropdown icon={List} label="Lists">
        <DropdownMenuItem onClick={() => onFormat({ command: "insertUnorderedList" })}>
          <List className="h-4 w-4 mr-2" /> Bullet List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFormat({ command: "insertOrderedList" })}>
          <ListOrdered className="h-4 w-4 mr-2" /> Numbered List
        </DropdownMenuItem>
      </DockIconDropdown>

      <DockSeparator />

      {/* Insert */}
      <DockIconButton
        icon={LinkIcon}
        label="Insert Link"
        onClick={() => {
          const url = prompt("Enter link URL:");
          if (url) onFormat({ command: "createLink", value: url });
        }}
      />
      <DockIconButton
        icon={ImageIcon}
        label="Insert Image"
        onClick={() => {
          const url = prompt("Enter image URL:");
          if (url) onFormat({ command: "insertImage", value: url });
        }}
      />
    </BuilderDock>
  );
}

export default DocumentDock;
