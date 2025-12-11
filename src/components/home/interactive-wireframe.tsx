"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon } from "../icons/icons";
import { Button } from "../ui/button";

/**
 * InteractiveWireframe
 *
 * - uses framer-motion for entrance/exit + staggered child animations
 * - keeps the same three logical states: idle -> generating -> complete
 * - the UI simulates generation for 2s then shows "complete"
 */

const ROWS = [1, 2, 3];
const CONTRACT_LINES = [1, 2, 3, 4, 5];

const containerVariants = {
  idle: { opacity: 1 },
  generating: { opacity: 1 },
  complete: { opacity: 1 },
};

const idlePromptVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const canvasVariants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45 },
  },
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
    opacity: 0.6,
    scaleX: 1,
    transition: { duration: 0.6, delay: i * 0.06, yoyo: Infinity },
  }),
  complete: { opacity: 1, scaleX: 1, transition: { duration: 0.3 } },
  idle: { opacity: 1, scaleX: 1 },
};

export default function InteractiveWireframe() {
  const [state, setState] = useState<"idle" | "generating" | "complete">("idle");
  const [activeType, setActiveType] = useState<"invoice" | "contract">(
    "invoice"
  );

  // handleSimulate: sets active type and transitions to generating -> complete
  const handleSimulate = useCallback((type: "invoice" | "contract") => {
    if (state !== "idle") return;
    setActiveType(type);
    setState("generating");

    // keep the timeout (simulate work), but UI animation is handled by framer-motion
    const t = window.setTimeout(() => {
      setState("complete");
    }, 2000);

    return () => clearTimeout(t);
  }, [state]);

  const handleReset = useCallback(() => {
    setState("idle");
  }, []);

  // derived boolean flags
  const isIdle = state === "idle";
  const isGenerating = state === "generating";
  const isComplete = state === "complete";

  // memoized classes to reduce repeated template complexity
  const headerBarClass = useMemo(
    () => "h-14 border-b flex items-center px-6 justify-between bg-white dark:bg-neutral-900 shrink-0 z-20",
    []
  );

  const sidebarBoxClass = useMemo(
    () => "h-10 w-full border border-dashed border-neutral-300 dark:border-neutral-700 rounded transition-all duration-300",
    []
  );

  return (
    <motion.div
      className="mt-20 w-full max-w-5xl mx-auto  bg-white dark:bg-neutral-900 h-[500px] md:h-[600px] overflow-hidden flex flex-col shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] animate-fade-in-up delay-300 group"
      variants={containerVariants}
      initial="idle"
      animate={state}
    >
      {/* Header */}
      <div className={headerBarClass}>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <div className="h-3 w-3 bg-red-400 rounded-full opacity-50" />
            <div className="h-3 w-3 bg-yellow-400 rounded-full opacity-50" />
            <div className="h-3 w-3 bg-green-400 rounded-full opacity-50" />
          </div>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />

          <motion.div
            className={`h-4 bg-neutral-100 dark:bg-neutral-800 rounded transition-all duration-500`}
            animate={
              isGenerating
                ? { width: "12rem", opacity: 0.6 }
                : isIdle
                ? { width: "8rem", opacity: 1 }
                : { width: "10rem", opacity: 1 }
            }
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex gap-3 items-center">
          {isComplete && (
            <button
              onClick={handleReset}
              className="text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-wider"
            >
              Restart Demo
            </button>
          )}

          <div className="h-8 w-20 bg-neutral-900 dark:bg-neutral-100 rounded opacity-10" />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-4 hidden md:flex bg-neutral-50/50 dark:bg-neutral-900/50 shrink-0 z-10 transition-colors duration-300">
          <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded mb-6" />
          <div className="space-y-3">
            {ROWS.map((i) => (
              <div
                key={i}
                className={`${sidebarBoxClass} ${
                  isComplete ? "border-solid border-neutral-200 dark:border-neutral-800" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden flex flex-col transition-colors duration-300">
          {/* full-size motion container for canvas content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
            {/* Decorative / optional background elements can live here */}
          </div>

          {/* IDLE PROMPT */}
          <AnimatePresence mode="wait">
            {isIdle && (
              <motion.div
                key="idle-prompt"
                variants={idlePromptVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform z-10"
              >
                <div className="w-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 mb-8 text-center">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    What are we building?
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Select a template to generate structure.
                  </p>
                </div>

                <div className="flex gap-4 z-20">
                  <Button
                    onClick={() => handleSimulate("invoice")}
                    className="px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer font-bold text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    Invoice
                  </Button>

                  <Button
                    onClick={() => handleSimulate("contract")}
                    className="px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer font-bold text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    Contract
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CANVAS content area */}
          <div className={`flex-1 p-12 flex justify-center overflow-hidden transition-all duration-700 ${isIdle ? "opacity-0 scale-95 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-0 pointer-events-auto"}`}>
            <div className="w-full max-w-lg h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-12 flex flex-col gap-6 relative overflow-hidden transition-colors duration-300">
              {/* Scanning line when generating */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    key="scan"
                    className="absolute inset-0 pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute left-0 top-[-30%] h-32 w-full bg-gradient-to-b from-transparent via-neutral-500/6 to-transparent"
                      animate={{ y: "400%" }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header Block */}
              <div className="flex justify-between items-end border-b border-neutral-100 dark:border-neutral-800 pb-8 transition-all duration-500 z-0">
                <div className="space-y-3">
                  <motion.div
                    className="h-8 bg-neutral-900 dark:bg-neutral-100 rounded-sm transition-all duration-700"
                    animate={isGenerating ? { width: "6rem", opacity: 0.5 } : { width: "12rem", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-sm transition-all duration-700"
                    animate={isGenerating ? { width: "4rem", opacity: 0.5 } : { width: "8rem", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <motion.div
                  className="h-12 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-full transition-all duration-700"
                  animate={isGenerating ? { scale: 0.86, opacity: 0.6 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Body Blocks */}
              <motion.div
                className="space-y-4 pt-4"
                variants={listContainer}
                initial="idle"
                animate={isGenerating ? "generating" : "complete"}
              >
                {activeType === "invoice" ? (
                  ROWS.map((i, idx) => (
                    <motion.div
                      key={i}
                      custom={idx}
                      variants={lineVariants}
                      className={`flex gap-4 p-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-300 ${isGenerating ? "opacity-60" : "opacity-100"}`}
                    >
                      <motion.div
                        className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-sm"
                        animate={isGenerating ? { width: "100%" } : { width: "66%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-sm ml-auto"
                        animate={isGenerating ? { width: "40px" } : { width: "4rem" }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-sm"
                        animate={isGenerating ? { width: "40px" } : { width: "3rem" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  ))
                ) : (
                  <>
                    {CONTRACT_LINES.map((i, idx) => (
                      <motion.div
                        key={i}
                        custom={idx}
                        variants={lineVariants}
                        className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-sm transition-all duration-500"
                      />
                    ))}
                    <div className="flex gap-4 mt-8">
                      <div className="h-12 w-1/2 border-b border-neutral-200 dark:border-neutral-800" />
                      <div className="h-12 w-1/2 border-b border-neutral-200 dark:border-neutral-800" />
                    </div>
                  </>
                )}
              </motion.div>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t border-neutral-100 dark:border-neutral-800 flex justify-end z-0">
                <motion.div
                  className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-sm transition-all duration-700"
                  animate={isGenerating ? { width: "6rem", opacity: 0.6 } : { width: "8rem", opacity: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-6 hidden lg:flex bg-white dark:bg-neutral-900 shrink-0 z-10 transition-colors duration-300">
          {[1, 2].map((g) => (
            <div key={g} className="space-y-2 opacity-100 transition-opacity duration-500">
              <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-8 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
            </div>
          ))}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
            <motion.div
              className={`h-24 w-full bg-neutral-50 dark:bg-neutral-800/50 rounded border border-neutral-100 dark:border-neutral-800 transition-all duration-500`}
              animate={isGenerating ? { opacity: 0.6 } : { opacity: 1 }}
            />
          </div>
        </div>
      </div>

      {/* keep the scan keyframes if needed for CSS-based fallback */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </motion.div>
  );
}
