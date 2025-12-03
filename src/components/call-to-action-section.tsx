"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 border border-primary/10 px-6 py-24 sm:px-16 sm:py-32 text-center">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(circle_at_center,white,transparent)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent)]"></div>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to revolutionize your workflow?
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of professionals who are creating stunning
              documents in minutes. Start your free trial today.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg"
                asChild
              >
                <a href="/register">Get Started for Free</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background/50 backdrop-blur text-lg px-8 py-6 rounded-full border-primary/20 hover:bg-primary/5"
                asChild
              >
                <a href="#features">Explore Features</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
