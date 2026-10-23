/* eslint-disable @next/next/no-img-element */
import { img } from "@/lib/asset";

/* Hero de páginas internas. Mejora: cada página tiene su H1 real
   (la home original no tenía ninguno) y la imagen nunca tapa el texto
   (en las páginas de servicio la ilustración quedaba encima del título). */
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <img
        src={img("sphere/0.svg")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] right-[-15%] w-[min(900px,90vw)] opacity-40 select-none"
      />
      <div
        className={`container-page relative grid items-center gap-10 py-16 md:py-24 ${image ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}
      >
        <div className="flex flex-col gap-5">
          {eyebrow && <p className="font-mono text-sm tracking-[0.14em] text-accent-soft uppercase">{eyebrow}</p>}
          <h1 className="font-mono text-[clamp(34px,5vw,60px)] leading-[1.06] font-normal tracking-[-0.025em] text-accent">
            {title}
          </h1>
          {text && <p className="max-w-[56ch] text-lg leading-relaxed text-ink md:text-xl">{text}</p>}
          {children}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-[520px]">
            <img src={image} alt={imageAlt} className="w-full drop-shadow-[0_20px_60px_rgba(203,255,0,0.12)]" />
          </div>
        )}
      </div>
    </section>
  );
}
