"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";

export default function Pilares() {
  const { t } = useLocale();

  return (
    <section
      id="pilares"
      className="t-light bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div className="grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.pilares.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.pilares.h2Pre}
              <span className="text-[var(--red)] font-normal">
                {t.pilares.h2Red}
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {t.pilares.cards.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
                  className={`h-full rounded-[3px] border px-7 py-8 transition-colors duration-300 ${
                    p.hot
                      ? "border-[var(--red)]/40 bg-[var(--red)]/[0.05]"
                      : "border-[var(--line)] hover:border-[var(--stone)]"
                  }`}
                >
                  <div className="font-mono text-[10.5px] tracking-[0.18em] text-[var(--red)] uppercase">
                    {p.tag}
                  </div>
                  <h3 className="mt-4 text-[21px] font-light">{p.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--stone-dim)]">
                    {p.body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-14">
            <Reveal>
              <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--stone)] uppercase">
                {t.pilares.offlineLabel}
              </div>
              <ul className="mt-5 flex flex-col gap-4">
                {t.pilares.offline.map((item) => (
                  <li key={item.h} className="text-[14.5px] leading-[1.6]">
                    <b className="font-medium text-[var(--ink)]">{item.h}</b>
                    <span className="block text-[var(--stone-dim)]">
                      {item.p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--red)] uppercase">
                {t.pilares.digitalLabel}
              </div>
              <ul className="mt-5 flex flex-col gap-4">
                {t.pilares.digital.map((item) => (
                  <li key={item.h} className="text-[14.5px] leading-[1.6]">
                    <b className="font-medium text-[var(--ink)]">{item.h}</b>
                    <span className="block text-[var(--stone-dim)]">
                      {item.p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p className="mt-12 font-mono text-[10.5px] tracking-[0.16em] text-[var(--stone)] uppercase">
              {t.pilares.cert}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
