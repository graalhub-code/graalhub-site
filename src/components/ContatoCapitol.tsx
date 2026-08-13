"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useLocale } from "@/lib/locale-context";
import { CAPITOL_DICT } from "@/lib/capitol-i18n";

type Status = "idle" | "loading" | "success";

const FIELD_CLASS =
  "w-full border-b border-[var(--line)] bg-transparent py-3 text-[15px] font-light text-[var(--ink)] outline-none placeholder:text-[var(--stone)] transition-colors duration-300 focus:border-[var(--red)]";

export default function ContatoCapitol() {
  const [status, setStatus] = useState<Status>("idle");
  const { locale } = useLocale();
  const t = CAPITOL_DICT[locale].contato;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
  }

  return (
    <section
      id="contato"
      className="t-dark relative overflow-hidden bg-[var(--bg)] px-[var(--gap)] text-[var(--ink)]"
    >
      <div
        className="pointer-events-none absolute -right-[180px] -bottom-[220px] h-[520px] w-[520px] rounded-full border border-[var(--red)]/20"
        style={{ boxShadow: "0 0 120px 20px rgba(233,105,79,0.07)" }}
      />

      <div className="relative grid grid-cols-12 border-b border-[var(--line)]">
        <SectionLabel>{t.label}</SectionLabel>
        <div className="col-span-12 py-16 md:col-span-8 md:col-start-3">
          <Reveal>
            <h2 className="max-w-[560px] text-[26px] leading-[1.2] font-extralight tracking-[-0.015em] sm:text-[36px] md:text-[42px]">
              {t.h2Pre}
              <span className="text-[var(--red)] font-normal">
                {t.h2Red}
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-14 md:grid-cols-2">
            <Reveal className="flex flex-col gap-8">
              <p className="max-w-[380px] text-[15px] leading-[1.8] font-light text-[var(--stone-dim)]">
                {t.body}
              </p>
              <div className="flex flex-col gap-3 text-[14px]">
                <a
                  href="mailto:contato@graalhub.com"
                  className="w-fit border-b border-transparent transition-colors duration-300 hover:border-[var(--ink)]"
                >
                  contato@graalhub.com
                </a>
                <a
                  href="https://instagram.com/graal.hub"
                  target="_blank"
                  rel="noopener"
                  className="w-fit border-b border-transparent transition-colors duration-300 hover:border-[var(--ink)]"
                >
                  @graal.hub
                </a>
                <a
                  href="https://graalhub.com"
                  className="w-fit border-b border-transparent transition-colors duration-300 hover:border-[var(--ink)]"
                >
                  graalhub.com
                </a>
              </div>
            </Reveal>

            {/* form now sits inside a glass panel, matching the card
                language used in the other redesigned sections instead of
                floating directly on the section background */}
            <Reveal delay={0.1}>
              <div className="rounded-[3px] border border-[var(--line)] bg-white/[0.02] p-8 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 0.8, 0.24, 1],
                      }}
                      className="flex h-full flex-col justify-center gap-3 py-6"
                    >
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--red)] uppercase">
                        {t.successLabel}
                      </span>
                      <p className="text-[18px] font-light">
                        {t.successBody}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      <label className="flex flex-col gap-2 text-[12px] tracking-[0.06em] text-[var(--stone)] uppercase">
                        {t.formNome}
                        <input
                          required
                          name="nome"
                          placeholder={t.formNomePh}
                          className={FIELD_CLASS}
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-[12px] tracking-[0.06em] text-[var(--stone)] uppercase">
                        {t.formEmpresa}
                        <input
                          name="empresa"
                          placeholder={t.formEmpresaPh}
                          className={FIELD_CLASS}
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-[12px] tracking-[0.06em] text-[var(--stone)] uppercase">
                        {t.formEmail}
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder={t.formEmailPh}
                          className={FIELD_CLASS}
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-[12px] tracking-[0.06em] text-[var(--stone)] uppercase">
                        {t.formMensagem}
                        <textarea
                          required
                          rows={3}
                          name="mensagem"
                          placeholder={t.formMensagemPh}
                          className={`${FIELD_CLASS} resize-none`}
                        />
                      </label>

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={
                          status === "idle" ? { y: -2 } : undefined
                        }
                        whileTap={
                          status === "idle" ? { scale: 0.97 } : undefined
                        }
                        transition={{
                          duration: 0.25,
                          ease: [0.16, 0.8, 0.24, 1],
                        }}
                        className="mt-2 inline-flex w-fit items-center gap-2 rounded-[2px] bg-[var(--red)] px-[26px] py-[15px] text-[13px] font-medium tracking-[0.04em] text-[#171414] disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <>
                            <span
                              className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-[#171414]/30 border-t-[#171414]"
                              aria-hidden="true"
                            />
                            {t.loading}
                          </>
                        ) : (
                          t.submit
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
