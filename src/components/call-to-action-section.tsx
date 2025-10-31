"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlickeringGrid } from "@/components/backgrounds/FlickerGrids";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-linear-to-br from-background via-background dark:bg-neutral-900 transition-colors duration-300">
      {/* Background Flickering Grid */}

      <FlickeringGrid
        className="z-0 absolute inset-0 w-full h-full"
        squareSize={4}
        gridGap={6}
        color="currentColor"
        maxOpacity={0.4}
        flickerChance={0.1}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container px-4 md:px-6 mx-auto text-center text-neutral-800 dark:text-white transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to Get Started?
        </motion.h2>

        <motion.p
          className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of satisfied users and revolutionize your workflow
          today.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors duration-300"
            size="lg"
          >
            Sign Up for Free
          </Button>
          <Button
            className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300"
            size="lg"
            variant="outline"
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
