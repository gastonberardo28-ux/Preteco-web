import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   NOSOTROS · preteco.com/about-us
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const aboutPage = {
  seo: { title: "Nosotros", description: "Somos más que una consultora: un equipo que se integra con el tuyo para construir soluciones reales." },
  hero: {
    eyebrow: "Nosotros",
    title: "Somos más que una consultora.",
    text: "Somos un equipo que empuja en la misma dirección: nos integramos con el tuyo, entendemos tus desafíos y construimos juntos.",
    actions: [
      { label: "Conocé al equipo", href: "#equipo", variant: "primary" },
      { label: "Trabajá con nosotros", href: "#sumate", variant: "secondary" },
    ] satisfies Action[],
    stats: [
      { value: 25, prefix: "+", label: "años de trayectoria" },
      { value: "auto:team", label: "personas" },
      { value: 3, label: "países" },
      { value: "auto:values", label: "valores que nos guían" },
    ],
  },
  values: {
    eyebrow: "Cultura",
    title: "Nuestra forma *de hacer*",
    text: "En Preteco no trabajamos solos. Nos integramos con los equipos de nuestros clientes, entendemos sus desafíos y construimos juntos soluciones reales.",
  },
  team: {
    eyebrow: "auto:team personas",
    title: "Nuestro equipo",
    text: "Nos guía la escucha, la adaptabilidad y el compromiso. Creemos en procesos flexibles, personas expertas y resultados compartidos.",
    showAll: "Ver a todo el equipo",
    showLess: "Ver menos",
  },
  form: { title: "¿Querés sumarte al equipo?", text: "Completá el formulario y sumate a nuestra base de talentos." },
};
