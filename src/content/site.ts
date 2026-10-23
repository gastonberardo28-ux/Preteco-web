import { img } from "@/lib/asset";

/* ═════════════════════════════════════════════════════════════════════
   DATOS GENERALES DEL SITIO · se usan en todas las páginas
   Menú, pie de página, redes, partners, oficinas y mails.
   ═════════════════════════════════════════════════════════════════════ */

// ⚠️ Esta página vive en el sitio anterior. Cuando preteco.com apunte al sitio nuevo,
// este link deja de funcionar: hay que migrarla o mover el sitio viejo a otro subdominio.
export const AI_READINESS_URL = "https://preteco.com/ai-readiness/";

/** Menú principal (header). El botón "Hablemos" va siempre aparte. */
export const mainNav = [
  { label: "Servicios", href: "/services" },
  { label: "Productos", href: "/products" },
  { label: "Casos", href: "/cases" },
  { label: "Blog", href: "/blogs" },
  { label: "Nosotros", href: "/about-us" },
  { label: "Compliance", href: "/compliance" },
];

/** Textos del pie de página. */
export const footer = {
  tagline: "Trabajamos con vos para crear",
  taglineHighlight: "impacto.",
  servicesTitle: "Servicios",
  navTitle: "Empresa",
  officesTitle: "Oficinas",
  partnersTitle: "Partners",
  copyright: "Preteco. Todos los derechos reservados.",
  badge: "Más de 25 años en sistemas críticos",
};

/** Links del pie de página (columna "Empresa"). */
export const footerNav = [
  { label: "Servicios", href: "/services" },
  { label: "Productos", href: "/products" },
  { label: "Casos", href: "/cases" },
  { label: "Blog", href: "/blogs" },
  { label: "AI Readiness", href: AI_READINESS_URL, external: true },
  { label: "Nosotros", href: "/about-us" },
  { label: "Compliance", href: "/compliance" },
  { label: "Contacto", href: "/contact" },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/preteco/", icon: img("linkedin.svg") },
  { label: "Instagram", href: "https://www.instagram.com/preteco_latam/", icon: img("instagram.svg") },
  { label: "Facebook", href: "https://www.facebook.com/preteco/about/", icon: img("facebook.svg") },
];

export const partners = [
  { name: "Salesforce Partner", logo: img("salesforce.svg") },
  { name: "Oracle Partner", logo: img("oracle.svg") },
  { name: "AWS Partner", logo: img("aws.svg") },
  { name: "SAS Partner", logo: img("sas.svg") },
];

export const offices = [
  { city: "CABA, Argentina", address: "Los Patos 2590, 4.º piso, CABA" },
  { city: "Montevideo, Uruguay", address: "Juncal 1437, 11000 Montevideo" },
  { city: "La Paz, Bolivia", address: "Calle 15 de Calacoto N.º 8089, Torre Fergal, piso 2, oficina E" },
  {
    city: "Santa Cruz, Bolivia",
    address: "Calle K N.º 279, Edificio Hotel Camino Real, planta baja, Zona Equipetrol Norte y 4.º anillo",
  },
].map((o) => ({
  ...o,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.address}, ${o.city}`)}`,
}));

export const COMPLIANCE_EMAIL = "compliance@preteco.com";

/** Botón fijo inferior en mobile ("CTA sticky").
 *  - Aparece después del primer pantallazo y se oculta cuando el formulario o el pie están a la vista.
 *  - Si la página tiene formulario, lleva a él; si no, va a /contact.
 *  - El texto cambia según la sección (se usa la primera coincidencia por inicio de URL). */
export const stickyCta = {
  hideOn: ["/contact"],
  labels: [
    { path: "/services/", label: "Consultar por este servicio" },
    { path: "/about-us", label: "Sumate al equipo" },
    { path: "/blogs", label: "Proponé un post" },
    { path: "/compliance", label: "Hacer una consulta" },
  ],
  defaultLabel: "Hablemos",
  note: "Sin compromiso",
};
