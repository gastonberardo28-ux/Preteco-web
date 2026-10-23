import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { PostCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { blogPage as c } from "@/content/pages/blog";

/* BLOG · textos en content/pages/blog.ts · artículos en la planilla de Google (docs/CMS-Y-LEADS.md) */

// El blog se lee de Google Sheets: la página se regenera cada 5 minutos.
export const revalidate = 300;

export const metadata = pageMeta(c.seo, "/blogs");

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} actions={c.hero.actions} />
      <Section>
        <PostCards layout="list" />
      </Section>
      <Section className="!pt-0">
        <ContactForm variant="blog" title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}
