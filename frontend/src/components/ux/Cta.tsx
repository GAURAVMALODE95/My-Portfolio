import type { LucideIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Magnetic } from "@/components/ux/Magnetic";

type Variant = "primary" | "ghost";

const BASE =
  "btn-sweep group relative inline-flex w-full items-center justify-between gap-8 border px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 sm:w-auto sm:min-w-[13.5rem]";

const VARIANTS: Record<Variant, string> = {
  primary: "border-ink bg-ink text-canvas [--sweep:rgb(var(--signal))] hover:border-signal",
  ghost: "border-hairline text-ink [--sweep:rgb(var(--ink))] hover:border-ink hover:text-canvas",
};

interface Props {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: Variant;
  testId: string;
  className?: string;
  href?: string;
  to?: string;
  download?: boolean;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
}

export function Cta({
  children,
  icon: Icon,
  variant = "primary",
  testId,
  className = "",
  href,
  to,
  download,
  external,
  onClick,
  type = "button",
  disabled,
  magnetic = true,
}: Props) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-px"
          aria-hidden="true"
        />
      )}
    </>
  );

  let el: ReactNode;
  if (to) {
    el = (
      <Link to={to} data-testid={testId} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  } else if (href) {
    el = (
      <a
        href={href}
        download={download}
        data-testid={testId}
        className={cls}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  } else {
    el = (
      <button
        type={type}
        data-testid={testId}
        className={`${cls} disabled:cursor-not-allowed disabled:opacity-60`}
        onClick={onClick}
        disabled={disabled}
      >
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic className="w-full sm:w-auto">{el}</Magnetic> : el;
}
