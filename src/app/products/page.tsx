/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { img } from "@/lib/asset";
import { PageHero } from "@/components/PageHero";
import { H2, Section, Button } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { products } from "@/content/company";

export const metadata: Metadata = {
  title: "Productos",
  description: "Comercializamos e implementamos Oracle, Okta, MuleSoft y AWS para empresas.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Soluciones tecnológicas que impulsan el crecimiento de tu empresa"
        text="En Preteco comercializamos e implementamos productos líderes en hardware y software que mejoran la productividad, optimizan procesos y garantizan la seguridad de tu infraestructura."
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <H2>¿Qué ofrecemos?</H2>
            <p className="text-lg leading-relaxed text-ink">
              No solo diseñamos e implementamos soluciones de transformación digital: también proveemos tecnología
              empresarial de primer nivel para asegurar el máximo rendimiento de tus operaciones.
            </p>
            <p className="text-lg leading-relaxed text-ink">
              Trabajamos con Oracle, Okta, MuleSoft y AWS, líderes mundiales que garantizan un stack robusto, probado y
              adaptable a las necesidades de tu organización.
            </p>
          </div>
          <img src={img("product.png")} alt="" loading="lazy" className="w-full rounded-3xl object-cover" />
        </div>
      </Section>

      {/* Mejora: cada producto tiene título propio y el CTA lleva al formulario con el producto ya elegido. */}
      <Section tone="surface">
        <H2>Nuestros productos tecnológicos</H2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <li key={p.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-bg p-7">
              <img src={p.logo} alt={p.name} loading="lazy" className="h-10 w-auto self-start" />
              <h3 className="text-xl font-medium text-accent">{p.title}</h3>
              <p className="flex-1 text-ink/90">{p.text}</p>
              <div>
                <Button href="#formulario" variant="link">
                  Consultar por {p.name}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <ContactForm
          title="¿Listo para llevar tu tecnología empresarial al siguiente nivel?"
          text="Diseñamos la arquitectura que tu negocio necesita. Contactanos y te ayudamos a implementar un ecosistema digital robusto y escalable."
          defaultInterest="Productos (Oracle, Okta, MuleSoft, AWS)"
        />
      </Section>
    </>
  );
}
