/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Button, Check, JsonLd, Section, SectionHeader } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { clientLogos, getService, services, type ServiceHow } from "@/content/collections/services";
import { serviceDetail as c } from "@/content/pages/services";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { serviceIcon } from "@/content/icons";
import { Carousel } from "@/components/Carousel";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/* PÁGINA DE SERVICIO · contenido de cada servicio en content/collections/services.ts,
   textos fijos (botones, títulos de sección) en content/pages/services.ts */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.menuLabel, description: s.metaDescription }, `/services/${s.slug}`);
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero
        eyebrow={s.category}
        title={s.title}
        text={s.subtitle}
        image={s.heroImage}
        breadcrumbs={[{ label: "Servicios", href: "/services" }, { label: s.menuLabel }]}
        actions={c.heroActions}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.metaDescription,
          serviceType: s.category,
          url: `${SITE_URL}/services/${s.slug}`,
          provider: { "@type": "Organization", name: "Preteco", url: SITE_URL },
          areaServed: ["Argentina", "Uruguay", "Bolivia", "Latinoamérica"],
        }}
      />

      {/* Índice de la página, fijo al hacer scroll en desktop */}
      <nav aria-label="En esta página" className="sticky top-[76px] z-30 hidden border-b border-line/60 bg-bg/80 backdrop-blur-xl md:block">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 text-sm">
          {c.index.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="flex min-h-10 items-center rounded-full px-4 whitespace-nowrap text-muted transition-colors hover:bg-surface hover:text-accent">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="que-es">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal="scale" className="relative overflow-hidden rounded-[32px] border border-line">
            <div data-parallax="0.06" className="-my-10">
              <img src={s.whatImage} alt="" loading="lazy" className="w-full object-cover" />
            </div>
            <div className="absolute top-5 left-5">
              <IconTile name={serviceIcon[s.slug]} tone="lime" size="lg" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeader eyebrow={c.sections.what.eyebrow} title={s.whatTitle} />
            <p data-reveal style={{ ["--d" as string]: 2 }} className="text-lg leading-relaxed text-ink sm:text-xl md:text-2xl md:leading-relaxed">
              {s.what}
            </p>
          </div>
        </div>
      </Section>

      <Section id="para-que" tone="surface">
        <SectionHeader eyebrow={c.sections.purposes.eyebrow} title={c.sections.purposes.title} text={s.purposeIntro} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {s.purposes.map((p, i) => (
            <li
              key={p}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className={`spotlight glow-border flex items-start gap-3.5 rounded-2xl border border-line bg-bg/60 p-4 text-base leading-snug text-ink sm:gap-4 sm:p-6 sm:text-lg ${lastWide(s.purposes.length, i)}`}
            >
              <Check className="mt-0.5" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="como">
        <SectionHeader eyebrow={c.sections.how.eyebrow} title={c.sections.how.title} />
        <How how={s.how} />
      </Section>

      <Section id="por-que" tone="surface">
        <SectionHeader eyebrow={c.sections.why.eyebrow} title={c.sections.why.title} />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {s.why.map((w, i) => (
            <li
              key={w}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className={`spotlight glow-border flex gap-4 rounded-2xl border border-line bg-bg/60 p-5 sm:gap-5 sm:p-6 ${lastWide(s.why.length, i)}`}
            >
              <span className="font-mono text-3xl leading-none tracking-[-0.04em] text-violet">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-base text-ink sm:text-lg">{w}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="casos">
        <div data-reveal className="spotlight relative overflow-hidden rounded-[28px] border border-line bg-surface/70 p-5 sm:p-7 md:rounded-[32px] md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-accent/10 blur-[90px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="flex flex-col gap-4">
              <p className="t-eyebrow">{c.sections.cases.eyebrow}</p>
              <p className="t-h2 text-[clamp(26px,2.6vw,36px)]">{c.sections.cases.title}</p>
              <p className="t-lead">{s.casesText}</p>
            </div>
            {s.logos.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3">
                {s.logos.map((k, i) => (
                  <li
                    key={k}
                    data-reveal="scale"
                    style={{ ["--d" as string]: i }}
                    // Si la cantidad es impar, el último ocupa el ancho completo para no dejar un hueco
                    className={`flex h-24 items-center justify-center rounded-2xl border border-line bg-bg/60 p-4 transition-colors hover:border-violet/50 sm:h-28 sm:p-5 ${
                      s.logos.length % 2 === 1 && i === s.logos.length - 1 ? "col-span-2" : ""
                    }`}
                  >
                    <img src={clientLogos[k].logo} alt={clientLogos[k].name} loading="lazy" className="max-h-12 w-auto" />
                  </li>
                ))}
              </ul>
            ) : (
              // Sin logos cargados: en vez de un recuadro vacío, llevamos a los casos de éxito
              <div data-reveal className="lg:justify-self-end">
                <Button href="/cases" variant="secondary">
                  {c.sections.cases.allCases}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm title={s.ctaTitle} text={s.ctaText} defaultInterest={s.formInterest} />
        <Link
          href={`/services/${next.slug}`}
          data-reveal
          className="spotlight glow-border group mt-8 flex items-center justify-between gap-4 rounded-3xl border border-line bg-surface/70 p-5 md:p-8"
        >
          <span className="flex items-center gap-4 sm:gap-5">
            <IconTile name={serviceIcon[next.slug]} />
            <span>
              <span className="t-eyebrow block text-xs">{c.nextLabel}</span>
              <span className="mt-1 block text-xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-accent sm:text-2xl">
                {next.menuLabel}
              </span>
            </span>
          </span>
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
            <Icon name="arrowRight" className="size-5" />
          </span>
        </Link>
      </Section>
    </>
  );
}

function How({ how }: { how: ServiceHow }) {
  if (how.kind === "text")
    return (
      <p data-reveal className="mt-10 max-w-[60ch] text-xl leading-relaxed text-ink md:text-2xl md:leading-relaxed">
        {how.text}
      </p>
    );
  return (
    <>
      {how.intro && (
        <p data-reveal className="t-lead mt-6 max-w-[70ch]">
          {how.intro}
        </p>
      )}
      {how.kind === "steps" && (
        <Carousel as="ol" until="md" label="Cómo lo hacemos" className="mt-12 grid gap-4 md:grid-cols-3">
          {how.items.map((t, i) => (
            <li
              key={t}
              data-reveal
              style={{ ["--d" as string]: i }}
              className="spotlight glow-border relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-surface/70 p-7"
            >
              <span className="font-mono text-6xl leading-none tracking-[-0.06em] text-accent/25">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-lg text-ink">{t}</p>
            </li>
          ))}
        </Carousel>
      )}
      {how.kind === "cards" && (
        // La grilla se adapta a la cantidad de tarjetas para que ninguna fila quede con huecos
        <Carousel until="lg" label="Cómo lo hacemos" className={`mt-12 grid gap-4 ${cardGrid(how.items.length)}`}>
          {how.items.map((c, i) => (
            <li
              key={c.title}
              data-reveal
              style={{ ["--d" as string]: i % 3 }}
              className={`spotlight glow-border flex flex-col gap-4 rounded-3xl border border-line bg-surface/70 p-7 ${cardSpan(how.items.length, i)}`}
            >
              <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3">{c.title}</h3>
              <p className="text-muted">{c.text}</p>
              {c.bullets && (
                <ul className="mt-1 grid gap-2 border-t border-line pt-4">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink">
                      <Check className="mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </Carousel>
      )}
      {how.kind === "list" && (
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {how.items.map((t, i) => (
            <li
              key={t}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className="flex items-start gap-4 rounded-2xl border border-line bg-surface/70 p-6 text-lg text-ink"
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-violet/40 font-mono text-sm text-violet">
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Columnas de la grilla de tarjetas según cuántas hay (desktop). */
function cardGrid(n: number) {
  if (n === 2 || n === 4) return "lg:grid-cols-2";
  if (n === 5) return "lg:grid-cols-6"; // 3 arriba + 2 abajo, ambas filas completas
  return "lg:grid-cols-3";
}

function cardSpan(n: number, i: number) {
  if (n === 5) return i < 3 ? "lg:col-span-2" : "lg:col-span-3";
  return "";
}

/** En grillas de 2 columnas con cantidad impar, el último ítem ocupa el ancho completo. */
function lastWide(n: number, i: number) {
  return n % 2 === 1 && i === n - 1 ? "md:col-span-2" : "";
}
