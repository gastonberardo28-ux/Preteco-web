import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Arrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { offices } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos y empezamos a construir juntos. Oficinas en Buenos Aires, Montevideo, La Paz y Santa Cruz.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Cada proyecto empieza con una buena conversación."
        text="Si tenés un desafío, una idea o una necesidad concreta, queremos escucharte. Escribinos y empezamos a construir juntos."
      />
      {/* Mejora: los 4 mapas embebidos hacían lenta la página y no se podían usar
          en mobile; ahora cada oficina tiene un link directo a "Cómo llegar". */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm title="Contanos en qué te podemos ayudar" text="Te respondemos a la brevedad para coordinar una llamada sin compromiso." />
          <aside aria-labelledby="oficinas">
            <h2 id="oficinas" className="font-mono text-2xl text-accent">Nuestras oficinas</h2>
            <ul className="mt-6 grid gap-4">
              {offices.map((o) => (
                <li key={o.city} className="rounded-2xl border border-line p-5">
                  <h3 className="text-lg font-medium text-ink">{o.city}</h3>
                  <address className="mt-1 text-[15px] text-muted not-italic">{o.address}</address>
                  <a
                    href={o.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-3 inline-flex items-center gap-1.5 text-[15px] text-accent hover:text-accent-hover"
                  >
                    Cómo llegar <Arrow external />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
