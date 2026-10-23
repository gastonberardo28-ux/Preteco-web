/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { img } from "@/lib/asset";
import { resolveStats } from "@/lib/auto";
import { Actions, Button, Section, SectionHeader, rich } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CaseCards, PostCards } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { services, serviceGroups } from "@/content/collections/services";
import { serviceIcon, groupIcon } from "@/content/icons";
import { home as c } from "@/content/pages/home";

/* HOME · textos en content/pages/home.ts */

// El blog se lee de Google Sheets: la página se regenera cada 5 minutos.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <PageHero
        variant="home"
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        text={c.hero.text}
        actions={c.hero.actions}
        aside={
          <ul className="grid gap-3 sm:gap-4">
            {c.hero.pillars.map((p, i) => (
              <li key={p.title} data-reveal="left" style={{ ["--d" as string]: i + 2 }}>
                <Link
                  href={p.href}
                  className="spotlight glow-border group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur-md sm:items-start sm:gap-5 sm:rounded-3xl sm:p-6"
                >
                  <IconTile name={p.icon} tone={i === 0 ? "lime" : "violet"} />
                  <div className="flex-1">
                    <h2 className="t-h3">{p.title}</h2>
                    <p className="mt-1.5 hidden text-[15px] text-muted sm:block">{p.text}</p>
                  </div>
                  <Icon name="arrowRight" className="size-5 text-accent transition-transform duration-300 group-hover:translate-x-1 sm:mt-1" />
                </Link>
              </li>
            ))}
          </ul>
        }
        stats={resolveStats(c.hero.stats)}
      />

      {/* Servicios en un vistazo */}
      <Section>
        <SectionHeader
          eyebrow={c.services.eyebrow}
          title={c.services.title}
          text={c.services.text}
          action={
            <Button href={c.services.link.href} variant="tertiary">
              {c.services.link.label}
            </Button>
          }
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {services.map((s, i) => {
            const group = serviceGroups.find((g) => g.slugs.includes(s.slug));
            const featured = i === 0;
            return (
              <li key={s.slug} data-reveal style={{ ["--d" as string]: i % 4 }} className={featured ? "lg:col-span-2 lg:row-span-2" : ""}>
                <Link
                  href={`/services/${s.slug}`}
                  className={`spotlight glow-border group flex h-full flex-col gap-5 rounded-3xl border border-line bg-surface/70 p-6 ${featured ? "lg:p-9" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <IconTile name={serviceIcon[s.slug]} tone={featured ? "lime" : "violet"} size={featured ? "lg" : "md"} />
                    <span className="flex max-w-[60%] items-start justify-end gap-1.5 text-right text-xs text-muted">
                      {group && <Icon name={groupIcon[group.name]} className="mt-px size-3.5" />}
                      <span>{s.category}</span>
                    </span>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <h3 className={`t-h3 ${featured ? "lg:text-3xl" : ""}`}>{s.menuLabel}</h3>
                    {/* En mobile todas las tarjetas muestran el texto corto; la destacada suma el largo en desktop */}
                    <p className={`text-[15px] text-muted ${featured ? "lg:hidden" : ""}`}>{s.overviewText}</p>
                    {featured && <p className="hidden text-lg text-muted lg:block">{s.what}</p>}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Conocer más <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
          <li data-reveal style={{ ["--d" as string]: 3 }} className="lg:col-span-2">
            <Link
              href={c.services.cta.href}
              className="group flex h-full flex-col justify-between gap-6 rounded-3xl bg-gradient-to-br from-accent to-accent-soft p-6 text-bg transition-transform duration-500 hover:-translate-y-1 md:p-7"
            >
              <Icon name="message" className="size-7" />
              <div>
                <p className="t-h3 text-bg">{c.services.cta.title}</p>
                <p className="mt-1.5 text-[15px] text-bg/75">{c.services.cta.text}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                {c.services.cta.label} <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow={c.cases.eyebrow}
          title={c.cases.title}
          action={
            <Button href={c.cases.link.href} variant="tertiary">
              {c.cases.link.label}
            </Button>
          }
        />
        <div className="mt-12 md:mt-14">
          <CaseCards />
        </div>
      </Section>

      <Section>
        <div data-reveal="scale" className="relative overflow-hidden rounded-[28px] border border-line md:rounded-[32px]">
          <div data-parallax="0.08" className="absolute -inset-y-16 inset-x-0">
            <img src={img("unSoloEquipo.png")} alt="" className="size-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/30 md:bg-gradient-to-r md:from-bg md:via-bg/80 md:to-bg/20" />
          <div className="relative flex min-h-[460px] flex-col justify-end gap-6 p-6 md:min-h-[540px] md:justify-center md:p-16">
            <p className="t-eyebrow">{c.team.eyebrow}</p>
            <p className="t-h2 max-w-[18ch]">{rich(c.team.title)}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Actions items={c.team.actions} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader
          eyebrow={c.blog.eyebrow}
          title={c.blog.title}
          action={
            <Button href={c.blog.link.href} variant="tertiary">
              {c.blog.link.label}
            </Button>
          }
        />
        <div className="mt-12 md:mt-14">
          <PostCards limit={3} />
        </div>
      </Section>

      <Section>
        <ContactForm title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}
