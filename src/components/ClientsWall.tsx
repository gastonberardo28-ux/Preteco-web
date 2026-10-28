/* eslint-disable @next/next/no-img-element */
import { clientSectors } from "@/content/collections/clients";

/* Grilla de clientes por sector (home y /cases). Los logos vienen en tarjetas
   claras porque las imágenes del deck son a color sobre fondo crema. */
export function ClientsWall() {
  return (
    <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {clientSectors.map((c, i) => (
        <li
          key={c.sector}
          data-reveal
          style={{ ["--d" as string]: i % 4 }}
          className={`flex flex-col gap-4 rounded-3xl bg-[#FCFFEC] p-5 sm:p-6 ${c.wide ? "md:col-span-2" : ""}`}
        >
          <h3 className="font-mono text-xs tracking-[0.18em] text-[#4B5A00] uppercase">{c.sector}</h3>
          <div className="flex flex-1 items-center justify-center">
            <img src={c.image} alt={`Logos de clientes de ${c.sector.toLowerCase()}: ${c.names.join(", ")}`} loading="lazy" className="max-h-56 w-auto max-w-full object-contain" />
          </div>
        </li>
      ))}
    </ul>
  );
}
