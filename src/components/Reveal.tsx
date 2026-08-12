"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "span" | "li";
};

/**
 * Scroll-triggered entrance used across every section so cards, list items
 * and paragraphs share one consistent timing curve instead of each
 * component inventing its own animation. Respects prefers-reduced-motion by
 * skipping the transform and only cross-fading.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  y = 22,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 0.8, 0.24, 1] }}
    >
      {children}
    </MotionTag>
  );
}
