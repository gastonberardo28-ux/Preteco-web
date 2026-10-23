import Link from "next/link";
import { services } from "@/content/site";
import { Container, SectionLabel, SectionTitle } from "./ui";

const cols = "grid grid-cols-[80px_minmax(0,1.1fr)_minmax(0,2fr)_150px] gap-6";

export function Services() {
  return (
    <section id="servicios" className="border-b border-line">
      <Container className="flex flex-col gap-12 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <SectionLabel>01 / servicios</SectionLabel>
            <SectionTitle>Ocho módulos. Un mismo equipo corriéndolos.</SectionTitle>
          </div>
          <p className="m-0 max-w-[420px] font-mono text-[13px] text-muted">
            $ ps aux --filter=preteco
            <br />
            Cada servicio funciona solo o se combina con los demás según la etapa de tu empresa.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-line">
          <div className="min-w-[760px] text-[15px]">
            <div className={`${cols} border-b border-line bg-surface-2 px-6 py-3.5 font-mono text-xs text-dim`}>
              <span>PID</span>
              <span>MÓDULO</span>
              <span>QUÉ RESUELVE</span>
              <span>ESTADO</span>
            </div>
            {services.map((s) => (
              <Link
                key={s.pid}
                href={s.href}
                className={`${cols} items-baseline border-b border-[#1b2210] px-6 py-[22px] text-text no-underline transition-colors last:border-b-0 hover:bg-surface`}
              >
                <span className="font-mono text-accent">{s.pid}</span>
                <span className="text-[19px] font-semibold">{s.name}</span>
                <span className="text-soft">{s.desc}</span>
                <span className="font-mono text-xs text-accent">● running</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
