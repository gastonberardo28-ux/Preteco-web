import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { offices, COMPLIANCE_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos y empezamos a construir juntos. Oficinas en Buenos Aires, Montevideo, La Paz y Santa Cruz.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Cada proyecto empieza con una buena conversación."
        text="Si tenés un desafío, una idea o una necesidad concreta, queremos escucharte. Escribinos y empezamos a construir juntos."
      />
      <Section>
        <ContactForm title="Contanos en qué te podemos ayudar" text="Te respondemos a la brevedad para coordinar una llamada sin compromiso." />
      </Section>
      <Section tone="surface">
        <SectionHeader eyebrow="Oficinas" title="Estamos cerca" text="Equipos en Argentina, Uruguay y Bolivia." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((o, i) => (
            <li key={o.city} data-reveal style={{ ["--d" as string]: i }}>
              <a
                href={o.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight glow-border group flex h-full flex-col gap-4 rounded-3xl border border-line bg-bg/60 p-6"
              >
                <IconTile name="mapPin" tone={i === 0 ? "lime" : "violet"} />
                <div className="flex-1">
                  <h3 className="t-h3">{o.city}</h3>
                  <address className="mt-1.5 text-[15px] text-muted not-italic">{o.address}</address>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
                  Cómo llegar
                  <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-10 flex flex-wrap items-center gap-2 text-muted">
          <Icon name="mail" className="size-4 text-violet" />
          Consultas de compliance:
          <a href={`mailto:${COMPLIANCE_EMAIL}`} className="link-underline text-ink hover:text-accent">
            {COMPLIANCE_EMAIL}
          </a>
        </p>
      </Section>
    </>
  );
}
