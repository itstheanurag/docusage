"use client";

import { BuilderType } from "@/types";
import SectionHeader from "../section-header";
import GridItem from "./features/feature-grid-item";

const productItems = [
  {
    title: "Invoice Builder",
    description:
      "Create automated billing documents with tax logic and line-item management.",
    icon: (
      <div className="font-mono font-bold text-2xl border border-neutral-200 dark:border-neutral-700 w-10 h-10 flex items-center justify-center rounded bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
        In
      </div>
    ),
    type: BuilderType.INVOICE,
  },
  {
    title: "Form Builder",
    description:
      "Design responsive data collection forms with built-in type validation.",
    icon: (
      <div className="font-mono font-bold text-2xl border border-neutral-200 dark:border-neutral-700 w-10 h-10 flex items-center justify-center rounded bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
        Fr
      </div>
    ),
    type: BuilderType.FORM,
  },
  {
    title: "Document Editor",
    description:
      "Draft legal contracts and agreements with dynamic variable injection.",
    icon: (
      <div className="font-mono font-bold text-2xl border border-neutral-200 dark:border-neutral-700 w-10 h-10 flex items-center justify-center rounded bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
        Do
      </div>
    ),
    type: BuilderType.DOCUMENT,
  },
];

const ProductShowcase = () => {
  const handleSelect = (type: BuilderType) => {
    console.log(type);
  };

  return (
    <section
      id="products"
      className="bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="p-8 md:p-12  transition-colors duration-300">
          <SectionHeader
            title="Select a module."
            subtitle="Start with a blank canvas or let our AI structure the foundation for you."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 transition-colors duration-300">
          {productItems.map((item, index) => (
            <GridItem
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onClick={() => handleSelect(item.type)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
