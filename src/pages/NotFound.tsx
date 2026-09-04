import { ArrowLeft } from "lucide-react";
import { MaskedLines } from "@/components/motion/Reveal";
import { Cta } from "@/components/ux/Cta";
import { useSeo } from "@/hooks/useSeo";

export default function NotFound() {
  useSeo("404 — Gaurav Malode", "This page does not exist.", {
    path: "/404",
    noindex: true,
  });
  return (
    <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-24 sm:px-8" data-testid="not-found-page">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
        <span className="text-signal">Error</span> — Route not found
      </p>
      <h1 className="mt-6 font-display text-[28vw] font-black leading-[0.82] tracking-[-0.05em] lg:text-[18rem]">
        <MaskedLines lines={["404"]} />
      </h1>
      <div className="mt-10 grid gap-8 border-t border-hairline pt-8 lg:grid-cols-12">
        <p className="max-w-md text-base leading-relaxed text-sub lg:col-span-7">
          This route doesn&apos;t exist. The page you were looking for may have moved, or the link was never connected.
        </p>
        <div className="lg:col-span-5 lg:flex lg:justify-end">
          <Cta to="/" testId="not-found-home-link" icon={ArrowLeft}>
            Back to home
          </Cta>
        </div>
      </div>
    </div>
  );
}
