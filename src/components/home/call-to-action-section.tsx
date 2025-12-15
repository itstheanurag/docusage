"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeader from "../section-header";
import { FlickeringGrid } from "../backgrounds/FlickerGrids";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function CallToActionSection() {

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
    <section className="bg-background py-24 sm:py-32 relative overflow-hidden">
      {/* Background with Flickering Grid */}
      <div className="absolute inset-0 bg-primary/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-screen h-full">
            <FlickeringGrid
              squareSize={4}
              gridGap={6}
              color={gridColor}
              maxOpacity={0.15}
              flickerChance={0.1}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Ready to revolutionize your workflow?"
          subtitle="Join thousands of professionals who are creating stunning documents in minutes. Start your free trial today."
          className="mx-auto mb-10 max-w-3xl"
        />

        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12 shadow-md min-w-[200px]"
              asChild
            >
              <a href="/register">
                Get Started for Free
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-background/50 backdrop-blur text-base px-8 h-12 border-primary/20 hover:bg-primary/5 min-w-[200px]"
              asChild
            >
              <a href="#features">
                Explore Features
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
