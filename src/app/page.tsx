/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { img } from "@/lib/asset";
import { Button, Section, SectionHeader, Hl } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CaseCards, PostCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { services, serviceGroups } from "@/content/services";
import { serviceIcon, groupIcon } from "@/content/icons";
import { team } from "@/content/company";

const pillars = [
  {
    icon: "sparkles" as const,
    title: "Inteligencia artificial",
    text: "Automatizamos procesos y potenciamos la toma de decisiones con IA aplicada a tu negocio.",
    href: "/services/agent-development",
  },
  {
    icon: "cloud" as const,
    title: "Cloud",
    text: "Te ayudamos a migrar, escalar y operar con seguridad en la nube, sin fricciones.",
    href: "/services/cloud",
  },
  {
    icon: "code" as const,
    title: "Desarrollo",
    text: "Creamos software a medida para resolver los desafíos únicos de tu negocio.",
    href: "/services/app-development",
  },
];

export default function Home() {
  return (
    <>
      <PageHero
        variant="home"
        eyebrow="IA · Cloud · Datos · Desarrollo"
        title="Impulsamos tu evolución digital con IA, tecnología y datos"
        text="Más de 25 años acompañando a organizaciones de Latinoamérica en sistemas críticos, cloud, desarrollo y seguridad."
        actions={
          <>
            <Button href="/services" size="lg">
              Ver soluciones
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Hablemos
            </Button>
          </>
        }
        aside={
          <ul className="grid gap-4">
            {pillars.map((p, i) => (
              <li key={p.title} data-reveal="left" style={{ ["--d" as string]: i + 2 }}>
                <Link
                  href={p.href}
                  className="spotlight glow-border group flex items-start gap-5 rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur-md"
                >
                  <IconTile name={p.icon} tone={i === 0 ? "lime" : "violet"} />
                  <div className="flex-1">
                    <h2 className="t-h3">{p.title}</h2>
                    <p className="mt-1.5 text-[15px] text-muted">{p.text}</p>
                  </div>
                  <Icon name="arrowRight" className="mt-1 size-5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        }
        stats={[
          { value: 25, prefix: "+", label: "años en sistemas críticos" },
          { value: team.length, label: "personas en el equipo" },
          { value: 4, label: "oficinas en 3 países" },
          { value: services.length, label: "servicios especializados" },
        ]}
      />

      {/* Servicios en un vistazo */}
      <Section>
        <SectionHeader
          eyebrow="Qué hacemos"
          title={
            <>
              Todo lo que tu operación necesita, <Hl>en un solo equipo</Hl>
            </>
          }
          text="Desde la infraestructura que no puede caerse hasta los agentes de IA que potencian a tu gente."
          action={
            <Button href="/services" variant="tertiary">
              Ver todos los servicios
            </Button>
          }
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 7).map((s, i) => {
            const group = serviceGroups.find((g) => g.slugs.includes(s.slug));
            return (
              <li key={s.slug} data-reveal style={{ ["--d" as string]: i % 4 }} className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
                <Link
                  href={`/services/${s.slug}`}
                  className={`spotlight glow-border group flex h-full flex-col gap-5 rounded-3xl border border-line bg-surface/70 p-6 ${i === 0 ? "lg:p-9" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <IconTile name={serviceIcon[s.slug]} tone={i === 0 ? "lime" : "violet"} size={i === 0 ? "lg" : "md"} />
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      {group && <Icon name={groupIcon[group.name]} className="size-3.5" />}
                      {s.category}
                    </span>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <h3 className={`t-h3 ${i === 0 ? "text-3xl" : ""}`}>{s.menuLabel}</h3>
                    <p className={`text-muted ${i === 0 ? "text-lg" : "text-[15px]"}`}>{i === 0 ? s.what : s.overviewText}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Conocer más <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
          <li data-reveal style={{ ["--d" as string]: 3 }} className="sm:col-span-2">
            <Link
              href="/contact"
              className="group flex h-full flex-col justify-between gap-6 rounded-3xl bg-gradient-to-br from-accent to-accent-soft p-7 text-bg transition-transform duration-500 hover:-translate-y-1"
            >
              <Icon name="message" className="size-7" />
              <div>
                <p className="t-h3 text-bg">¿No sabés por dónde empezar?</p>
                <p className="mt-1.5 text-[15px] text-bg/75">Contanos tu desafío y te orientamos.</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                Hablemos <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Casos de éxito"
          title="Resultados reales en organizaciones críticas"
          action={
            <Button href="/cases" variant="tertiary">
              Ver todos los casos
            </Button>
          }
        />
        <div className="mt-14">
          <CaseCards />
        </div>
      </Section>

      <Section>
        <div data-reveal="scale" className="relative overflow-hidden rounded-[32px] border border-line">
          <div data-parallax="0.08" className="absolute -inset-y-16 inset-x-0">
            <img src={img("unSoloEquipo.png")} alt="" className="size-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
          <div className="relative flex min-h-[480px] flex-col justify-center gap-6 p-8 md:min-h-[540px] md:p-16">
            <p className="t-eyebrow">#unsoloequipo</p>
            <p className="t-h2 max-w-[18ch]">
              Somos más que una consultora. <Hl>Somos un equipo</Hl> que empuja en la misma dirección.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/about-us" size="lg">
                Conocenos
              </Button>
              <Button href="/about-us#sumate" variant="secondary" size="lg">
                Trabajá con nosotros
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Blog"
          title="Ideas que suman, experiencia que se comparte"
          action={
            <Button href="/blogs" variant="tertiary">
              Ver todas las notas
            </Button>
          }
        />
        <div className="mt-14">
          <PostCards limit={3} />
        </div>
      </Section>

      <Section>
        <ContactForm title="¿Querés vernos en acción?" text="Completá el formulario y coordinamos una llamada sin compromiso." />
      </Section>
    </>
  );
}
