"use client";

import { Children, useEffect, useRef, useState } from "react";

/* Carrusel horizontal para mobile/tablet
   - Debajo del breakpoint `until` la lista se convierte en una fila deslizable con "snap"
     (la tarjeta siguiente asoma para invitar a deslizar). Desde ese breakpoint vuelve a
     ser la grilla que indique `className`.
   - Los puntos de abajo muestran en qué tarjeta estás y permiten saltar a otra.
   Uso:
     <Carousel until="md" label="Casos de éxito" className="grid gap-6 md:grid-cols-3">
       <li>…</li><li>…</li>
     </Carousel> */

type Until = "sm" | "md" | "lg";

const QUERY: Record<Until, string> = {
  sm: "(max-width: 39.99rem)",
  md: "(max-width: 47.99rem)",
  lg: "(max-width: 63.99rem)",
};
const HIDE_AT: Record<Until, string> = { sm: "sm:hidden", md: "md:hidden", lg: "lg:hidden" };

export function Carousel({
  children,
  until = "md",
  className = "",
  as = "ul",
  label,
}: {
  children: React.ReactNode;
  until?: Until;
  className?: string;
  as?: "ul" | "ol";
  label?: string;
}) {
  const ref = useRef<HTMLUListElement & HTMLOListElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const mq = window.matchMedia(QUERY[until]);

    // Índice de la tarjeta alineada a la izquierda.
    // Los puntos se actualizan en vivo; el "resaltado" de la tarjeta activa recién cuando
    // el deslizamiento termina, para que las tarjetas no parpadeen mientras se mueven.
    const current = () => {
      const start = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft || "0");
      let best = 0;
      let bestDist = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.getBoundingClientRect().left - start);
        if (d < bestDist) (bestDist = d), (best = i);
      });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = items.length - 1;
      return best;
    };
    const mark = () => {
      const best = mq.matches ? current() : -1;
      items.forEach((it, i) => (best === -1 || i === best ? it.setAttribute("data-current", "") : it.removeAttribute("data-current")));
    };
    let raf = 0;
    let settle = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          setActive(current());
        });
      window.clearTimeout(settle);
      settle = window.setTimeout(mark, 140); // respaldo para navegadores sin "scrollend"
    };
    const measure = () => {
      setActive(current());
      mark();
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", mark);
    mq.addEventListener("change", measure);

    // Las tarjetas que están fuera de pantalla hacia el costado nunca "entran" al viewport,
    // así que las revelamos todas juntas cuando el carrusel aparece.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.querySelectorAll("[data-reveal]").forEach((n) => n.setAttribute("data-in", ""));
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", mark);
      mq.removeEventListener("change", measure);
      window.clearTimeout(settle);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [until, count]);

  const go = (i: number) => {
    const el = ref.current;
    const it = el?.children[i] as HTMLElement | undefined;
    if (!el || !it) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft || "0");
    const left = el.scrollLeft + it.getBoundingClientRect().left - el.getBoundingClientRect().left - pad;
    el.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <div>
      <Tag
        ref={ref}
        data-until={until}
        aria-roledescription={label ? "carrusel" : undefined}
        aria-label={label}
        className={`carousel ${className}`}
      >
        {children}
      </Tag>
      {count > 1 && (
        <div className={`mt-5 flex items-center justify-between gap-4 ${HIDE_AT[until]}`}>
          <div className="flex items-center" role="group" aria-label={label ? `Navegar ${label}` : "Navegar carrusel"}>
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir a ${i + 1} de ${count}`}
                aria-current={i === active ? "true" : undefined}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ease-out ${
                    i === active ? "w-7 bg-accent" : "w-1.5 bg-line-strong group-hover:bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>
          <span aria-hidden="true" className="font-mono text-xs tracking-[0.12em] text-muted tabular-nums">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
