/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, formatDate } from "@/content/company";
import { Markdown, readArticle, readingMinutes } from "@/lib/markdown";
import { Section, Arrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

// Misma URL que el sitio actual (/blog/article/N) para no romper links ni SEO.
export function generateStaticParams() {
  return posts.map((p) => ({ id: String(p.id) }));
}

type Props = { params: Promise<{ id: string }> };

const findPost = (id: string) => posts.find((p) => String(p.id) === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    openGraph: { title: post.title, description: post.dek, images: [post.image], type: "article" },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = findPost((await params).id);
  if (!post) notFound();

  const body = readArticle(post.id);
  const related = [
    ...posts.filter((p) => p.id !== post.id && p.tag === post.tag),
    ...posts.filter((p) => p.id !== post.id && p.tag !== post.tag),
  ].slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line/60">
          <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-5">
              <Link href="/blogs" className="group inline-flex items-center gap-2 self-start text-[15px] text-muted hover:text-accent">
                <span aria-hidden="true">←</span> Volver al blog
              </Link>
              <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="rounded-full bg-panel px-3 py-1 text-accent-soft">{post.tag}</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes(body)} min de lectura</span>
              </p>
              <h1 className="font-mono text-[clamp(30px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-accent">{post.title}</h1>
              <p className="max-w-[60ch] text-xl leading-relaxed text-ink">{post.dek}</p>
            </div>
            <img src={post.image} alt="" className="w-full rounded-3xl border border-line object-cover" />
          </div>
        </header>
        <div className="container-page py-14 md:py-20">
          <div className="mx-auto max-w-[72ch]">
            <Markdown source={body} />
          </div>
        </div>
      </article>

      <Section tone="surface">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-mono text-[clamp(26px,3vw,36px)] text-accent">Seguí leyendo</h2>
          <Link href="/blogs" className="group inline-flex items-center gap-2 text-accent hover:text-accent-hover">
            Ver todas las notas <Arrow />
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <li key={p.id}>
              <Link
                href={`/blog/article/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg transition-colors hover:border-accent/60"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={p.image} alt="" loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <time dateTime={p.date} className="text-sm text-muted">{formatDate(p.date)}</time>
                  <h3 className="text-lg leading-snug font-medium text-ink">{p.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <ContactForm title="¿Querés que lo conversemos?" text="Contanos tu desafío y coordinamos una llamada sin compromiso con nuestro equipo." />
      </Section>
    </>
  );
}
