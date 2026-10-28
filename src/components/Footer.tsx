/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { img } from "@/lib/asset";
import { footer, footerNav, socials, partners, offices, COMPLIANCE_EMAIL } from "@/content/site";
import { services } from "@/content/collections/services";
import { Icon } from "./Icon";

/* Pie de página
   - Desktop: 4 columnas (marca · servicios · empresa · oficinas).
   - Mobile: compacto. Servicios y Empresa se pliegan en desplegables, las oficinas
     pasan a una fila de "chips" y la marca comparte fila con las redes. */
export function Footer() {
  const linkCls = "link-underline inline-flex min-h-10 items-center text-text hover:text-accent";
  const serviceLinks = services.map((s) => (
    <li key={s.slug}>
      <Link href={`/services/${s.slug}`} className={linkCls}>
        {s.menuLabel}
      </Link>
    </li>
  ));
  const navLinks = footerNav.map((l) => (
    <li key={l.label}>
      {l.external ? (
        <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {l.label} <span aria-hidden="true">&nbsp;↗</span>
        </a>
      ) : (
        <Link href={l.href} className={linkCls}>
          {l.label}
        </Link>
      )}
    </li>
  ));

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <PartnersStrip />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="container-page relative grid gap-8 py-10 sm:grid-cols-2 md:gap-12 md:py-16 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex items-center justify-between gap-4 md:flex-col md:items-start md:gap-6">
            <img src={img("logo.svg")} alt="Preteco" width={120} height={28} className="h-7 w-auto" />
            <ul className="flex gap-2 md:order-last">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Preteco en ${s.label}`}
                    className="tap flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:border-violet hover:bg-violet/10"
                  >
                    <Icon name={s.icon} className="size-[18px] text-ink" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="hidden max-w-[18ch] font-mono text-[clamp(26px,2.6vw,34px)] leading-tight tracking-[-0.03em] text-ink md:block">
              {footer.tagline} <span className="text-accent">{footer.taglineHighlight}</span>
            </p>
          </div>
          <p className="font-mono text-xl leading-tight tracking-[-0.03em] text-ink md:hidden">
            {footer.tagline} <span className="text-accent">{footer.taglineHighlight}</span>
          </p>
        </div>

        {/* Mobile: desplegables. Desktop: columnas abiertas. Los links a servicios suman enlaces internos para Google. */}
        <div className="divide-y divide-line border-y border-line sm:col-span-2 md:hidden">
          <FooterFold title={footer.servicesTitle} label="Servicios">{serviceLinks}</FooterFold>
          <FooterFold title={footer.navTitle} label="Pie de página">{navLinks}</FooterFold>
        </div>
        <nav aria-label="Servicios" className="hidden md:block">
          <p className="t-eyebrow mb-4">{footer.servicesTitle}</p>
          <ul className="grid text-[15px]">{serviceLinks}</ul>
        </nav>
        <nav aria-label="Pie de página" className="hidden md:block">
          <p className="t-eyebrow mb-4">{footer.navTitle}</p>
          <ul className="grid text-[15px]">{navLinks}</ul>
        </nav>

        <div className="sm:col-span-2 md:col-span-1">
          <p className="t-eyebrow mb-3 md:mb-4">{footer.officesTitle}</p>
          <ul className="flex flex-wrap gap-1.5 text-sm md:grid md:gap-0 md:text-[15px]">
            {offices.map((o) => (
              <li key={o.city}>
                <a
                  href={o.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap flex min-h-10 items-center gap-1.5 rounded-full border border-line px-3 text-text transition-colors hover:text-accent md:gap-2.5 md:rounded-none md:border-0 md:px-0"
                >
                  <Icon name="mapPin" className="size-4 text-violet" />
                  <span>{o.city}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${COMPLIANCE_EMAIL}`} className="mt-3 flex min-h-10 items-center gap-2.5 text-[15px] text-text break-all hover:text-accent md:mt-2">
            <Icon name="mail" className="size-4 text-violet" />
            <span>{COMPLIANCE_EMAIL}</span>
          </a>
        </div>
      </div>
      <div className="container-page relative flex flex-col gap-2 border-t border-line py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:text-sm md:py-6">
        <span>© {new Date().getFullYear()} {footer.copyright}</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
          {footer.badge}
        </span>
      </div>
    </footer>
  );
}

function FooterFold({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-ink [&::-webkit-details-marker]:hidden">
        <span className="t-eyebrow">{title}</span>
        <span aria-hidden="true" className="text-accent transition-transform duration-300 group-open:rotate-45">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </summary>
      <nav aria-label={label} className="pb-4">
        <ul className="grid grid-cols-2 gap-x-4 text-[15px]">{children}</ul>
      </nav>
    </details>
  );
}

function PartnersStrip() {
  const loop = [...partners, ...partners, ...partners, ...partners];
  return (
    <section aria-labelledby="partners-title" className="relative border-b border-line py-6 md:py-10">
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <h2 id="partners-title" className="t-eyebrow shrink-0 md:w-44">
          {footer.partnersTitle}
        </h2>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-10 md:gap-16 group-hover:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <li key={i} aria-hidden={i >= partners.length ? true : undefined}>
                <img
                  src={p.logo}
                  alt={i < partners.length ? p.name : ""}
                  height={36}
                  style={p.scale ? { transform: `scale(${p.scale})` } : undefined}
                  className="h-7 w-auto opacity-60 md:h-9 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
