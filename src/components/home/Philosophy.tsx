import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { PRINCIPLES } from "@/data/site";

export function Philosophy() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-hairline bg-surface/40 py-24 sm:py-32"
      aria-label="About and philosophy"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="04" title="About" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint lg:col-span-3 lg:pt-3">
            How I work
          </p>
          <h2 className="font-display text-3xl font-medium leading-[1.3] tracking-[-0.025em] sm:text-4xl lg:col-span-9 lg:text-[3rem]">
            <MaskedLines
              lines={[
                "I enjoy the hard middle of product engineering:",
                <>turning complicated systems into <em className="font-serif italic text-signal">calm, useful</em></>,
                "experiences — then making sure they are secure",
                "enough to deserve user trust.",
              ]}
            />
          </h2>
        </div>

        <div className="mt-20 grid border-t border-hairline md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <FadeUp key={p.index} delay={i * 0.12} className={`border-b border-hairline md:border-b-0 ${i > 0 ? "md:border-l" : ""}`}>
              <div className="flex h-full flex-col justify-between py-8 md:pr-8 md:pl-6 md:first:pl-0" data-testid={`principle-${p.index}`}>
                <p className="font-mono text-[11px] tracking-[0.2em] text-signal">{p.index}</p>
                <div className="mt-14">
                  <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] sm:text-2xl">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-sub">{p.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
