"use client";

import React from "react";

export const OpenSourceSection: React.FC = () => {
  return (
    <section
      id="opensource"
      className="py-24 md:py-32 bg-white text-black relative overflow-hidden dark:bg-black dark:text-white transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                className="stroke-black dark:stroke-white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Built by developers, <br />
            governed by the community.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
            Docusage is more than just code. It&apos;s a commitment to open
            documentation standards. Join 400+ contributors making professional
            document generation accessible to everyone.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <div className="text-3xl font-bold mb-1">1.2M+</div>
              <div className="text-gray-500 text-sm">Monthly Generations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">450+</div>
              <div className="text-gray-500 text-sm">Open Source PRs</div>
            </div>
          </div>

          <button className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-2xl">
            Read our Manifesto
          </button>
        </div>

        <div className="relative">
          <div className="bg-black dark:bg-white/5 rounded-2xl p-4 overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-400"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-400"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600 dark:bg-gray-400"></div>
              <div className="ml-4 text-xs font-mono text-gray-400">
                CONTRIBUTING.md
              </div>
            </div>
            <pre className="text-sm font-mono text-gray-300 text-wrap leading-relaxed">
              <code>{`# How to contribute

1. Fork the repo
2. Create your feature branch
   \`git checkout -b feature/amazing\`
3. Commit your changes
   \`git commit -m 'Add something'\`
4. Push to the branch
   \`git push origin feature/amazing\`
5. Open a Pull Request

**We love community feedback!**`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
