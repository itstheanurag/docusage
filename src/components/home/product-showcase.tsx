"use client";

import { BuilderType } from "@/types";
import SectionHeader from "../section-header";
import { ArrowRight, FileText, Receipt, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const productItems = [
  {
    title: "Invoice Builder",
    description: "Create automated billing documents with intelligent tax logic, recurring payments, and brand customization.",
    icon: Receipt,
    type: BuilderType.INVOICE,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-background to-muted/20",
    featured: true,
  },
  {
    title: "Form Builder",
    description: "Design responsive data collection forms with built-in validation.",
    icon: ClipboardList,
    type: BuilderType.FORM,
    className: "md:col-span-1 bg-background",
    featured: false,
  },
  {
    title: "Document Editor",
    description: "Draft legal contracts and agreements with dynamic variables.",
    icon: FileText,
    type: BuilderType.DOCUMENT,
    className: "md:col-span-1 bg-background",
    featured: false,
  },
];

import ProductCard from "./product-card";

export default function ProductShowcase() {
  const handleSelect = (type: BuilderType) => {
    console.log(type);
  };

  return (
    <section id="products" className="relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <SectionHeader
            title="Everything you need."
            subtitle="A complete suite of intelligent tools to manage your business documentation."
          />
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border auto-rows-[minmax(200px,auto)] overflow-hidden rounded-none">
            {productItems.map((item, index) => (
              <ProductCard
                key={item.title}
                index={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                type={item.type}
                featured={item.featured}
                onClick={() => handleSelect(item.type)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
