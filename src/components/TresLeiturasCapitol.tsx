"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";
import { CAPITOL_DICT } from "@/lib/capitol-i18n";

export default function TresLeiturasCapitol() {
  const { locale } = useLocale();
  const t = CAPITOL_DICT[locale].leituras;

  return (
    <section
      id="leituras"
      className="t-dark bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div className="grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--stone)] uppercase">
              {t.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.h2Pre}
              <span className="text-[var(--red)] font-normal">
                {t.h2Red}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[600px] text-[16px] leading-[1.85] font-light text-[var(--stone-dim)]">
              {t.lead}
            </p>
          </Reveal>

          {/* glass cards instead of plain hairline columns — small "Capitol"
              signature (thin border + faint fill + soft blur) reused across
              the redesigned sections */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {t.items.map((l, i) => (
              <Reveal key={l.tag} delay={0.1 * i}>
                <div className="h-full rounded-[3px] border border-[var(--line)] bg-white/[0.02] px-6 py-7 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--stone)]">
                  <div className="font-mono text-[10.5px] tracking-[0.2em] text-[var(--red)] uppercase">
                    {l.tag}
                  </div>
                  <h3 className="mt-[18px] text-[20px] font-light tracking-[-0.01em]">
                    {l.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-[1.75] text-[var(--stone-dim)]">
                    {l.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
