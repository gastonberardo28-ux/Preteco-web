/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cases, formatDate } from "@/content/company";
import { getPosts } from "@/lib/cms";
import { tagIcon } from "@/content/icons";
import { Icon } from "./Icon";

export function CaseCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {cases.map((c, i) => (
        <li key={c.client} data-reveal style={{ ["--d" as string]: i }}>
          <Link
            href={c.service.href}
            className="spotlight glow-border group relative flex h-full min-h-[400px] flex-col justify-end overflow-hidden rounded-3xl border border-line"
          >
            <img
              src={c.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 size-full object-cover opacity-55 grayscale transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/75 to-bg/10" />
            <div className="absolute top-5 right-5 left-5 flex items-center justify-between">
              <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
              {c.badge && <img src={c.badge} alt={c.badgeAlt} className="h-6 w-auto" />}
            </div>
            <div className="flex flex-col gap-3 p-7">
              <H className="t-h3 text-2xl">{c.client}</H>
              <p className="text-text/90">{c.summary}</p>
              <span className="mt-2 inline-flex items-center gap-2 border-t border-line/80 pt-4 text-sm text-accent">
                {c.service.label}
                <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function PostCards({ limit }: { limit?: number }) {
  const posts = await getPosts();
  const list = limit ? posts.slice(0, limit) : posts;
  if (list.length === 0) return <p className="t-lead">Muy pronto vas a encontrar nuevas notas acá.</p>;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <li key={p.id} data-reveal style={{ ["--d" as string]: i % 3 }}>
          <Link
            href={p.url}
            className="spotlight glow-border group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/70"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-panel">
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-bg/80 px-3 py-1 text-xs text-violet-soft backdrop-blur-md">
                <Icon name={tagIcon[p.tag] ?? "book"} className="size-3.5" />
                {p.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <time dateTime={p.date} className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Icon name="calendar" className="size-3.5" />
                {formatDate(p.date)}
              </time>
              <h3 className="t-h3 transition-colors group-hover:text-accent">{p.title}</h3>
              <p className="line-clamp-3 text-[15px] text-muted">{p.dek}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[15px] font-medium text-accent">
                Leer artículo
                <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
