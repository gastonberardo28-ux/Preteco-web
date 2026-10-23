/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { img, asset } from "@/lib/asset";
import { PageHero } from "@/components/PageHero";
import { H2, Section, Check, Lead, Arrow } from "@/components/ui";
import { Accordion } from "@/components/Accordion";
import { ContactForm } from "@/components/ContactForm";
import { codesOfConduct, compliancePillars, complianceStats, frameworks, vendorTrust } from "@/content/company";
import { COMPLIANCE_EMAIL } from "@/content/site";

export const metadata: Metadata = {
  title: "Compliance",
  description: "Compliance, gestión de riesgos y control interno de vanguardia para la era digital.",
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        title="Transformamos la confianza en un sistema vivo"
        text="Compliance, gestión de riesgos y control interno de vanguardia para la era digital."
      >
        {/* Mejora: las tres métricas quedaban escalonadas (2 + 1); ahora es una fila pareja. */}
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {complianceStats.map((s) => (
            <div key={s.value} className="rounded-2xl border border-accent/30 bg-panel/80 p-5 backdrop-blur-sm">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-2xl text-accent">{s.value}</dd>
              <dd className="mt-1 text-sm text-ink/90">{s.label}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-sm tracking-[0.14em] text-accent-soft uppercase">Nuestra misión</p>
            <H2>Integridad sostenible</H2>
            <p className="text-lg leading-relaxed text-ink">
              En Preteco, el cumplimiento no es reactivo. Nuestra gestión de riesgos y compliance se anticipa, evoluciona y
              actúa con base en estándares globales, tecnología segura y gobernanza ética.
            </p>
          </div>
          <img src={img("integridadSosteniblev2.png")} alt="" loading="lazy" className="w-full rounded-3xl" />
        </div>
      </Section>

      <Section tone="surface">
        <p className="font-mono text-sm tracking-[0.14em] text-accent-soft uppercase">¿Cómo lo hacemos?</p>
        <H2 className="mt-3">Compliance, gestión de riesgos y control interno: los pilares de nuestro sistema</H2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <Accordion
            items={compliancePillars.map((p) => ({
              title: p.title,
              content: (
                <>
                  <ul className="grid gap-3">
                    {p.items.map((i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-0.5 text-accent" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 text-accent hover:text-accent-hover"
                    >
                      {p.link.label} <Arrow external />
                    </a>
                  )}
                </>
              ),
            }))}
          />
          <aside className="h-fit rounded-2xl bg-panel p-6">
            <h3 className="text-xl font-medium text-accent">Nuestros códigos de conducta</h3>
            <p className="mt-2 text-ink/90">Descargá los códigos de conducta vigentes.</p>
            <ul className="mt-5 grid gap-3">
              {codesOfConduct.map((c) => (
                <li key={c.href}>
                  <a
                    href={asset(c.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-bg px-4 py-3 text-ink hover:border-accent"
                  >
                    <span>
                      {c.label}
                      <span className="block text-xs text-muted">PDF</span>
                    </span>
                    <span aria-hidden="true" className="text-accent">↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* Mejora: la tabla mostraba las URLs crudas; ahora son links legibles y escaneables. */}
      <Section>
        <H2>Comercialización de bienes y servicios enfocados en la seguridad de los datos</H2>
        <Lead className="mt-5">
          Preteco firmó acuerdos de comercialización con los principales referentes tecnológicos del mercado para ofrecer
          a sus clientes soluciones innovadoras, útiles, eficaces y seguras para sus operaciones y su información.
        </Lead>
        <p className="mt-4 max-w-[75ch] text-ink/90">
          Desde rigurosas políticas de privacidad hasta el uso de los marcos de referencia más exigentes, las soluciones
          que comercializamos adoptan los más altos estándares de la industria:
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {frameworks.map((f) => (
            <li key={f} className="rounded-full border border-line px-3 py-1 font-mono text-sm text-accent-soft">
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
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
                <tr key={v.vendor} className="border-t border-line">
                  <th scope="row" className="px-6 py-4 font-medium text-ink">{v.vendor}</th>
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
          title="Puertas abiertas"
          text={`Si tenés dudas o querés conocer más sobre compliance en Preteco, escribinos a ${COMPLIANCE_EMAIL} o completá el formulario.`}
        />
      </Section>
    </>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-accent hover:text-accent-hover">
      {children} <Arrow external />
    </a>
  );
}
