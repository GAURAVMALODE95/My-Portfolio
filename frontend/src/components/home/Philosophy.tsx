import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { PRINCIPLES } from "@/data/site";

export function Philosophy() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-hairline bg-surface/30 py-24 sm:py-32"
      aria-label="About and philosophy"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="04" title="About" />
        <h2 className="mt-10 max-w-4xl font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
          <MaskedLines
            lines={[
              "I enjoy the hard middle of product engineering:",
              "turning complicated systems into calm, useful",
              "experiences — then making sure they are secure",
              "enough to deserve user trust.",
            ]}
          />
        </h2>

        <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <FadeUp key={p.index} delay={i * 0.12} className="bg-canvas">
              <div className="h-full p-7 sm:p-9" data-testid={`principle-${p.index}`}>
                <p className="font-mono text-xs tracking-[0.2em] text-signal">
                  {p.index}
                </p>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sub">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
