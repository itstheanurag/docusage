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
    <section className="bg-background ">
      <div className="container ">
        <div className="relative overflow-hidden bg-primary/5 py-20 sm:py-32">

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

          <div className="relative z-10 text-center">
            <SectionHeader
              title="Ready to revolutionize your workflow?"
              subtitle="Join thousands of professionals who are creating stunning documents in minutes. Start your free trial today."
              className="mx-auto mb-8"
            />

            <motion.div
              className="relative z-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex flex-col sm:flex-row justify-center items-stretch gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-6 h-12 flex items-center justify-center shadow-md"
                  asChild
                >
                  <a href="/register" className="inline-flex items-center justify-center">
                    Get Started for Free
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="bg-background/50 backdrop-blur text-base px-6 h-12 flex items-center justify-center border-primary/20 hover:bg-primary/5"
                  asChild
                >
                  <a href="#features" className="inline-flex items-center justify-center">
                    Explore Features
                  </a>
                </Button>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
