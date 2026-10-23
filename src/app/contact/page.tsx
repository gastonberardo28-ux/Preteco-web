import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { offices, COMPLIANCE_EMAIL } from "@/content/site";
import { contactPage as c } from "@/content/pages/contact";
import { Carousel } from "@/components/Carousel";

/* CONTACTO · textos en content/pages/contact.ts · oficinas en content/site.ts */

export const metadata = pageMeta(c.seo, "/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />
      <Section>
        <ContactForm title={c.form.title} text={c.form.text} />
      </Section>
      <Section tone="surface">
        <SectionHeader eyebrow={c.offices.eyebrow} title={c.offices.title} text={c.offices.text} />
        <Carousel until="md" label="Oficinas" className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {offices.map((o, i) => (
            <li key={o.city} data-reveal style={{ ["--d" as string]: i }}>
              <a
                href={o.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight glow-border group flex h-full flex-col gap-4 rounded-3xl border border-line bg-bg/60 p-5 md:p-6"
              >
                <IconTile name="mapPin" tone={i === 0 ? "lime" : "violet"} />
                <div className="flex-1">
                  <h3 className="t-h3">{o.city}</h3>
                  <address className="mt-1.5 text-[15px] text-muted not-italic">{o.address}</address>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
                  {c.offices.directions}
                  <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </Carousel>
        <p data-reveal className="mt-10 flex flex-wrap items-center gap-2 text-muted">
          <Icon name="mail" className="size-4 text-violet" />
          {c.complianceLabel}
          <a href={`mailto:${COMPLIANCE_EMAIL}`} className="link-underline inline-flex min-h-11 items-center text-ink hover:text-accent">
            {COMPLIANCE_EMAIL}
          </a>
        </p>
      </Section>
    </>
  );
}
