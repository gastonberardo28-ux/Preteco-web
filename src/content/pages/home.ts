import type { IconName } from "@/components/Icon";
import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   HOME · preteco.com/
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const home = {
  seo: {
    title: "Preteco | Sistemas, datos e IA para misión crítica",
    description:
      "Expertos en sistemas, datos e IA para misión crítica. Más de 28 años en seguridad, infraestructura y cloud, modernización de aplicaciones, Data & IA y staffing IT en Latinoamérica.",
  },

  hero: {
    eyebrow: "Sistemas · Datos · IA para misión crítica",
    title: "Impulsamos tu evolución digital con IA, tecnología y datos",
    text: "Más de 28 años ayudando a organizaciones de Latinoamérica a asegurar su operación continua, modernizar su arquitectura, integrar sus plataformas y aprovechar sus datos y la IA de forma segura.",
    actions: [
      { label: "Ver soluciones", href: "/services", variant: "primary" },
      { label: "Hablemos", href: "/contact", variant: "secondary" },
    ] satisfies Action[],
    /** Las 3 tarjetas al costado del título. */
    pillars: [
      {
        icon: "network" as IconName,
        title: "Data & IA",
        text: "Organizamos tus datos e implementamos IA integrada a tus sistemas, del diagnóstico a producción.",
        href: "/services/data-ia",
      },
      {
        icon: "cloud" as IconName,
        title: "Cloud",
        text: "Modernizamos tu infraestructura, operamos tus sistemas críticos y te acompañamos en la adopción cloud.",
        href: "/services/cloud",
      },
      {
        icon: "code" as IconName,
        title: "Modernización de aplicaciones",
        text: "Transformamos tus aplicaciones legadas en soluciones modernas, ágiles y basadas en microservicios.",
        href: "/services/legacy-apps",
      },
    ],
    /** Franja de números. "auto:team" y "auto:services" se calculan solos. */
    stats: [
      { value: 28, prefix: "+", label: "años en sistemas de misión crítica" },
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

  clients: {
    eyebrow: "Organizaciones que confían en nosotros",
    title: "Clientes en *sectores críticos*",
    text: "Servicios financieros, seguros, salud, sector público, energía, telecomunicaciones e industria.",
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
