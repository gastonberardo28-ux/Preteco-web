import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   PRODUCTOS · preteco.com/products
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const productsPage = {
  seo: { title: "Productos", description: "Comercializamos e implementamos Oracle, Okta, MuleSoft y AWS para empresas." },
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
      "Trabajamos con Oracle, Okta, MuleSoft y AWS, líderes mundiales que garantizan un stack robusto, probado y adaptable a las necesidades de tu organización.",
    ],
  },
  list: { eyebrow: "Portfolio", title: "Nuestros productos tecnológicos", cta: "Consultar por" },
  form: {
    title: "¿Listo para llevar tu tecnología empresarial al siguiente nivel?",
    text: "Diseñamos la arquitectura que tu negocio necesita. Contactanos y te ayudamos a implementar un ecosistema digital robusto y escalable.",
    interest: "Productos (Oracle, Okta, MuleSoft, AWS)",
  },
};
