import { img } from "@/lib/asset";

export const AI_READINESS_URL = "https://preteco.com/ai-readiness/";

export const mainNav = [
  { label: "Servicios", href: "/services" },
  { label: "Productos", href: "/products" },
  { label: "Casos", href: "/cases" },
  { label: "Blog", href: "/blogs" },
  { label: "Nosotros", href: "/about-us" },
  { label: "Compliance", href: "/compliance" },
];

export const footerNav = [
  { label: "Home", href: "/" },
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
