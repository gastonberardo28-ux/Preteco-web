/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { img } from "@/lib/asset";
import { footerNav, socials, partners, offices, COMPLIANCE_EMAIL } from "@/content/site";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <PartnersStrip />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="container-page relative grid gap-14 py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <img src={img("logo.svg")} alt="Preteco" width={120} height={28} className="h-7 w-auto self-start" />
          <p className="max-w-[18ch] font-mono text-[clamp(26px,2.6vw,34px)] leading-tight tracking-[-0.03em] text-ink">
            Trabajamos con vos para crear <span className="text-accent">impacto.</span>
          </p>
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Preteco en ${s.label}`}
                  className="flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:border-violet hover:bg-violet/10"
                >
                  <img src={s.icon} alt="" width={18} height={18} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Pie de página">
          <p className="t-eyebrow mb-5">Navegación</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
            {footerNav.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline text-text hover:text-accent">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link href={l.href} className="link-underline text-text hover:text-accent">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="t-eyebrow mb-5">Oficinas</p>
          <ul className="grid gap-3 text-[15px]">
            {offices.map((o) => (
              <li key={o.city}>
                <a href={o.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2.5 text-text hover:text-accent">
                  <Icon name="mapPin" className="mt-0.5 size-4 text-violet" />
                  <span>{o.city}</span>
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={`mailto:${COMPLIANCE_EMAIL}`} className="group flex items-start gap-2.5 text-text hover:text-accent">
                <Icon name="mail" className="mt-0.5 size-4 text-violet" />
                <span>{COMPLIANCE_EMAIL}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page relative flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted">
        <span>© {new Date().getFullYear()} Preteco. Todos los derechos reservados.</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
          Más de 25 años en sistemas críticos
        </span>
      </div>
    </footer>
  );
}

function PartnersStrip() {
  const loop = [...partners, ...partners, ...partners, ...partners];
  return (
    <section aria-labelledby="partners-title" className="relative border-b border-line py-10">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center">
        <h2 id="partners-title" className="t-eyebrow shrink-0 md:w-44">
          Partners
        </h2>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <li key={i} aria-hidden={i >= partners.length ? true : undefined}>
                <img
                  src={p.logo}
                  alt={i < partners.length ? p.name : ""}
                  height={36}
                  className="h-9 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
