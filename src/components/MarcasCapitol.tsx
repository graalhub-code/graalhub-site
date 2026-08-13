"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";
import { CAPITOL_DICT } from "@/lib/capitol-i18n";

type Logo = { src: string; alt: string; scale?: number };

const ROW_1: Logo[] = [
  { src: "/marcas/claro.webp", alt: "Claro", scale: 0.85 },
  { src: "/marcas/pepsi.webp", alt: "Pepsi", scale: 1.2 },
  { src: "/marcas/brahma.webp", alt: "Brahma" },
  { src: "/marcas/corona-extra.webp", alt: "Corona Extra", scale: 1.2 },
  { src: "/marcas/gatorade.webp", alt: "Gatorade", scale: 1.2 },
  { src: "/marcas/spaten.webp", alt: "Spaten", scale: 1.2 },
  { src: "/marcas/ballantines.webp", alt: "Ballantine's" },
  { src: "/marcas/track-field.webp", alt: "Track&Field" },
  { src: "/marcas/99-taxis.webp", alt: "99 Táxis", scale: 1.2 },
  { src: "/marcas/pantene.webp", alt: "Pantene Pro-V", scale: 1.25 },
  { src: "/marcas/bauducco.webp", alt: "Bauducco" },
  { src: "/marcas/lor.webp", alt: "L'Or" },
  { src: "/marcas/becel.webp", alt: "Becel" },
  { src: "/marcas/nestle.webp", alt: "Nestlé" },
  { src: "/marcas/kibon.webp", alt: "Kibon" },
  { src: "/marcas/multishow.webp", alt: "Multishow" },
  { src: "/marcas/praya.webp", alt: "Praya", scale: 1.2 },
  { src: "/marcas/governo-bahia.webp", alt: "Governo do Estado da Bahia" },
  { src: "/marcas/salvador.webp", alt: "Prefeitura de Salvador" },
];

const ROW_2: Logo[] = [
  { src: "/marcas/abase.webp", alt: "ABASE" },
  { src: "/marcas/hiperideal.webp", alt: "Hiperideal" },
  { src: "/marcas/boi-dourado.webp", alt: "Boi Dourado" },
  { src: "/marcas/binder.webp", alt: "binder" },
  { src: "/marcas/adumar.webp", alt: "Adumar" },
  { src: "/marcas/blue-bay-realty.webp", alt: "Blue Bay Realty S.A." },
  { src: "/marcas/colegio-integral.webp", alt: "Colégio Integral" },
  { src: "/marcas/debrito.webp", alt: "De Brito Brasil", scale: 1.2 },
  { src: "/marcas/ssa-mapping.webp", alt: "SSA Mapping", scale: 1.2 },
  { src: "/marcas/afropunk.webp", alt: "Afropunk" },
  { src: "/marcas/or.webp", alt: "OR" },
  { src: "/marcas/fenaba.webp", alt: "Fenaba" },
  { src: "/marcas/artesanato-bahia.webp", alt: "Artesanato da Bahia" },
  { src: "/marcas/fabrica-cultural.webp", alt: "Fábrica Cultural" },
  { src: "/marcas/iessi.webp", alt: "IESSI Music Entertainment" },
  { src: "/marcas/coruja.webp", alt: "Coruja" },
  { src: "/marcas/axe-mix.webp", alt: "Axé Mix" },
  { src: "/marcas/rec-beat.webp", alt: "Rec Beat", scale: 1.2 },
  { src: "/marcas/idw.webp", alt: "IDW" },
];

const ALL_LOGOS: Logo[] = [...ROW_1, ...ROW_2];

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Many client logos are solid black/dark marks meant for a light page —
// dropped straight onto the Capitol dark background, several go flat-out
// invisible (checked: e.g. Afropunk is a pure #000 mark). Instead of
// swapping every logo file, each tile gets a small off-white "chip" behind
// it — guarantees contrast for every logo regardless of its own color, and
// doubles as a Capitol-style card motif (echoes the glass panels elsewhere).
function LogoTile({ src, alt, scale = 1 }: Logo) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className="relative mx-2.5 flex h-[calc(3.1rem*var(--s))] min-w-[74px] max-w-[calc(140px*var(--s))] shrink-0 items-center justify-center rounded-[4px] bg-[#f3ece2] px-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      style={{ "--s": scale } as CSSProperties}
    >
      {!loaded && (
        <div
          className="skeleton absolute inset-2 rounded-[3px]"
          aria-hidden="true"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="h-[55%] w-auto max-w-full object-contain"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function Row({ logos, reverse }: { logos: Logo[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div
        className={
          reverse
            ? "flex w-max items-center motion-safe:animate-[marquee-rev_58s_linear_infinite]"
            : "flex w-max items-center motion-safe:animate-[marquee_58s_linear_infinite]"
        }
      >
        {[...logos, ...logos].map((logo, i) => (
          <LogoTile key={`${logo.alt}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

export default function MarcasCapitol() {
  const { locale } = useLocale();
  const t = CAPITOL_DICT[locale].marcas;

  const half = Math.ceil(ALL_LOGOS.length / 2);
  const [rows, setRows] = useState(() => ({
    row1: ALL_LOGOS.slice(0, half),
    row2: ALL_LOGOS.slice(half),
  }));

  useEffect(() => {
    const pool = shuffled(ALL_LOGOS);
    setRows({ row1: pool.slice(0, half), row2: pool.slice(half) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="marcas"
      className="t-dark bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div className="grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.h2Pre}
              <span className="text-[var(--red)] font-normal">
                {t.h2Red}
              </span>
              {t.h2Post}
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="-mx-[var(--gap)] border-t border-[var(--line)]">
        <Reveal className="flex flex-col gap-6 py-10 sm:gap-8">
          <Row logos={rows.row1} />
          <Row logos={rows.row2} reverse />
        </Reveal>
      </div>
    </section>
  );
}
