import type { Metadata } from "next";
import { offices, socials } from "@/content/site";

export const SITE_URL = "https://preteco.com";
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Preteco · IA, cloud, datos y desarrollo" };

/** Metadata de cada página: título, descripción, URL canónica y vista previa para redes. */
export function pageMeta(seo: { title: string; description: string }, path: string, extra: Metadata = {}): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    // La imagen se declara explícitamente: si no, al definir openGraph por página se pierde la de app/opengraph-image.tsx
    openGraph: { title: seo.title, description: seo.description, url: path, siteName: "Preteco", locale: "es_AR", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [OG_IMAGE.url] },
    ...extra,
  };
}

/** Datos de la empresa para Google (se incluyen en todas las páginas). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Preteco",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/image/logo.svg`,
  description: "Consultora de tecnología: IA, cloud, datos, desarrollo y sistemas críticos en Latinoamérica.",
  sameAs: socials.map((s) => s.href),
  address: offices.map((o) => ({ "@type": "PostalAddress", streetAddress: o.address, addressLocality: o.city })),
};
