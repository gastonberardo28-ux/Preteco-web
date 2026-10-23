import Link from "next/link";

/* ── Botones ─────────────────────────────────────────────────────────────
   Mejora UX: el sitio original usaba bordes punteados en mayúsculas para
   todos los CTA (parecían placeholders y no había jerarquía). Ahora hay
   un primario sólido, un secundario con borde fino y un link con flecha. */

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 whitespace-nowrap";
const variants = {
  primary: "min-h-12 rounded-lg bg-accent px-6 text-[15px] text-bg hover:bg-accent-hover",
  secondary:
    "min-h-12 rounded-lg border border-line-strong px-6 text-[15px] text-ink hover:border-accent hover:text-accent",
  link: "group text-[15px] text-accent hover:text-accent-hover",
};

export function Button({ href, children, variant = "primary", external, className = "" }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {variant !== "secondary" && <Arrow external={external} />}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Arrow({ external = false, className = "" }: { external?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 transition-transform group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {external ? <path d="M5 11 11 5M6 5h5v5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-5 shrink-0 ${className}`} fill="none">
      <circle cx="10" cy="10" r="9" className="fill-accent/15" />
      <path d="m6 10.2 2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Tipografía de secciones ───────────────────────────────────────────── */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-sm tracking-[0.12em] text-accent-soft uppercase">{children}</p>;
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-mono text-[clamp(28px,3.4vw,44px)] leading-[1.12] font-normal tracking-[-0.02em] text-accent ${className}`}>
      {children}
    </h2>
  );
}

export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`max-w-[68ch] text-lg leading-relaxed text-ink/90 md:text-xl ${className}`}>{children}</p>;
}

export function Section({
  children,
  id,
  className = "",
  tone = "default",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "default" | "surface";
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${tone === "surface" ? "bg-surface" : ""} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
