"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";

export default function TresLeituras() {
  const { t } = useLocale();

  return (
    <section
      id="leituras"
      className="t-dark bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div className="grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.leituras.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--stone)] uppercase">
              {t.leituras.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.leituras.h2Pre}
              <span className="text-[var(--red)] font-normal">
                {t.leituras.h2Red}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[600px] text-[16px] leading-[1.85] font-light text-[var(--stone-dim)]">
              {t.leituras.lead}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
            {t.leituras.items.map((l, i) => (
              <Reveal
                key={l.tag}
                delay={0.1 * i}
                className={`sm:px-9 ${
                  i === 0 ? "sm:pl-0" : "sm:border-l sm:border-[var(--line)]"
                }`}
              >
                <div className="font-mono text-[10.5px] tracking-[0.2em] text-[var(--red)] uppercase">
                  {l.tag}
                </div>
                <h3 className="mt-[18px] text-[20px] font-light tracking-[-0.01em]">
                  {l.title}
                </h3>
                <p className="mt-4 text-[14.5px] leading-[1.75] text-[var(--stone-dim)]">
                  {l.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
