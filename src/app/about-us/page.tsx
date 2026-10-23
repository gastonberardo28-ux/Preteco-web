import { pageMeta } from "@/lib/seo";
import { autoText, resolveStats } from "@/lib/auto";
import { hourlyShuffle } from "@/lib/shuffle";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/ui";
import { TeamGrid } from "@/components/TeamGrid";
import { ContactForm } from "@/components/ContactForm";
import { team, values } from "@/content/collections/team";
import { aboutPage as c } from "@/content/pages/about";

/* NOSOTROS · textos en content/pages/about.ts · equipo y valores en content/collections/team.ts */

export const metadata = pageMeta(c.seo, "/about-us");

// El orden del equipo se mezcla cada hora para que todas las personas tengan visibilidad.
export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        text={c.hero.text}
        actions={c.hero.actions}
        stats={resolveStats(c.hero.stats)}
      />

      <Section>
        <SectionHeader eyebrow={c.values.eyebrow} title={c.values.title} text={c.values.text} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-3">
          {values.map((v, i) => (
            <li
              key={v}
              data-reveal
              style={{ ["--d" as string]: i % 3 }}
              className="spotlight glow-border flex items-baseline gap-4 rounded-2xl border border-line bg-surface/70 p-5 sm:gap-5 sm:rounded-3xl sm:p-6"
            >
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-base font-medium text-ink sm:text-lg">{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="equipo" tone="surface">
        <SectionHeader eyebrow={autoText(c.team.eyebrow)} title={c.team.title} text={c.team.text} />
        <div className="mt-12 md:mt-14">
          <TeamGrid people={hourlyShuffle(team)} showAll={c.team.showAll} showLess={c.team.showLess} />
        </div>
      </Section>

      <Section>
        <ContactForm id="sumate" variant="careers" title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}
