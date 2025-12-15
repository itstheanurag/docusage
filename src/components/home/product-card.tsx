"use client";

import { BuilderType } from "@/types";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: BuilderType;
  featured?: boolean;
  className?: string; // Kept for compatibility but might not be used with fixed grid
  index: number;
  onClick?: () => void;
}

const ProductCard = ({ title, description, icon: Icon, type, featured, index, onClick }: ProductCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden p-12 transition-all duration-300 border-r border-b border-border bg-background",
        featured ? "md:col-span-2 md:row-span-2" : "md:col-span-1",
        "hover:z-10 hover:shadow-2xl hover:border-transparent dark:hover:border-transparent" // Lift up on hover
      )}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary-rgb), 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Animated Visuals Based on Type */}
      <div className="absolute top-8 right-8 w-32 h-32 opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {type === BuilderType.INVOICE && (
            <div className="space-y-2">
                <motion.div className="h-2 w-full bg-primary/20 rounded" animate={{ width: ["100%", "80%", "100%"] }} transition={{ duration: 4, repeat: Infinity }} />
                <motion.div className="h-2 w-2/3 bg-primary/20 rounded" animate={{ width: ["60%", "40%", "60%"] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                <motion.div className="h-2 w-3/4 bg-primary/20 rounded" animate={{ width: ["75%", "50%", "75%"] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} />
            </div>
        )}
        {type === BuilderType.FORM && (
             <div className="space-y-3">
                 <div className="flex gap-2 items-center">
                    <motion.div className="h-4 w-4 border border-primary/30 rounded" animate={{ backgroundColor: ["transparent", "rgba(var(--primary-rgb), 0.5)", "transparent"] }} transition={{ duration: 2, repeat: Infinity }} />
                    <div className="h-2 w-20 bg-primary/20 rounded" />
                 </div>
                 <div className="flex gap-2 items-center">
                    <motion.div className="h-4 w-4 border border-primary/30 rounded" animate={{ backgroundColor: ["transparent", "rgba(var(--primary-rgb), 0.5)", "transparent"] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                    <div className="h-2 w-16 bg-primary/20 rounded" />
                 </div>
             </div>
        )}
        {type === BuilderType.DOCUMENT && (
             <div className="space-y-2 p-2 border border-primary/10 rounded-lg">
                 <motion.div className="h-1 w-full bg-primary/20 rounded" />
                 <motion.div className="h-1 w-full bg-primary/20 rounded" />
                 <motion.div className="h-1 w-1/2 bg-primary/20 rounded" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
             </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 rounded-xl">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className={cn("mb-2 font-bold tracking-tight text-foreground group-hover:text-primary transition-colors", featured ? "text-2xl md:text-3xl" : "text-xl")}>
          {title}
        </h3>

        <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center text-sm font-medium text-primary mt-auto">
          <span>Launch {title.split(" ")[0]}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
