export function Tag({ children, testId }: { children: string; testId?: string }) {
  return (
    <span
      data-testid={testId}
      className="inline-flex items-center border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-sub transition-colors duration-200 hover:border-ink hover:text-ink"
    >
      {children}
    </span>
  );
}
