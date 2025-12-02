"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/codeshare/code-editor";
import { LanguageSelector } from "@/components/codeshare/language-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCodePage() {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("Untitled Snippet");

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b px-6 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-6 w-px bg-border" />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-semibold text-lg border-transparent hover:border-input focus:border-input w-64 px-2 h-9"
          />
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector value={language} onChange={setLanguage} />
          <div className="h-6 w-px bg-border" />
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-hidden">
        <CodeEditor
          code={code}
          onChange={(val) => setCode(val || "")}
          language={language}
        />
      </main>
    </div>
  );
}
