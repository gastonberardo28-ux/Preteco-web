import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   CASOS · preteco.com/cases
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const casesPage = {
  seo: { title: "Casos de éxito", description: "Cómo ayudamos a EPEC, Federación Patronal e INDEC a transformar sus desafíos en soluciones reales." },
  hero: {
    eyebrow: "Casos de éxito",
    title: "Historias reales, resultados concretos.",
    text: "Descubrí cómo ayudamos a distintas organizaciones a transformar sus desafíos en soluciones reales.",
    actions: [{ label: "Contanos tu desafío", href: "#formulario", variant: "secondary" }] satisfies Action[],
  },
  clients: {
    eyebrow: "Organizaciones que confían en nosotros",
    title: "Nuestros *clientes*",
    text: "Servicios financieros, seguros, salud, sector público, energía, telecomunicaciones e industria.",
  },
  form: {
    title: "¿Querés ver cómo funciona en acción? Nosotros te mostramos.",
    text: "Completá el formulario y coordinamos una llamada sin compromiso.",
  },
};
