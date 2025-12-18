"use client";

import { useDocumentStore } from "@/store/documentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Type, Hash, Calendar, Copy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export function DocumentVariableSidebar() {
  const { variables, addVariable, removeVariable, isTemplate, setIsTemplate } = useDocumentStore();
  const [newName, setNewName] = useState("");

  const handleAddVariable = () => {
    if (!newName.trim()) return;
    
    // Ensure template mode is on if we are adding variables
    if (!isTemplate) setIsTemplate(true);

    addVariable({
      id: uuidv4(),
      name: newName.trim().replace(/\s+/g, "_").toLowerCase(),
      label: newName.trim(),
      type: "text",
    });
    setNewName("");
  };

  const copyToClipboard = (name: string) => {
    const placeholder = `{{${name}}}`;
    navigator.clipboard.writeText(placeholder);
  };

  return (
    <div className="flex flex-col h-full bg-background border-l w-64 p-4 gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Variables</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="template-mode" className="text-xs">Template</Label>
          <input 
            id="template-mode"
            type="checkbox" 
            checked={isTemplate} 
            onChange={(e) => setIsTemplate(e.target.checked)}
            className="h-4 w-4"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Input 
          placeholder="New variable..." 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddVariable()}
          className="h-8 text-xs"
        />
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleAddVariable}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {variables.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            No variables defined yet.
          </p>
        ) : (
          variables.map((v) => (
            <div key={v.id} className="group relative flex flex-col gap-1 p-2 border rounded-md bg-secondary/20 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium truncate pr-6">{v.label}</span>
                <button 
                  onClick={() => removeVariable(v.id)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-[10px] bg-background px-1 rounded border">
                  &#123;&#123;{v.name}&#125;&#125;
                </code>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-5 w-5" 
                  onClick={() => copyToClipboard(v.name)}
                  title="Copy placeholder"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {isTemplate && (
        <div className="mt-auto pt-4 border-t">
          <p className="text-[10px] text-muted-foreground italic">
            Tip: Use variables like &#123;&#123;name&#125;&#125; in your document. They will be replaced when generating files.
          </p>
        </div>
      )}
    </div>
  );
}
