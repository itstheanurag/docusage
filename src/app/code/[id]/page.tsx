"use client";

import { useState, use } from "react";
import { CodeEditor } from "@/components/codeshare/code-editor";
import { LanguageSelector } from "@/components/codeshare/language-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, Copy, Clock, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SharedCodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  // Mock data - would be fetched from DB
  const [code, setCode] = useState(
    "// Shared code snippet\nconsole.log('Hello World');"
  );
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("Algorithm Practice");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b px-6 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/codes"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-6 w-px bg-border" />
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-semibold text-lg border-transparent hover:border-input focus:border-input w-64 px-2 h-9"
              readOnly={isReadOnly}
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
              <Clock className="h-3 w-3" />
              <span>Saved 2 mins ago</span>
              <span className="mx-1">•</span>
              <Users className="h-3 w-3" />
              <span>2 viewing</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector value={language} onChange={setLanguage} />
          <div className="h-6 w-px bg-border" />
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-hidden relative">
        <CodeEditor
          code={code}
          onChange={(val) => setCode(val || "")}
          language={language}
          readOnly={isReadOnly}
        />
      </main>
    </div>
  );
}
