/* eslint-disable @next/next/no-img-element */
import { img, asset } from "@/lib/asset";
import { pageMeta } from "@/lib/seo";
import { resolveStats } from "@/lib/auto";
import { PageHero } from "@/components/PageHero";
import { Button, Check, Section, SectionHeader } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { Accordion } from "@/components/Accordion";
import { ContactForm } from "@/components/ContactForm";
import { codesOfConduct, compliancePillars, frameworks, vendorTrust } from "@/content/collections/compliance";
import { pillarIcons } from "@/content/icons";
import { compliancePage as c } from "@/content/pages/compliance";

/* COMPLIANCE · textos en content/pages/compliance.ts · pilares, códigos y fabricantes en content/collections/compliance.ts */

export const metadata = pageMeta(c.seo, "/compliance");

export default function CompliancePage() {
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
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeader eyebrow={c.mission.eyebrow} title={c.mission.title} />
            <p data-reveal style={{ ["--d" as string]: 2 }} className="t-lead">
              {c.mission.text}
            </p>
          </div>
          <div data-reveal="scale" className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[15%] -z-10 rounded-full bg-violet/20 blur-[80px]" />
            <img src={img("integridadSosteniblev2.png")} alt="" loading="lazy" className="w-full animate-float rounded-[28px] md:rounded-[32px]" />
          </div>
        </div>
      </Section>

      <Section id="pilares" tone="surface">
        <SectionHeader eyebrow={c.pillars.eyebrow} title={c.pillars.title} />
        <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-[1fr_360px] lg:gap-8">
          <Accordion
            items={compliancePillars.map((p, i) => ({
              title: p.title,
              icon: pillarIcons[i],
              content: (
                <>
                  <ul className="grid gap-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <Check className="mt-0.5" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <div className="mt-6">
                      <Button href={p.link.href} variant="secondary" className="w-full sm:w-auto">
                        {p.link.label}
                      </Button>
                    </div>
                  )}
                </>
              ),
            }))}
          />
          <aside data-reveal className="h-fit rounded-3xl border border-violet/30 bg-violet-deep/40 p-6 md:p-7 lg:sticky lg:top-28">
            <IconTile name="book" />
            <h3 className="t-h3 mt-5">{c.pillars.codesTitle}</h3>
            <p className="mt-2 text-muted">{c.pillars.codesText}</p>
            <ul className="mt-6 grid gap-3">
              {codesOfConduct.map((code) => (
                <li key={code.href}>
                  <a
                    href={asset(code.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-bg/60 px-4 py-3 text-ink transition-colors hover:border-accent"
                  >
                    <Icon name="file" className="size-5 text-violet" />
                    <span className="flex-1 text-[15px]">
                      {code.label}
                      <span className="block text-xs text-muted">PDF</span>
                    </span>
                    <Icon name="download" className="size-4 text-accent transition-transform group-hover:translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={c.data.eyebrow} title={c.data.title} text={c.data.text} />
        <ul className="mt-8 flex flex-wrap gap-2">
          {frameworks.map((f, i) => (
            <li
              key={f}
              data-reveal="scale"
              style={{ ["--d" as string]: i % 5 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/10 px-3 py-1.5 font-mono text-sm text-violet-soft"
            >
              <Icon name="shield" className="size-3.5" />
              {f}
            </li>
          ))}
        </ul>

        {/* Mobile: una tarjeta por fabricante (la tabla obligaba a scrollear de costado) */}
        <ul className="mt-10 grid gap-3 md:hidden">
          {vendorTrust.map((v) => (
            <li key={v.vendor} className="rounded-2xl border border-line bg-surface/60 p-5">
              <p className="font-semibold text-ink">{v.vendor}</p>
              <div className="mt-1 flex flex-wrap gap-x-6">
                <ExtLink href={v.trust}>{c.data.trustLabel}</ExtLink>
                {v.privacy && <ExtLink href={v.privacy}>{c.data.privacyLabel}</ExtLink>}
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop: tabla */}
        <div data-reveal className="mt-12 hidden overflow-hidden rounded-3xl border border-line md:block">
          <table className="w-full text-left">
            <caption className="sr-only">Políticas y certificaciones de cada fabricante</caption>
            <thead className="bg-surface text-sm text-muted">
              <tr>
                <th scope="col" className="px-6 py-4 font-normal">Fabricante</th>
                <th scope="col" className="px-6 py-4 font-normal">Trust center</th>
                <th scope="col" className="px-6 py-4 font-normal">Datos personales</th>
              </tr>
            </thead>
            <tbody>
              {vendorTrust.map((v) => (
                <tr key={v.vendor} className="border-t border-line transition-colors hover:bg-surface/60">
                  <th scope="row" className="px-6 py-4 font-semibold text-ink">{v.vendor}</th>
                  <td className="px-6 py-2">
                    <ExtLink href={v.trust}>{c.data.trustLabel}</ExtLink>
                  </td>
                  <td className="px-6 py-2">
                    {v.privacy ? <ExtLink href={v.privacy}>{c.data.privacyLabel}</ExtLink> : <span className="text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm variant="compliance" title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 items-center gap-1.5 self-start text-accent hover:text-accent-hover"
    >
      <span className="link-underline">{children}</span>
      <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
