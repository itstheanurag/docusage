import { useDocumentStore } from "@/stores/documentStore";
import { FormatCommandEvent } from "@/types/document";

const Toolbar: React.FC<{
  onFormat: (data: FormatCommandEvent) => void;
}> = ({ onFormat }) => {
  const { undo, redo, historyIndex, history } = useDocumentStore();

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2 text-sm">
      {/* History Controls */}
      <div className="flex gap-1 border-r border-border pr-3 mr-2">
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="Undo"
        >
          ↶
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition"
          title="Redo"
        >
          ↷
        </button>
      </div>

      {/* Font Size */}
      <select
        onChange={(e) =>
          onFormat({ command: "fontSize", value: e.target.value })
        }
        defaultValue="16px"
        className="border border-border bg-background text-foreground rounded px-2 py-1.5 hover:border-accent transition"
      >
        <option value="12px">Small</option>
        <option value="16px">Normal</option>
        <option value="20px">Large</option>
        <option value="24px">Huge</option>
      </select>

      {/* Basic Formatting */}
      <div className="flex gap-1 border-l border-border pl-3 ml-2">
        <button
          onClick={() => onFormat({ command: "bold" })}
          className="font-bold rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Bold"
        >
          B
        </button>
        <button
          onClick={() => onFormat({ command: "italic" })}
          className="italic rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Italic"
        >
          I
        </button>
        <button
          onClick={() => onFormat({ command: "underline" })}
          className="underline rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Underline"
        >
          U
        </button>
      </div>

      {/* Colors */}
      <div className="flex gap-2 border-l border-border pl-3 ml-2">
        <input
          type="color"
          onChange={(e) =>
            onFormat({ command: "foreColor", value: e.target.value })
          }
          className="w-8 h-8 rounded cursor-pointer border border-border bg-background"
          title="Text Color"
        />
        <input
          type="color"
          onChange={(e) =>
            onFormat({ command: "backColor", value: e.target.value })
          }
          className="w-8 h-8 rounded cursor-pointer border border-border bg-background"
          title="Highlight"
        />
      </div>

      {/* Alignment */}
      <div className="flex gap-1 border-l border-border pl-3 ml-2">
        <button
          onClick={() => onFormat({ command: "justifyLeft" })}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Align Left"
        >
          ⫷
        </button>
        <button
          onClick={() => onFormat({ command: "justifyCenter" })}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Center"
        >
          ≡
        </button>
        <button
          onClick={() => onFormat({ command: "justifyRight" })}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Align Right"
        >
          ⫸
        </button>
      </div>

      {/* Lists */}
      <div className="flex gap-1 border-l border-border pl-3 ml-2">
        <button
          onClick={() => onFormat({ command: "insertUnorderedList" })}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Bullet List"
        >
          •
        </button>
        <button
          onClick={() => onFormat({ command: "insertOrderedList" })}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Numbered List"
        >
          1.
        </button>
      </div>

      {/* Insert */}
      <div className="flex gap-1 border-l border-border pl-3 ml-2">
        <button
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) onFormat({ command: "createLink", value: url });
          }}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Insert Link"
        >
          🔗
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) onFormat({ command: "insertImage", value: url });
          }}
          className="rounded px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition"
          title="Insert Image"
        >
          🖼
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
