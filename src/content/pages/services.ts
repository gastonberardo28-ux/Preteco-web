import type { IconName } from "@/components/Icon";
import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   SERVICIOS · preteco.com/services  y  /services/<slug>
   Los servicios en sí (qué es, beneficios, casos…) están en
   content/collections/services.ts. Acá van los textos fijos de las páginas.
   ═════════════════════════════════════════════════════════════════════ */

export const servicesPage = {
  seo: {
    title: "Servicios",
    description: "Sistemas críticos, infraestructura, cloud, inteligencia artificial, seguridad y desarrollo de aplicaciones.",
  },
  hero: {
    eyebrow: "Servicios",
    title: "¿Por qué elegir nuestros servicios?",
    text: "Acompañamos tu transformación digital de punta a punta: cinco áreas, un mismo equipo y una forma de trabajar probada en sectores críticos.",
  },
  method: {
    eyebrow: "Metodología",
    title: "Así trabajamos en *Preteco*",
    text: "Cinco etapas claras, del primer café a la evolución continua de la solución.",
  },
  stack: {
    eyebrow: "Stack",
    title: "Herramientas y tecnologías",
    pmo: {
      title: "PMO",
      text: "A través de nuestra PMO gestionamos los proyectos con un enfoque híbrido que combina estructura y agilidad. Esto nos permite adaptarnos con rapidez, sin perder calidad ni orden.",
    },
    result: {
      title: "El resultado",
      text: "Soluciones listas para implementar, con menos riesgos, menor curva de aprendizaje y un impacto real, medible y sostenible.",
    },
  },
  form: {
    title: "¿Querés ver cómo funciona en acción? Nosotros te mostramos.",
    text: "Completá el formulario y coordinamos una llamada sin compromiso.",
  },
};

/** Textos fijos de cada página de servicio (/services/<slug>). */
export const serviceDetail = {
  heroActions: [
    { label: "Coordinar una reunión", href: "#formulario", variant: "primary" },
    { label: "Cómo lo hacemos", href: "#como", variant: "secondary" },
  ] satisfies Action[],
  /** Índice fijo que aparece al bajar (solo desktop). */
  index: [
    { id: "que-es", label: "Qué es" },
    { id: "para-que", label: "Para qué sirve" },
    { id: "como", label: "Cómo lo hacemos" },
    { id: "por-que", label: "Por qué Preteco" },
    { id: "casos", label: "Casos" },
  ],
  sections: {
    what: { eyebrow: "Qué es" },
    purposes: { eyebrow: "Beneficios", title: "¿Para qué sirve?" },
    how: { eyebrow: "Enfoque", title: "¿Cómo lo hacemos?" },
    why: { eyebrow: "Diferenciales", title: "¿Por qué elegir *Preteco*?" },
    cases: { eyebrow: "Casos de éxito", title: "Quienes ya confían en nosotros", emptyIcon: "award" as IconName },
  },
  nextLabel: "Siguiente servicio",
};
