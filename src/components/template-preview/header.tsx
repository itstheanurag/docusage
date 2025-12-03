"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PreviewHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <Badge variant="outline" className="mb-4 text-sm font-medium">
        Preview
      </Badge>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
        Choose from Premium Templates
      </h2>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Start with professionally designed templates and customize them to match
        your brand.
      </p>
    </motion.div>
  );
}
