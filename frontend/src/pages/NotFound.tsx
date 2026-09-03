import { ArrowLeft, Unplug } from "lucide-react";
import { Link } from "react-router-dom";
import { MaskedLines } from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 pt-16 text-center" data-testid="not-found-page">
      <Unplug className="h-8 w-8 text-signal" aria-hidden="true" />
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-faint">
        Error — Signal lost
      </p>
      <h1 className="mt-6 font-display text-7xl font-extrabold tracking-tighter sm:text-9xl">
        <MaskedLines lines={["404"]} />
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-sub">
        This route doesn&apos;t exist. The page you were looking for may have
        moved, or the link was never connected.
      </p>
      <Link
        to="/"
        data-testid="not-found-home-link"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-canvas transition-colors hover:bg-signal-hover"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
        Back to the signal
      </Link>
    </div>
  );
}
