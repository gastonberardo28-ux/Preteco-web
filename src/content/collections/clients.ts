import { img } from "@/lib/asset";

/* ── Clientes por sector ─────────────────────────────────────────────────
   Las imágenes son las grillas de logos del deck institucional (una por sector).
   "names" se usa como texto alternativo y para buscadores: si se cambia una
   imagen, actualizá también la lista. "wide" ocupa dos columnas en desktop. */
export const clientSectors = [
  {
    sector: "Servicios financieros",
    image: img("clientes-financieros.png"),
    wide: true,
    names: [
      "Banco Galicia", "Bancor", "Banco Nación", "Banco San Juan", "Banco Santa Cruz", "Banco Santa Fe",
      "Banco Entre Ríos", "Link (Linkser)", "EDV", "Banco Económico", "Banco Mercantil Santa Cruz", "Banco BISA",
      "Banco Ganadero", "Banco Unión", "Itaú", "Sistarbanc",
    ],
  },
  { sector: "Seguros", image: img("clientes-seguros.png"), names: ["Federación Patronal Seguros", "Allianz", "Sura"] },
  { sector: "Salud", image: img("clientes-salud.png"), names: ["Sanatorio Modelo Quilmes", "OMINT", "Hospital Alemán"] },
  {
    sector: "Sector público",
    image: img("clientes-sector-publico.png"),
    names: ["SINTyS", "Provincia de Santa Fe", "INDEC", "Córdoba", "ARCA", "PSA"],
  },
  {
    sector: "Otros",
    image: img("clientes-otros.png"),
    wide: true,
    names: ["EPEC", "Telefónica", "CRE", "Sofía", "UTE", "Montepaz", "Tenaris"],
  },
];
