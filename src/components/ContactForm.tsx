"use client";

import { useState } from "react";

/* Mejoras UX:
   - Los campos tienen name, autocomplete y validación con mensajes claros.
   - El formulario de "sumate al equipo" pide LinkedIn/CV y área en vez de "Empresa".
   - El de blog pide tema de la propuesta.
   - Hay estados de envío, éxito y error visibles (antes no había feedback).
   - Botón primario sólido en lugar del borde punteado. */

type Variant = "contact" | "careers" | "blog" | "compliance";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: string[];
  wide?: boolean;
};

const commonTop: Field[] = [
  { name: "nombre", label: "Nombre y apellido", required: true, placeholder: "Juan Pérez", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "juan@empresa.com", autoComplete: "email" },
];

const fieldsByVariant: Record<Variant, Field[]> = {
  contact: [
    ...commonTop,
    { name: "telefono", label: "Teléfono", type: "tel", placeholder: "+54 11 3601 0545", autoComplete: "tel" },
    { name: "empresa", label: "Empresa", placeholder: "Nombre de tu empresa", autoComplete: "organization" },
    {
      name: "interes",
      label: "¿Sobre qué querés hablar?",
      options: [
        "Inteligencia artificial",
        "Cloud",
        "Sistemas críticos (CriticalOps)",
        "Modernización de infraestructura",
        "Desarrollo y modernización de aplicaciones",
        "Seguridad e identidades",
        "Productos (Oracle, Okta, MuleSoft, AWS)",
        "Otro",
      ],
      wide: true,
    },
  ],
  careers: [
    ...commonTop,
    { name: "telefono", label: "Teléfono", type: "tel", placeholder: "+54 11 3601 0545", autoComplete: "tel" },
    { name: "linkedin", label: "LinkedIn o CV online", type: "url", placeholder: "https://linkedin.com/in/…", autoComplete: "url" },
    {
      name: "area",
      label: "Área de interés",
      options: ["Desarrollo", "Cloud e infraestructura", "Datos e IA", "Seguridad", "UX/UI", "Gestión de proyectos", "Comercial", "Otra"],
      wide: true,
    },
  ],
  blog: [
    ...commonTop,
    { name: "empresa", label: "Empresa", placeholder: "Nombre de tu empresa", autoComplete: "organization" },
    { name: "tema", label: "Tema del post", placeholder: "Ej.: IA aplicada a seguros" },
  ],
  compliance: [
    ...commonTop,
    { name: "telefono", label: "Teléfono", type: "tel", placeholder: "+54 11 3601 0545", autoComplete: "tel" },
    { name: "empresa", label: "Empresa", placeholder: "Nombre de tu empresa", autoComplete: "organization" },
  ],
};

const messageLabel: Record<Variant, { label: string; placeholder: string }> = {
  contact: { label: "Mensaje", placeholder: "Contanos brevemente tu desafío o lo que necesitás." },
  careers: { label: "Contanos sobre vos", placeholder: "Tu experiencia, qué te interesa y por qué Preteco." },
  blog: { label: "Tu idea", placeholder: "Resumí en pocas líneas de qué trataría el post." },
  compliance: { label: "Consulta", placeholder: "Escribí tu consulta." },
};

const inputCls =
  "w-full min-h-12 rounded-lg border border-line bg-field px-4 text-base text-ink transition-colors hover:border-line-strong focus:border-accent focus:outline-none aria-[invalid=true]:border-danger";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({
  variant = "contact",
  title,
  text,
  defaultInterest,
  id = "formulario",
}: {
  variant?: Variant;
  title: string;
  text: string;
  defaultInterest?: string;
  id?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fields = fieldsByVariant[variant];
  const msg = messageLabel[variant];

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {};
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (!el.name || el.validity.valid) continue;
      if (el.validity.valueMissing) next[el.name] = "Este campo es obligatorio.";
      else if (el.validity.typeMismatch) next[el.name] = el.type === "email" ? "Revisá el formato del email." : "Revisá el formato.";
      else next[el.name] = "Revisá este campo.";
    }
    setErrors(next);
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const data = { ...Object.fromEntries(new FormData(form).entries()), origen: variant };
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
    <div id={id} className="rounded-2xl border border-line bg-surface p-6 md:p-10">
      <h2 className="font-mono text-[clamp(24px,2.6vw,32px)] leading-tight text-accent">{title}</h2>
      <p className="mt-3 max-w-[60ch] text-lg text-ink/90">{text}</p>

      {status === "ok" ? (
        <div role="status" className="mt-8 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-5 text-ink">
          <span aria-hidden="true" className="text-xl text-accent">✓</span>
          <div>
            <p className="font-medium">¡Gracias! Recibimos tu mensaje.</p>
            <p className="text-muted">Te vamos a responder a la brevedad.</p>
            <button type="button" className="mt-3 text-accent underline underline-offset-4" onClick={() => setStatus("idle")}>
              Enviar otro mensaje
            </button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          {fields.map((f) => {
            const fid = `${id}-${f.name}`;
            const err = errors[f.name];
            return (
              <div key={f.name} className={`flex flex-col gap-2 ${f.wide ? "md:col-span-2" : ""}`}>
                <label htmlFor={fid} className="text-[15px] text-ink">
                  {f.label}
                  {f.required ? <span className="text-accent"> *</span> : <span className="text-muted"> (opcional)</span>}
                </label>
                {f.options ? (
                  <div className="relative">
                    <select
                      id={fid}
                      name={f.name}
                      defaultValue={f.name === "interes" && defaultInterest ? defaultInterest : ""}
                      className={`${inputCls} appearance-none pr-10`}
                    >
                      <option value="">Elegí una opción</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="pointer-events-none absolute top-1/2 right-4 size-3.5 -translate-y-1/2 text-accent"
                    >
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : (
                  <input
                    id={fid}
                    name={f.name}
                    type={f.type ?? "text"}
                    required={f.required}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={err ? `${fid}-err` : undefined}
                    onChange={() => err && setErrors((p) => ({ ...p, [f.name]: "" }))}
                    className={inputCls}
                  />
                )}
                {err && (
                  <p id={`${fid}-err`} className="text-sm text-danger">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor={`${id}-mensaje`} className="text-[15px] text-ink">
              {msg.label} <span className="text-muted">(opcional)</span>
            </label>
            <textarea
              id={`${id}-mensaje`}
              name="mensaje"
              rows={5}
              placeholder={msg.placeholder}
              className={`${inputCls} min-h-[140px] resize-y py-3`}
            />
          </div>
          <div className="flex flex-col-reverse items-start gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted">
              Los campos con <span className="text-accent">*</span> son obligatorios.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-8 text-base font-medium text-bg transition-colors hover:bg-accent-hover disabled:opacity-60 md:w-auto"
            >
              {status === "sending" ? "Enviando…" : "Enviar"}
            </button>
          </div>
          {status === "error" && (
            <p role="alert" className="text-danger md:col-span-2">
              No pudimos enviar tu mensaje. Probá de nuevo en unos minutos.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
