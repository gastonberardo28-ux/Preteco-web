import Link from "next/link";

type BtnProps = { href: string; children: React.ReactNode; variant?: "solid" | "ghost"; size?: "md" | "lg" };

export function Button({ href, children, variant = "solid", size = "md" }: BtnProps) {
  const base =
    "inline-flex items-center rounded font-mono no-underline transition-colors " +
    (size === "lg" ? "min-h-12 px-[22px] text-sm" : "min-h-11 px-[18px] text-[13px]");
  const styles =
    variant === "solid"
      ? "bg-accent font-semibold text-bg hover:bg-accent-hover"
      : "border border-dashed border-accent text-accent hover:bg-accent/10";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[13px] text-accent">{children}</span>;
}

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`m-0 text-[clamp(34px,4vw,56px)] leading-[1.02] font-semibold tracking-[-1.5px] text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1280px] px-6 ${className}`}>{children}</div>;
}

export function WindowBar({ title, dots = false }: { title: string; dots?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-3">
      {dots ? (
        <div className="flex gap-[7px]" aria-hidden="true">
          <span className="size-[11px] rounded-full bg-[#39452a]" />
          <span className="size-[11px] rounded-full bg-[#39452a]" />
          <span className="size-[11px] rounded-full bg-[#39452a]" />
        </div>
      ) : null}
      <span className="font-mono text-xs text-dim">{title}</span>
      {dots ? <span className="w-[45px]" aria-hidden="true" /> : null}
    </div>
  );
}

export function Cursor({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block animate-blink bg-accent ${className}`} />;
}
