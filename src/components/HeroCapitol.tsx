"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { CAPITOL_DICT } from "@/lib/capitol-i18n";

const EASE = [0.16, 0.8, 0.24, 1] as const;

// small circular "trusted by" row — reuses real, already-licensed brand
// assets (the same G.hub/Reditus/Funway marks used in Núcleo, plus a count
// badge reflecting the real number of logos in the Marcas wall) instead of
// the template's generic stock avatar photos, which would have read as
// fake/anonymous people on a real agency's site.
const AVATARS = [
  { src: "/ghub.svg", alt: "G.hub" },
  { src: "/reditus.webp", alt: "Reditus" },
  { src: "/funway.webp", alt: "Funway" },
];
const MORE_BRANDS_COUNT = 34; // 37 logos on the Marcas wall, minus these 3

/**
 * Direção "Capitol" do Hero — réplica fiel da composição do template
 * comprado (Daily Hero 5 - Arkkhe): fundo fotográfico com o tom oliva real
 * da cena original (amostrado do arquivo Figma, não é mais um preto liso),
 * tipografia serifada de destaque, imagem decorativa encaixada no meio do
 * título, botão pill sólido, fileira de avatares/"marcas" flutuante,
 * bloco de citação lateral e dois cards flutuantes sobre a estátua —
 * mantendo a paleta GRAAL (vermelho como acento, não a cor dominante).
 *
 * O nav decorativo do template (lupa/usuário/grid, sem links reais) foi
 * deixado de fora de propósito: o site já tem um Nav funcional de verdade
 * (idiomas, âncoras) renderizado acima deste componente — duplicar um nav
 * decorativo por cima criaria dois menus concorrendo no mesmo espaço.
 *
 * Preview em /capitol. Não é a Hero de produção (ver src/components/Hero.tsx).
 */
export default function HeroCapitol() {
  const { t: siteT, locale } = useLocale();
  const t = siteT.hero;
  const cap = CAPITOL_DICT[locale].heroSide;
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  function pointerDown(e: React.PointerEvent) {
    dragging.current = true;
    startX.current = e.clientX;
    startRotation.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function pointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    setRotation(startRotation.current + delta * 0.5);
  }
  function pointerUp() {
    dragging.current = false;
  }

  return (
    <header
      id="top"
      className="t-dark relative grid min-h-[92vh] grid-cols-12 items-center overflow-hidden border-b border-[var(--line)] px-[var(--gap)] text-[var(--ink)]"
      style={{
        // tons amostrados diretamente do frame "home" no Figma (canto/
        // borda vs. área iluminada perto do halo) — a mesma atmosfera
        // fotográfica oliva do template, só que sem nenhum texto do
        // template "assado" no pixel (esse era o problema de reusar o
        // print inteiro como fundo).
        background:
          "radial-gradient(120% 100% at 68% 38%, #98a68f 0%, #5c6b57 32%, #333e2f 62%, #1c221a 100%)",
      }}
    >
      {/* watermark gigante e discreto atrás da fileira de avatares — mesmo
          recurso do template (o "CAPITOL" fantasma ao fundo), aqui com a
          própria marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.14em] left-[var(--gap)] font-display text-[22vw] leading-none font-normal text-[var(--ink)]/[0.05] select-none"
      >
        GRAAL
      </div>

      <div
        className="pointer-events-none absolute -top-[180px] -right-[100px] h-[640px] w-[640px] rounded-full border border-[var(--red)]/55"
        style={{ boxShadow: "0 0 90px 8px rgba(233,105,79,0.16)" }}
      />

      {/* bloco de citação lateral — equivalente ao "MOVE BEYOND LIMITS" do
          template, com copy real do hub em vez de texto placeholder */}
      <div className="absolute top-[70px] right-[var(--gap)] z-20 hidden max-w-[190px] flex-col gap-2 lg:flex">
        {/* z-20 (above the z-10 statue column): the template lets this quote
            corner sit slightly over the photo's edge rather than fighting
            for empty space that doesn't exist at this viewport width. Kept
            deliberately compact (short copy, tight leading) so its footprint
            clears the floating credential card below it across the whole
            lg→2xl width range instead of only at one tested viewport. */}
        <h2 className="font-display text-[22px] leading-[1.1] font-normal [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
          {cap.h2Line1}
          <br />
          <em className="not-italic text-[var(--red)]">{cap.h2Em}</em>
        </h2>
        <p className="text-[12.5px] leading-[1.6] font-light text-[var(--stone-dim)] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
          {cap.body}
        </p>
        <a
          href="#manifesto"
          className="group flex w-fit items-center gap-2 text-[12px] tracking-[0.04em] text-[var(--ink)] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {cap.cta}
          <span className="h-px w-6 bg-[var(--ink)] transition-all duration-300 group-hover:w-9" />
        </a>
      </div>

      <div className="relative z-10 col-span-12 py-16 md:col-span-6 md:py-[88px]">
        <div className="mb-6 font-mono text-[10.5px] tracking-[0.18em] text-[var(--stone)] uppercase">
          {t.kicker}
        </div>

        <h1 className="font-display text-[40px] leading-[1.08] font-normal sm:text-[52px] md:text-[44px] lg:text-[68px]">
          {t.line1}
          <br />
          <span className="inline-flex flex-wrap items-center gap-3 align-middle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/capitol/inline-tech.png"
              alt=""
              className="hidden h-[0.62em] w-auto rounded-[4px] object-cover align-middle sm:inline-block"
            />
            {t.line2Pre}
            <em className="not-italic text-[var(--red)]">{t.line2Em}</em>
          </span>
        </h1>

        <p className="mt-7 max-w-[380px] text-[14.5px] leading-[1.8] font-light text-[var(--stone-dim)]">
          {t.sub}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-8">
          <motion.a
            href="#manifesto"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="inline-flex w-fit items-center rounded-full bg-[var(--red)] px-7 py-3.5 text-[13px] font-medium tracking-[0.03em] text-[#171414]"
          >
            {t.cta2}
          </motion.a>

          {/* fileira de avatares/marcas — mesmo padrão visual do template
              (círculos sobrepostos + badge de contagem), preenchida com
              marcas reais do núcleo GRAAL em vez de fotos genéricas */}
          <div className="flex items-center">
            {AVATARS.map((a, i) => (
              <span
                key={a.alt}
                className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--bg)] bg-[#f3ece2] first:ml-0"
                style={{ zIndex: AVATARS.length - i }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.src}
                  alt={a.alt}
                  className="h-[55%] w-[55%] object-contain"
                />
              </span>
            ))}
            <span
              className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--bg)] bg-[var(--red)] font-mono text-[10.5px] font-medium text-[#171414]"
              style={{ zIndex: 0 }}
            >
              +{MORE_BRANDS_COUNT}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 col-span-12 flex items-center justify-center py-10 md:col-span-6 md:py-0">
        <div
          className="relative"
          style={{ width: 320, height: 460, perspective: 1400 }}
        >
          <div
            className="pointer-events-none absolute -inset-10 rounded-full blur-[4px]"
            style={{
              background:
                "radial-gradient(circle, rgba(233,105,79,0.30), transparent 68%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-3 left-1/2 h-8 w-[240px] -translate-x-1/2 rounded-full blur-[6px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(233,105,79,0.35), transparent 72%)",
            }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", rotateY: rotation }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/capitol/estatua.jpg"
              alt=""
              className="h-[420px] w-[280px] rounded-[6px] object-cover"
              style={{
                filter:
                  "drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 34px rgba(233,105,79,0.4))",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          <div
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
            className="absolute bottom-[-6px] left-1/2 flex h-[76px] w-[76px] -translate-x-1/2 cursor-grab items-center justify-center rounded-full border border-[var(--ink)]/40 bg-[var(--bg)]/40 backdrop-blur-md active:cursor-grabbing"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--red)]" />
          </div>
          <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.12em] text-[var(--stone)] uppercase whitespace-nowrap">
            {cap.drag}
          </div>

          {/* dois cards flutuantes — mesma posição/estilo dos cards do
              template ("28%" e "IN ONE SHOT"), mas com conteúdo real em vez
              de estatística inventada: uma credencial que já é dita em
              outro ponto do site, e um CTA curto */}
          <div className="absolute -right-16 top-44 hidden w-[168px] flex-col gap-1 rounded-[10px] border border-[var(--ink)]/15 bg-[var(--bg)]/85 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md sm:flex">
            <span className="font-mono text-[9px] tracking-[0.14em] text-[var(--red)] uppercase">
              {cap.badge1Label}
            </span>
            <span className="text-[13px] leading-[1.4] font-light text-[var(--ink)]">
              {cap.badge1Body}
            </span>
          </div>
          <a
            href="#contato"
            className="absolute -bottom-6 -left-14 hidden w-[132px] rounded-[10px] border border-[var(--ink)]/15 bg-[var(--bg)]/85 px-4 py-3 text-center text-[13px] font-medium text-[var(--ink)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--red)]/50 sm:block"
          >
            {cap.badge2}
          </a>
        </div>
      </div>
    </header>
  );
}
