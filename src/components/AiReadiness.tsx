"use client";

import { useState } from "react";
import { readinessChecks, readinessResult } from "@/content/site";
import { Button, SectionLabel, SectionTitle } from "./ui";

export function AiReadiness() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(readinessChecks.map((c) => [c.id, c.defaultOn])),
  );
  const score = Object.values(checked).filter(Boolean).length;
  const { level, advice } = readinessResult(score);

  return (
    <section id="ai-readiness" className="border-b border-line bg-panel">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-14 px-6 py-28">
        <div className="flex flex-col gap-[18px]">
          <SectionLabel>02 / ai-readiness</SectionLabel>
          <SectionTitle>¿Tu empresa compila para IA?</SectionTitle>
          <p className="m-0 max-w-[460px] text-lg text-soft">
            Corré un chequeo rápido. Marcá lo que ya tenés resuelto y te mostramos desde dónde arrancarías.
          </p>
          <p className="m-0 font-mono text-xs text-dim">* orientativo — el diagnóstico completo lo hacemos con tu equipo.</p>
        </div>

        <div className="flex flex-col gap-2.5 rounded-[10px] border border-line-2 bg-surface p-6">
          <div className="pb-2 font-mono text-[13px] text-dim">❯ preteco scan --ai-readiness</div>
          {readinessChecks.map((c) => {
            const on = checked[c.id];
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setChecked((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                className={
                  "flex min-h-12 cursor-pointer items-center gap-3.5 rounded px-3.5 py-2.5 text-left text-[15px] transition-colors " +
                  (on ? "border border-accent bg-field text-ink" : "border border-line bg-transparent text-soft hover:border-line-2")
                }
              >
                <span className="shrink-0 font-mono text-sm">{on ? "[x]" : "[ ]"}</span>
                <span>{c.label}</span>
              </button>
            );
          })}

          <div className="mt-3.5 flex flex-col gap-3 border-t border-dashed border-line-2 pt-[18px]">
            <div className="flex justify-between font-mono text-[13px]">
              <span className="text-dim">readiness</span>
              <span className="text-accent" aria-live="polite">
                {score}/{readinessChecks.length} · {level}
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-sm bg-[#1b2210]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={readinessChecks.length}
              aria-valuenow={score}
              aria-label="Nivel de AI readiness"
            >
              <div
                className="h-full bg-accent transition-[width] duration-300"
                style={{ width: `${(score / readinessChecks.length) * 100}%` }}
              />
            </div>
            <p className="m-0 mt-1 text-[15px] text-soft">{advice}</p>
            <div>
              <Button href="#contacto">pedir diagnóstico completo →</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
