import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Section } from "@/components/ui";
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
        eyebrow="Casos de éxito"
        title="Historias reales, resultados concretos."
        text="Descubrí cómo ayudamos a distintas organizaciones a transformar sus desafíos en soluciones reales."
        actions={
          <Button href="#formulario" variant="secondary" size="lg">
            Contanos tu desafío
          </Button>
        }
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
