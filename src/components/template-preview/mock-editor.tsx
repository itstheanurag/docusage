"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function MockEditor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="relative"
    >
      <Card className="bg-background border-border/50 overflow-hidden shadow-md">
        {/* Window header */}
        <div className="bg-muted/50 border-b border-border p-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>

          <div className="ml-4 flex gap-2">
            <div className="h-2 w-20 bg-muted-foreground/20 rounded-full" />
            <div className="h-2 w-12 bg-muted-foreground/10 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[400px] sm:h-[500px] bg-background">
          {/* Sidebar */}
          <div className="w-16 border-r border-border bg-muted/10 flex flex-col items-center py-4 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-md bg-muted-foreground/10"
              />
            ))}
          </div>

          {/* Main Canvas */}
          <div className="flex-1 bg-muted/20 p-8 flex justify-center overflow-hidden relative">
            <div className="w-full max-w-2xl bg-background shadow-sm border border-border/40 rounded-sm p-8 space-y-4">
              <div className="h-8 w-3/4 bg-primary/10 rounded-md mb-8" />

              <div className="space-y-2">
                <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                <div className="h-4 w-5/6 bg-muted-foreground/10 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="h-32 bg-accent/10 rounded-md" />
                <div className="h-32 bg-blue-500/10 rounded-md" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-11/12 bg-muted-foreground/10 rounded" />
                <div className="h-4 w-4/5 bg-muted-foreground/10 rounded" />
              </div>
            </div>

            {/* Cursor Animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 pointer-events-none"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" />
              </svg>
            </motion.div>
          </div>

          {/* Right Panel (Mock) */}
          <div className="w-64 border-l border-border bg-background hidden lg:block p-4 space-y-6">
            <div className="h-3 w-20 bg-muted-foreground/20 rounded-full" />
            <div className="h-24 bg-muted-foreground/10 rounded" />
            <div className="h-3 w-24 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
