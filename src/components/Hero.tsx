import { Terminal } from "./Terminal";
import { Button } from "./ui";

export function Hero() {
  return (
    <section id="top" className="bg-grid border-b border-line">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-center gap-14 px-6 pt-24 pb-22">
        <div className="flex flex-col gap-7">
          <span className="font-mono text-[13px] tracking-[0.5px] text-accent">
            {"// consultora de IA, cloud, datos y desarrollo · Buenos Aires"}
          </span>
          <h1 className="m-0 text-[clamp(44px,6vw,84px)] leading-[0.98] font-semibold tracking-[-2.5px] text-ink">
            Tu negocio, compilado para la era de la{" "}
            <span className="font-mono font-medium tracking-[-4px] text-accent">IA_</span>
          </h1>
          <p className="m-0 max-w-[520px] text-[19px] text-soft">
            Implementamos IA para automatizar procesos, potenciar la toma de decisiones y acelerar la innovación
            empresarial. Sobre infraestructura que escala y datos en los que podés confiar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#servicios" size="lg">$ ver_soluciones →</Button>
            <Button href="#ai-readiness" size="lg" variant="ghost">correr diagnóstico IA</Button>
          </div>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
