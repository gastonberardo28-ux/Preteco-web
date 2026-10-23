/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Button, Check, H2, Section, Arrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { clientLogos, getService, services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.menuLabel, description: s.metaDescription };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero eyebrow={s.category} title={s.title} text={s.subtitle} image={s.heroImage}>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="#formulario">Coordinar una reunión</Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img src={s.whatImage} alt="" loading="lazy" className="w-full rounded-3xl border border-line object-cover" />
          <div className="flex flex-col gap-5">
            <H2>{s.whatTitle}</H2>
            <p className="text-lg leading-relaxed text-ink md:text-xl">{s.what}</p>
          </div>
        </div>
      </Section>

      {/* Mejora: lista con íconos y texto alineado a la izquierda (antes eran cajas
          centradas, difíciles de escanear, con "Permite..." pegado al primer ítem). */}
      <Section tone="surface">
        <H2>¿Para qué sirve?</H2>
        {s.purposeIntro && <p className="mt-4 max-w-[70ch] text-lg text-ink/90">{s.purposeIntro}</p>}
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {s.purposes.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-5 text-lg text-ink">
              <Check className="mt-0.5 text-accent" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <H2>¿Cómo lo hacemos?</H2>
        <How how={s.how} />
      </Section>

      {/* Mejora: las cards tenían colores alternados al azar; ahora es un estilo consistente. */}
      <Section tone="surface">
        <H2>¿Por qué elegir Preteco?</H2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {s.why.map((w, i) => (
            <li key={w} className="flex gap-4 rounded-2xl bg-panel p-6">
              <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-lg text-ink">{w}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="rounded-3xl border border-line p-7 md:p-12">
          <H2>Casos de éxito</H2>
          <p className="mt-4 max-w-[75ch] text-lg leading-relaxed text-ink/90">{s.casesText}</p>
          {s.logos.length > 0 && (
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {s.logos.map((k) => (
                <li key={k} className="flex h-24 items-center justify-center rounded-xl bg-surface p-4">
                  <img src={clientLogos[k].logo} alt={clientLogos[k].name} loading="lazy" className="max-h-12 w-auto" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm title={s.ctaTitle} text={s.ctaText} defaultInterest={interestFor(s.slug)} />
        <Link
          href={`/services/${next.slug}`}
          className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-line p-6 transition-colors hover:border-accent"
        >
          <span>
            <span className="block text-sm text-muted">Siguiente servicio</span>
            <span className="block text-xl text-ink">{next.menuLabel}</span>
          </span>
          <Arrow className="text-accent" />
        </Link>
      </Section>
    </>
  );
}

function How({ how }: { how: NonNullable<ReturnType<typeof getService>>["how"] }) {
  if (how.kind === "text") return <p className="mt-6 max-w-[75ch] text-lg leading-relaxed text-ink">{how.text}</p>;
  return (
    <>
      {how.intro && <p className="mt-4 max-w-[75ch] text-lg text-ink/90">{how.intro}</p>}
      {how.kind === "steps" && (
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {how.items.map((t, i) => (
            <li key={t} className="flex flex-col gap-4 rounded-2xl border border-line p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent font-mono text-lg text-bg">{i + 1}</span>
              <p className="text-lg text-ink">{t}</p>
            </li>
          ))}
        </ol>
      )}
      {how.kind === "cards" && (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {how.items.map((c) => (
            <li key={c.title} className="flex flex-col gap-2 rounded-2xl border border-line p-6">
              <h3 className="text-lg font-medium text-accent">{c.title}</h3>
              <p className="text-ink/90">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
      {how.kind === "list" && (
        <ul className="mt-8 grid gap-3">
          {how.items.map((t) => (
            <li key={t} className="flex items-start gap-3 text-lg text-ink">
              <Check className="mt-1 text-accent" />
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
