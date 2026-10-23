"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/asset";
import { mainNav } from "@/content/site";
import { services } from "@/content/services";

/* Mejoras UX: estado activo en la navegación, dropdown de servicios
   accesible por teclado, menú mobile real y CTA de contacto destacado. */

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // menú mobile
  const [svcOpen, setSvcOpen] = useState(false); // dropdown desktop
  const svcRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setSvcOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-md">
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Preteco, ir al inicio" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("logo.svg")} alt="Preteco" width={104} height={24} className="h-6 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[15px]">
            <li ref={svcRef} className="relative">
              <button
                type="button"
                aria-expanded={svcOpen}
                aria-controls="menu-servicios"
                onClick={() => setSvcOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors hover:text-accent ${
                  isActive("/services") ? "text-accent" : "text-ink"
                }`}
              >
                Servicios
                <svg aria-hidden="true" viewBox="0 0 12 12" className={`size-3 transition-transform ${svcOpen ? "rotate-180" : ""}`}>
                  <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {svcOpen && (
                <div
                  id="menu-servicios"
                  className="absolute top-full left-0 mt-2 w-[340px] rounded-xl border border-line bg-surface p-2 shadow-2xl shadow-black/40"
                >
                  <ul>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-panel"
                        >
                          <span className="text-[15px] text-ink">{s.menuLabel}</span>
                          <span className="text-xs text-muted">{s.category}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="mt-1 flex items-center justify-between rounded-lg border-t border-line px-3 pt-3 pb-2 text-sm text-accent hover:text-accent-hover"
                  >
                    Ver todos los servicios <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-2 transition-colors hover:text-accent ${
                    isActive(item.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-lg bg-accent px-5 text-[15px] font-medium text-bg transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Contacto
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="container-page py-6">
            <p className="mb-2 text-sm text-muted">Servicios</p>
            <ul className="mb-6 grid gap-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="block rounded-lg px-3 py-3 text-lg text-ink hover:bg-surface">
                    {s.menuLabel}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="grid gap-1 border-t border-line pt-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-3 text-lg hover:bg-surface ${isActive(item.href) ? "text-accent" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 flex min-h-12 items-center justify-center rounded-lg bg-accent text-base font-medium text-bg"
            >
              Contacto
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
