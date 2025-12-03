"use client";

import { useState, useEffect, use } from "react";
import { CodeEditor } from "@/components/codeshare/code-editor";
import { LanguageSelector } from "@/components/codeshare/language-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Moon, Sun, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface Snippet {
  id: string;
  code: string;
  language: string;
  title: string;
  lastUpdated: number;
}

export default function SharedCodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("Untitled Snippet");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`snippet_${resolvedParams.id}`);
    if (saved) {
      try {
        const parsed: Snippet = JSON.parse(saved);
        setCode(parsed.code);
        setLanguage(parsed.language);
        setTitle(parsed.title);
        setLastSaved(new Date(parsed.lastUpdated));
      } catch (e) {
        console.error("Failed to parse snippet", e);
      }
    }
  }, [resolvedParams.id]);

  // Save to local storage
  useEffect(() => {
    if (!mounted) return;

    const snippet: Snippet = {
      id: resolvedParams.id,
      code,
      language,
      title,
      lastUpdated: Date.now(),
    };

    localStorage.setItem(
      `snippet_${resolvedParams.id}`,
      JSON.stringify(snippet),
    );
    setLastSaved(new Date());
  }, [code, language, title, resolvedParams.id, mounted]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b px-4 py-2 flex items-center justify-between bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-6 w-px bg-border" />
          <div className="flex flex-col">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-semibold text-lg border-transparent hover:border-input focus:border-input w-64 px-2 h-8"
            />
            {lastSaved && (
              <span className="text-xs text-muted-foreground px-2 flex items-center gap-1">
                <Check className="h-3 w-3" />
                Saved locally
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector value={language} onChange={setLanguage} />

          <div className="h-6 w-px bg-border" />

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden relative">
        <CodeEditor
          code={code}
          onChange={(val) => setCode(val || "")}
          language={language}
        />
      </main>
    </div>
  );
}
