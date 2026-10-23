"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Icon } from "./Icon";

/* Grilla del equipo. Para que la página no sea eterna en el celular, arranca
   mostrando 12 personas en mobile y 24 en desktop, con un botón para ver a todos. */
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
  const collapsible = people.length > 12;

  return (
    <div>
      <ul
        id="equipo-lista"
        className={`grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-10 md:grid-cols-6 lg:grid-cols-8 ${
          open ? "" : "max-md:[&>li:nth-child(n+13)]:hidden md:[&>li:nth-child(n+25)]:hidden"
        }`}
      >
        {people.map((m, i) => (
          <li key={m.name} data-reveal="scale" style={{ ["--d" as string]: i % 8 }} className="group flex flex-col items-center gap-2.5 text-center">
            <div className="relative aspect-square w-full max-w-[120px]">
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet to-accent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
              />
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
          </li>
        ))}
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
