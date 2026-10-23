import Link from "next/link";
import { values } from "@/content/site";
import { Button, SectionLabel, SectionTitle, WindowBar } from "./ui";

export function Team() {
  const lastLine = String(values.length + 2).padStart(2, "0");
  return (
    <section id="equipo" className="border-b border-line bg-panel">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-14 px-6 py-28">
        <div className="flex flex-col gap-5">
          <SectionLabel>04 / #unsoloequipo</SectionLabel>
          <SectionTitle>Somos más que una consultora. Hacemos merge con tu equipo.</SectionTitle>
          <p className="m-0 max-w-[500px] text-lg text-soft">
            Nos integramos con los equipos de nuestros clientes, entendemos sus desafíos y construimos juntos soluciones
            reales.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#equipo" variant="ghost">conocernos</Button>
            <Link href="#contacto" className="inline-flex min-h-11 items-center px-[18px] font-mono text-[13px] text-soft underline">
              git clone preteco/talentos →
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[10px] border border-line-2 bg-surface">
          <WindowBar title="cultura.config.ts" />
          <pre className="m-0 overflow-x-auto px-6 py-[22px] font-mono text-[15px] leading-loose">
            <code>
              <span className="text-dim">01</span>  <span className="text-syntax">export const</span>{" "}
              <span className="text-ink">valores</span> = [{"\n"}
              {values.map((v, i) => (
                <span key={v}>
                  <span className="text-dim">{String(i + 2).padStart(2, "0")}</span>
                  {"    "}
                  <span className="text-accent">&apos;{v}&apos;</span>,{"\n"}
                </span>
              ))}
              <span className="text-dim">{lastLine}</span>  ]{" "}
              <span className="text-dim">{"// procesos flexibles, personas expertas, resultados compartidos"}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
