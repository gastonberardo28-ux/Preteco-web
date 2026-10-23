"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/asset";
import { mainNav } from "@/content/site";
import { services, serviceGroups } from "@/content/collections/services";
import { serviceIcon } from "@/content/icons";
import { Icon } from "./Icon";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSvcOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
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
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSvcOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setSvcOpen(false), 160);
  };

  return (
    <header className="site-header sticky top-0 z-40 border-b border-transparent backdrop-blur-xl transition-colors duration-300">
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="Preteco, ir al inicio" className="shrink-0 transition-opacity hover:opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("logo.svg")} alt="Preteco" width={110} height={26} className="h-[26px] w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line/70 bg-surface/50 p-1 text-[15px]">
            <li ref={svcRef} className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
              <button
                type="button"
                aria-expanded={svcOpen}
                aria-controls="menu-servicios"
                onClick={() => setSvcOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
                  isActive("/services") ? "bg-panel text-accent" : "text-ink hover:text-accent"
                }`}
              >
                Servicios
                <svg aria-hidden="true" viewBox="0 0 12 12" className={`size-3 transition-transform duration-300 ${svcOpen ? "rotate-180" : ""}`}>
                  <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div
                id="menu-servicios"
                className={`absolute top-full left-1/2 w-[680px] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300 ${
                  svcOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="grid grid-cols-[1fr_200px] overflow-hidden rounded-3xl border border-line bg-surface/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                  <ul className="grid grid-cols-2 gap-1 p-3">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-panel"
                        >
                          <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet transition-colors group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                            <Icon name={serviceIcon[s.slug]} className="size-[18px]" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-[15px] leading-snug text-ink">{s.menuLabel}</span>
                            <span className="text-xs text-muted">{s.category}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between gap-4 border-l border-line bg-panel/60 p-5">
                    <div>
                      <p className="t-eyebrow text-[11px]">{serviceGroups.length} áreas</p>
                      <p className="mt-2 text-sm text-muted">Acompañamos tu transformación digital de punta a punta.</p>
                    </div>
                    <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
                      Ver todos <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-full px-4 py-2 transition-colors ${
                    isActive(item.href) ? "bg-panel text-accent" : "text-ink hover:text-accent"
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
            className="btn-sheen group hidden min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-[15px] font-medium text-bg transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            <span className="relative">Hablemos</span>
            <Icon name="arrowRight" className="relative size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
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
        <nav id="menu-mobile" aria-label="Principal" className="page-in h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="container-page py-6">
            {/* Mobile: primero las secciones, con Servicios desplegable para no repetirlo */}
            <ul className="grid gap-1">
              <li>
                <details className="group" open={isActive("/services")}>
                  <summary
                    className={`flex min-h-13 cursor-pointer list-none items-center justify-between rounded-2xl px-3 text-xl hover:bg-surface [&::-webkit-details-marker]:hidden ${
                      isActive("/services") ? "text-accent" : "text-ink"
                    }`}
                  >
                    Servicios
                    <svg aria-hidden="true" viewBox="0 0 12 12" className="size-4 transition-transform duration-300 group-open:rotate-180">
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <ul className="mt-1 mb-2 grid gap-0.5 border-l border-line pl-3 ml-4">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                          className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-base text-text hover:bg-surface aria-[current=page]:text-accent"
                        >
                          <Icon name={serviceIcon[s.slug]} className="size-[18px] text-violet" />
                          {s.menuLabel}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/services" className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-base text-accent hover:bg-surface">
                        Ver todos <Icon name="arrowRight" className="size-4" />
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              {mainNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-13 items-center rounded-2xl px-3 text-xl hover:bg-surface ${isActive(item.href) ? "text-accent" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 flex min-h-13 items-center justify-center gap-2 rounded-full bg-accent text-base font-medium text-bg">
              Hablemos <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
