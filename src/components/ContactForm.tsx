"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";

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
  "w-full min-h-12 rounded-xl border border-line bg-bg/60 px-4 text-base text-ink transition-[border-color,box-shadow] duration-200 hover:border-line-strong focus:border-violet focus:shadow-[0_0_0_4px_rgb(165_148_255/0.15)] focus:outline-none aria-[invalid=true]:border-danger";

const eyebrowByVariant: Record<Variant, string> = {
  contact: "Contacto",
  careers: "Trabajá con nosotros",
  blog: "Escribí en el blog",
  compliance: "Puertas abiertas",
};

const pointsByVariant: Record<Variant, { icon: IconName; text: string }[]> = {
  contact: [
    { icon: "clock", text: "Te respondemos a la brevedad" },
    { icon: "calendar", text: "Coordinamos una llamada sin compromiso" },
    { icon: "globe", text: "Equipos en Argentina, Uruguay y Bolivia" },
  ],
  careers: [
    { icon: "users", text: "Más de 70 personas en el equipo" },
    { icon: "graduation", text: "Formación y especialización continua" },
    { icon: "globe", text: "Proyectos en toda Latinoamérica" },
  ],
  blog: [
    { icon: "pen", text: "Compartí tu experiencia y aprendizajes" },
    { icon: "book", text: "IA, cloud, datos y seguridad" },
  ],
  compliance: [
    { icon: "mail", text: "compliance@preteco.com" },
    { icon: "shield", text: "Consultas tratadas con confidencialidad" },
  ],
};

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
    <div
      id={id}
      data-reveal
      className="spotlight relative grid gap-10 overflow-hidden rounded-[32px] border border-line bg-surface/80 p-6 md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-violet/15 blur-[100px]" />
      <div className="relative flex flex-col gap-5">
        <p className="t-eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet to-transparent" />
          {eyebrowByVariant[variant]}
        </p>
        <h2 className="t-h2 text-[clamp(28px,3vw,40px)]">{title}</h2>
        <p className="t-lead">{text}</p>
        <ul className="mt-2 grid gap-3 text-[15px] text-muted">
          {pointsByVariant[variant].map((p) => (
            <li key={p.text} className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet">
                <Icon name={p.icon} className="size-[18px]" />
              </span>
              {p.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">

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
              className="btn-sheen group inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-medium text-bg shadow-[0_8px_30px_-10px_rgb(203_255_0/0.7)] transition-colors hover:bg-accent-hover disabled:opacity-60 md:w-auto"
            >
              <span className="relative">{status === "sending" ? "Enviando…" : "Enviar"}</span>
              <Icon name="arrowRight" className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
    </div>
  );
}
