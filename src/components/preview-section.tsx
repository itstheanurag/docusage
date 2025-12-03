"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FlickeringGrid } from "./backgrounds/FlickerGrids";
import PreviewHeader from "./template-preview/header";
import TemplateGrid from "./template-preview/template-grid";
import MockEditor from "./template-preview/mock-editor";

export default function PreviewSection() {
  const { theme } = useTheme();
  const [gridColor, setGridColor] = useState("rgb(0, 0, 0)");

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setGridColor(isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)");
  }, [theme]);

  return (
    <section id="templates" className="relative py-20 sm:py-32 bg-muted/30">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color={gridColor}
          maxOpacity={0.15}
          flickerChance={0.1}
          className="h-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PreviewHeader />
        <TemplateGrid />
        <MockEditor />
      </div>
    </section>
  );
}
