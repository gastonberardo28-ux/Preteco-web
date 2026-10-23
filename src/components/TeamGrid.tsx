"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/* Grilla del equipo
   - Arranca mostrando 12 personas en mobile y 24 en desktop, con un botón para ver a todos.
   - "Muro vivo": cada pocos segundos UNA foto visible se reemplaza, con un fundido,
     por alguien que no se estaba viendo. Así todo el equipo va teniendo visibilidad.
     Se pausa al pasar el mouse o enfocar con teclado, cuando la grilla no está en
     pantalla, con la pestaña oculta, con el equipo desplegado y si el dispositivo
     pide "reducir movimiento".
   - El orden inicial ya llega mezclado desde el servidor (cambia cada hora). */

const SWAP_EVERY_MS = 3200;

export function TeamGrid({
  people,
  showAll,
  showLess,
}: {
  people: { name: string; photo: string }[];
  showAll: string;
  showLess: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(() => ({ order: people.map((_, i) => i), lastSlot: -1 }));
  const stateRef = useRef(state);
  stateRef.current = state;
  const listRef = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const collapsible = people.length > 12;

  useEffect(() => {
    if (open || !collapsible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = listRef.current;
    if (!el) return;

    let inView = false;
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.15 });
    io.observe(el);

    let busy = false;
    const tick = () => {
      if (busy || paused.current || !inView || document.hidden) return;
      const shown = window.matchMedia("(min-width: 768px)").matches ? 24 : 12;
      if (people.length <= shown) return;

      const prev = stateRef.current;
      let slot = Math.floor(Math.random() * shown);
      if (slot === prev.lastSlot) slot = (slot + 1) % shown;
      const hiddenPos = shown + Math.floor(Math.random() * (people.length - shown));
      const incoming = people[prev.order[hiddenPos]];

      // Precargamos la foto nueva para que el fundido no muestre un círculo vacío.
      busy = true;
      const pre = new Image();
      pre.onload = pre.onerror = () => {
        busy = false;
        setState((cur) => {
          const order = [...cur.order];
          [order[slot], order[hiddenPos]] = [order[hiddenPos], order[slot]];
          return { order, lastSlot: slot };
        });
      };
      pre.src = incoming.photo;
    };

    const id = window.setInterval(tick, SWAP_EVERY_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [open, collapsible, people]);

  return (
    <div>
      <ul
        ref={listRef}
        id="equipo-lista"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        className={`grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-10 md:grid-cols-6 lg:grid-cols-8 ${
          open ? "" : "max-md:[&>li:nth-child(n+13)]:hidden md:[&>li:nth-child(n+25)]:hidden"
        }`}
      >
        {state.order.map((personIndex, slot) => {
          const m = people[personIndex];
          const swapped = slot === state.lastSlot;
          return (
            <li key={slot} data-reveal="scale" style={{ ["--d" as string]: slot % 8 }} className="group">
              {/* key = nombre: al cambiar la persona se vuelve a montar y corre el fundido */}
              <div key={m.name} className={`flex flex-col items-center gap-2.5 text-center ${swapped ? "team-swap-in" : ""}`}>
                <div className="relative aspect-square w-full max-w-[120px]">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet to-accent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {swapped && <div aria-hidden="true" className="team-swap-ring absolute -inset-1 rounded-full border-2 border-accent" />}
                  <img
                    src={m.photo}
                    alt=""
                    loading="lazy"
                    width={120}
                    height={120}
                    className="relative size-full rounded-full border border-line object-cover grayscale-[35%] transition duration-500 group-hover:grayscale-0"
                  />
                </div>
                <span className="text-[13px] leading-tight text-text transition-colors group-hover:text-accent sm:text-sm">{m.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {collapsible && (
        <div className={`mt-10 flex justify-center ${people.length <= 24 ? "md:hidden" : ""}`}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="equipo-lista"
            onClick={() => {
              // Al revelar, los elementos nuevos no tienen que esperar la animación de scroll
              document.querySelectorAll("#equipo-lista [data-reveal]").forEach((el) => el.setAttribute("data-in", ""));
              setOpen((v) => !v);
            }}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-violet/50 px-6 font-medium text-ink transition-colors hover:border-violet hover:bg-violet/12 sm:w-auto"
          >
            {open ? showLess : `${showAll} (${people.length})`}
            <Icon name="arrowRight" className={`size-4 transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>
      )}
    </div>
  );
}
