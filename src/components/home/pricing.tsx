"use client";

import  { JSX, useEffect, useState } from "react";
import { CheckCircleIcon, SparklesIcon } from "../icons/icons";
import SectionHeader from "../section-header";

type PlanButton = {
  label: string;
  href?: string;
  variant?: "solid" | "outline";
};

export type Plan = {
  id?: string | number;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  button?: PlanButton;
  highlight?: boolean;
  accentIcon?: JSX.Element;
};

const defaultPlans: Plan[] = [
  {
    id: "hobby",
    name: "Hobby",
    price: "$0",
    description: "For individuals exploring the platform.",
    features: ["3 Projects", "Community Templates", "720p Export"],
    button: { label: "Start Free", href: "/register", variant: "outline" },
  },
  {
    id: "pro",
    name: "Professional",
    price: "$29",
    period: "/mo",
    description: "For power users and freelancers.",
    features: ["Unlimited Projects", "AI Copilot", "Remove Branding"],
    button: { label: "Get Pro", href: "/subscribe", variant: "solid" },
    highlight: true,
    accentIcon: <SparklesIcon className="w-32 h-32 text-neutral-200 opacity-10" />,
  },
  {
    id: "team",
    name: "Team",
    price: "$99",
    period: "/mo",
    description: "For small teams and startups.",
    features: ["Everything in Pro", "Shared Workspace", "API Access"],
    button: { label: "Contact Sales", href: "/contact", variant: "outline" },
  },
];

/** match grid-cols-1 md:grid-cols-3 */
function getColsFromWidth(width: number) {
  return width >= 768 ? 3 : 1;
}

const Pricing = ({ plans }: { plans?: Plan[] }) => {
  const items = plans && plans.length ? plans : defaultPlans;

  // SSR-safe default; will update on mount
  const [cols, setCols] = useState<number>(1);

  useEffect(() => {
    function update() {
      setCols(getColsFromWidth(window.innerWidth));
    }

    update();
    let raf = 0;
    function onResize() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const rows = Math.ceil(items.length / cols);

  return (
    <section
      id="pricing"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="p-8 md:p-12">
          <SectionHeader title="Transparent Pricing." />
        </div>

        {/* Parent draws top & left borders; cells draw right & bottom as needed */}
        <div className="pt-0 overflow-hidden border-t border-l border-neutral-200 dark:border-neutral-800 bg-background">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((plan, idx) => {
              const isHighlight = !!plan.highlight;

              const colIndex = idx % cols; // 0 .. cols-1
              const rowIndex = Math.floor(idx / cols); // 0 .. rows-1

              const isRightMost = colIndex === cols - 1;
              const isBottomMost = rowIndex === rows - 1;

              const borderRight = !isRightMost ? "border-r" : "";
              const borderBottom = !isBottomMost ? "border-b" : "";

              const baseCardClasses =
                "p-12 flex flex-col justify-between transition-colors duration-300";
              const cardBg = isHighlight
                ? "bg-neutral-900 dark:bg-black text-neutral-200 relative overflow-hidden"
                : "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100";

              return (
                <div
                  key={plan.id ?? idx}
                  className={`${baseCardClasses} ${borderBottom} ${borderRight} border-neutral-200 dark:border-neutral-800 ${cardBg}`}
                >
                  {/* decorative accent (only rendered when provided) */}
                  {isHighlight && plan.accentIcon && (
                    <div className="absolute top-0 right-0 p-4 pointer-events-none text-muted-foreground">
                      {plan.accentIcon}
                    </div>
                  )}

                  <div>
                    <h3 className={`text-xl font-bold mb-2`}>{plan.name}</h3>

                    <div className="text-4xl font-bold tracking-tighter mb-6">
                      {plan.price}
                      {plan.period && (
                        <span
                          className={`text-lg font-normal ${
                            isHighlight
                              ? "text-neutral-400 dark:text-neutral-600"
                              : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {plan.description && (
                      <p
                        className={`mb-8 ${
                          isHighlight ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {plan.description}
                      </p>
                    )}

                    <ul className={`space-y-4 mb-8 ${isHighlight ? "text-neutral-300" : ""}`}>
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className={`flex gap-3 text-sm font-medium ${
                            isHighlight ? "text-neutral-300" : "text-neutral-900 dark:text-neutral-300"
                          }`}
                        >
                          <CheckCircleIcon className={`w-5 h-5 ${isHighlight ? "text-neutral-200" : ""}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button area */}
                  <div>
                    {plan.button ? (
                      plan.button.variant === "solid" ? (
                        <a
                          href={plan.button.href ?? "#"}
                          className={`w-full py-3 inline-flex items-center justify-center font-bold hover:bg-neutral-200 transition-colors ${
                            isHighlight
                              ? "bg-white text-neutral-900"
                              : "bg-white dark:bg-white/5 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700"
                          }`}
                        >
                          {plan.button.label}
                        </a>
                      ) : (
                        <a
                          href={plan.button.href ?? "#"}
                          className={`w-full py-3 inline-flex items-center justify-center font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${
                            isHighlight
                              ? "border text-neutral-200 bg-transparent"
                              : "border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-transparent"
                          }`}
                        >
                          {plan.button.label}
                        </a>
                      )
                    ) : (
                      <button className="w-full py-3 border border-neutral-200 dark:border-neutral-700 font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:text-neutral-100 transition-colors">
                        Choose
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
