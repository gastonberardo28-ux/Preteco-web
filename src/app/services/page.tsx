/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { H2, Section, Arrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { getService, serviceGroups, workSteps, tools } from "@/content/services";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Sistemas críticos, infraestructura, cloud, inteligencia artificial, seguridad y desarrollo de aplicaciones.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Mejora: el título original no tenía signos de pregunta ("¿Por qué elegir nuestros servicios"). */}
      <PageHero title="¿Por qué elegir nuestros servicios?" text="Acompañamos tu transformación digital de punta a punta." />

      {/* Mejora: los servicios ahora son links con flecha (antes eran texto suelto)
          y las cards no dejan grandes espacios vacíos. */}
      <Section>
        <ul className="grid gap-6">
          {serviceGroups.map((g, i) => (
            <li
              key={g.name}
              className={`grid items-center overflow-hidden rounded-3xl border border-line bg-panel md:grid-cols-[1fr_340px] ${
                i % 2 ? "md:grid-cols-[340px_1fr]" : ""
              }`}
            >
              <div className={`flex flex-col gap-5 p-7 md:p-10 ${i % 2 ? "md:order-2" : ""}`}>
                <h2 className="font-mono text-2xl text-ink md:text-[28px]">{g.name}</h2>
                <ul className="grid gap-2">
                  {g.slugs.map((slug) => {
                    const s = getService(slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}`}
                          className="group -mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface"
                        >
                          <span>
                            <span className="block text-xl font-medium text-accent">{s.overviewTitle}</span>
                            <span className="block text-ink/90">{s.overviewText}</span>
                          </span>
                          <Arrow className="text-accent" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={`flex h-full items-center justify-center bg-bg/60 p-8 ${i % 2 ? "md:order-1" : ""}`}>
                <img src={g.image} alt="" loading="lazy" className="max-h-[240px] w-auto" />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Mejora: los 5 pasos eran un carrusel donde solo se leía el primero;
          ahora se ven todos de un vistazo como línea de tiempo. */}
      <Section tone="surface">
        <H2>Así trabajamos en Preteco</H2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {workSteps.map((s, i) => (
            <li key={s.phase} className="relative flex flex-col gap-3 rounded-2xl border border-line bg-bg p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent font-mono text-lg text-bg">{i + 1}</span>
              <p className="text-xs tracking-[0.12em] text-muted uppercase">{s.phase}</p>
              <h3 className="text-xl font-medium text-accent">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink/90">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <H2>Herramientas y tecnologías</H2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tools.map((t) => (
            <div key={t.area} className="rounded-2xl border border-line p-6">
              <h3 className="text-lg font-medium text-accent">{t.area}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.items.map((x) => (
                  <li key={x} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-panel p-7">
            <h3 className="text-lg font-medium text-accent">PMO</h3>
            <p className="mt-3 text-ink/90">
              A través de nuestra PMO gestionamos los proyectos con un enfoque híbrido que combina estructura y agilidad.
              Esto nos permite adaptarnos con rapidez, sin perder calidad ni orden.
            </p>
          </div>
          <div className="rounded-2xl bg-accent p-7 text-bg">
            <h3 className="text-lg font-medium">El resultado</h3>
            <p className="mt-3">
              Soluciones listas para implementar, con menos riesgos, menor curva de aprendizaje y un impacto real, medible y
              sostenible.
            </p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm
          title="¿Querés ver cómo funciona en acción? Nosotros te mostramos."
          text="Completá el formulario y coordinamos una llamada sin compromiso."
        />
      </Section>
    </>
  );
}
