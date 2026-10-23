import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { CaseCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { casesPage as c } from "@/content/pages/cases";

/* CASOS · textos en content/pages/cases.ts · casos en content/collections/cases.ts */

export const metadata = pageMeta(c.seo, "/cases");

export default function CasesPage() {
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} actions={c.hero.actions} />
      <Section>
        <CaseCards headingLevel="h2" />
      </Section>
      <Section className="!pt-0">
        <ContactForm title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}
