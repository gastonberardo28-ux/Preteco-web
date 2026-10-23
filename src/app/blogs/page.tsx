import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Section } from "@/components/ui";
import { PostCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";

// El blog se lee de Google Sheets: la página se regenera cada 5 minutos.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description: "Tendencias, buenas prácticas y aprendizajes sobre IA, cloud, datos y seguridad.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas que suman. Experiencia que se comparte."
        text="Tendencias, buenas prácticas y aprendizajes de nuestro trabajo diario."
        actions={
          <Button href="#formulario" variant="secondary" size="lg">
            Proponé un post
          </Button>
        }
      />
      <Section>
        <PostCards />
      </Section>
      <Section className="!pt-0">
        <ContactForm variant="blog" title="¿Querés sumar tu mirada?" text="Completá el formulario y envianos tu idea de post." />
      </Section>
    </>
  );
}
