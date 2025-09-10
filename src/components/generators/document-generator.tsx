"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";
import { FONTS } from "@/lib/data/fonts";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const SIZES = ["small", "normal", "large", "huge"];

export default function DocumentGenerator() {
  const [value, setValue] = useState("");
  const quillRef = useRef<any>(null); // use `any` to simplify TypeScript for now

  const applyFormat = (format: string, val: any = true) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    // Toggle boolean formats like bold, italic, underline, strike
    const isActive = editor.getFormat()[format];
    if (typeof isActive === "boolean") {
      editor.format(format, !isActive);
    } else {
      editor.format(format, val);
    }
  };

  const applyHeader = (level: number | "") => applyFormat("header", level);
  const applyList = (type: "ordered" | "bullet") => applyFormat("list", type);
  const applySize = (size: string) => applyFormat("size", size);
  const applyFont = (font: string) => applyFormat("font", font);

  return (
    <div className="flex flex-col h-screen items-center bg-gray-50 p-4">
      {/* Custom Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl bg-white shadow-sm rounded-lg mb-4 flex flex-wrap gap-2 p-3"
      >
        {/* Header */}
        <select
          onChange={(e) => applyHeader(e.target.value ? +e.target.value : "")}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        {/* Font */}
        <select
          onChange={(e) => applyFont(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {FONTS.map((f) => (
            <option
              key={f.value}
              value={f.value}
              style={{ fontFamily: f.value }}
            >
              {f.name}
            </option>
          ))}
        </select>

        {/* Size */}
        <select
          onChange={(e) => applySize(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s || "Normal"}
            </option>
          ))}
        </select>

        {/* Text Style */}
        <button
          onClick={() => applyFormat("bold")}
          className="btn-toolbar font-bold hover:bg-gray-200 rounded px-2 py-1"
        >
          B
        </button>
        <button
          onClick={() => applyFormat("italic")}
          className="btn-toolbar italic hover:bg-gray-200 rounded px-2 py-1"
        >
          I
        </button>
        <button
          onClick={() => applyFormat("underline")}
          className="btn-toolbar underline hover:bg-gray-200 rounded px-2 py-1"
        >
          U
        </button>
        <button
          onClick={() => applyFormat("strike")}
          className="btn-toolbar line-through hover:bg-gray-200 rounded px-2 py-1"
        >
          S
        </button>
        <button
          onClick={() => applyFormat("blockquote")}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          ❝
        </button>

        {/* Lists */}
        <button
          onClick={() => applyList("ordered")}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          1.
        </button>
        <button
          onClick={() => applyList("bullet")}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          •
        </button>

        {/* Media */}
        <button
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) applyFormat("link", url);
          }}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          🔗
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) applyFormat("image", url);
          }}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          🖼
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter video URL:");
            if (url) applyFormat("video", url);
          }}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          🎥
        </button>

        {/* Clean */}
        <button
          onClick={() => applyFormat("clean")}
          className="btn-toolbar hover:bg-gray-200 rounded px-2 py-1"
        >
          🧹
        </button>
      </motion.div>

      {/* Editor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={setValue}
          modules={{ toolbar: false }}
          theme="snow"
          className="h-full"
        />
      </motion.div>
    </div>
  );
}
