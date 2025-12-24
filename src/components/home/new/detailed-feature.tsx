"use client";

import React, { useState } from "react";

export const DetailedFeatures: React.FC = () => {
  return (
    <section className="dark:bg-black bg-white py-24 border-t dark:border-white/10 border-black/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Invoice Feature Group */}
        <div className="mb-32 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] dark:bg-blue-500/[0.03] bg-blue-500/[0.01] blur-[120px] -z-10 rounded-full"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                Billing Ecosystem
              </div>
              <h2 className="text-4xl font-bold dark:text-white text-black mb-4">
                Programmable Invoicing
              </h2>
              <p className="dark:text-gray-500 text-gray-600 text-lg">
                Beyond simple PDFs. A full-stack billing engine with native
                payment links and automated lifecycles.
              </p>
            </div>
            <button className="px-6 py-3 dark:bg-white dark:text-black bg-black text-white font-bold rounded-xl text-sm dark:hover:bg-gray-200 hover:bg-gray-800 transition-all self-start md:self-auto">
              Launch Billing Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l dark:border-white/10 border-black/10">
            <SubFeatureCard
              title="Dual-Branding Logic"
              desc="Specify sender and recipient logos via API. Our engine handles placement and scaling."
              visual={(active) => <BrandingVisual active={active} />}
            />
            <SubFeatureCard
              title="Payment Link Embedding"
              desc="Inject dynamic checkout links (Stripe, PayPal) directly into document metadata."
              visual={(active) => <PaymentLinkVisual active={active} />}
            />
            <SubFeatureCard
              title="Smart Recurrence"
              desc="Define cycles (weekly, monthly). Engine dispatches automatically at the interval."
              visual={(active) => <RecurrenceVisual active={active} />}
            />
            <SubFeatureCard
              title="Theme Injection"
              desc="Apply any inbuilt styling instantly via the 'theme' parameter in the JSON payload."
              visual={(active) => <ThemeInjectionVisual active={active} />}
            />
            <SubFeatureCard
              title="Direct Send SMTP"
              desc="Skip the download. Send invoices directly to clients via our high-deliverability mail cluster."
              visual={(active) => <DirectSendVisual active={active} />}
            />
            <div className="p-10 border-r border-b dark:border-white/10 border-black/10 flex items-center justify-center dark:bg-blue-500/[0.02] bg-blue-500/[0.01]">
              <div className="text-center">
                <div className="text-blue-500 dark:text-blue-400 font-bold mb-2">
                  99.9% Uptime
                </div>
                <div className="dark:text-gray-600 text-gray-400 text-[10px] font-mono">
                  BILLING_SERVICE_STABLE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CodeShare Feature Group */}
        <div className="mb-32 relative">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] dark:bg-emerald-500/[0.03] bg-emerald-500/[0.01] blur-[120px] -z-10 rounded-full"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                Collaborative Studio
              </div>
              <h2 className="text-4xl font-bold dark:text-white text-black mb-4">
                Real-time CodeShare
              </h2>
              <p className="dark:text-gray-500 text-gray-600 text-lg">
                Build document schemas together. Zero latency collaboration for
                distributed teams.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l dark:border-white/10 border-black/10">
            <SubFeatureCard
              title="Multi-Operator Editing"
              desc="Multiple users can operate on the same code simultaneously. CRDT sync ensures no conflicts."
              visual={(active) => <MultiOperatorVisual active={active} />}
            />
            <SubFeatureCard
              title="Real-time Preview"
              desc="See the document render as your teammates type. Instant feedback loops."
              visual={(active) => <LivePreviewVisual active={active} />}
            />
          </div>
        </div>

        {/* Form Feature Group */}
        <div className="relative">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] dark:bg-purple-500/[0.03] bg-purple-500/[0.01] blur-[120px] -z-10 rounded-full"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                Form Architect
              </div>
              <h2 className="text-4xl font-bold dark:text-white text-black mb-4">
                Data Capture Engine
              </h2>
              <p className="dark:text-gray-500 text-gray-600 text-lg">
                Robust form generation primitives for rapid application
                development.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l dark:border-white/10 border-black/10">
            <SubFeatureCard
              title="Webhook Support"
              desc="Receive form data instantly. Connect your backend via secure, typed webhook payloads."
              visual={(active) => <WebhookVisual active={active} />}
            />
            <SubFeatureCard
              title="Download Code as Zip"
              desc="Export the entire form stack (HTML, CSS, JS) as a portable archive for any environment."
              visual={(active) => <ZipExportVisual active={active} />}
            />
            <SubFeatureCard
              title="Share Forms Directly"
              desc="One-click publishing to our edge network. Share your forms with a live link immediately."
              visual={(active) => <DirectShareVisual active={active} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SubFeature Card Component ---

const SubFeatureCard = ({
  title,
  desc,
  visual,
}: {
  title: string;
  desc: string;
  visual: (active: boolean) => React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col border-r border-b dark:border-white/10 border-black/10 group dark:hover:bg-white/[0.01] hover:bg-black/[0.01] transition-all cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-10 flex-1">
        <h3 className="text-lg font-bold dark:text-white text-black mb-3 transition-colors">
          {title}
        </h3>
        <p className="dark:text-gray-500 text-gray-500 text-sm leading-relaxed mb-8">
          {desc}
        </p>
      </div>
      <div className="px-10 pb-10">
        <div className="h-32 w-full dark:bg-black/50 bg-black/5 border dark:border-white/5 border-black/5 rounded-xl overflow-hidden relative dark:group-hover:border-white/20 group-hover:border-black/20 transition-all">
          {visual(isHovered)}
        </div>
      </div>
    </div>
  );
};

// --- Visualizers ---

const BrandingVisual = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center h-full gap-4">
    <div
      className={`w-12 h-12 rounded-lg dark:bg-white/10 bg-black/10 flex items-center justify-center font-bold text-[10px] transition-all duration-700 ${active ? "scale-110 translate-x-1 dark:border-white/40 border-black/20 border" : "opacity-40"}`}
    >
      SENDER
    </div>
    <div
      className={`w-4 h-px dark:bg-white/10 bg-black/10 transition-all duration-700 ${active ? "scale-x-150" : ""}`}
    ></div>
    <div
      className={`w-12 h-12 rounded-lg dark:bg-blue-500/20 bg-blue-500/10 flex items-center justify-center font-bold text-[10px] transition-all duration-700 ${active ? "scale-110 -translate-x-1 dark:border-blue-500/40 border-blue-500/20 border opacity-100" : "opacity-40"}`}
    >
      CLIENT
    </div>
  </div>
);

const PaymentLinkVisual = ({ active }: { active: boolean }) => (
  <div className="flex flex-col items-center justify-center h-full space-y-3">
    <div
      className={`px-4 py-2 dark:bg-white dark:text-black bg-black text-white text-[10px] font-bold rounded-lg transition-all duration-500 shadow-xl ${active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"}`}
    >
      PAY_NOW_STRIPE
    </div>
    <div className="w-24 h-1 dark:bg-white/10 bg-black/10 rounded-full overflow-hidden">
      <div
        className={`h-full bg-blue-500 transition-all duration-[1000ms] ease-out ${active ? "w-full" : "w-0"}`}
      ></div>
    </div>
  </div>
);

const RecurrenceVisual = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center h-full">
    <div className="relative w-16 h-16">
      <div
        className={`absolute inset-0 rounded-full border-2 dark:border-white/10 border-black/10 dark:border-t-white border-t-black transition-all duration-700 ${active ? "animate-spin" : "rotate-45"}`}
      ></div>
      <div
        className={`absolute inset-0 flex items-center justify-center text-[8px] font-mono dark:text-white text-black transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}
      >
        30d
      </div>
    </div>
  </div>
);

const ThemeInjectionVisual = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center h-full gap-2 px-4">
    <div
      className={`flex-1 h-12 bg-gray-900 border border-white/10 rounded transition-all duration-500 ${active ? "scale-90 opacity-40" : ""}`}
    ></div>
    <div
      className={`flex-1 h-16 dark:bg-white bg-black dark:border-white/10 border-black/10 rounded shadow-2xl transition-all duration-500 z-10 ${active ? "scale-125" : "scale-110 opacity-80"}`}
    ></div>
    <div
      className={`flex-1 h-12 bg-blue-900 border border-white/10 rounded transition-all duration-500 ${active ? "scale-90 opacity-40" : ""}`}
    ></div>
  </div>
);

const DirectSendVisual = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center h-full overflow-hidden">
    <div className="relative flex items-center gap-4">
      <div
        className={`w-8 h-8 rounded dark:bg-white/5 bg-black/5 flex items-center justify-center dark:text-white text-black transition-all duration-500 ${active ? "translate-x-2" : ""}`}
      >
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="w-12 h-0.5 dark:bg-white/10 bg-black/10 overflow-hidden">
        <div
          className={`h-full bg-green-500 transition-all duration-700 ease-in-out ${active ? "translate-x-full" : "-translate-x-full"}`}
        ></div>
      </div>
      <div
        className={`w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 transition-all duration-500 ${active ? "scale-125 opacity-100" : "scale-100 opacity-40"}`}
      >
        <svg
          className="w-4 h-4"
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
    </div>
  </div>
);

const MultiOperatorVisual = ({ active }: { active: boolean }) => (
  <div className="p-4 font-mono text-[8px] space-y-2 h-full flex flex-col justify-center">
    <div className="flex items-center gap-2">
      <span className="dark:text-gray-600 text-gray-400 font-bold">const</span>{" "}
      <span className="text-blue-500">schema</span> = {`{`}
    </div>
    <div className="pl-4 flex items-center gap-1 overflow-hidden h-4">
      <span className="text-purple-500">&quot;users&quot;:</span> [
      {active && (
        <span className="dark:text-gray-400 text-gray-500 italic animate-pulse">
          Sarah typing...
        </span>
      )}
      <span
        className={`w-1 h-3 bg-emerald-500 ${active ? "animate-pulse" : ""}`}
      ></span>
    </div>
    <div className="pl-4 flex items-center gap-1 overflow-hidden h-4">
      <span className="text-purple-500">&quot;status&quot;:</span> &quot;active&quot;
      {active && (
        <span className="dark:text-gray-400 text-gray-500 italic animate-pulse ml-2">
          Syncing...
        </span>
      )}
      <span
        className={`w-1 h-3 bg-blue-500 ${active ? "animate-pulse" : ""}`}
      ></span>
    </div>
  </div>
);

const LivePreviewVisual = ({ active }: { active: boolean }) => (
  <div className="flex h-full dark:border-t dark:border-white/5 border-t border-black/5">
    <div className="w-1/2 dark:border-r dark:border-white/5 border-r border-black/5 p-4 flex flex-col justify-center gap-1">
      <div
        className={`h-1 w-full dark:bg-white/10 bg-black/10 rounded transition-all duration-300 ${active ? "opacity-100" : "opacity-20"}`}
      ></div>
      <div
        className={`h-1 w-2/3 dark:bg-white/10 bg-black/10 rounded transition-all duration-500 ${active ? "opacity-100" : "opacity-20"}`}
      ></div>
      <div
        className={`h-1 w-full dark:bg-white/20 bg-black/20 rounded transition-all duration-700 ${active ? "opacity-100" : "opacity-20"}`}
      ></div>
    </div>
    <div className="w-1/2 p-4 flex flex-col justify-center items-center">
      <div
        className={`w-full h-16 dark:bg-white/[0.03] bg-black/[0.03] rounded border dark:border-white/5 border-black/5 transition-all duration-700 flex flex-col p-2 gap-1 ${active ? "opacity-100 translate-y-0 scale-105 shadow-xl" : "opacity-40 translate-y-1"}`}
      >
        <div className="h-1 w-4 dark:bg-white/20 bg-black/20"></div>
        <div className="h-4 w-full dark:bg-white/10 bg-black/10 rounded-sm"></div>
        <div className="h-2 w-full dark:bg-white/5 bg-black/5"></div>
      </div>
    </div>
  </div>
);

const WebhookVisual = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center h-full overflow-hidden">
    <div className="flex items-center gap-6 relative">
      <div
        className={`w-10 h-10 rounded-lg border transition-all duration-500 flex flex-col items-center justify-center gap-0.5 ${active ? "dark:bg-purple-500/10 dark:border-purple-500/50 bg-purple-500/5 border-purple-500/20 shadow-lg" : "dark:border-white/10 border-black/10"}`}
      >
        <div className="dark:text-white text-black text-[7px] font-bold">
          POST
        </div>
        <div className="text-gray-500 text-[6px] font-mono">/send</div>
      </div>
      <div className="relative w-20 h-px">
        <div className="absolute inset-0 border-b border-dashed dark:border-white/20 border-black/20"></div>
        {active && (
          <>
            <div
              className="absolute top-[-2px] left-0 w-1.5 h-1.5 rounded-full bg-purple-500"
              style={{ animation: "move 1.2s infinite linear 0s" }}
            ></div>
            <div
              className="absolute top-[-2px] left-0 w-1.5 h-1.5 rounded-full bg-purple-500"
              style={{ animation: "move 1.2s infinite linear 0.4s" }}
            ></div>
            <div
              className="absolute top-[-2px] left-0 w-1.5 h-1.5 rounded-full bg-purple-500"
              style={{ animation: "move 1.2s infinite linear 0.8s" }}
            ></div>
          </>
        )}
      </div>
      <div
        className={`w-10 h-10 rounded-lg border transition-all duration-500 flex flex-col items-center justify-center gap-0.5 ${active ? "dark:bg-emerald-500/10 dark:border-emerald-500/50 bg-emerald-500/5 border-emerald-500/20 shadow-lg" : "dark:border-white/10 border-black/10"}`}
      >
        <div className="dark:text-white text-black text-[7px] font-bold">
          200
        </div>
        <div className="text-emerald-500 text-[6px] font-mono animate-pulse">
          OK
        </div>
      </div>
    </div>
    <style jsx>{`
      @keyframes move {
        0% {
          transform: translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateX(80px);
          opacity: 0;
        }
      }
    `}</style>
  </div>
);

const ZipExportVisual = ({ active }: { active: boolean }) => (
  <div
    className={`flex items-center justify-center h-full transition-all duration-500 ${active ? "scale-125" : "scale-100 opacity-40"}`}
  >
    <div className="w-12 h-14 dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 rounded-lg relative overflow-hidden group-hover:bg-black/10 dark:group-hover:bg-white/10">
      <div
        className={`absolute top-0 right-0 w-4 h-4 dark:bg-white/20 bg-black/10 rounded-bl-lg transition-transform duration-500 ${active ? "rotate-12 translate-x-1 -translate-y-1" : ""}`}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[8px] font-bold dark:text-gray-300 text-black">
          ZIP
        </div>
        <div
          className={`w-6 h-0.5 dark:bg-white/20 bg-black/20 mt-1 transition-all duration-700 ${active ? "w-8" : ""}`}
        ></div>
      </div>
    </div>
  </div>
);

const DirectShareVisual = ({ active }: { active: boolean }) => (
  <div className="flex flex-col items-center justify-center h-full space-y-2 p-4">
    <div
      className={`w-full dark:bg-black/40 bg-white border dark:border-white/10 border-black/10 rounded px-2 py-1 text-[8px] dark:text-gray-400 text-gray-600 truncate font-mono transition-all duration-500 ${active ? "dark:border-emerald-500/40 border-emerald-500 text-black" : ""}`}
    >
      docusage.io/f/920-xk-4
    </div>
    <div
      className={`text-[8px] text-emerald-600 font-bold tracking-tighter transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      ✓ LINK_COPIED
    </div>
  </div>
);

export default DetailedFeatures;
