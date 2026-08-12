"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";

// strip1/strip2 ship as plain public/ files (a plain <img> is still used
// instead of next/image so the marquee's manual object-contain sizing
// stays simple).
//
// The source strips themselves are baked with a solid black canvas behind
// each white logo tile — so the section around them is deliberately dark
// (see the wrapping div in Marcas below) instead of leaving that black
// bleed through as a stray stripe against the section's light background.
function Strip({ src, reverse }: { src: string; reverse?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // same hydration-timing fix as SkeletonImage: a data-URI image can finish
  // decoding before React attaches the onLoad handler, so check on mount too.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      {!loaded && (
        <div className="skeleton absolute inset-0 z-10" aria-hidden="true" />
      )}
      <div
        className={
          reverse
            ? "flex w-max motion-safe:animate-[marquee-rev_38s_linear_infinite]"
            : "flex w-max motion-safe:animate-[marquee_38s_linear_infinite]"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt="Marcas atendidas pela GRAAL.hub"
          width={2500}
          height={80}
          className="h-[56px] w-auto object-contain sm:h-[80px]"
          onLoad={() => setLoaded(true)}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={2500}
          height={80}
          className="h-[56px] w-auto object-contain sm:h-[80px]"
        />
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
      {/* t-dark scopes --bg to the same near-black tone baked into the
          strip images, so the marquee reads as an intentional dark band
          instead of a mismatched stripe against the section's cream bg */}
      <div className="t-dark bg-[var(--bg)]">
        <Reveal className="flex flex-col gap-6 py-14">
          <Strip src="/strip1.webp" />
          <Strip src="/strip2.webp" reverse />
        </Reveal>
      </div>
    </section>
  );
}
