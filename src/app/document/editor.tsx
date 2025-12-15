"use client";

import { useDocumentStore } from "@/store/documentStore";
import React, { useState, useRef, useEffect } from "react";
import { FormatCommandEvent } from "@/types/document";

import DocumentDock from "./document-dock";
import { BuilderLayout, BuilderHeader, BuilderSidebar, BuilderCanvas } from "@/components/builders/shared/builder-layout";
import { DocumentLeftSidebar } from "./components/left-sidebar";
import { DocumentRightSidebar } from "./components/right-sidebar";
import dynamic from "next/dynamic";

const Preview = dynamic(() => import("./preview"), {
  loading: () => <div className="p-8">Loading preview...</div>,
});

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
  const { title, setTitle, content, setContent, undo, redo, historyIndex, history } = useDocumentStore();
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

  // Sync content state to DOM without resetting cursor
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

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
    <BuilderLayout
      header={
        <div className="flex flex-col">
          <BuilderHeader 
            title={
              <div className="flex items-center gap-4">
                 <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Untitled Form"
                  className="text-lg font-semibold bg-transparent outline-none w-full max-w-xs"
                />
                 <div className="h-6 w-px bg-border mx-2"></div>
                <Select
                  value={pageSize}
                  onValueChange={(v) => setPageSize(v as keyof typeof PAGE_SIZES)}
                >
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
            }
            backHref="/dashboard"
          >
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
          </BuilderHeader>
        </div>
      }
    >
      <div className="h-full pb-24 overflow-y-auto w-full">
        <BuilderCanvas>
          {isPreview ? (
            <div
              className="bg-white dark:bg-card text-black dark:text-card-foreground shadow-2xl rounded-sm p-[20mm] transition-all duration-300"
              style={{
                width: PAGE_SIZES[pageSize].width,
                minHeight: PAGE_SIZES[pageSize].height,
              }}
            >
              <Preview content={content} />
            </div>
          ) : (
            <div
              className="bg-white dark:bg-card text-black dark:text-card-foreground shadow-2xl rounded-sm transition-all duration-300"
              style={{
                width: PAGE_SIZES[pageSize].width,
                minHeight: PAGE_SIZES[pageSize].height,
              }}
            >
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onPaste={handlePaste}
                dir="ltr"
                className="w-full h-full p-[20mm] outline-none prose prose-neutral dark:prose-invert max-w-none text-left"
              />
            </div>
          )}
        </BuilderCanvas>
      </div>

      {/* Dock Toolbar - Fixed at bottom */}
      {!isPreview && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <DocumentDock
              onFormat={handleFormat}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              onUndo={undo}
              onRedo={redo}
            />
          </div>
        </div>
      )}

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
    </BuilderLayout>
  );
};

export default Editor;
