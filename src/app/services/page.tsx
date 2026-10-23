/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader, Hl } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { getService, serviceGroups, workSteps, tools } from "@/content/services";
import { groupIcon, serviceIcon, stepIcons, toolIcons } from "@/content/icons";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Sistemas críticos, infraestructura, cloud, inteligencia artificial, seguridad y desarrollo de aplicaciones.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="¿Por qué elegir nuestros servicios?"
        text="Acompañamos tu transformación digital de punta a punta: cinco áreas, un mismo equipo y una forma de trabajar probada en sectores críticos."
      >
        <ul data-reveal style={{ ["--d" as string]: 5 }} className="flex flex-wrap gap-2 pt-2">
          {serviceGroups.map((g) => (
            <li key={g.name}>
              <a
                href={`#${slug(g.name)}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-text transition-colors hover:border-violet hover:text-violet-soft"
              >
                <Icon name={groupIcon[g.name]} className="size-4 text-violet" />
                {g.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <ul className="grid gap-8">
          {serviceGroups.map((g, i) => (
            <li
              key={g.name}
              id={slug(g.name)}
              data-reveal
              className="spotlight grid items-stretch overflow-hidden rounded-[32px] border border-line bg-surface/70 lg:grid-cols-[1fr_400px]"
            >
              <div className={`flex flex-col gap-6 p-7 md:p-10 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-4">
                  <IconTile name={groupIcon[g.name]} tone="lime" size="lg" />
                  <div>
                    <p className="t-eyebrow text-[11px]">Área {String(i + 1).padStart(2, "0")}</p>
                    <h2 className="t-h2 text-[clamp(26px,2.6vw,34px)]">{g.name}</h2>
                  </div>
                </div>
                <ul className="grid gap-2">
                  {g.slugs.map((s) => {
                    const svc = getService(s)!;
                    return (
                      <li key={s}>
                        <Link
                          href={`/services/${s}`}
                          className="group -mx-3 flex items-center gap-4 rounded-2xl border border-transparent px-3 py-4 transition-colors hover:border-line hover:bg-bg/50"
                        >
                          <Icon name={serviceIcon[s]} className="size-6 text-violet" />
                          <span className="flex-1">
                            <span className="block text-xl font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                              {svc.overviewTitle}
                            </span>
                            <span className="block text-muted">{svc.overviewText}</span>
                          </span>
                          <span className="inline-flex size-10 items-center justify-center rounded-full border border-line text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                            <Icon name="arrowRight" className="size-4" />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={`relative flex items-center justify-center overflow-hidden bg-bg/60 p-10 ${i % 2 ? "lg:order-1" : ""}`}>
                <div aria-hidden="true" className="absolute size-64 rounded-full bg-accent/15 blur-[70px]" />
                <img src={g.image} alt="" loading="lazy" className="relative max-h-[260px] w-auto animate-float" style={{ animationDelay: `${-i * 1.7}s` }} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Metodología: línea de tiempo que se dibuja al hacer scroll */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Metodología"
          title={
            <>
              Así trabajamos en <Hl>Preteco</Hl>
            </>
          }
          text="Cinco etapas claras, del primer café a la evolución continua de la solución."
        />
        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[27px] w-px bg-line lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <div
            aria-hidden="true"
            data-draw
            className="absolute top-0 bottom-0 left-[27px] w-px bg-gradient-to-b from-violet to-accent lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {workSteps.map((s, i) => (
              <li key={s.phase} data-reveal style={{ ["--d" as string]: i }} className="flex gap-5 lg:flex-col">
                <span className="relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border border-violet/40 bg-bg text-violet shadow-[0_0_30px_-8px_rgb(165_148_255/0.6)]">
                  <Icon name={stepIcons[i]} className="size-6" />
                </span>
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {s.phase}
                  </p>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Stack" title="Herramientas y tecnologías" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tools.map((t, i) => (
            <div key={t.area} data-reveal style={{ ["--d" as string]: i }} className="spotlight glow-border rounded-3xl border border-line bg-surface/70 p-7">
              <div className="flex items-center gap-3">
                <IconTile name={toolIcons[t.area] ?? "box"} />
                <h3 className="t-h3">{t.area}</h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.items.map((x) => (
                  <li key={x} className="rounded-full border border-line bg-bg/60 px-3 py-1 font-mono text-[13px] text-text">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div data-reveal className="spotlight rounded-3xl border border-violet/30 bg-violet-deep/40 p-8">
            <div className="flex items-center gap-3">
              <IconTile name="layers" />
              <h3 className="t-h3">PMO</h3>
            </div>
            <p className="mt-4 text-text/90">
              A través de nuestra PMO gestionamos los proyectos con un enfoque híbrido que combina estructura y agilidad. Esto
              nos permite adaptarnos con rapidez, sin perder calidad ni orden.
            </p>
          </div>
          <div data-reveal style={{ ["--d" as string]: 1 }} className="rounded-3xl bg-gradient-to-br from-accent to-accent-soft p-8 text-bg">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-bg/10">
                <Icon name="target" className="size-5" />
              </span>
              <h3 className="text-xl font-semibold">El resultado</h3>
            </div>
            <p className="mt-4 text-bg/85">
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

function slug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
