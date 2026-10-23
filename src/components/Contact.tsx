"use client";

import { useState } from "react";
import { SectionLabel } from "./ui";

type Status = "idle" | "sending" | "ok" | "error";

const fieldClass =
  "min-h-[46px] rounded border border-line-2 bg-field px-3.5 font-mono text-sm text-ink focus:border-accent focus:outline-none";

const fields = [
  { id: "nombre", label: "--nombre *", type: "text", required: true, placeholder: "Juan Pérez", autoComplete: "name" },
  { id: "email", label: "--email *", type: "email", required: true, placeholder: "juan@empresa.com", autoComplete: "email" },
  { id: "telefono", label: "--telefono", type: "tel", required: false, placeholder: "+54 11 ...", autoComplete: "tel" },
  { id: "empresa", label: "--empresa", type: "text", required: false, placeholder: "Mi empresa", autoComplete: "organization" },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // se guarda antes del await: React lo resetea después
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="bg-grid border-b border-line">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-14 px-6 py-28">
        <div className="flex flex-col gap-[18px]">
          <SectionLabel>06 / contacto</SectionLabel>
          <h2 className="m-0 text-[clamp(40px,5vw,72px)] leading-[0.98] font-semibold tracking-[-2px] text-ink">
            ¿Querés vernos en acción?
          </h2>
          <p className="m-0 max-w-[440px] text-lg text-soft">
            Completá el formulario y coordinamos una llamada sin compromiso.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-[18px] rounded-[10px] border border-line-2 bg-surface p-7 font-mono"
        >
          <div className="text-[13px] text-dim">❯ preteco connect \</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[18px]">
            {fields.map((f) => (
              <div key={f.id} className="flex flex-col gap-2">
                <label htmlFor={f.id} className="text-[13px] text-accent">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="text-[13px] text-accent">
              --mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              placeholder="Hola! Quisiera más información sobre..."
              className={`${fieldClass} resize-y py-3`}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="m-0 text-[13px]" role="status" aria-live="polite">
              {status === "ok" && <span className="text-accent">[ok] mensaje recibido. Te contactamos pronto.</span>}
              {status === "error" && <span className="text-[#ff9f8a]">[error] no se pudo enviar. Probá de nuevo.</span>}
              {status === "sending" && <span className="text-dim">&gt; enviando...</span>}
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-12 cursor-pointer rounded border-none bg-accent px-6 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              ↵ ejecutar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
