"use client";

import React, { useState, useEffect } from "react";

export const LivePlayground: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Define Schema",
      code: `{ "type": "invoice", "data": { "amount": 2500, "currency": "USD" } }`,
    },
    {
      title: "Apply Theme",
      code: `{ "theme": "dark-minimal", "branding": { "primary": "#ffffff" } }`,
    },
    {
      title: "Generate PDF",
      code: `const pdf = await Docusage.render(schema, theme);`,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-24 dark:bg-black bg-white border-b dark:border-white/5 border-black/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white text-black tracking-tight">
              From raw data to <br />
              <span className="text-gray-500">polished document.</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-600 text-lg mb-10 max-w-md">
              Docusage handles the heavy lifting of document layouts and logic
              so you can focus on building features.
            </p>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border transition-all duration-500 ${activeStep === i ? "dark:bg-white/5 bg-black/5 dark:border-white/20 border-black/10" : "border-transparent opacity-40"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${activeStep === i ? "dark:bg-white dark:text-black bg-black text-white" : "dark:bg-white/10 bg-black/10 dark:text-white text-black"}`}
                    >
                      {i + 1}
                    </div>
                    <span className="font-semibold dark:text-white text-black">
                      {step.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="dark:bg-[#0A0A0A] bg-gray-50 rounded-2xl border dark:border-white/10 border-black/10 shadow-2xl overflow-hidden min-h-[400px]">
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full dark:bg-white/10 bg-black/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full dark:bg-white/10 bg-black/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full dark:bg-white/10 bg-black/10"></div>
                </div>
                <div className="text-[10px] font-mono dark:text-gray-500 text-gray-400">
                  engine_v2.ts
                </div>
              </div>

              <div className="p-8 font-mono text-sm leading-relaxed">
                <div className="text-indigo-500 dark:text-indigo-400 mb-2">
                  // {steps[activeStep].title}
                </div>
                <pre className="dark:text-gray-300 text-gray-800">
                  <code>{steps[activeStep].code}</code>
                </pre>

                <div className="mt-12 pt-8 border-t dark:border-white/5 border-black/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] dark:text-gray-500 text-gray-400 uppercase tracking-widest">
                      Live Output
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                  <div className="h-24 rounded dark:bg-white/[0.03] bg-black/[0.03] flex items-center justify-center border dark:border-white/5 border-black/5 border-dashed">
                    <div className="text-gray-500 text-xs animate-pulse italic">
                      Rendering Preview...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePlayground;
