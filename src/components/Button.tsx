"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 0.8, 0.24, 1] }}
      className={`group inline-flex w-fit items-center gap-2 rounded-[2px] bg-[var(--red)] px-[26px] py-[15px] text-[13px] font-medium tracking-[0.04em] text-[#171414] ${className}`}
    >
      {children}
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        →
      </span>
    </motion.a>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group w-fit border-b border-[var(--line)] pb-1 text-[13px] tracking-[0.04em] text-[var(--stone-dim)] transition-colors duration-300 hover:border-[var(--ink)] hover:text-[var(--ink)] ${className}`}
    >
      {children}
    </a>
  );
}
