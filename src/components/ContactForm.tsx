"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { formEyebrow, formFields, formMessage, formMessages as t, formPoints, type FormVariant } from "@/content/forms";

/* Formulario reutilizable. Los campos y textos de cada variante viven en
   content/forms.ts; el título y la bajada los pasa cada página. */

const inputCls =
  "w-full min-h-12 rounded-xl border border-line bg-bg/60 px-4 text-base text-ink transition-[border-color,box-shadow] duration-200 hover:border-line-strong focus:border-violet focus:shadow-[0_0_0_4px_rgb(165_148_255/0.15)] focus:outline-none aria-[invalid=true]:border-danger";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({
  variant = "contact",
  title,
  text,
  defaultInterest,
  id = "formulario",
}: {
  variant?: FormVariant;
  title: string;
  text: string;
  defaultInterest?: string;
  id?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fields = formFields[variant];
  const msg = formMessage[variant];

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {};
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (!el.name || el.validity.valid) continue;
      if (el.validity.valueMissing) next[el.name] = t.required;
      else if (el.validity.typeMismatch) next[el.name] = el.type === "email" ? t.invalidEmail : t.invalid;
      else next[el.name] = t.invalid;
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
    const data = { ...Object.fromEntries(new FormData(form).entries()), origen: variant, pagina: window.location.pathname };
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
      className="spotlight relative grid gap-10 overflow-hidden rounded-[32px] border border-line bg-surface/80 p-5 sm:p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-violet/15 blur-[100px]" />
      <div className="relative flex flex-col gap-5">
        <p className="t-eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet to-transparent" />
          {formEyebrow[variant]}
        </p>
        <h2 className="t-h2 text-[clamp(28px,3vw,40px)]">{title}</h2>
        <p className="t-lead">{text}</p>
        <ul className="mt-2 grid gap-3 text-[15px] text-muted">
          {formPoints[variant].map((p) => (
            <li key={p.text} className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet">
                <Icon name={p.icon} className="size-[18px]" />
              </span>
              {p.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">

      {status === "ok" ? (
        <div role="status" className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-5 text-ink">
          <span aria-hidden="true" className="text-xl text-accent">✓</span>
          <div>
            <p className="font-medium">{t.successTitle}</p>
            <p className="text-muted">{t.successText}</p>
            <button type="button" className="mt-3 text-accent underline underline-offset-4" onClick={() => setStatus("idle")}>
              {t.sendAnother}
            </button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2 lg:mt-2">
          {/* Campo trampa para bots: oculto para personas y lectores de pantalla */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={`${id}-website`}>No completar</label>
            <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
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
            <p className="text-sm text-muted">{t.requiredNote}</p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-sheen group inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-medium text-bg shadow-[0_8px_30px_-10px_rgb(203_255_0/0.7)] transition-colors hover:bg-accent-hover disabled:opacity-60 md:w-auto"
            >
              <span className="relative">{status === "sending" ? t.sending : t.submit}</span>
              <Icon name="arrowRight" className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          {status === "error" && (
            <p role="alert" className="text-danger md:col-span-2">
              {t.error}
            </p>
          )}
        </form>
      )}
      </div>
    </div>
  );
}
