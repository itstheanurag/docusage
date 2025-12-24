"use client";
import React, { useState, useEffect } from "react";
export type ThemeType = "minimal" | "corporate" | "creative";
export const FeatureGrid: React.FC = () => {
  return (
    <section
      id="features"
      className="w-full dark:bg-[#030303] bg-white py-24 relative transition-colors duration-500"
    >
      {/* Background Focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl dark:bg-white/[0.01] bg-black/[0.01] blur-[150px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold dark:text-white text-black mb-4">
            Powerful primitives for any document workflow.
          </h2>
          <p className="dark:text-gray-500 text-gray-400 max-w-2xl">
            From complex legal automation to beautiful customer-facing invoices,
            Docusage provides the building blocks for professional-grade
            generation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l dark:border-white/10 border-black/10">
          <TemplatedDocCard />
          <MultiStepFormCard />
          <ThemedInvoiceCard />
          <AutomationCard />
        </div>
      </div>
    </section>
  );
};

const TemplatedDocCard = () => {
  const [activeTag, setActiveTag] = useState("recipient");
  const values: Record<string, string> = {
    recipient: "Sarah Johnson",
    company: "Nexus Corp",
    date: "February 12, 2025",
    contract_id: "NDA-992-B",
  };

  return (
    <div className="group relative min-h-[500px] border-r border-b dark:border-white/10 border-black/10 overflow-hidden flex flex-col p-10 dark:hover:bg-white/[0.02] hover:bg-black/[0.01] transition-all duration-500">
      <div className="z-10 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded dark:bg-white dark:text-black bg-black text-white flex items-center justify-center font-bold">
            01
          </div>
          <span className="dark:text-gray-500 text-gray-400 font-mono text-xs tracking-widest uppercase">
            Templates
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-4 dark:text-white text-black">
          Dynamic Variable Engine
        </h3>
        <p className="dark:text-gray-500 text-gray-400 text-sm leading-relaxed max-w-sm">
          Inject structured data into standard templates with support for
          conditional blocks, nested loops, and rich formatting.
        </p>
      </div>

      <div className="relative flex-1 rounded-t-2xl dark:bg-[#050505] bg-[#f9f9f9] border-t border-x dark:border-white/10 border-black/10 p-8 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(values).map((tag) => (
            <button
              key={tag}
              onMouseEnter={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-[10px] border font-mono transition-all ${activeTag === tag ? "dark:bg-white dark:text-black bg-black text-white border-transparent" : "dark:border-white/10 border-black/10 dark:text-gray-500 text-gray-400 dark:hover:border-white/30 hover:border-black/30"}`}
            >
              {
                {
                  recipient: "{{name}}",
                  company: "{{org}}",
                  date: "{{date}}",
                  contract_id: "{{id}}",
                }[tag]
              }
            </button>
          ))}
        </div>

        <div className="space-y-4 font-serif dark:text-gray-400 text-gray-600 text-xs leading-loose">
          <div className="h-4 w-1/3 dark:bg-white/5 bg-black/5 rounded"></div>
          <p>
            This Confidentiality Agreement is made between{" "}
            <span
              className={`transition-colors duration-300 px-1 rounded ${activeTag === "company" ? "dark:bg-white dark:text-black bg-black text-white" : "dark:bg-white/10 bg-black/10 dark:text-white text-black"}`}
            >
              {values.company}
            </span>{" "}
            and{" "}
            <span
              className={`transition-colors duration-300 px-1 rounded ${activeTag === "recipient" ? "dark:bg-white dark:text-black bg-black text-white" : "dark:bg-white/10 bg-black/10 dark:text-white text-black"}`}
            >
              {values.recipient}
            </span>
            .
          </p>
          <p>
            Reference ID:{" "}
            <span
              className={`font-mono transition-colors duration-300 ${activeTag === "contract_id" ? "dark:text-white text-black font-bold" : "dark:text-gray-600 text-gray-400"}`}
            >
              {values.contract_id}
            </span>
          </p>
          <div className="space-y-2 opacity-30">
            <div className="h-2 w-full dark:bg-white/10 bg-black/10 rounded"></div>
            <div className="h-2 w-full dark:bg-white/10 bg-black/10 rounded"></div>
            <div className="h-2 w-2/3 dark:bg-white/10 bg-black/10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultiStepFormCard = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    setProgress(step * 33.33);
  }, [step]);

  return (
    <div className="group relative min-h-[500px] border-r border-b dark:border-white/10 border-black/10 overflow-hidden flex flex-col p-10 dark:hover:bg-white/[0.02] hover:bg-black/[0.01] transition-all duration-500">
      <div className="z-10 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded dark:bg-white dark:text-black bg-black text-white flex items-center justify-center font-bold">
            02
          </div>
          <span className="dark:text-gray-500 text-gray-400 font-mono text-xs tracking-widest uppercase">
            Forms
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-4 dark:text-white text-black">
          Complex Form Architect
        </h3>
        <p className="dark:text-gray-500 text-gray-400 text-sm leading-relaxed max-sm">
          Build high-performance, multi-step capture flows with native
          validation, field masking, and logic branching.
        </p>
      </div>

      <div className="relative flex-1 rounded-t-2xl dark:bg-[#050505] bg-[#f9f9f9] border-t border-x dark:border-white/10 border-black/10 p-8 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <div className="mb-8">
          <div className="flex justify-between text-[10px] dark:text-gray-500 text-gray-400 mb-2 font-mono">
            <span>STEP {step} OF 3</span>
            <span>{Math.round(progress)}% COMPLETE</span>
          </div>
          <div className="h-1 w-full dark:bg-white/5 bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full dark:bg-white bg-black transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-[10px] dark:text-gray-500 text-gray-400 block mb-2 font-bold uppercase tracking-widest">
                Business Email
              </label>
              <div className="h-12 w-full dark:bg-black bg-white border dark:border-white/10 border-black/10 rounded flex items-center px-4 dark:text-white text-black text-sm">
                alex@nexus.io
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-[10px] dark:text-gray-500 text-gray-400 block mb-2 font-bold uppercase tracking-widest">
                Company Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 border dark:border-white border-black rounded text-[10px] dark:text-white text-black dark:bg-white/10 bg-black/5 flex items-center justify-center font-bold">
                  10-50
                </div>
                <div className="p-3 border dark:border-white/10 border-black/10 rounded text-[10px] dark:text-gray-500 text-gray-400 flex items-center justify-center dark:hover:border-white/30 hover:border-black/30 transition-colors">
                  50-500
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-center py-4">
              <div className="w-12 h-12 rounded-full border dark:border-white border-black flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 dark:text-white text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="dark:text-white text-black font-bold text-sm">
                Ready to Generate
              </p>
            </div>
          )}

          <button
            onClick={() => setStep((prev) => (prev < 3 ? prev + 1 : 1))}
            className="w-full py-4 dark:bg-white dark:text-black bg-black text-white rounded font-bold text-xs dark:hover:bg-gray-200 hover:bg-gray-800 transition-colors shadow-lg"
          >
            {step === 3 ? "Finish & Download" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ThemedInvoiceCard = () => {
  const [theme, setTheme] = useState<ThemeType>("minimal");

  return (
    <div className="group relative min-h-[500px] border-r border-b dark:border-white/10 border-black/10 overflow-hidden flex flex-col p-10 dark:hover:bg-white/[0.02] hover:bg-black/[0.01] transition-all duration-500">
      <div className="z-10 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded dark:bg-white dark:text-black bg-black text-white flex items-center justify-center font-bold">
            03
          </div>
          <span className="dark:text-gray-500 text-gray-400 font-mono text-xs tracking-widest uppercase">
            Billing
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-4 dark:text-white text-black">
          Advanced Theming Engine
        </h3>
        <p className="dark:text-gray-500 text-gray-400 text-sm leading-relaxed max-sm">
          Native support for pixel-perfect CSS layouts, custom typography, and
          multi-currency formatting for global billing.
        </p>
      </div>

      <div className="flex-1 rounded-t-2xl p-8 dark:bg-[#050505] bg-[#f9f9f9] border-t border-x dark:border-white/10 border-black/10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <div className="flex gap-4 mb-8">
          {(["minimal", "corporate", "creative"] as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex-1 py-2 text-[10px] font-bold border transition-all ${theme === t ? "dark:bg-white dark:text-black bg-black text-white border-transparent" : "dark:border-white/10 border-black/10 dark:text-gray-500 text-gray-400"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div
          className={`p-6 rounded-lg border shadow-2xl transition-all duration-500 min-h-[160px] ${theme === "minimal" ? "bg-white text-black" : theme === "corporate" ? "bg-gray-800 text-white border-gray-700" : "bg-black text-white border-white/30"}`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-4 bg-current opacity-20 rounded"></div>
            <div className="text-right">
              <div className="text-[10px] font-bold">INVOICE #920</div>
              <div className="text-[8px] opacity-50">DUE FEB 28</div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-[8px] border-b border-current/10 pb-1">
              <span>Standard License</span>
              <span>$499.00</span>
            </div>
            <div className="flex justify-between text-[8px] border-b border-current/10 pb-1">
              <span>Setup Fee</span>
              <span>$0.00</span>
            </div>
          </div>

          <div className="flex justify-end font-bold text-xs pt-2">
            TOTAL: $499.00
          </div>
        </div>
      </div>
    </div>
  );
};

const AutomationCard = () => {
  const [logs, setLogs] = useState<string[]>([
    "[09:00:01] Webhook Received",
    "[09:00:02] Schema Validated",
  ]);

  useEffect(() => {
    const messages = [
      "[09:00:03] Injecting Variables",
      "[09:00:04] Applying CSS Theme",
      "[09:00:06] PDF Rendered (2.1MB)",
      "[09:00:07] Dispatching Email",
      "[09:00:08] Callback Successful",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, messages[i]];
        if (next.length > 5) next.shift();
        return next;
      });
      i = (i + 1) % messages.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group relative min-h-[500px] border-r border-b dark:border-white/10 border-black/10 overflow-hidden flex flex-col p-10 dark:hover:bg-white/[0.02] hover:bg-black/[0.01] transition-all duration-500">
      <div className="z-10 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded dark:bg-white dark:text-black bg-black text-white flex items-center justify-center font-bold">
            04
          </div>
          <span className="dark:text-gray-500 text-gray-400 font-mono text-xs tracking-widest uppercase">
            Engine
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-4 dark:text-white text-black">
          Event-Driven Pipeline
        </h3>
        <p className="dark:text-gray-500 text-gray-400 text-sm leading-relaxed max-sm">
          Connect to any lifecycle event via webhooks. Automatically store
          generated files in S3, GCS, or send via SMTP.
        </p>
      </div>

      <div className="relative flex-1 rounded-t-2xl dark:bg-[#050505] bg-[#f9f9f9] border-t border-x dark:border-white/10 border-black/10 p-6 flex flex-col translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-mono dark:text-gray-500 text-gray-400 tracking-widest">
            LIVE WORKFLOW MONITOR
          </span>
        </div>

        <div className="flex-1 font-mono text-[9px] dark:text-gray-400 text-gray-600 space-y-3 p-4 dark:bg-black/40 bg-black/5 rounded border dark:border-white/5 border-black/5">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="flex gap-4 animate-in fade-in slide-in-from-left-1 duration-300"
            >
              <span className="dark:text-white/20 text-black/20">{idx + 1}</span>
              <span
                className={log.includes("Successful") ? "text-green-500 font-bold" : ""}
              >
                {log}
              </span>
            </div>
          ))}
          <div className="h-4 w-1 dark:bg-white/20 bg-black/20 animate-pulse mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
