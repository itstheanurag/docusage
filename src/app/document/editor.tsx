"use client";

import { useDocumentStore } from "@/stores/documentStore";
import React, { useState, useRef, useEffect } from "react";
import Toolbar from "./toolbar";
import { FormatCommandEvent } from "@/types/document";
import UserPresence from "./user";

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { title, setTitle, content, setContent } = useDocumentStore();
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }
  }, [content]);

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

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left: Document editor */}
      <div className="flex-1 flex flex-col border-r border-border">
        {/* Document title */}
        <div className="flex items-center justify-center border-b border-border bg-muted/40 p-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Document"
            className="text-xl font-semibold text-center bg-transparent outline-none w-full max-w-2xl"
          />
        </div>

        {/* Toolbar */}
        <Toolbar onFormat={handleFormat} />

        {/* Editor */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-card text-card-foreground border border-border rounded-xl shadow-sm min-h-[calc(100vh-120px)]">
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onPaste={handlePaste}
              className="p-10 outline-none min-h-[calc(100vh-120px)] prose prose-neutral dark:prose-invert max-w-none"
              style={{
                fontFamily: "Georgia, serif",
                background: "transparent",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>

      <div className="w-80 flex flex-col border-l border-border bg-muted/40 p-4 gap-4">
        <div className="text-sm text-muted-foreground">
          <div>Words: {wordCount}</div>
          <div>Characters: {content.replace(/<[^>]*>/g, "").length}</div>
        </div>
        <UserPresence />
      </div>
    </div>
  );
};

export default Editor;
