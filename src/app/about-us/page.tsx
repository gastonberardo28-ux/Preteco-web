/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { H2, Section, Lead } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { team, values } from "@/content/company";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Somos más que una consultora: un equipo que se integra con el tuyo para construir soluciones reales.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="Somos más que una consultora." text="Somos un equipo que empuja en la misma dirección." />

      <Section>
        <H2>Nuestra forma de hacer</H2>
        <Lead className="mt-4">
          En Preteco no trabajamos solos. Nos integramos con los equipos de nuestros clientes, entendemos sus desafíos y
          construimos juntos soluciones reales.
        </Lead>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <li key={v} className="flex items-center gap-4 rounded-2xl border border-line p-6">
              <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg text-ink">{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Mejora: el equipo se veía en un carrusel de 8 páginas, sin nombres.
          Ahora es una grilla completa con el nombre de cada persona. */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <H2>Nuestro equipo</H2>
            <Lead className="mt-4">
              Nos guía la escucha, la adaptabilidad y el compromiso. Creemos en procesos flexibles, personas expertas y
              resultados compartidos.
            </Lead>
          </div>
          <p className="font-mono text-accent">{team.length} personas</p>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {team.map((m) => (
            <li key={m.name} className="flex flex-col items-center gap-3 text-center">
              <img
                src={m.photo}
                alt=""
                loading="lazy"
                width={120}
                height={120}
                className="aspect-square w-full max-w-[120px] rounded-full border border-line object-cover"
              />
              <span className="text-sm leading-tight text-ink">{m.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <ContactForm
          variant="careers"
          title="¿Querés sumarte al equipo?"
          text="Completá el formulario y sumate a nuestra base de talentos."
        />
      </Section>
    </>
  );
}
