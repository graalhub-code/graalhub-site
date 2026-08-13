"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import SkeletonImage from "./SkeletonImage";
import { useLocale } from "@/lib/locale-context";
import { CAPITOL_DICT } from "@/lib/capitol-i18n";

// same asset map as the production Núcleo — only the title/body copy is
// swapped for the Capitol dict, the logos/links themselves don't change
// with the visual direction.
const ORBIT_ASSETS: {
  src: string;
  alt: string;
  w: number;
  h: number;
  href?: string;
}[] = [
  { src: "/ghub.svg", alt: "G.hub", w: 112, h: 56 },
  {
    src: "/reditus.webp",
    alt: "Reditus",
    w: 130,
    h: 29,
    href: "https://reditusmidia.com.br/",
  },
  {
    src: "/funway.webp",
    alt: "Funway",
    w: 84,
    h: 54,
    href: "https://funway.com.br/",
  },
];

const ORBIT_RINGS = [
  { r: 0, direction: 1, duration: 62, dots: 2 },
  { r: 1, direction: -1, duration: 50, dots: 2 },
  { r: 2, direction: 1, duration: 40, dots: 1 },
];

export default function NucleoCapitol() {
  const reduceMotion = useReducedMotion();
  const { locale } = useLocale();
  const t = CAPITOL_DICT[locale].nucleo;
  const ORBIT = ORBIT_ASSETS.map((asset, i) => ({
    ...asset,
    ...t.items[i],
  }));

  return (
    <section
      id="nucleo"
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

          <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-[280px_1fr]">
            <Reveal className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center md:h-[260px] md:w-[260px]">
              {ORBIT_RINGS.map(({ r, direction, duration, dots }) => (
                <motion.span
                  key={r}
                  className="absolute rounded-full border border-[var(--line)]"
                  style={{ inset: r * 34 }}
                  animate={
                    reduceMotion ? undefined : { rotate: 360 * direction }
                  }
                  transition={{ duration, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-[var(--red)]" />
                  {dots === 2 && (
                    <span className="absolute -bottom-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-[var(--red)]" />
                  )}
                </motion.span>
              ))}
              <span className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[var(--bg)]">
                <SkeletonImage
                  src="/simbolo.svg"
                  alt="Símbolo GRAAL.hub"
                  width={44}
                  height={44}
                  wrapperClassName="opacity-90"
                />
              </span>
            </Reveal>

            <div className="flex flex-col gap-8">
              {ORBIT.map((item, i) => {
                const row = (
                  <>
                    <span className="flex h-9 w-[104px] shrink-0 items-center">
                      <SkeletonImage
                        src={item.src}
                        alt={item.alt}
                        width={item.w}
                        height={item.h}
                        wrapperClassName="max-h-full max-w-full"
                        className="h-auto max-h-9 w-auto max-w-full object-contain"
                      />
                    </span>
                    <p className="text-[14.5px] leading-[1.6]">
                      <b className="block font-medium">{item.title}</b>
                      <span className="text-[var(--stone-dim)]">
                        {item.body}
                      </span>
                    </p>
                  </>
                );
                return (
                  <Reveal key={item.title} delay={0.08 * i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-m-2 flex items-center gap-6 rounded-[3px] p-2 transition-colors duration-300 hover:bg-[var(--line)]/40"
                      >
                        {row}
                      </a>
                    ) : (
                      <div className="flex items-center gap-6">{row}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
