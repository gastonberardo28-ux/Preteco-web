import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { getPosts } from "@/lib/cms";

const BASE = "https://preteco.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/services", "/products", "/cases", "/blogs", "/about-us", "/compliance", "/contact"];
  const posts = await getPosts();
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${BASE}/blog/article/${p.id}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
