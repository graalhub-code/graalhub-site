"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";

const EASE = [0.16, 0.8, 0.24, 1] as const;
const STORAGE_KEY = "graalhub-cookie-consent";

export default function CookieConsent() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function choose(value: "accepted" | "essential") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t.cookies.message}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-5 right-5 z-[70] w-[calc(100vw-40px)] max-w-[300px] rounded-[3px] border border-[var(--line)] bg-[var(--bg)] px-5 py-5 text-[var(--ink)] shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        >
          <p className="text-[12.5px] leading-[1.6] text-[var(--stone-dim)]">
            {t.cookies.message}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => choose("accepted")}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="inline-flex items-center rounded-[2px] bg-[var(--red)] px-4 py-2 text-[11.5px] font-medium tracking-[0.03em] text-[#171414]"
            >
              {t.cookies.accept}
            </motion.button>
            <button
              type="button"
              onClick={() => choose("essential")}
              className="border-b border-transparent text-[11.5px] tracking-[0.02em] text-[var(--stone-dim)] transition-colors duration-300 hover:border-[var(--stone-dim)]"
            >
              {t.cookies.essential}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
