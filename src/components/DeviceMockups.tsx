import { motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

/** Device PNGs that already include iPhone chrome — do not wrap in IPhoneFrame. */
export function FramedDeviceImg({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`relative z-[2] h-auto w-full select-none bg-transparent drop-shadow-[0_22px_40px_rgba(0,0,0,0.22)] ${className}`}
    />
  );
}

export function IPhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] border border-hairline bg-surface2 p-[5px] shadow-2xl shadow-black/30 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2.1rem] bg-canvas">
        <div
          className="absolute left-1/2 top-2 z-10 h-[16px] w-[64px] -translate-x-1/2 rounded-full bg-black/90"
          aria-hidden="true"
        />
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[9/19] w-full object-cover"
        />
      </div>
    </div>
  );
}

export function DesktopFrame({
  src,
  alt,
  title,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl shadow-black/30 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-hairline bg-surface2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          {title}
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="aspect-[16/10] w-full object-cover"
      />
    </div>
  );
}

export function SignalChart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 6" />
      <motion.polyline
        points="0,100 40,82 70,92 110,48 150,68 190,28 230,56 280,18 330,42 400,8"
        fill="none"
        stroke="rgb(var(--signal))"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <motion.circle
        cx="400"
        cy="8"
        r="4"
        fill="rgb(var(--signal))"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.7, duration: 0.3 }}
      />
    </svg>
  );
}
