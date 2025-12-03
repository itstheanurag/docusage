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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Toolbar: React.FC<{
  onFormat: (data: FormatCommandEvent) => void;
}> = ({ onFormat }) => {
  const { undo, redo, historyIndex, history } = useDocumentStore();

  return (
    <div className="flex items-center gap-1 p-1 bg-background rounded-lg border border-border shadow-sm">
      {/* History */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={undo}
          disabled={historyIndex <= 0}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Font Size */}
      <Select
        onValueChange={(val) => onFormat({ command: "fontSize", value: val })}
        defaultValue="3"
      >
        <SelectTrigger className="h-8 w-[100px] border-none bg-transparent focus:ring-0">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Small</SelectItem>
          <SelectItem value="3">Normal</SelectItem>
          <SelectItem value="5">Large</SelectItem>
          <SelectItem value="7">Huge</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Formatting */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "bold" })}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "italic" })}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "underline" })}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "justifyLeft" })}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "justifyCenter" })}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "justifyRight" })}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "insertUnorderedList" })}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFormat({ command: "insertOrderedList" })}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Colors */}
      <div className="flex items-center gap-2 px-2">
        <div className="relative group">
          <div className="h-6 w-6 rounded border border-border overflow-hidden cursor-pointer flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Type className="h-4 w-4" />
          </div>
          <input
            type="color"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) =>
              onFormat({ command: "foreColor", value: e.target.value })
            }
            title="Text Color"
          />
        </div>
        <div className="relative group">
          <div className="h-6 w-6 rounded border border-border overflow-hidden cursor-pointer flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/50">
            <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
          </div>
          <input
            type="color"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) =>
              onFormat({ command: "backColor", value: e.target.value })
            }
            title="Highlight Color"
          />
        </div>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Insert */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) onFormat({ command: "createLink", value: url });
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) onFormat({ command: "insertImage", value: url });
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
