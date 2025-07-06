"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface AnimateOnceProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimateOnce = ({ children, className, delay = 0 }: AnimateOnceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay,
      }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnce;
