"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language: string;
  readOnly?: boolean;
}

export function CodeEditor({
  code,
  onChange,
  language,
  readOnly = false,
}: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="h-[calc(100vh-200px)] w-full rounded-md overflow-hidden border border-border shadow-sm">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onChange}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      />
    </div>
  );
}
