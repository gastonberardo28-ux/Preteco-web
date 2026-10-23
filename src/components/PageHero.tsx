/* eslint-disable @next/next/no-img-element */
import { img } from "@/lib/asset";
import { Eyebrow } from "./ui";
import { Counter } from "./Counter";

/* Hero único para todo el sitio: misma estructura, fondo y animación en cada página.
   - Fondo: esfera wireframe que rota lento + dos halos (lima y violeta) que
     derivan y una luz que sigue al cursor.
   - Título que entra palabra por palabra.
   - Variantes: "home" (más alto) y "page". */

export type HeroStat = { value: number; prefix?: string; suffix?: string; label: string };

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  actions,
  aside,
  stats,
  variant = "page",
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  stats?: HeroStat[];
  variant?: "home" | "page";
  children?: React.ReactNode;
}) {
  const home = variant === "home";
  const hasSide = Boolean(image || aside);

  return (
    <section className={`relative isolate overflow-hidden border-b border-line/60 ${home ? "min-h-[min(92vh,900px)]" : ""}`}>
      <HeroBackground />
      <div
        className={`container-page relative grid items-center gap-12 ${home ? "py-24 md:py-32" : "py-20 md:py-28"} ${
          hasSide ? "lg:grid-cols-[1.15fr_1fr]" : ""
        }`}
      >
        <div className="flex flex-col gap-7">
          {eyebrow && (
            <div data-reveal="fade">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className={`${home ? "t-display" : "t-display-sm"} words max-w-[20ch]`}>
            {title.split(" ").map((w, i) => (
              <span key={i} style={{ ["--i" as string]: i }}>
                {w}
                {" "}
              </span>
            ))}
          </h1>
          {text && (
            <p data-reveal style={{ ["--d" as string]: 3 }} className="t-lead max-w-[56ch]">
              {text}
            </p>
          )}
          {actions && (
            <div data-reveal style={{ ["--d" as string]: 4 }} className="flex flex-wrap gap-3 pt-1">
              {actions}
            </div>
          )}
          {children}
        </div>

        {image && (
          <div data-reveal="scale" style={{ ["--d" as string]: 2 }} className="relative mx-auto w-full max-w-[540px]">
            <div aria-hidden="true" className="absolute inset-[12%] -z-10 rounded-full bg-accent/20 blur-[80px]" />
            <img src={image} alt={imageAlt} className="w-full animate-float drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]" />
          </div>
        )}
        {aside && !image && <div className="relative">{aside}</div>}
      </div>

      {stats && stats.length > 0 && (
        <div className="relative border-t border-line/60 bg-bg/40 backdrop-blur-sm">
          <dl className="container-page grid grid-cols-2 gap-y-8 py-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ ["--d" as string]: i }} className="flex flex-col gap-1 border-l border-line pl-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-mono text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.04em] text-accent">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </dd>
                <dd className="text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      <div className="absolute -top-40 -right-32 size-[620px] animate-drift rounded-full bg-violet/25 blur-[120px]" />
      <div className="absolute -bottom-48 -left-24 size-[520px] animate-drift rounded-full bg-accent/15 blur-[120px] [animation-delay:-9s]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(600px circle at var(--cx, 70%) var(--cy, 30%), rgb(165 148 255 / 0.10), transparent 60%)" }}
      />
      <div className="absolute top-1/2 right-[-18%] w-[min(1000px,110vw)] -translate-y-1/2">
        <div data-parallax="0.12">
          <img src={img("sphere/0.svg")} alt="" className="w-full animate-spin-slow opacity-45" />
        </div>
      </div>
    </div>
  );
}
