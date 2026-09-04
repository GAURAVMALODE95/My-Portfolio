import { CountUp, FadeUp } from "@/components/motion/Reveal";
import { STATS } from "@/data/site";

export function Stats() {
  return (
    <section className="border-y border-hairline" aria-label="Proof points" data-testid="proof-stats">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <FadeUp
            key={s.label}
            delay={i * 0.08}
            className={`border-hairline px-5 py-8 sm:px-8 sm:py-10 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <p className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl" data-testid={`stat-value-${i}`}>
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink">{s.label}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{s.source}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
