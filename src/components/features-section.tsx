"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { formFeatures, documentFeatures, codeFeatures, invoiceFeatures } from "@/lib/data/feature";

type Feature = { label: string; title: string; description: string };
type Category = { title: string; description?: string; features: Feature[] };

function IconPlaceholder() {
  return (
    <div className="h-6 w-6 rounded-full bg-border/30 flex items-center justify-center text-xs text-muted-foreground">
      ✦
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="p-8 flex flex-col justify-between min-h-[200px] bg-card transition-colors">
      <div>
        <div className="flex items-center gap-3 mb-4 text-muted-foreground">
          <IconPlaceholder />
          <span className="text-xs">{feature.label}</span>
        </div>

        <h4 className="text-lg font-semibold text-foreground mb-2">
          {feature.title}
        </h4>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 text-sm font-medium text-foreground">
        Learn more <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function FeaturesSection({
  categories,
}: {
  categories?: Category[];
}) {
  // fallback categories if none passed
  const fallback: Category[] = [formFeatures, documentFeatures, codeFeatures, invoiceFeatures];
  const cats = categories && categories.length ? categories : fallback;

  const category = cats[0];

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto flex flex-col  gap-8">
          <div className="lg:col-span-5 tracking-tight">
            <motion.h2
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold tracking-tight text-foreground leading-tight lg:text-5xl"
            >
              {category.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-xl"
            >
             {category.description}
            </motion.p>
          </div>

          <div className="lg:col-span-7">
            {/* container that creates shared borders for the grid (like the screenshot) */}
            <div className="overflow-hidden border-t border-l border-border bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {category.features.slice(0, 6).map((feature, idx) => (
                  <div className="group border-r border-b border-border hover:bg-muted/20 transition-colors" key={idx}>
                    <FeatureCard feature={feature} />
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
