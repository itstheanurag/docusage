"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface AnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Animate = ({ children, className, delay = 0 }: AnimateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay,
      }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
