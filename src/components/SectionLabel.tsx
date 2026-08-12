import Reveal from "./Reveal";

export default function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal
      className="col-span-12 py-16 font-mono text-[11px] tracking-[0.24em] text-[var(--red)] uppercase md:col-span-2"
      as="span"
    >
      {children}
    </Reveal>
  );
}
