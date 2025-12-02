"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FlickeringGrid } from "@/components/backgrounds/FlickerGrids";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function CallToActionSection() {
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
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 border border-primary/10 px-6 py-24 sm:px-16 sm:py-32 text-center">
          {/* Background Flickering Grid */}
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
          {/* Content */}
          <motion.div
            className="relative z-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to revolutionize your workflow?
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of professionals who are creating stunning
              documents in minutes. Start your free trial today.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg"
                asChild
              >
                <a href="/register">Get Started for Free</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background/50 backdrop-blur text-lg px-8 py-6 rounded-full border-primary/20 hover:bg-primary/5"
                asChild
              >
                <a href="#features">Explore Features</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
