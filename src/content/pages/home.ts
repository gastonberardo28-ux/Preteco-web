import type { IconName } from "@/components/Icon";
import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   HOME · preteco.com/
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const home = {
  seo: {
    title: "Preteco | IA, cloud, datos y desarrollo",
    description:
      "Impulsamos tu evolución digital con IA, tecnología y datos. Consultora con más de 25 años en sistemas críticos, cloud, desarrollo y seguridad en Latinoamérica.",
  },

  hero: {
    eyebrow: "IA · Cloud · Datos · Desarrollo",
    title: "Impulsamos tu evolución digital con IA, tecnología y datos",
    text: "Más de 25 años acompañando a organizaciones de Latinoamérica en sistemas críticos, cloud, desarrollo y seguridad.",
    actions: [
      { label: "Ver soluciones", href: "/services", variant: "primary" },
      { label: "Hablemos", href: "/contact", variant: "secondary" },
    ] satisfies Action[],
    /** Las 3 tarjetas al costado del título. */
    pillars: [
      {
        icon: "sparkles" as IconName,
        title: "Inteligencia artificial",
        text: "Automatizamos procesos y potenciamos la toma de decisiones con IA aplicada a tu negocio.",
        href: "/services/agent-development",
      },
      {
        icon: "cloud" as IconName,
        title: "Cloud",
        text: "Te ayudamos a migrar, escalar y operar con seguridad en la nube, sin fricciones.",
        href: "/services/cloud",
      },
      {
        icon: "code" as IconName,
        title: "Desarrollo",
        text: "Creamos software a medida para resolver los desafíos únicos de tu negocio.",
        href: "/services/app-development",
      },
    ],
    /** Franja de números. "auto:team" y "auto:services" se calculan solos. */
    stats: [
      { value: 25, prefix: "+", label: "años en sistemas críticos" },
      { value: "auto:team", label: "personas en el equipo" },
      { value: 4, label: "oficinas en 3 países" },
      { value: "auto:services", label: "servicios especializados" },
    ],
  },

  services: {
    eyebrow: "Qué hacemos",
    title: "Todo lo que tu operación necesita, *en un solo equipo*",
    text: "Desde la infraestructura que no puede caerse hasta los agentes de IA que potencian a tu gente.",
    link: { label: "Ver todos los servicios", href: "/services" },
    cta: { title: "¿No sabés por dónde empezar?", text: "Contanos tu desafío y te orientamos.", label: "Hablemos", href: "/contact" },
  },

  cases: {
    eyebrow: "Casos de éxito",
    title: "Resultados reales en organizaciones críticas",
    link: { label: "Ver todos los casos", href: "/cases" },
  },

  team: {
    eyebrow: "#unsoloequipo",
    title: "Somos más que una consultora. *Somos un equipo* que empuja en la misma dirección.",
    actions: [
      { label: "Conocenos", href: "/about-us", variant: "primary" },
      { label: "Trabajá con nosotros", href: "/about-us#sumate", variant: "secondary" },
    ] satisfies Action[],
  },

  blog: {
    eyebrow: "Blog",
    title: "Ideas que suman, experiencia que se comparte",
    link: { label: "Ver todas las notas", href: "/blogs" },
  },

  form: {
    title: "¿Querés vernos en acción?",
    text: "Completá el formulario y coordinamos una llamada sin compromiso.",
  },
};
