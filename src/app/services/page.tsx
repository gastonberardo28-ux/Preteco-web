/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { Carousel } from "@/components/Carousel";
import { getService, serviceGroups, workSteps, tools } from "@/content/collections/services";
import { servicesPage as c } from "@/content/pages/services";
import { pageMeta } from "@/lib/seo";
import { groupIcon, serviceIcon } from "@/content/icons";

/* SERVICIOS · textos en content/pages/services.ts · servicios en content/collections/services.ts */

export const metadata = pageMeta(c.seo, "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        text={c.hero.text}
      >
        <ul data-reveal style={{ ["--d" as string]: 5 }} className="flex flex-wrap gap-2 pt-2">
          {serviceGroups.map((g) => (
            <li key={g.name}>
              <a
                href={`#${slug(g.name)}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface/60 px-4 text-sm text-text transition-colors hover:border-violet hover:text-violet-soft"
              >
                {g.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <ul className="grid gap-8">
          {serviceGroups.map((g, i) => (
            <li
              key={g.name}
              id={slug(g.name)}
              data-reveal
              className="spotlight grid items-stretch overflow-hidden rounded-[32px] border border-line bg-surface/70 lg:grid-cols-[1fr_400px]"
            >
              <div className={`flex flex-col gap-5 p-5 sm:p-7 md:gap-6 md:p-10 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-4">
                  <IconTile name={groupIcon[g.name]} tone="lime" size="lg" />
                  <div>
                    <p className="t-eyebrow text-xs">Área {String(i + 1).padStart(2, "0")}</p>
                    <h2 className="t-h2 text-[clamp(24px,2.6vw,34px)]">{g.name}</h2>
                  </div>
                </div>
                <ul className="grid gap-2">
                  {g.slugs.map((s) => {
                    const svc = getService(s)!;
                    return (
                      <li key={s}>
                        <Link
                          href={`/services/${s}`}
                          className="group -mx-2 flex items-center gap-3 rounded-2xl border border-transparent px-2 py-3 transition-colors hover:border-line hover:bg-bg/50 sm:-mx-3 sm:gap-4 sm:px-3 sm:py-4"
                        >
                          <Icon name={serviceIcon[s]} className="hidden size-6 text-violet sm:block" />
                          <span className="flex-1">
                            <span className="block text-lg leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent sm:text-xl">
                              {svc.overviewTitle}
                            </span>
                            <span className="mt-1 block leading-snug text-muted">{svc.overviewText}</span>
                          </span>
                          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                            <Icon name="arrowRight" className="size-4" />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={`relative flex items-center justify-center overflow-hidden bg-bg/60 px-6 py-5 sm:p-10 ${i % 2 ? "lg:order-1" : ""}`}>
                <div aria-hidden="true" className="absolute size-64 rounded-full bg-accent/15 blur-[70px]" />
                <img src={g.image} alt="" loading="lazy" className="relative max-h-[110px] w-auto animate-float sm:max-h-[260px]" style={{ animationDelay: `${-i * 1.7}s` }} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Metodología: línea de tiempo que se dibuja al hacer scroll */}
      <Section tone="surface">
        <SectionHeader
          eyebrow={c.method.eyebrow}
          title={c.method.title}
          text={c.method.text}
        />
        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[27px] w-px bg-line lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <div
            aria-hidden="true"
            data-draw
            className="absolute top-0 bottom-0 left-[27px] w-px bg-gradient-to-b from-violet to-accent lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {workSteps.map((s, i) => (
              <li key={s.phase} data-reveal style={{ ["--d" as string]: i }} className="flex gap-5 lg:flex-col">
                <span className="relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-lg tracking-tight text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs tracking-[0.14em] text-violet uppercase">{s.phase}</p>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={c.stack.eyebrow} title={c.stack.title} />
        <Carousel until="lg" label="Herramientas" className="mt-12 grid gap-5 lg:grid-cols-3">
          {tools.map((t, i) => (
            <li key={t.area} data-reveal style={{ ["--d" as string]: i }} className="spotlight glow-border rounded-3xl border border-line bg-surface/70 p-6 md:p-7">
              <h3 className="t-h3">{t.area}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.items.map((x) => (
                  <li key={x} className="rounded-full border border-line bg-bg/60 px-3 py-1 font-mono text-[13px] text-text">
                    {x}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Carousel>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div data-reveal className="spotlight rounded-3xl border border-violet/30 bg-violet-deep/40 p-6 md:p-8">
            <h3 className="t-h3">{c.stack.pmo.title}</h3>
            <p className="mt-4 text-text/90">{c.stack.pmo.text}</p>
          </div>
          <div data-reveal style={{ ["--d" as string]: 1 }} className="rounded-3xl bg-gradient-to-br from-accent to-accent-soft p-6 text-bg md:p-8">
            <h3 className="text-xl font-semibold">{c.stack.result.title}</h3>
            <p className="mt-4 text-bg/85">{c.stack.result.text}</p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
