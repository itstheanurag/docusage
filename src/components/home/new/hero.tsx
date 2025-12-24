"use client";

import React from "react";
import { useTheme } from "next-themes";

export const Hero: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-32 overflow-hidden dark:bg-[#020202] bg-[#fafafa] transition-colors duration-500">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] dark:bg-blue-500/10 bg-blue-500/5 blur-[120px] rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] dark:bg-purple-500/10 bg-purple-500/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] dark:bg-white/[0.02] bg-black/[0.02] blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 dark:text-white text-black text-xs font-semibold mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              v2.0 Beta is now live
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.2] dark:text-white text-black">
              The Open Engine for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b dark:from-white dark:to-gray-500 from-black to-gray-500">
                Document Flows.
              </span>
            </h1>

            <p className="max-w-md dark:text-gray-400 text-gray-600 text-base md:text-lg mb-10 leading-relaxed">
              Automate high-stakes document generation. Forms, Invoices, and
              Legal Templates delivered through a developer-first open source
              API.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <button className="w-full sm:w-auto px-10 py-4 dark:bg-white dark:text-black bg-black text-white font-bold rounded-2xl dark:hover:bg-gray-200 hover:bg-gray-800 transition-all active:scale-95 shadow-xl">
                Start Building
              </button>
              <div className="w-full sm:w-auto flex items-center gap-3 px-6 py-4 dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 rounded-2xl font-mono text-sm dark:text-gray-400 text-gray-600 group cursor-pointer dark:hover:border-white/20 hover:border-black/20 transition-all">
                <span className="text-blue-500">$</span>
                <span>npx docusage init</span>
                <button className="ml-2 dark:group-hover:text-white group-hover:text-black transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-12 border-t dark:border-white/5 border-black/5 pt-10">
              <div>
                <div className="text-2xl font-bold dark:text-white text-black">
                  1.2M+
                </div>
                <div className="text-[10px] dark:text-gray-600 text-gray-400 uppercase tracking-widest font-bold mt-2 font-mono">
                  Generations
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold dark:text-white text-black">
                  450+
                </div>
                <div className="text-[10px] dark:text-gray-600 text-gray-400 uppercase tracking-widest font-bold mt-2 font-mono">
                  Contributors
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold dark:text-white text-black">
                  12k+
                </div>
                <div className="text-[10px] dark:text-gray-600 text-gray-400 uppercase tracking-widest font-bold mt-2 font-mono">
                  Stars
                </div>
              </div>
            </div>
          </div>

          {/* Convergent Flow Visualizer */}
          <div className="relative flex items-center justify-center min-h-[500px] z-10 scale-90 md:scale-100">
            {/* SVG Connector Lines */}
            <svg
              className="absolute inset-0 w-full h-full dark:opacity-40 opacity-20 pointer-events-none"
              viewBox="0 0 500 500"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    stopColor={isDark ? "white" : "black"}
                    stopOpacity="0"
                  />
                  <stop
                    offset="50%"
                    stopColor={isDark ? "white" : "black"}
                    stopOpacity="0.5"
                  />
                  <stop
                    offset="100%"
                    stopColor={isDark ? "white" : "black"}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* Paths from Icons to DU Core (250, 250) */}
              <FlowPath
                d="M 80 120 C 150 120, 180 250, 250 250"
                delay="0s"
                isDark={isDark}
              />
              <FlowPath d="M 80 250 L 250 250" delay="0.4s" isDark={isDark} />
              <FlowPath
                d="M 80 380 C 150 380, 180 250, 250 250"
                delay="0.8s"
                isDark={isDark}
              />

              <FlowPath
                d="M 420 120 C 350 120, 320 250, 250 250"
                delay="0.2s"
                isDark={isDark}
              />
              <FlowPath d="M 420 250 L 250 250" delay="0.6s" isDark={isDark} />
              <FlowPath
                d="M 420 380 C 350 380, 320 250, 250 250"
                delay="1s"
                isDark={isDark}
              />
            </svg>

            {/* Icon Nodes */}
            <div className="absolute inset-0">
              <div className="absolute left-[40px] top-[120px] -translate-y-1/2">
                <FlowIconNode
                  icon={<IconIntegrate />}
                  label="API"
                  color="blue"
                  isDark={isDark}
                />
              </div>
              <div className="absolute left-[40px] top-[250px] -translate-y-1/2">
                <FlowIconNode
                  icon={<IconCode />}
                  label="JSON"
                  color="purple"
                  isDark={isDark}
                />
              </div>
              <div className="absolute left-[40px] top-[380px] -translate-y-1/2">
                <FlowIconNode
                  icon={<IconIntegrate />}
                  label="HOOK"
                  color="white"
                  isDark={isDark}
                />
              </div>

              <div className="absolute right-[40px] top-[120px] -translate-y-1/2">
                <FlowIconNode
                  icon={<IconInvoice />}
                  label="INV"
                  color="blue"
                  side="right"
                  isDark={isDark}
                />
              </div>
              <div className="absolute right-[40px] top-[250px] -translate-y-1/2">
                <FlowIconNode
                  icon={<IconPDF />}
                  label="PDF"
                  color="emerald"
                  side="right"
                  isDark={isDark}
                />
              </div>
              <div className="absolute right-[40px] top-[380px] -translate-y-1/2">
                <FlowIconNode
                  icon={<IconForm />}
                  label="FORM"
                  color="white"
                  side="right"
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Central Engine Core */}
            <div className="relative z-30 group cursor-pointer">
              <div className="w-24 h-24 dark:bg-white bg-black rounded-3xl flex items-center justify-center shadow-2xl ring-8 dark:ring-white/5 ring-black/5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                <div className="dark:text-black text-white font-black text-3xl tracking-tighter select-none">
                  DU
                </div>
              </div>
              <div
                className={`absolute inset-0 rounded-3xl animate-engine-pulse ${isDark ? "bg-white/30" : "bg-black/30"}`}
              ></div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[9px] font-mono dark:text-white/40 text-black/40 tracking-[0.3em]">
                CORE_STABLE_V2
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes engine-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-engine-pulse {
          animation: engine-pulse 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes path-flow {
          0% {
            stroke-dashoffset: 400;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
        :global(.animate-path-flow) {
          stroke-dasharray: 40 360;
          animation: path-flow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const FlowPath = ({
  d,
  delay,
  isDark,
}: {
  d: string;
  delay: string;
  isDark: boolean;
}) => (
  <>
    <path
      d={d}
      fill="none"
      stroke={isDark ? "white" : "black"}
      strokeWidth="0.5"
      className="opacity-10"
    />
    <path
      d={d}
      fill="none"
      stroke={isDark ? "white" : "black"}
      strokeWidth="2"
      className="animate-path-flow"
      style={{ animationDelay: delay }}
    />
  </>
);

const FlowIconNode = ({
  icon,
  label,
  color,
  side = "left",
  isDark,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  side?: "left" | "right";
  isDark: boolean;
}) => {
  const colorMap: Record<string, string> = {
    blue: "dark:bg-blue-500/10 dark:border-blue-500/50 dark:text-blue-400 bg-blue-500/5 border-blue-500/20 text-blue-600",
    purple:
      "dark:bg-purple-500/10 dark:border-purple-500/50 dark:text-purple-400 bg-purple-500/5 border-purple-500/20 text-purple-600",
    emerald:
      "dark:bg-emerald-500/10 dark:border-emerald-500/50 dark:text-emerald-400 bg-emerald-500/5 border-emerald-500/20 text-emerald-600",
    white:
      "dark:bg-white/5 dark:border-white/20 dark:text-white/80 bg-black/5 border-black/10 text-black/60",
  };

  return (
    <div
      className={`flex items-center gap-3 group transition-all duration-500 ${side === "right" ? "flex-row-reverse text-right" : "flex-row text-left"}`}
    >
      <div
        className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 dark:group-hover:bg-white dark:group-hover:text-black group-hover:bg-black group-hover:text-white shadow-lg ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-bold dark:text-white/30 text-black/30 tracking-widest dark:group-hover:text-white group-hover:text-black transition-colors uppercase font-mono">
          {label}
        </span>
      </div>
    </div>
  );
};

// --- Icons ---
const IconInvoice = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const IconForm = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

const IconPDF = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const IconCode = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const IconIntegrate = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

export default Hero;
