"use client";

import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";

export default function Manifesto() {
  const { t } = useLocale();

  return (
    <section
      id="manifesto"
      className="t-light bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div className="grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.manifesto.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.manifesto.h2}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-[560px] text-[16px] leading-[1.85] font-light text-[var(--stone-dim)]">
              {t.manifesto.p1}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.85] font-light text-[var(--stone-dim)]">
              {t.manifesto.p2Pre}
              <b className="font-medium text-[var(--ink)]">
                {t.manifesto.p2B}
              </b>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
