import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   PRODUCTOS · preteco.com/products
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const productsPage = {
  seo: { title: "Productos", description: "Comercializamos, implementamos y administramos Oracle, AWS, Okta, Denodo y SAS para empresas." },
  hero: {
    eyebrow: "Productos",
    title: "Soluciones tecnológicas que impulsan el crecimiento de tu empresa",
    text: "Comercializamos e implementamos productos líderes en hardware y software que mejoran la productividad, optimizan procesos y garantizan la seguridad de tu infraestructura.",
    actions: [
      { label: "Ver productos", href: "#productos", variant: "primary" },
      { label: "Consultar", href: "#formulario", variant: "secondary" },
    ] satisfies Action[],
  },
  intro: {
    eyebrow: "Qué ofrecemos",
    title: "Tecnología empresarial *de primer nivel*",
    paragraphs: [
      "No solo diseñamos e implementamos soluciones de transformación digital: también proveemos tecnología empresarial para asegurar el máximo rendimiento de tus operaciones.",
      "Somos partners de Oracle, AWS, Okta, Denodo y SAS, líderes de Estados Unidos y Europa: comercializamos, implementamos y administramos su software y servicios cloud en cada uno de nuestros servicios profesionales.",
    ],
  },
  list: { eyebrow: "Portfolio", title: "Nuestros productos tecnológicos", cta: "Consultar por" },
  form: {
    title: "¿Listo para llevar tu tecnología empresarial al siguiente nivel?",
    text: "Diseñamos la arquitectura que tu negocio necesita. Contactanos y te ayudamos a implementar un ecosistema digital robusto y escalable.",
    interest: "Productos (Oracle, AWS, Okta, Denodo, SAS)",
  },
};
