"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon } from "../icons/icons";
import { Button } from "../ui/button";

const ROWS = [1, 2, 3];
const CONTRACT_LINES = [1, 2, 3, 4, 5];

const containerVariants = {
  idle: { opacity: 1 },
  generating: { opacity: 1 },
  complete: { opacity: 1 },
};

const idlePromptVariants = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
};

const listContainer = {
  generating: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  complete: {
    transition: { staggerChildren: 0.02 },
  },
};

const lineVariants = {
  generating: (i: number) => ({
    opacity: 0.5,
    scaleX: 1,
    transition: { duration: 0.6, delay: i * 0.05, yoyo: Infinity },
  }),
  complete: { opacity: 1, scaleX: 1, transition: { duration: 0.3 } },
  idle: { opacity: 1, scaleX: 1 },
};

export default function InteractiveWireframe() {
  const [state, setState] = useState<"idle" | "generating" | "complete">("idle");
  const [activeType, setActiveType] = useState<"invoice" | "contract">("invoice");

  const handleSimulate = useCallback((type: "invoice" | "contract") => {
    if (state !== "idle") return;
    setActiveType(type);
    setState("generating");

    const t = window.setTimeout(() => setState("complete"), 1800);
    return () => clearTimeout(t);
  }, [state]);

  const handleReset = useCallback(() => setState("idle"), []);

  const isIdle = state === "idle";
  const isGenerating = state === "generating";
  const isComplete = state === "complete";

  return (
    <motion.div
      className="mt-8 w-full max-w-5xl mx-auto h-[480px] overflow-hidden flex flex-col rounded-xl border border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl relative group"
      variants={containerVariants}
      initial="idle"
      animate={state}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Header */}
      <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-white/40 dark:bg-black/40 backdrop-blur-md shrink-0 z-20">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 bg-red-500/80 rounded-full" />
            <div className="h-2.5 w-2.5 bg-yellow-500/80 rounded-full" />
            <div className="h-2.5 w-2.5 bg-green-500/80 rounded-full" />
          </div>
          <div className="h-4 w-px bg-white/20 mx-2" />
          <motion.div
            className="h-3 bg-black/10 dark:bg-white/10 rounded-full transition-all duration-500"
            animate={isGenerating ? { width: "8rem", opacity: 0.6 } : { width: "6rem", opacity: 0.8 }}
          />
        </div>
        
        {isComplete && (
          <button onClick={handleReset} className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider px-2 py-1 rounded hover:bg-white/10">
            Restart
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/10 p-4 hidden md:flex flex-col gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm transition-colors duration-300">
          <div className="h-3 w-16 bg-black/10 dark:bg-white/10 rounded mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-full border border-dashed border-white/20 rounded-md transition-all duration-300 hover:bg-white/5" />
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white/60 dark:bg-black/60 backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center p-8 transition-colors duration-500">
          
          {/* Idle Prompt */}
          <AnimatePresence mode="wait">
            {isIdle && (
              <motion.div
                key="idle-prompt"
                variants={idlePromptVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-sm bg-white/30 dark:bg-black/30"
              >
                <div className="w-80 bg-white/80 dark:bg-black/80 border border-white/20 dark:border-white/10 rounded-2xl p-6 text-center shadow-xl backdrop-blur-md">
                  <div className="w-10 h-10 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Start Building</h3>
                  <p className="text-xs text-muted-foreground mb-4">Choose a template to begin</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" onClick={() => handleSimulate("invoice")} className="h-9 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary">
                      Invoice
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSimulate("contract")} className="h-9 text-xs border-primary/20 hover:bg-primary/5 hover:text-primary">
                      Contract
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Document Preview */}
          <div className={`w-full max-w-md bg-white dark:bg-neutral-900 border border-border/40 shadow-sm p-8 flex flex-col gap-4 relative overflow-hidden transition-all duration-500 rounded-lg ${isIdle ? "scale-95 opacity-50 blur-sm" : "scale-100 opacity-100 blur-0"}`}>
            
            {/* Generating Scan Line */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-10"
                >
                  <motion.div
                    className="absolute left-0 -top-20 h-20 w-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                    animate={{ top: ["0%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Content */}
            <div className="flex justify-between items-end border-b border-dashed border-border py-4">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                <div className="h-3 w-16 bg-muted/60 rounded" />
              </div>
              <div className="h-8 w-8 bg-muted rounded-full" />
            </div>

            <motion.div 
              className="space-y-3 py-4"
              variants={listContainer}
              initial="idle"
              animate={isGenerating ? "generating" : "complete"}
            >
              {activeType === "invoice" ? (
                ROWS.map((i, idx) => (
                  <motion.div key={i} variants={lineVariants} className="flex gap-3">
                    <div className="h-3 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/4 ml-auto" />
                  </motion.div>
                ))
              ) : (
                CONTRACT_LINES.map((i) => (
                  <motion.div key={i} variants={lineVariants} className="h-2.5 bg-muted rounded w-full" />
                ))
              )}
            </motion.div>

            <div className="mt-auto border-t border-border pt-4 flex justify-end">
              <div className="h-6 w-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

