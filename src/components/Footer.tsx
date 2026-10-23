/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { img } from "@/lib/asset";
import { footerNav, socials, partners, COMPLIANCE_EMAIL } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <PartnersStrip />
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[28px] leading-tight text-ink">
            Trabajamos con vos <br />
            para crear <span className="text-accent">impacto.</span>
          </p>
          <img src={img("logo.svg")} alt="Preteco" width={120} height={28} className="h-7 w-auto self-start" />
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-label="Pie de página">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {footerNav.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-ink/90 hover:text-accent">
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link href={l.href} className="text-ink/90 hover:text-accent">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4 text-[15px]">
            <p className="text-muted">
              Compliance:{" "}
              <a href={`mailto:${COMPLIANCE_EMAIL}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
                {COMPLIANCE_EMAIL}
              </a>
            </p>
            <ul className="flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Preteco en ${s.label}`}
                    className="flex size-11 items-center justify-center rounded-lg border border-line hover:border-accent"
                  >
                    <img src={s.icon} alt="" width={20} height={20} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container-page border-t border-line py-6 text-sm text-muted">
        © {new Date().getFullYear()} Preteco. Todos los derechos reservados.
      </div>
    </footer>
  );
}

/* Mejora: el carrusel original duplicaba logos con huecos ("Oracle Partner 2")
   y no se podía pausar. Ahora es una tira que se pausa al pasar el mouse
   y respeta "reducir movimiento". */
function PartnersStrip() {
  const loop = [...partners, ...partners, ...partners, ...partners];
  return (
    <section aria-labelledby="partners-title" className="border-b border-line py-10">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center">
        <h2 id="partners-title" className="shrink-0 text-xl text-accent md:w-40">
          Partners
        </h2>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <li key={i} aria-hidden={i >= partners.length ? true : undefined}>
                <img src={p.logo} alt={i < partners.length ? p.name : ""} height={36} className="h-9 w-auto opacity-85" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
