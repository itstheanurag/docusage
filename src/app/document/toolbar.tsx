import { useDocumentStore } from "@/store/documentStore";
import { FormatCommandEvent } from "@/types/document";
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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

interface ToolbarProps {
  onFormat: (data: FormatCommandEvent) => void;
}

const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  children,
  tooltip,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-md transition-all",
          isActive
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="text-xs">
      {tooltip}
    </TooltipContent>
  </Tooltip>
);

const ToolbarDivider = () => (
  <div className="w-px h-5 bg-border mx-1 self-center" />
);

export default function Toolbar({ onFormat }: ToolbarProps) {
  const { undo, redo, historyIndex, history } = useDocumentStore();

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {/* History Group */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={undo}
            disabled={historyIndex <= 0}
            tooltip="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            tooltip="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Typography Group */}
        <div className="flex items-center gap-2 mr-1">
           <Select
            onValueChange={(val) => onFormat({ command: "fontSize", value: val })}
            defaultValue="3"
          >
            <SelectTrigger className="h-8 w-[110px] bg-transparent border-transparent hover:bg-muted focus:ring-0 text-sm gap-1 px-2">
              <SelectValue placeholder="Normal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Small (10px)</SelectItem>
              <SelectItem value="2">Regular (13px)</SelectItem>
              <SelectItem value="3">Normal (16px)</SelectItem>
              <SelectItem value="4">Medium (18px)</SelectItem>
              <SelectItem value="5">Large (24px)</SelectItem>
              <SelectItem value="6">Huge (32px)</SelectItem>
              <SelectItem value="7">Giant (48px)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => onFormat({ command: "bold" })}
            tooltip="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => onFormat({ command: "italic" })}
            tooltip="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => onFormat({ command: "underline" })}
            tooltip="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Colors (Styled) */}
        <div className="flex items-center gap-1">
           <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative group">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground">
                   <Palette className="h-4 w-4" />
                   <div 
                      className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50" 
                      style={{ backgroundColor: 'currentColor' }} // Dynamic color preview could go here
                   />
                </Button>
                <input
                  type="color"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={(e) => onFormat({ command: "foreColor", value: e.target.value })}
                  title="Text Color"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Text Color</TooltipContent>
          </Tooltip>

           <Tooltip>
            <TooltipTrigger asChild>
               <div className="relative group">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground">
                   <Highlighter className="h-4 w-4" />
                </Button>
                <input
                  type="color"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={(e) => onFormat({ command: "backColor", value: e.target.value })}
                  title="Highlight Color"
                />
              </div>
             </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Highlight Color</TooltipContent>
          </Tooltip>
        </div>

        <ToolbarDivider />

        {/* Alignment Group */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => onFormat({ command: "justifyLeft" })}
            tooltip="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => onFormat({ command: "justifyCenter" })}
            tooltip="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => onFormat({ command: "justifyRight" })}
            tooltip="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* List Group */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => onFormat({ command: "insertUnorderedList" })}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => onFormat({ command: "insertOrderedList" })}
            tooltip="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        {/* Insert Group */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter link URL:");
              if (url) onFormat({ command: "createLink", value: url });
            }}
            tooltip="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter image URL:");
              if (url) onFormat({ command: "insertImage", value: url });
            }}
            tooltip="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>
    </TooltipProvider>
  );
}
