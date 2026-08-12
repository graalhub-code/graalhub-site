"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

const EASE = [0.16, 0.8, 0.24, 1] as const;

// appears once the reader has scrolled past roughly one viewport, so it never
// competes with the hero's own scroll-progress bar or the cookie banner
export default function BackToTop() {
  const { t } = useLocale();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > (typeof window !== "undefined" ? window.innerHeight : 800));
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={t.backToTop.label}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-5 left-5 z-[65] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 13V3M8 3L3 8M8 3l5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
