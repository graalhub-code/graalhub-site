"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GhostLink } from "./Button";
import { useLocale } from "@/lib/locale-context";

const EASE = [0.16, 0.8, 0.24, 1] as const;

/**
 * Direção "Capitol" do Hero — estética dark/luxo inspirada no template
 * comprado (Daily Hero 5 - Arkkhe), com o acento vermelho da própria marca
 * GRAAL (t-dark já usa --red: #e9694f) e um efeito de giro real (arraste
 * horizontal = rotateY em 3D), recriando em código o que no Figma é só
 * Smart Animate entre frames estáticos — não um asset 3D portável.
 *
 * Preview em /capitol. Não é a Hero de produção (ver src/components/Hero.tsx).
 */
export default function HeroCapitol() {
  const { t } = useLocale();
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
      className="t-dark relative grid min-h-[92vh] grid-cols-12 items-center overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      {/* anel decorativo, mesma linguagem do restante do site */}
      <div
        className="pointer-events-none absolute -top-[180px] -right-[100px] h-[640px] w-[640px] rounded-full border border-[var(--red)]/55"
        style={{ boxShadow: "0 0 90px 8px rgba(233,105,79,0.16)" }}
      />

      <div className="col-span-12 md:col-span-6 py-16 md:py-[88px]">
        <div className="mb-6 font-mono text-[10.5px] tracking-[0.18em] text-[var(--stone)] uppercase">
          {t.hero.kicker}
        </div>
        <h1 className="text-[42px] leading-[1] font-extralight tracking-[-0.025em] sm:text-[56px] md:text-[64px] lg:text-[80px]">
          {t.hero.line1}
          <br />
          {t.hero.line2Pre}
          <em className="text-[var(--red)] font-normal not-italic">
            {t.hero.line2Em}
          </em>
        </h1>
        <p className="mt-7 max-w-[380px] text-[14.5px] leading-[1.8] font-light text-[var(--stone-dim)]">
          {t.hero.sub}
        </p>
        <div className="mt-8">
          <GhostLink href="#manifesto">{t.hero.cta2}</GhostLink>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 flex items-center justify-center py-10 md:py-0">
        <div
          className="relative"
          style={{ width: 320, height: 460, perspective: 1400 }}
        >
          {/* halo */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-full blur-[4px]"
            style={{
              background:
                "radial-gradient(circle, rgba(233,105,79,0.30), transparent 68%)",
            }}
          />
          {/* pedestal glow */}
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

          {/* alça de arraste */}
          <div
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
            className="absolute bottom-[-6px] left-1/2 flex h-[76px] w-[76px] -translate-x-1/2 cursor-grab items-center justify-center rounded-full border border-[var(--ink)]/40 bg-[var(--bg)]/40 backdrop-blur-md active:cursor-grabbing"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--red)]" />
          </div>
          <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.12em] text-[var(--stone)] uppercase whitespace-nowrap">
            arraste para girar
          </div>
        </div>
      </div>
    </header>
  );
}
