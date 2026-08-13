"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";
import { CAPITOL_DICT } from "@/lib/capitol-i18n";

export default function ManifestoCapitol() {
  const { locale } = useLocale();
  const t = CAPITOL_DICT[locale].manifesto;

  return (
    <section
      id="manifesto"
      className="t-dark relative overflow-hidden bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      {/* soft red halo, echoes the Hero's ring so the motif carries through
          the page instead of being a one-off Hero flourish */}
      <div
        className="pointer-events-none absolute -top-[220px] -left-[160px] h-[520px] w-[520px] rounded-full border border-[var(--red)]/25"
        style={{ boxShadow: "0 0 120px 20px rgba(233,105,79,0.08)" }}
      />

      <div className="relative grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.h2}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-[560px] text-[16px] leading-[1.85] font-light text-[var(--stone-dim)]">
              {t.p1}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.85] font-light text-[var(--stone-dim)]">
              {t.p2Pre}
              <b className="font-medium text-[var(--ink)]">{t.p2B}</b>
            </p>
          </Reveal>

          {/* pull-quote card — the one Capitol-signature "glass" element in
              this section: thin border, faint fill, a red rule on the left
              instead of a full card so it reads as a quote, not a product
              tile */}
          <Reveal delay={0.24} className="mt-12 max-w-[560px]">
            <blockquote className="border-l-2 border-[var(--red)]/50 py-1 pl-6">
              <p className="text-[19px] leading-[1.55] font-light text-[var(--ink)] sm:text-[22px]">
                {t.quote}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
