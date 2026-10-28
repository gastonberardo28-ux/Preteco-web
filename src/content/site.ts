import type { IconName } from "@/components/Icon";
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
  badge: "Más de 28 años en sistemas de misión crítica",
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
  { label: "LinkedIn", href: "https://www.linkedin.com/company/preteco/", icon: "linkedin" as IconName },
  { label: "Instagram", href: "https://www.instagram.com/preteco_latam/", icon: "instagram" as IconName },
  { label: "Facebook", href: "https://www.facebook.com/preteco/about/", icon: "facebook" as IconName },
  { label: "YouTube", href: "https://www.youtube.com/@Preteco5429", icon: "youtube" as IconName },
];

export const partners = [
  { name: "Oracle Partner", logo: img("oracle.svg") },
  { name: "AWS Partner", logo: img("aws.svg") },
  { name: "SAS Partner", logo: img("sas.svg") },
  { name: "Okta Partner", logo: img("oktalogo.svg") },
  { name: "Denodo Partner", logo: img("denodo.png") },
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
  /** En estas secciones (lectura larga) el botón solo aparece al subir o al terminar de leer. */
  readingOn: ["/blog/article/"],
  labels: [
    { path: "/services/", label: "Consultar por este servicio", note: "Sin compromiso" },
    { path: "/about-us", label: "Sumate al equipo", note: "Dejanos tu perfil" },
    { path: "/blogs", label: "Proponé un post", note: "Compartí tu experiencia" },
    { path: "/compliance", label: "Hacer una consulta", note: "Confidencial" },
  ],
  defaultLabel: "Hablemos",
  defaultNote: "Sin compromiso",
};
