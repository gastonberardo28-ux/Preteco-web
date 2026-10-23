/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Section, SectionHeader, Hl } from "@/components/ui";
import { IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { team, values } from "@/content/company";
import { valueIcons } from "@/content/icons";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Somos más que una consultora: un equipo que se integra con el tuyo para construir soluciones reales.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Somos más que una consultora."
        text="Somos un equipo que empuja en la misma dirección: nos integramos con el tuyo, entendemos tus desafíos y construimos juntos."
        actions={
          <>
            <Button href="#equipo" size="lg">
              Conocé al equipo
            </Button>
            <Button href="#sumate" variant="secondary" size="lg">
              Trabajá con nosotros
            </Button>
          </>
        }
        stats={[
          { value: 25, prefix: "+", label: "años de trayectoria" },
          { value: team.length, label: "personas" },
          { value: 3, label: "países" },
          { value: values.length, label: "valores que nos guían" },
        ]}
      />

      <Section>
        <SectionHeader
          eyebrow="Cultura"
          title={
            <>
              Nuestra forma <Hl>de hacer</Hl>
            </>
          }
          text="En Preteco no trabajamos solos. Nos integramos con los equipos de nuestros clientes, entendemos sus desafíos y construimos juntos soluciones reales."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <li
              key={v}
              data-reveal
              style={{ ["--d" as string]: i % 3 }}
              className="spotlight glow-border flex items-center gap-5 rounded-3xl border border-line bg-surface/70 p-6"
            >
              <IconTile name={valueIcons[i]} tone={i % 2 ? "violet" : "lime"} />
              <span className="text-lg font-medium text-ink">{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="equipo" tone="surface">
        <SectionHeader
          eyebrow={`${team.length} personas`}
          title="Nuestro equipo"
          text="Nos guía la escucha, la adaptabilidad y el compromiso. Creemos en procesos flexibles, personas expertas y resultados compartidos."
        />
        <ul className="mt-14 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {team.map((m, i) => (
            <li key={m.name} data-reveal="scale" style={{ ["--d" as string]: i % 8 }} className="group flex flex-col items-center gap-3 text-center">
              <div className="relative aspect-square w-full max-w-[120px]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet to-accent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                />
                <img
                  src={m.photo}
                  alt=""
                  loading="lazy"
                  width={120}
                  height={120}
                  className="relative size-full rounded-full border border-line object-cover grayscale-[35%] transition duration-500 group-hover:grayscale-0"
                />
              </div>
              <span className="text-sm leading-tight text-text transition-colors group-hover:text-accent">{m.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <ContactForm
          id="sumate"
          variant="careers"
          title="¿Querés sumarte al equipo?"
          text="Completá el formulario y sumate a nuestra base de talentos."
        />
      </Section>
    </>
  );
}
