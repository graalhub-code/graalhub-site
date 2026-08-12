"use client";

import { useLocale } from "@/lib/locale-context";
import { LOCALES } from "@/lib/i18n";

export default function Footer() {
  const { t, locale, setLocale } = useLocale();

  const NAV = [
    { href: "#manifesto", label: t.nav.manifesto },
    { href: "#pilares", label: t.nav.pilares },
    { href: "#nucleo", label: t.nav.nucleo },
    { href: "#marcas", label: t.nav.marcas },
  ];

  return (
    <footer className="t-light bg-[var(--bg)] px-[var(--gap)] pt-14 pb-24 text-[var(--ink)] sm:pb-9">
      {/* footer content sits in the same content column (col-start-3) every
          other section uses, instead of running full-bleed under the label
          gutter — keeps the left edge lined up when you scroll straight
          from Contato into the footer */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <div className="grid grid-cols-1 gap-10 border-b border-[var(--line)] pb-12 sm:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr]">
            <div className="flex flex-col gap-4">
              <p className="max-w-[280px] text-[13.5px] leading-[1.7] text-[var(--stone-dim)]">
                {t.footer.tag}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[10.5px] tracking-[0.16em] text-[var(--stone)] uppercase">
                {t.footer.navLabel}
              </h4>
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="w-fit text-[13.5px] text-[var(--stone-dim)] transition-colors duration-300 hover:text-[var(--ink)]"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[10.5px] tracking-[0.16em] text-[var(--stone)] uppercase">
                {t.footer.contatoLabel}
              </h4>
              <a
                href="mailto:contato@graalhub.com"
                className="w-fit text-[13.5px] text-[var(--stone-dim)] transition-colors duration-300 hover:text-[var(--ink)]"
              >
                contato@graalhub.com
              </a>
              <a
                href="https://instagram.com/graal.hub"
                target="_blank"
                rel="noopener"
                className="w-fit text-[13.5px] text-[var(--stone-dim)] transition-colors duration-300 hover:text-[var(--ink)]"
              >
                @graal.hub
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[10.5px] tracking-[0.16em] text-[var(--stone)] uppercase">
                {t.footer.idiomaLabel}
              </h4>
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLocale(l.code)}
                  aria-current={locale === l.code}
                  className={`w-fit text-[13.5px] transition-colors duration-300 hover:text-[var(--ink)] ${
                    locale === l.code
                      ? "text-[var(--ink)]"
                      : "text-[var(--stone-dim)]"
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-7 font-mono text-[10px] tracking-[0.12em] text-[var(--stone)] uppercase sm:flex-row sm:justify-between">
            <span>{t.footer.copyright}</span>
            <span>{t.footer.geo}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
