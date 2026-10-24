/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cases } from "@/content/collections/cases";
import { formatDate } from "@/content/collections/blog";
import { blogPage } from "@/content/pages/blog";
import { getPosts } from "@/lib/cms";
import { Icon } from "./Icon";
import { Carousel } from "./Carousel";

export function CaseCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Carousel until="lg" label="Casos de éxito" className="grid gap-6 lg:grid-cols-3">
      {cases.map((c, i) => (
        <li key={c.client} data-reveal style={{ ["--d" as string]: i }}>
          <Link
            href={c.service.href}
            className="spotlight glow-border group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl border border-line lg:min-h-[400px]"
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
            <div className="flex flex-col gap-3 p-6 md:p-7">
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
    </Carousel>
  );
}

/* Tarjetas de artículos
   - layout "carousel" (home, relacionados): fila deslizable en mobile/tablet, grilla en desktop.
   - layout "list" (página del blog): en mobile cada artículo es una fila compacta
     (miniatura + título) para que el listado no sea una "sábana"; desde sm vuelve a ser grilla. */
export async function PostCards({ limit, layout = "carousel" }: { limit?: number; layout?: "carousel" | "list" }) {
  const posts = await getPosts();
  const list = limit ? posts.slice(0, limit) : posts;
  if (list.length === 0) return <p className="t-lead">{blogPage.empty}</p>;
  const compact = layout === "list";
  const items = list.map((p, i) => (
    <li key={p.id} data-reveal style={{ ["--d" as string]: i % 3 }}>
      <Link
        href={p.url}
        className={`spotlight glow-border group flex h-full overflow-hidden border border-line bg-surface/70 ${
          compact ? "items-center gap-4 rounded-2xl p-3 sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-3xl sm:p-0" : "flex-col rounded-3xl"
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-panel ${
            compact ? "size-24 rounded-xl sm:aspect-[16/10] sm:size-auto sm:w-full sm:rounded-none" : "aspect-[16/10]"
          }`}
        >
          <img src={p.image} alt="" loading="lazy" className="size-full object-cover transition duration-700 ease-out group-hover:scale-105" />
          <span
            className={`absolute top-4 left-4 rounded-full border border-line-strong bg-bg/85 px-3 py-1 font-mono text-xs tracking-[0.08em] text-violet-soft uppercase backdrop-blur-md ${
              compact ? "hidden sm:inline-flex" : "inline-flex"
            }`}
          >
            {p.tag}
          </span>
        </div>
        <div className={`flex flex-1 flex-col ${compact ? "min-w-0 gap-1.5 sm:gap-3 sm:p-6" : "gap-3 p-6"}`}>
          <p className="font-mono text-xs tracking-[0.06em] text-muted uppercase">
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <span className={compact ? "sm:hidden" : "hidden"}> · {p.tag}</span>
          </p>
          <h3 className={`t-h3 transition-colors group-hover:text-accent ${compact ? "line-clamp-3 text-base leading-snug sm:line-clamp-none sm:text-xl" : ""}`}>
            {p.title}
          </h3>
          <p className={`line-clamp-3 text-[15px] text-muted ${compact ? "hidden sm:block" : ""}`}>{p.dek}</p>
          <span className={`mt-auto items-center gap-2 pt-3 text-[15px] font-medium text-accent ${compact ? "hidden sm:inline-flex" : "inline-flex"}`}>
            Leer artículo
            <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </li>
  ));
  return compact ? (
    <ul className="grid gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">{items}</ul>
  ) : (
    <Carousel until="lg" label="Artículos" className="grid gap-6 lg:grid-cols-3">
      {items}
    </Carousel>
  );
}
