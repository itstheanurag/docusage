"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Quote,
  Code,
  Plus,
  X,
} from "lucide-react";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function DocumentGenerator() {
  const [content, setContent] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [documentSize, setDocumentSize] = useState("a4");
  const quillRef = useRef<any>(null);

  type DocSizeKey = "a4" | "a3" | "letter" | "legal" | "custom";

  const documentSizes: Record<DocSizeKey, { width: string; name: string }> = {
    a4: { width: "w-[800px]", name: "A4" },
    a3: { width: "w-[1200px]", name: "A3" },
    letter: { width: "w-[850px]", name: "Letter" },
    legal: { width: "w-[900px]", name: "Legal" },
    custom: { width: "w-full", name: "Full Width" },
  };

  const modules = { toolbar: false };

  const applyFormat = (format: string, value?: any) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.format(format, value);
    }
  };

  const toolbarItems = [
    { icon: Bold, action: () => applyFormat("bold"), tooltip: "Bold" },
    { icon: Italic, action: () => applyFormat("italic"), tooltip: "Italic" },
    {
      icon: Underline,
      action: () => applyFormat("underline"),
      tooltip: "Underline",
    },
    {
      icon: AlignLeft,
      action: () => applyFormat("align", ""),
      tooltip: "Align Left",
    },
    {
      icon: AlignCenter,
      action: () => applyFormat("align", "center"),
      tooltip: "Align Center",
    },
    {
      icon: AlignRight,
      action: () => applyFormat("align", "right"),
      tooltip: "Align Right",
    },
    {
      icon: List,
      action: () => applyFormat("list", "bullet"),
      tooltip: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => applyFormat("list", "ordered"),
      tooltip: "Numbered List",
    },
    {
      icon: Link,
      action: () => applyFormat("link", prompt("Enter URL:") || ""),
      tooltip: "Insert Link",
    },
    { icon: Quote, action: () => applyFormat("blockquote"), tooltip: "Quote" },
    {
      icon: Code,
      action: () => applyFormat("code-block"),
      tooltip: "Code Block",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        {/* Document Size Selector */}
        <div className="relative">
          <select
            value={documentSize}
            onChange={(e) => setDocumentSize(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            {Object.entries(documentSizes).map(([key, size]) => (
              <option key={key} value={key}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Document Container */}
      <div className="flex justify-center min-h-screen">
        <div
          className={`bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden ${documentSizes[documentSize].width}`}
        >
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            theme="snow"
            placeholder="Start writing your document here..."
          />
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowToolbar((prev) => !prev)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            showToolbar
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {showToolbar ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </button>

        <AnimatePresence>
          {showToolbar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 flex flex-col gap-3"
            >
              {toolbarItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={item.action}
                  className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center border"
                  title={item.tooltip}
                >
                  <item.icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </motion.button>
              ))}

              {/* Header Dropdown */}
              <select
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-lg border text-xs text-center"
                title="Header"
                onChange={(e) => applyFormat("header", e.target.value || false)}
              >
                <option value="">T</option>
                <option value="1">H1</option>
                <option value="2">H2</option>
                <option value="3">H3</option>
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
