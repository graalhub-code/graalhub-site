"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";

// Individual logo files instead of one flattened raster strip — each client
// is its own small, tightly-cropped image, so it stays sharp at whatever
// size the marquee displays it instead of inheriting the blur of a single
// low-res canvas stretched across dozens of logos. New clients just get
// pushed onto one of the two arrays below.
type Logo = { src: string; alt: string };

const ROW_1: Logo[] = [
  { src: "/marcas/claro.webp", alt: "Claro" },
  { src: "/marcas/pepsi.webp", alt: "Pepsi" },
  { src: "/marcas/brahma.webp", alt: "Brahma" },
  { src: "/marcas/corona-extra.webp", alt: "Corona Extra" },
  { src: "/marcas/gatorade.webp", alt: "Gatorade" },
  { src: "/marcas/spaten.webp", alt: "Spaten" },
  { src: "/marcas/ballantines.webp", alt: "Ballantine's" },
  { src: "/marcas/track-field.webp", alt: "Track&Field" },
  { src: "/marcas/99-taxis.webp", alt: "99 Táxis" },
  { src: "/marcas/pantene.webp", alt: "Pantene Pro-V" },
  { src: "/marcas/bauducco.webp", alt: "Bauducco" },
  { src: "/marcas/lor.webp", alt: "L'Or" },
  { src: "/marcas/becel.webp", alt: "Becel" },
  { src: "/marcas/nestle.webp", alt: "Nestlé" },
  { src: "/marcas/kibon.webp", alt: "Kibon" },
  { src: "/marcas/multishow.webp", alt: "Multishow" },
  { src: "/marcas/praya.webp", alt: "Praya" },
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
  { src: "/marcas/debrito.webp", alt: "De Brito Brasil" },
  { src: "/marcas/ssa-mapping.webp", alt: "SSA Mapping" },
  { src: "/marcas/afropunk.webp", alt: "Afropunk" },
  { src: "/marcas/or.webp", alt: "OR" },
  { src: "/marcas/fenaba.webp", alt: "Fenaba" },
  { src: "/marcas/artesanato-bahia.webp", alt: "Artesanato da Bahia" },
  { src: "/marcas/fabrica-cultural.webp", alt: "Fábrica Cultural" },
  { src: "/marcas/iessi.webp", alt: "IESSI Music Entertainment" },
  { src: "/marcas/coruja.webp", alt: "Coruja" },
  { src: "/marcas/axe-mix.webp", alt: "Axé Mix" },
  { src: "/marcas/rec-beat.webp", alt: "Rec Beat" },
];

function LogoTile({ src, alt }: Logo) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // a data-URI/cached image can finish decoding before React attaches the
  // onLoad handler, so check on mount too (same fix used elsewhere on site).
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  // Height-only sizing (not a fixed w+h box) — every logo now shares the
  // same tight crop margin around its mark (see the retrim step in the
  // extraction pipeline), so pinning every logo to the same HEIGHT and
  // letting width follow its natural aspect is what actually reads as
  // "same size" across a wall this varied: a square icon and a wide
  // wordmark both look correctly, consistently sized because the eye
  // reads height first. A max-width safety cap keeps the handful of very
  // wide wordmarks (Track&Field, Hiperideal, Boi Dourado) from swallowing
  // the row — those few end up very slightly shorter than the rest, which
  // reads far better than letting them dominate.
  return (
    <div className="relative mx-4 flex h-11 min-w-[56px] max-w-[130px] shrink-0 items-center justify-center sm:h-14 sm:min-w-[72px] sm:max-w-[190px]">
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
        className="h-full w-auto max-w-full object-contain"
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
            ? "flex w-max motion-safe:animate-[marquee-rev_58s_linear_infinite]"
            : "flex w-max motion-safe:animate-[marquee_58s_linear_infinite]"
        }
      >
        {/* content duplicated exactly once so translateX(-50%) loops seamlessly */}
        {[...logos, ...logos].map((logo, i) => (
          <LogoTile key={`${logo.alt}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

export default function Marcas() {
  const { t } = useLocale();

  return (
    <section
      id="marcas"
      className="t-light bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div className="grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.marcas.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <h2 className="max-w-[640px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.marcas.h2Pre}
              <span className="text-[var(--red)] font-normal">
                {t.marcas.h2Red}
              </span>
              {t.marcas.h2Post}
            </h2>
          </Reveal>
        </div>
      </div>
      {/* logos scroll straight over the section's own light background now —
          no dark band behind them — separated by a hairline so the two
          rows still read as a distinct "logo wall" module. -mx-[var(--gap)]
          cancels out the section's own side padding just for this block, so
          the marquee runs edge-to-edge to the true viewport edge instead of
          stopping short at the content gutter like the heading above it. */}
      <div className="-mx-[var(--gap)] border-t border-[var(--line)]">
        <Reveal className="flex flex-col gap-2 py-10">
          <Row logos={ROW_1} />
          <Row logos={ROW_2} reverse />
        </Reveal>
      </div>
    </section>
  );
}
