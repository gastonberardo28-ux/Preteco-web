/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { img, asset } from "@/lib/asset";
import { PageHero } from "@/components/PageHero";
import { Button, Check, Section, SectionHeader, Hl } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { Accordion } from "@/components/Accordion";
import { ContactForm } from "@/components/ContactForm";
import { codesOfConduct, compliancePillars, frameworks, vendorTrust } from "@/content/company";
import { pillarIcons } from "@/content/icons";
import { COMPLIANCE_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Compliance",
  description: "Compliance, gestión de riesgos y control interno de vanguardia para la era digital.",
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Transformamos la confianza en un sistema vivo"
        text="Compliance, gestión de riesgos y control interno de vanguardia para la era digital."
        actions={
          <>
            <Button href="#pilares" size="lg">
              Ver el programa
            </Button>
            <Button href={`mailto:${COMPLIANCE_EMAIL}`} variant="secondary" size="lg" icon="none">
              Escribirle al equipo
            </Button>
          </>
        }
        stats={[
          { value: 10259, prefix: "+", label: "días sin sanciones ni multas" },
          { value: 2, prefix: "+USD ", suffix: "M", label: "ahorrados previniendo incumplimientos" },
          { value: 822, label: "terceros bajo monitoreo continuo" },
          { value: compliancePillars.length, label: "pilares del programa" },
        ]}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeader
              eyebrow="Nuestra misión"
              title={
                <>
                  Integridad <Hl>sostenible</Hl>
                </>
              }
            />
            <p data-reveal style={{ ["--d" as string]: 2 }} className="t-lead">
              En Preteco, el cumplimiento no es reactivo. Nuestra gestión de riesgos y compliance se anticipa, evoluciona y
              actúa con base en estándares globales, tecnología segura y gobernanza ética.
            </p>
          </div>
          <div data-reveal="scale" className="relative">
            <div aria-hidden="true" className="absolute inset-[15%] -z-10 rounded-full bg-violet/20 blur-[80px]" />
            <img src={img("integridadSosteniblev2.png")} alt="" loading="lazy" className="w-full animate-float rounded-[32px]" />
          </div>
        </div>
      </Section>

      <Section id="pilares" tone="surface">
        <SectionHeader
          eyebrow="Cómo lo hacemos"
          title="Compliance, gestión de riesgos y control interno: los pilares de nuestro sistema"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
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
                      <Button href={p.link.href} variant="secondary">
                        {p.link.label}
                      </Button>
                    </div>
                  )}
                </>
              ),
            }))}
          />
          <aside data-reveal className="h-fit rounded-3xl border border-violet/30 bg-violet-deep/40 p-7 lg:sticky lg:top-28">
            <IconTile name="book" />
            <h3 className="t-h3 mt-5">Nuestros códigos de conducta</h3>
            <p className="mt-2 text-muted">Descargá los códigos de conducta vigentes.</p>
            <ul className="mt-6 grid gap-3">
              {codesOfConduct.map((c) => (
                <li key={c.href}>
                  <a
                    href={asset(c.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-bg/60 px-4 py-3 text-ink transition-colors hover:border-accent"
                  >
                    <Icon name="file" className="size-5 text-violet" />
                    <span className="flex-1 text-[15px]">
                      {c.label}
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
        <SectionHeader
          eyebrow="Seguridad de los datos"
          title="Comercialización de bienes y servicios enfocados en la seguridad de los datos"
          text="Firmamos acuerdos de comercialización con los principales referentes tecnológicos para ofrecer soluciones innovadoras, útiles, eficaces y seguras. Las soluciones que comercializamos adoptan los más altos estándares de la industria:"
        />
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

        <div data-reveal className="mt-12 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[560px] text-left">
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
                  <td className="px-6 py-4">
                    <ExtLink href={v.trust}>Ver trust center</ExtLink>
                  </td>
                  <td className="px-6 py-4">
                    {v.privacy ? <ExtLink href={v.privacy}>Ver política</ExtLink> : <span className="text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="!pt-0">
        <ContactForm
          variant="compliance"
          title="¿Tenés dudas sobre compliance?"
          text={`Escribinos a ${COMPLIANCE_EMAIL} o completá el formulario.`}
        />
      </Section>
    </>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-accent hover:text-accent-hover">
      <span className="link-underline">{children}</span>
      <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
