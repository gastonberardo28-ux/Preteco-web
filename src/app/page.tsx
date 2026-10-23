/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { img } from "@/lib/asset";
import { Button, H2, Arrow, Section } from "@/components/ui";
import { CaseCards, PostCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";

const pillars = [
  {
    title: "Inteligencia artificial",
    text: "Implementamos IA para automatizar procesos, potenciar la toma de decisiones y acelerar la innovación empresarial.",
    href: "/services/agent-development",
  },
  {
    title: "Cloud",
    text: "Te ayudamos a migrar, escalar y operar con seguridad en la nube, sin fricciones.",
    href: "/services/cloud",
  },
  {
    title: "Desarrollo",
    text: "Creamos software a medida para resolver los desafíos únicos de tu negocio.",
    href: "/services/app-development",
  },
];

export default function Home() {
  return (
    <>
      {/* Mejora: H1 real (la home original no tenía) y las cards de pilares ahora son links. */}
      <section className="relative overflow-hidden border-b border-line/60">
        <img
          src={img("sphere/0.svg")}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[-12%] w-[min(1000px,110vw)] -translate-y-1/2 opacity-50 select-none"
        />
        <div className="container-page relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-6">
            <h1 className="font-mono text-[clamp(38px,5.6vw,68px)] leading-[1.04] font-normal tracking-[-0.03em] text-accent">
              Impulsamos tu evolución digital con IA, tecnología y datos
            </h1>
            <p className="max-w-[48ch] text-lg leading-relaxed text-ink md:text-xl">
              Más de 25 años acompañando a organizaciones de Latinoamérica en sistemas críticos, cloud, desarrollo y
              seguridad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/services">Ver soluciones</Button>
              <Button href="/contact" variant="secondary">
                Hablemos
              </Button>
            </div>
          </div>
          <ul className="grid gap-4">
            {pillars.map((p) => (
              <li key={p.title}>
                <Link
                  href={p.href}
                  className="group flex items-start justify-between gap-6 rounded-2xl border border-accent/30 bg-panel/80 p-6 backdrop-blur-sm transition-colors hover:border-accent"
                >
                  <div>
                    <h2 className="font-mono text-xl text-accent">{p.title}</h2>
                    <p className="mt-2 text-ink/90">{p.text}</p>
                  </div>
                  <Arrow className="mt-1.5 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mejora: se quitó el filtro "Casos" que tenía una sola opción y no filtraba nada. */}
      <Section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <H2>Casos de éxito</H2>
          <Button href="/cases" variant="link">
            Ver todos los casos
          </Button>
        </div>
        <CaseCards />
      </Section>

      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-line">
          <img src={img("unSoloEquipo.png")} alt="Equipo de Preteco trabajando juntos" className="h-[460px] w-full object-cover md:h-[520px]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 md:p-12">
            <p className="font-mono text-accent">#unsoloequipo</p>
            <p className="max-w-[24ch] font-mono text-[clamp(26px,3.4vw,42px)] leading-tight text-ink">
              Somos más que una consultora. Somos un equipo que empuja en la misma dirección.
            </p>
            <div>
              <Button href="/about-us">Conocenos</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <H2>Lo último del blog</H2>
          <Button href="/blogs" variant="link">
            Ver todas las notas
          </Button>
        </div>
        <PostCards limit={3} />
      </Section>

      <Section>
        <ContactForm title="¿Querés vernos en acción?" text="Completá el formulario y coordinamos una llamada sin compromiso." />
      </Section>
    </>
  );
}
