"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/50 animate-pulse rounded-md" />
  ),
});

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
    <div className="h-full w-full overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onChange}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: true },
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

