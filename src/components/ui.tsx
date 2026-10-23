import Link from "next/link";
import { Icon } from "./Icon";

/* ═══ Botones ═══════════════════════════════════════════════════════════
   primary   → acción principal de cada pantalla (lima sólido, con brillo)
   secondary → alternativa (contorno violeta, relleno suave en hover)
   tertiary  → links de texto con flecha y subrayado animado */

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "md" | "lg";
  icon?: "arrow" | "external" | "download" | "none";
  className?: string;
};

const sizes = { md: "min-h-11 px-5 text-[15px]", lg: "min-h-13 px-7 text-base" };

export function Button({ href, children, variant = "primary", size = "md", icon, className = "" }: ButtonProps) {
  const external = /^https?:/.test(href) || icon === "external";
  const ic = icon ?? (external ? "external" : variant === "secondary" ? "none" : "arrow");

  const cls =
    variant === "tertiary"
      ? "group inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover"
      : `group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.98] ${sizes[size]} ${
          variant === "primary"
            ? "btn-sheen bg-accent text-bg shadow-[0_8px_30px_-10px_rgb(203_255_0/0.7)] hover:bg-accent-hover hover:shadow-[0_10px_40px_-8px_rgb(203_255_0/0.85)]"
            : "border border-violet/50 text-ink hover:border-violet hover:bg-violet/12 hover:text-violet-soft"
        }`;

  const label = variant === "tertiary" ? <span className="link-underline">{children}</span> : <span className="relative">{children}</span>;
  const iconEl =
    ic === "none" ? null : (
      <Icon
        name={ic === "external" ? "arrowUpRight" : ic === "download" ? "download" : "arrowRight"}
        className={`relative size-4 transition-transform duration-300 ${
          ic === "arrow" ? "group-hover:translate-x-1" : ic === "external" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-y-0.5"
        }`}
      />
    );

  const content = (
    <>
      {label}
      {iconEl}
    </>
  );

  return external || href.endsWith(".pdf") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} ${className}`}>
      {content}
    </a>
  ) : (
    <Link href={href} className={`${cls} ${className}`}>
      {content}
    </Link>
  );
}

/* Compatibilidad con componentes existentes */
export function Arrow({ external = false, className = "" }: { external?: boolean; className?: string }) {
  return (
    <Icon
      name={external ? "arrowUpRight" : "arrowRight"}
      className={`size-4 transition-transform duration-300 ${external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"} ${className}`}
    />
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ${className}`}>
      <Icon name="check" className="size-3.5" />
    </span>
  );
}

/* ═══ Tipografía ═══════════════════════════════════════════════════════ */

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet to-transparent" />
      {children}
    </p>
  );
}

/** Resalta una palabra dentro de un título (en mono y color primario). */
export function Hl({ children, tone = "lime" }: { children: React.ReactNode; tone?: "lime" | "violet" }) {
  return <span className={`font-mono font-normal tracking-[-0.04em] ${tone === "lime" ? "text-accent" : "text-violet"}`}>{children}</span>;
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`t-h2 ${className}`}>{children}</h2>;
}

export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`t-lead max-w-[64ch] ${className}`}>{children}</p>;
}

/* Encabezado de sección: mismo patrón en todo el sitio (etiqueta · título · bajada · acción). */
export function SectionHeader({
  eyebrow,
  title,
  text,
  action,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${className}`}
    >
      <div className={`flex flex-col gap-4 ${center ? "items-center" : ""}`}>
        {eyebrow && (
          <div data-reveal="fade">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 data-reveal style={{ ["--d" as string]: 1 }} className="t-h2 max-w-[22ch]">
          {title}
        </h2>
        {text && (
          <p data-reveal style={{ ["--d" as string]: 2 }} className={`t-lead max-w-[60ch] ${center ? "mx-auto" : ""}`}>
            {text}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal="fade" style={{ ["--d" as string]: 3 }} className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
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
  tone?: "default" | "surface" | "dots";
}) {
  const toneCls =
    tone === "surface"
      ? "bg-surface border-y border-line/60"
      : tone === "dots"
        ? "bg-dots"
        : "";
  return (
    <section id={id} className={`relative py-20 md:py-28 ${toneCls} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/* Card base consistente: borde, spotlight y elevación en hover. */
export function cardCls(interactive = true) {
  return `spotlight rounded-3xl border border-line bg-surface/70 ${interactive ? "glow-border" : ""}`;
}
