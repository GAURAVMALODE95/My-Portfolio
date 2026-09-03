import { Asterisk } from "lucide-react";
import { PROOF_POINTS } from "@/data/site";

export function Ticker() {
  return (
    <div
      className="overflow-hidden border-y border-hairline bg-surface/40"
      aria-label="Proof points"
      data-testid="proof-ticker"
    >
      <div className="marquee-track flex w-max py-4">
        {[0, 1].map((half) => (
          <div
            key={half}
            className="flex items-center"
            aria-hidden={half === 1}
          >
            {PROOF_POINTS.map((point, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap pr-6 font-mono text-xs uppercase tracking-[0.25em] text-sub"
              >
                {point}
                <Asterisk className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
