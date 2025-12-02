"use client";

import { useDocumentStore } from "@/stores/documentStore";
import React, { useState, useRef, useEffect } from "react";
import { FormatCommandEvent } from "@/types/document";

import Toolbar from "./toolbar";
import UserPresence from "./user";
import Preview from "./preview";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const PAGE_SIZES = {
  a4: { width: "210mm", height: "297mm", label: "A4 (210 x 297 mm)" },
  a5: { width: "148mm", height: "210mm", label: "A5 (148 x 210 mm)" },
  a3: { width: "297mm", height: "420mm", label: "A3 (297 x 420 mm)" },
  letter: { width: "216mm", height: "279mm", label: "Letter (216 x 279 mm)" },
  legal: { width: "216mm", height: "356mm", label: "Legal (216 x 356 mm)" },
};

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { title, setTitle, content, setContent } = useDocumentStore();
  const [wordCount, setWordCount] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [pageSize, setPageSize] = useState<keyof typeof PAGE_SIZES>("a4");

  // Field Config State
  const [selectedField, setSelectedField] = useState<HTMLElement | null>(null);
  const [fieldConfig, setFieldConfig] = useState({
    label: "",
    placeholder: "",
    required: false,
  });

  useEffect(() => {
    if (editorRef.current && !isPreview) {
      const text = editorRef.current.innerText || "";
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }
  }, [content, isPreview]);

  // Handle clicking on fields to configure them
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isPreview) return;

      const target = e.target as HTMLElement;
      if (target.classList.contains("docusage-field")) {
        setSelectedField(target);
        setFieldConfig({
          label: target.getAttribute("data-label") || "",
          placeholder: target.getAttribute("data-placeholder") || "",
          required: target.getAttribute("data-required") === "true",
        });
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("click", handleClick);
    }
    return () => editor?.removeEventListener("click", handleClick);
  }, [isPreview]);

  const handleSaveFieldConfig = () => {
    if (selectedField && editorRef.current) {
      selectedField.setAttribute("data-label", fieldConfig.label);
      selectedField.setAttribute("data-placeholder", fieldConfig.placeholder);
      selectedField.setAttribute("data-required", String(fieldConfig.required));

      // Update visual label in editor
      const type = selectedField.getAttribute("data-type");
      if (type === "text-input" || type === "date") {
        selectedField.innerHTML = `[${fieldConfig.label || "Field"}]${fieldConfig.required ? "*" : ""}`;
      } else if (type === "checkbox") {
        selectedField.innerHTML = `☑️ ${fieldConfig.label || "Check"}${fieldConfig.required ? "*" : ""}`;
      } else if (type === "signature") {
        selectedField.innerHTML = `✍️ ${fieldConfig.label || "Sign"}${fieldConfig.required ? "*" : ""}`;
      }

      setContent(editorRef.current.innerHTML);
      setSelectedField(null);
    }
  };

  const handleFormat = (data: FormatCommandEvent): void => {
    document.execCommand(data.command, false, data.value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleInsertField = (type: string, label: string) => {
    let html = "";
    // Default attributes
    const commonAttrs = `class="docusage-field" contenteditable="false" data-label="${label}" data-required="false"`;

    switch (type) {
      case "text-input":
        html = `<span ${commonAttrs} data-type="text-input" data-placeholder="Enter text..." style="display: inline-block; min-width: 120px; border-bottom: 1px solid #aaa; padding: 0 4px; color: #666; font-size: 0.9em; vertical-align: bottom; cursor: pointer;">[${label}]</span>&nbsp;`;
        break;
      case "checkbox":
        html = `<span ${commonAttrs} data-type="checkbox" style="display: inline-block; margin: 0 4px; color: #666; vertical-align: middle; cursor: pointer;">☑️ ${label}</span>&nbsp;`;
        break;
      case "date":
        html = `<span ${commonAttrs} data-type="date" style="display: inline-block; min-width: 100px; border-bottom: 1px solid #aaa; padding: 0 4px; color: #666; font-size: 0.9em; vertical-align: bottom; cursor: pointer;">📅 [${label}]</span>&nbsp;`;
        break;
      case "signature":
        html = `<div ${commonAttrs} data-type="signature" style="display: block; width: 100%; max-width: 400px; height: 100px; border: 2px dashed #ccc; background: #f5f5f5; margin: 10px 0; display: flex; align-items: center; justify-content: center; color: #999; cursor: pointer;">✍️ ${label}</div><br/>`;
        break;
    }
    if (html) {
      document.execCommand("insertHTML", false, html);
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900 text-foreground overflow-hidden">
      {/* Left: Component Palette */}
      <div className="w-64 flex flex-col border-r border-border bg-background p-4 gap-4 z-10 shadow-sm">
        <div className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Form Elements
        </div>
        <div className="grid gap-3">
          <button
            onClick={() => handleInsertField("text-input", "Text Input")}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
          >
            <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
              T
            </span>
            Text Field
          </button>
          <button
            onClick={() => handleInsertField("checkbox", "Checkbox")}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
          >
            <span className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
              ☑
            </span>
            Checkbox
          </button>
          <button
            onClick={() => handleInsertField("date", "Date")}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
          >
            <span className="p-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded">
              📅
            </span>
            Date Picker
          </button>
          <button
            onClick={() => handleInsertField("signature", "Signature")}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all text-sm font-medium shadow-sm hover:shadow-md text-left"
          >
            <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
              ✍️
            </span>
            Signature
          </button>
        </div>
      </div>

      {/* Center: Editor Area */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-background p-3 px-6 shadow-sm z-10">
          <div className="flex items-center gap-4 flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Form"
              className="text-lg font-semibold bg-transparent outline-none w-full max-w-xs"
            />
            <div className="h-6 w-px bg-border mx-2"></div>
            <Select value={pageSize} onValueChange={(v: any) => setPageSize(v)}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PAGE_SIZES).map(([key, size]) => (
                  <SelectItem key={key} value={key}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isPreview
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {isPreview ? "Edit Form" : "Preview"}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        {!isPreview && (
          <div className="bg-background border-b border-border p-2 flex justify-center shadow-sm z-10">
            <Toolbar onFormat={handleFormat} />
          </div>
        )}

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-auto p-8 bg-gray-100 dark:bg-neutral-900 flex justify-center">
          {isPreview ? (
            <div
              className="bg-white dark:bg-card text-black dark:text-card-foreground shadow-2xl rounded-sm p-[20mm] mx-auto transition-all duration-300"
              style={{
                width: PAGE_SIZES[pageSize].width,
                minHeight: PAGE_SIZES[pageSize].height,
              }}
            >
              <Preview content={content} />
            </div>
          ) : (
            <div
              className="bg-white dark:bg-card text-black dark:text-card-foreground shadow-2xl rounded-sm mx-auto transition-all duration-300"
              style={{
                width: PAGE_SIZES[pageSize].width,
                minHeight: PAGE_SIZES[pageSize].height,
              }}
            >
              <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onPaste={handlePaste}
                dir="ltr"
                className="w-full h-full p-[20mm] outline-none prose prose-neutral dark:prose-invert max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right: Stats & Presence */}
      <div className="w-72 flex-col border-l border-border bg-background p-4 gap-4 z-10 shadow-sm hidden xl:flex">
        <div className="text-sm text-muted-foreground">
          <div className="font-medium text-foreground mb-2">Document Stats</div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span>Words</span>
            <span className="font-mono">{wordCount}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span>Characters</span>
            <span className="font-mono">
              {content.replace(/<[^>]*>/g, "").length}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span>Size</span>
            <span className="font-mono">
              {PAGE_SIZES[pageSize].label.split("(")[0].trim()}
            </span>
          </div>
        </div>
        <UserPresence />
      </div>

      {/* Field Configuration Dialog */}
      <Dialog
        open={!!selectedField}
        onOpenChange={(open) => !open && setSelectedField(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Field</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Label</Label>
              <Input
                value={fieldConfig.label}
                onChange={(e) =>
                  setFieldConfig({ ...fieldConfig, label: e.target.value })
                }
              />
            </div>
            {selectedField?.getAttribute("data-type") === "text-input" && (
              <div className="grid gap-2">
                <Label>Placeholder</Label>
                <Input
                  value={fieldConfig.placeholder}
                  onChange={(e) =>
                    setFieldConfig({
                      ...fieldConfig,
                      placeholder: e.target.value,
                    })
                  }
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label>Required</Label>
              <Switch
                checked={fieldConfig.required}
                onCheckedChange={(checked) =>
                  setFieldConfig({ ...fieldConfig, required: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveFieldConfig}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;
