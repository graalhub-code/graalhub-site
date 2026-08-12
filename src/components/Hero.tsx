"use client";

import { motion } from "framer-motion";
import { GhostLink } from "./Button";
import { useLocale } from "@/lib/locale-context";

const EASE = [0.16, 0.8, 0.24, 1] as const;

const line = {
  hidden: { y: "100%" },
  visible: (delay: number) => ({
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

export default function Hero() {
  const { t } = useLocale();

  return (
    <header
      id="top"
      className="t-dark grid min-h-[92vh] grid-cols-12 items-end border-b border-[var(--line)] bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      {/* geo coordinates now live only in the footer, per JP's request —
          this bar just carries the kicker. */}
      <div className="col-span-12 border-b border-[var(--line)] py-[22px] font-mono text-[10.5px] tracking-[0.18em] text-[var(--stone)] uppercase">
        <span>{t.hero.kicker}</span>
      </div>

      <div className="col-span-12 md:col-span-9 py-16 md:py-[88px]">
        <h1 className="text-[42px] leading-[1] font-extralight tracking-[-0.025em] sm:text-[64px] md:text-[7.4vw] lg:text-[112px]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              custom={0.12}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              {t.hero.line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              custom={0.24}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              {t.hero.line2Pre}
              <em className="text-[var(--red)] font-normal not-italic">
                {t.hero.line2Em}
              </em>
            </motion.span>
          </span>
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 0.8, 0.24, 1] }}
        className="col-span-12 md:col-span-3 flex flex-col gap-7 border-t border-[var(--line)] py-8 md:border-t-0 md:border-l md:py-[88px] md:pl-10"
      >
        <p className="text-[14px] leading-[1.8] font-light text-[var(--stone-dim)]">
          {t.hero.sub}
        </p>
        <div className="flex flex-col gap-4">
          <GhostLink href="#manifesto">{t.hero.cta2}</GhostLink>
        </div>
      </motion.div>
    </header>
  );
}
