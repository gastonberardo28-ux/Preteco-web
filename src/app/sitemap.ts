import type { MetadataRoute } from "next";
import { services } from "@/content/services";

const BASE = "https://preteco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/products", "/cases", "/blogs", "/about-us", "/compliance", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
