import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { posts } from "@/content/company";

const BASE = "https://preteco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/products", "/cases", "/blogs", "/about-us", "/compliance", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${BASE}/blog/article/${p.id}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
