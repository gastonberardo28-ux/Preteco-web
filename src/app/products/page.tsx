/* eslint-disable @next/next/no-img-element */
import { img } from "@/lib/asset";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { products } from "@/content/collections/products";
import { productsPage as c } from "@/content/pages/products";
import { Carousel } from "@/components/Carousel";

/* PRODUCTOS · textos en content/pages/products.ts · productos en content/collections/products.ts */

export const metadata = pageMeta(c.seo, "/products");

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} actions={c.hero.actions} />

      <Section>
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader eyebrow={c.intro.eyebrow} title={c.intro.title} />
            {c.intro.paragraphs.map((p, i) => (
              <p key={i} data-reveal style={{ ["--d" as string]: i + 2 }} className="t-lead">
                {p}
              </p>
            ))}
          </div>
          <div data-reveal="scale" className="overflow-hidden rounded-[28px] border border-line md:rounded-[32px]">
            <div data-parallax="0.06" className="-my-10">
              <img src={img("product.png")} alt="" loading="lazy" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="productos" tone="surface">
        <SectionHeader eyebrow={c.list.eyebrow} title={c.list.title} />
        <Carousel until="md" label="Productos" className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {products.map((p, i) => (
            <li
              key={p.id}
              data-reveal
              style={{ ["--d" as string]: i % 2 }}
              className="spotlight glow-border group relative flex flex-col gap-5 overflow-hidden rounded-[28px] border border-line bg-bg/60 p-6 md:p-8"
            >
              <div className="flex h-10 items-center justify-between gap-4">
                {/* Logos con proporciones muy distintas: igualamos su área visual (no su altura) */}
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  style={logoSize(p.logoRatio)}
                  className="min-w-0 object-contain object-left"
                />
                <span className="shrink-0 font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="t-h3 md:text-2xl">{p.title}</h3>
              <p className="flex-1 text-muted">{p.text}</p>
              <a href="#formulario" className="group/link inline-flex min-h-11 items-center gap-2 self-start border-t border-line pt-4 font-medium text-accent">
                <span className="link-underline">
                  {c.list.cta} {p.name}
                </span>
                <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </li>
          ))}
        </Carousel>
      </Section>

      <Section>
        <ContactForm title={c.form.title} text={c.form.text} defaultInterest={c.form.interest} />
      </Section>
    </>
  );
}

/** Tamaño del logo para un área visual pareja (~3600 px²), con alto máximo de 36 px y ancho máximo de 160 px. */
function logoSize(ratio: number) {
  const h = Math.min(36, Math.sqrt(3600 / ratio), 160 / ratio);
  return { height: `${Math.round(h)}px`, width: `${Math.round(h * ratio)}px` };
}
