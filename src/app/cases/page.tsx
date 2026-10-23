import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { CaseCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description: "Cómo ayudamos a EPEC, Federación Patronal e INDEC a transformar sus desafíos en soluciones reales.",
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Historias reales, <br className="hidden md:block" />
            resultados concretos.
          </>
        }
        text="Descubrí cómo ayudamos a distintas organizaciones a transformar sus desafíos en soluciones reales."
      />
      <Section>
        <CaseCards headingLevel="h2" />
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
