"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { LOCALES } from "@/lib/i18n";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, locale, setLocale } = useLocale();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.3,
  });

  // mix-blend-difference reads great over a single flat section color, but
  // it goes illegible over photos/logos and busy content — so past the
  // first sliver of scroll we drop the blend trick for a solid, blurred
  // bar instead of leaving the bar transparent and letting page content
  // show (and clash) straight through the nav text.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
  });

  const LINKS = [
    { href: "#manifesto", label: t.nav.manifesto },
    { href: "#leituras", label: t.nav.leituras },
    { href: "#pilares", label: t.nav.pilares },
    { href: "#nucleo", label: t.nav.nucleo },
    { href: "#marcas", label: t.nav.marcas },
    { href: "#contato", label: t.nav.contato },
  ];

  return (
    <>
      {/* scroll-progress feedback — a quiet, always-on indicator of where you
          are on the page, reinforced by the red brand accent */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-[var(--red)] z-[60]"
      />

      {/* nav self-inverts across light/dark sections via mix-blend-mode while
          at the very top, then switches to a solid blurred bar once scrolled
          so it never sits transparent over the content underneath */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#141110]/90 backdrop-blur-md border-b border-[#F3ECE2]/10"
            : "mix-blend-difference"
        }`}
      >

        <div className="flex items-center justify-between px-[var(--gap)] py-6">
          <a href="#top" className="block" aria-label="GRAAL.hub">
            <Image
              src="/logo.svg"
              alt="GRAAL.hub"
              width={140}
              height={20}
              priority
              className="h-4 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative pb-1 text-[12px] tracking-[0.08em] uppercase text-[#EDE7DC]"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 h-px w-0 bg-[#EDE7DC] transition-[width] duration-300 ease-out group-hover:w-full" />
              </a>
            ))}

            {/* language selector — compact PT/EN/ES toggle, same self-inverting
                text color as the rest of the nav so it never needs its own
                light/dark logic */}
            <div className="flex items-center gap-2 border-l border-[#EDE7DC]/30 pl-9 font-mono text-[11px] tracking-[0.08em] uppercase">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLocale(l.code)}
                  aria-current={locale === l.code}
                  className={`px-0.5 text-[#EDE7DC] transition-opacity duration-300 ${
                    locale === l.code ? "opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>

          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-[#EDE7DC]"
              transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6 bg-[#EDE7DC]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-[#EDE7DC]"
              transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
            />
          </button>
        </div>
      </nav>

      {/* mobile overlay menu — same easing/timing language as the section
          reveals so the whole site feels like one system */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 0.8, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#141110] px-[var(--gap)] md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * i,
                  ease: [0.16, 0.8, 0.24, 1],
                }}
                className="py-3 font-light text-[32px] text-[#F3ECE2]"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08 * LINKS.length,
                ease: [0.16, 0.8, 0.24, 1],
              }}
              className="mt-6 flex items-center gap-5 border-t border-[#F3ECE2]/15 pt-6 font-mono text-[13px] tracking-[0.1em] uppercase"
            >
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLocale(l.code)}
                  aria-current={locale === l.code}
                  className={`text-[#F3ECE2] transition-opacity duration-300 ${
                    locale === l.code ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {l.flag} {l.code}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
