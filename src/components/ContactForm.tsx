"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { formEyebrow, formFields, formMessage, formMessages as t, formPoints, type FormField, type FormVariant } from "@/content/forms";

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
  eyebrow,
}: {
  variant?: FormVariant;
  title: string;
  text: string;
  defaultInterest?: string;
  id?: string;
  /** Etiqueta chica sobre el título; por defecto la de la variante (content/forms.ts). */
  eyebrow?: string;
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
    if (await send(Object.fromEntries(new FormData(form).entries()) as Record<string, string>)) form.reset();
  }

  async function send(values: Record<string, string>) {
    setStatus("sending");
    const data = { ...values, origen: variant, pagina: window.location.pathname };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  return (
    <div
      id={id}
      data-reveal
      data-cta-target
      className="spotlight relative grid gap-7 overflow-hidden rounded-[28px] border border-line bg-surface/80 p-5 sm:p-8 md:gap-10 md:rounded-[32px] md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-violet/15 blur-[100px]" />
      <div className="relative flex flex-col gap-5">
        <p className="t-eyebrow flex items-center gap-2.5 sm:gap-3">
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gradient-to-r from-violet to-transparent sm:w-8" />
          {eyebrow ?? formEyebrow[variant]}
        </p>
        <h2 className="t-h2 text-[clamp(28px,3vw,40px)]">{title}</h2>
        <p className="t-lead">{text}</p>
        <ul className="mt-2 hidden gap-3 text-[15px] text-muted md:grid">
          {formPoints[variant].map((p) => (
            <li key={p.text} className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line-strong/70 bg-bg/50 text-violet-soft">
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
        <>
        {/* Mobile: una pregunta por vez (estilo Typeform) */}
        <StepForm
          id={`${id}-m`}
          fields={fields}
          msg={msg}
          defaultInterest={defaultInterest}
          sending={status === "sending"}
          failed={status === "error"}
          onSend={send}
        />
        {/* Tablet y desktop: formulario clásico */}
        <form noValidate onSubmit={onSubmit} className="hidden gap-5 md:grid md:grid-cols-2 lg:mt-2">
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
        </>
      )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Formulario paso a paso para mobile
   - Una pregunta por pantalla, con barra de progreso: nada de scrollear.
   - Las respuestas ya dadas quedan arriba como "chips": tocando una volvés a esa pregunta.
   - Las preguntas con opciones se responden tocando una opción y avanzan solas.
   - Enter avanza; los opcionales se pueden omitir.
   ───────────────────────────────────────────────────────────────────── */
function StepForm({
  id,
  fields,
  msg,
  defaultInterest,
  sending,
  failed,
  onSend,
}: {
  id: string;
  fields: FormField[];
  msg: { label: string; placeholder: string };
  defaultInterest?: string;
  sending: boolean;
  failed: boolean;
  onSend: (values: Record<string, string>) => Promise<boolean>;
}) {
  const steps: (FormField & { multiline?: boolean })[] = [
    ...fields,
    { name: "mensaje", label: msg.label, placeholder: msg.placeholder, multiline: true },
  ];
  const initial: Record<string, string> = {};
  if (defaultInterest && fields.some((x) => x.name === "interes")) initial.interes = defaultInterest;
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false); // no abrimos el teclado hasta que la persona interactúe
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const f = steps[step];
  const last = step === steps.length - 1;
  const value = values[f.name] ?? "";
  const fid = `${id}-${f.name}`;

  useEffect(() => {
    if (touched) inputRef.current?.focus({ preventScroll: true });
  }, [step, touched]);

  function check(): boolean {
    const el = inputRef.current;
    if (f.required && !value.trim()) return setError(t.required), false;
    if (el && value && !el.checkValidity()) return setError(f.type === "email" ? t.invalidEmail : t.invalid), false;
    setError("");
    return true;
  }

  function go(to: number) {
    setDir(to > step ? 1 : -1);
    setError("");
    setStep(to);
    setTouched(true);
  }

  async function next() {
    if (!check()) return;
    if (!last) return go(step + 1);
    const ok = await onSend({ ...values, website: honeypot.current?.value ?? "" });
    if (ok) {
      setValues({});
      setStep(0);
    }
  }

  function choose(option: string) {
    setValues((v) => ({ ...v, [f.name]: option }));
    setError("");
    window.setTimeout(() => go(step + 1), 260);
  }

  const answered = steps.slice(0, step).filter((s) => values[s.name]);
  const progress = ((step + (value ? 0.5 : 0)) / steps.length) * 100;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="flex flex-col gap-5 md:hidden"
    >
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>No completar</label>
        <input ref={honeypot} id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Progreso */}
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-gradient-to-r from-violet to-accent transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <span className="font-mono text-xs text-muted tabular-nums" aria-live="polite">
          <span className="text-ink">{String(step + 1).padStart(2, "0")}</span> / {String(steps.length).padStart(2, "0")}
        </span>
      </div>

      {/* Respuestas anteriores: tocá para editar */}
      {answered.length > 0 && (
        <ul className="-mb-1 flex flex-wrap gap-1.5" aria-label="Tus respuestas">
          {answered.map((s) => (
            <li key={s.name}>
              <button
                type="button"
                onClick={() => go(steps.indexOf(s))}
                className="step-chip tap inline-flex max-w-[16rem] items-center gap-1.5 rounded-full border border-line bg-bg/60 px-3 py-1.5 text-[13px] text-text"
                aria-label={`Editar ${s.label}: ${values[s.name]}`}
              >
                <span className="truncate">{values[s.name]}</span>
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3 shrink-0 text-violet" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.5 2.5 13.5 5.5 6 13H3v-3z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pregunta actual */}
      <div key={f.name} className={`flex min-h-[176px] flex-col gap-3 ${dir === 1 ? "step-in-next" : "step-in-prev"}`}>
        <label htmlFor={f.options ? undefined : fid} id={`${fid}-label`} className="text-[22px] leading-snug font-semibold tracking-[-0.02em] text-ink">
          {f.label}
          {!f.required && <span className="ml-2 align-middle font-mono text-xs font-normal tracking-[0.1em] text-muted uppercase">opcional</span>}
        </label>

        {f.options ? (
          <div role="radiogroup" aria-labelledby={`${fid}-label`} className="flex flex-wrap gap-1.5">
            {f.options.map((o) => {
              const on = value === o;
              return (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => choose(o)}
                  className={`tap min-h-10 rounded-full border px-3.5 py-1.5 text-left text-sm leading-snug transition-colors duration-200 ${
                    on ? "border-accent bg-accent text-bg" : "border-line-strong bg-bg/60 text-text"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        ) : f.multiline ? (
          <textarea
            ref={inputRef}
            id={fid}
            rows={4}
            value={value}
            placeholder={f.placeholder}
            enterKeyHint="send"
            onFocus={() => setTouched(true)}
            onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
            className={`${inputCls} min-h-[120px] resize-none py-3`}
          />
        ) : (
          <input
            ref={inputRef}
            id={fid}
            type={f.type ?? "text"}
            value={value}
            required={f.required}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            enterKeyHint={last ? "send" : "next"}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${fid}-err` : undefined}
            onFocus={() => setTouched(true)}
            onChange={(e) => {
              setValues((v) => ({ ...v, [f.name]: e.target.value }));
              if (error) setError("");
            }}
            className={`${inputCls} min-h-14 text-lg`}
          />
        )}
        {error && (
          <p id={`${fid}-err`} role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      {/* Navegación */}
      <div className="flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => go(step - 1)}
            aria-label="Pregunta anterior"
            className="tap inline-flex size-13 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink"
          >
            <Icon name="arrowRight" className="size-4 rotate-180" />
          </button>
        )}
        <button
          type="submit"
          disabled={sending}
          className="btn-sheen tap group inline-flex min-h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-accent px-6 text-base font-medium text-bg transition-colors disabled:opacity-60"
        >
          <span className="relative">{last ? (sending ? t.sending : t.submit) : !value && !f.required ? "Omitir" : "Siguiente"}</span>
          <Icon name="arrowRight" className="relative size-4" />
        </button>
      </div>
      {failed && (
        <p role="alert" className="text-danger">
          {t.error}
        </p>
      )}
    </form>
  );
}
