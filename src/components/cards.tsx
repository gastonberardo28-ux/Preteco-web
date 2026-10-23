/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cases, posts, formatDate } from "@/content/company";
import { Arrow } from "./ui";

/* Mejora: en el original las cards de casos parecían clickeables pero no
   llevaban a ningún lado. Ahora enlazan al servicio aplicado. */
export function CaseCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {cases.map((c) => (
        <li key={c.client}>
          <Link
            href={c.service.href}
            className="group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-line"
          >
            <img
              src={c.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-60 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
            {c.badge && <img src={c.badge} alt={c.badgeAlt} className="absolute top-5 left-5 h-6 w-auto" />}
            <div className="relative flex flex-col gap-2 p-6">
              <H className="text-2xl font-medium text-ink">{c.client}</H>
              <p className="text-ink/90">{c.summary}</p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm text-accent">
                {c.service.label} <Arrow />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PostCards({ limit }: { limit?: number }) {
  const list = limit ? posts.slice(0, limit) : posts;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <li key={p.id}>
          <Link
            href={p.url}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/60"
          >
            <div className="aspect-[16/9] overflow-hidden bg-panel">
              <img src={p.image} alt="" loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <p className="flex items-center gap-2 text-sm text-muted">
                <span className="rounded-full bg-panel px-2.5 py-0.5 text-accent-soft">{p.tag}</span>
                <time dateTime={p.date}>{formatDate(p.date)}</time>
              </p>
              <h3 className="text-xl leading-snug font-medium text-ink">{p.title}</h3>
              <p className="line-clamp-3 text-[15px] text-muted">{p.dek}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[15px] text-accent">
                Leer artículo <Arrow />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
