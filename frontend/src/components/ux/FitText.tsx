import { useEffect, useRef, useState } from "react";

export function FitText({ text, className = "" }: { text: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const meas = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const fit = () => {
      if (!wrap.current || !meas.current) return;
      const tw = meas.current.getBoundingClientRect().width;
      if (tw > 0) setSize((100 * wrap.current.clientWidth) / tw);
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={wrap} className="relative w-full">
      <span
        ref={meas}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 whitespace-nowrap opacity-0 ${className}`}
        style={{ fontSize: 100 }}
      >
        {text}
      </span>
      <span
        className={`block whitespace-nowrap ${className}`}
        style={{ fontSize: size || undefined, visibility: size ? "visible" : "hidden" }}
      >
        {text}
      </span>
    </div>
  );
}
