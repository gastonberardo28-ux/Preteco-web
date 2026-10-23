"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { stickyCta as c } from "@/content/site";

/* CTA fijo en mobile (solo debajo de md)
   Lógica de visibilidad, para que ayude sin estorbar:
   - Aparece recién después del primer pantallazo (el hero ya tiene sus botones).
   - Se oculta cuando el formulario de la página está a la vista (sería redundante),
     cuando se ve el pie, mientras se escribe en un campo (teclado abierto) y con el menú abierto.
   - Si la página tiene formulario, lleva a él y enfoca la primera pregunta; si no, va a /contact.
   - Texto según la sección: content/site.ts → stickyCta. */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [formId, setFormId] = useState<string | null>(null);

  const hidden = c.hideOn.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const label = c.labels.find((l) => pathname.startsWith(l.path))?.label ?? c.defaultLabel;

  useEffect(() => {
    setShow(false);
    if (hidden) return;
    const form = document.querySelector("[data-cta-target]");
    const footer = document.querySelector("footer");
    setFormId(form?.id || null);

    let formVisible = false;
    let footerVisible = false;
    let typing = false;

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75;
      setShow(pastHero && !formVisible && !footerVisible && !typing);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === form) formVisible = e.isIntersecting;
          if (e.target === footer) footerVisible = e.isIntersecting;
        }
        update();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    if (form) io.observe(form);
    if (footer) io.observe(footer);

    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches("input, textarea, select");
    const onFocusIn = (e: FocusEvent) => {
      if (isField(e.target)) (typing = true), update();
    };
    const onFocusOut = () => {
      typing = false;
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [pathname, hidden]);

  if (hidden) return null;

  const goToForm = (e: React.MouseEvent) => {
    const form = document.querySelector<HTMLElement>("[data-cta-target]");
    if (!form) return;
    e.preventDefault();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    // Enfocamos la primera pregunta visible cuando termina el desplazamiento
    window.setTimeout(() => {
      const field = Array.from(form.querySelectorAll<HTMLElement>("input:not([tabindex='-1']), textarea, select")).find(
        (el) => el.offsetParent !== null
      );
      field?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <div
      aria-hidden={!show}
      className={`sticky-cta fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden ${show ? "is-shown" : ""}`}
    >
      <Link
        href={formId ? `#${formId}` : "/contact"}
        onClick={goToForm}
        tabIndex={show ? 0 : -1}
        className="btn-sheen tap group flex min-h-14 items-center justify-between gap-3 rounded-full bg-accent py-2 pr-2 pl-6 text-bg shadow-[0_10px_40px_-8px_rgb(0_0_0/0.7),0_0_0_1px_rgb(203_255_0/0.3)]"
      >
        <span className="relative flex flex-col leading-tight">
          <span className="text-base font-semibold">{label}</span>
          <span className="text-xs text-bg/70">{c.note}</span>
        </span>
        <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-bg text-accent">
          <Icon name="arrowRight" className="size-4 transition-transform group-active:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
