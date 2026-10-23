/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Button, Check, Section, SectionHeader, Hl } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { clientLogos, getService, services, type ServiceHow } from "@/content/services";
import { serviceIcon } from "@/content/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.menuLabel, description: s.metaDescription };
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
        actions={
          <>
            <Button href="#formulario" size="lg">
              Coordinar una reunión
            </Button>
            <Button href="#como" variant="secondary" size="lg">
              Cómo lo hacemos
            </Button>
          </>
        }
      />

      {/* Índice de la página, fijo al hacer scroll en desktop */}
      <nav aria-label="En esta página" className="sticky top-[76px] z-30 hidden border-b border-line/60 bg-bg/80 backdrop-blur-xl md:block">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 text-sm">
          {[
            ["que-es", "Qué es"],
            ["para-que", "Para qué sirve"],
            ["como", "Cómo lo hacemos"],
            ["por-que", "Por qué Preteco"],
            ["casos", "Casos"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block rounded-full px-4 py-2 whitespace-nowrap text-muted transition-colors hover:bg-surface hover:text-accent">
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
            <SectionHeader eyebrow="Qué es" title={s.whatTitle} />
            <p data-reveal style={{ ["--d" as string]: 2 }} className="text-xl leading-relaxed text-ink md:text-2xl md:leading-relaxed">
              {s.what}
            </p>
          </div>
        </div>
      </Section>

      <Section id="para-que" tone="surface">
        <SectionHeader eyebrow="Beneficios" title="¿Para qué sirve?" text={s.purposeIntro} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {s.purposes.map((p, i) => (
            <li
              key={p}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className="spotlight glow-border flex items-start gap-4 rounded-2xl border border-line bg-bg/60 p-6 text-lg text-ink"
            >
              <Check className="mt-0.5" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="como">
        <SectionHeader eyebrow="Enfoque" title="¿Cómo lo hacemos?" />
        <How how={s.how} />
      </Section>

      <Section id="por-que" tone="surface">
        <SectionHeader
          eyebrow="Diferenciales"
          title={
            <>
              ¿Por qué elegir <Hl>Preteco</Hl>?
            </>
          }
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {s.why.map((w, i) => (
            <li
              key={w}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className="spotlight glow-border flex gap-5 rounded-2xl border border-line bg-bg/60 p-6"
            >
              <span className="font-mono text-3xl leading-none tracking-[-0.04em] text-violet">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-lg text-ink">{w}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="casos">
        <div data-reveal className="spotlight relative overflow-hidden rounded-[32px] border border-line bg-surface/70 p-7 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-accent/10 blur-[90px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="flex flex-col gap-4">
              <p className="t-eyebrow">Casos de éxito</p>
              <p className="t-h2 text-[clamp(26px,2.6vw,36px)]">Quienes ya confían en nosotros</p>
              <p className="t-lead">{s.casesText}</p>
            </div>
            {s.logos.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3">
                {s.logos.map((k, i) => (
                  <li
                    key={k}
                    data-reveal="scale"
                    style={{ ["--d" as string]: i }}
                    className="flex h-28 items-center justify-center rounded-2xl border border-line bg-bg/60 p-5 transition-colors hover:border-violet/50"
                  >
                    <img src={clientLogos[k].logo} alt={clientLogos[k].name} loading="lazy" className="max-h-12 w-auto" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-line p-10">
                <IconTile name="award" size="lg" />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm title={s.ctaTitle} text={s.ctaText} defaultInterest={interestFor(s.slug)} />
        <Link
          href={`/services/${next.slug}`}
          data-reveal
          className="spotlight glow-border group mt-8 flex items-center justify-between gap-4 rounded-3xl border border-line bg-surface/70 p-6 md:p-8"
        >
          <span className="flex items-center gap-5">
            <IconTile name={serviceIcon[next.slug]} />
            <span>
              <span className="t-eyebrow block text-[11px]">Siguiente servicio</span>
              <span className="mt-1 block text-2xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                {next.menuLabel}
              </span>
            </span>
          </span>
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-line text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
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
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
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
        </ol>
      )}
      {how.kind === "cards" && (
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {how.items.map((c, i) => (
            <li
              key={c.title}
              data-reveal
              style={{ ["--d" as string]: i % 3 }}
              className="spotlight glow-border flex flex-col gap-4 rounded-3xl border border-line bg-surface/70 p-7"
            >
              <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3">{c.title}</h3>
              <p className="text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
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

function interestFor(slug: string) {
  const map: Record<string, string> = {
    "critical-ops": "Sistemas críticos (CriticalOps)",
    "cloud-modernization-infrastructure": "Modernización de infraestructura",
    cloud: "Cloud",
    "agent-development": "Inteligencia artificial",
    "workforce-customer-indentity": "Seguridad e identidades",
    "legacy-apps": "Desarrollo y modernización de aplicaciones",
    "app-development": "Desarrollo y modernización de aplicaciones",
  };
  return map[slug];
}
