/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { img } from "@/lib/asset";
import { PageHero } from "@/components/PageHero";
import { Button, Section, SectionHeader, Hl } from "@/components/ui";
import { Icon } from "@/components/Icon";
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
        eyebrow="Productos"
        title="Soluciones tecnológicas que impulsan el crecimiento de tu empresa"
        text="Comercializamos e implementamos productos líderes en hardware y software que mejoran la productividad, optimizan procesos y garantizan la seguridad de tu infraestructura."
        actions={
          <>
            <Button href="#productos" size="lg">
              Ver productos
            </Button>
            <Button href="#formulario" variant="secondary" size="lg">
              Consultar
            </Button>
          </>
        }
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Qué ofrecemos"
              title={
                <>
                  Tecnología empresarial <Hl>de primer nivel</Hl>
                </>
              }
            />
            <p data-reveal style={{ ["--d" as string]: 2 }} className="t-lead">
              No solo diseñamos e implementamos soluciones de transformación digital: también proveemos tecnología
              empresarial para asegurar el máximo rendimiento de tus operaciones.
            </p>
            <p data-reveal style={{ ["--d" as string]: 3 }} className="t-lead">
              Trabajamos con Oracle, Okta, MuleSoft y AWS, líderes mundiales que garantizan un stack robusto, probado y
              adaptable a las necesidades de tu organización.
            </p>
          </div>
          <div data-reveal="scale" className="overflow-hidden rounded-[32px] border border-line">
            <div data-parallax="0.06" className="-my-10">
              <img src={img("product.png")} alt="" loading="lazy" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="productos" tone="surface">
        <SectionHeader eyebrow="Portfolio" title="Nuestros productos tecnológicos" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <li
              key={p.id}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className="spotlight glow-border group relative flex flex-col gap-5 overflow-hidden rounded-[28px] border border-line bg-bg/60 p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <img src={p.logo} alt={p.name} loading="lazy" className="h-10 w-auto" />
                <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="t-h3 text-2xl">{p.title}</h3>
              <p className="flex-1 text-muted">{p.text}</p>
              <a
                href="#formulario"
                className="group/link inline-flex items-center gap-2 self-start border-t border-line pt-4 font-medium text-accent"
              >
                <span className="link-underline">Consultar por {p.name}</span>
                <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
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
