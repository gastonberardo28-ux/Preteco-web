/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, formatDate } from "@/content/company";
import { tagIcon } from "@/content/icons";
import { Markdown, readArticle, readingMinutes } from "@/lib/markdown";
import { Button, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { HeroBackground } from "@/components/PageHero";
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
        <header className="relative isolate overflow-hidden border-b border-line/60">
          <HeroBackground />
          <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Link href="/blogs" className="group inline-flex items-center gap-2 self-start text-[15px] text-muted hover:text-accent">
                <Icon name="arrowRight" className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                Volver al blog
              </Link>
              <p data-reveal="fade" className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-violet-soft">
                  <Icon name={tagIcon[post.tag] ?? "book"} className="size-3.5" />
                  {post.tag}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" className="size-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="size-3.5" />
                  {readingMinutes(body)} min de lectura
                </span>
              </p>
              <h1 className="words max-w-[22ch] font-mono text-[clamp(30px,3.8vw,50px)] leading-[1.08] tracking-[-0.04em] text-accent">
                {post.title.split(" ").map((w, i) => (
                  <span key={i} style={{ ["--i" as string]: i }}>
                    {w}
                    {" "}
                  </span>
                ))}
              </h1>
              <p data-reveal style={{ ["--d" as string]: 3 }} className="t-lead max-w-[56ch]">
                {post.dek}
              </p>
            </div>
            <div data-reveal="scale" style={{ ["--d" as string]: 2 }} className="relative">
              <div aria-hidden="true" className="absolute inset-[10%] -z-10 rounded-full bg-violet/25 blur-[80px]" />
              <img src={post.image} alt="" className="w-full rounded-[28px] border border-line object-cover shadow-2xl shadow-black/40" />
            </div>
          </div>
        </header>
        <div className="container-page py-16 md:py-24">
          <div className="mx-auto max-w-[70ch]">
            <Markdown source={body} />
            <div data-reveal className="mt-14 flex flex-col items-start gap-5 rounded-3xl border border-violet/30 bg-violet-deep/40 p-7 md:flex-row md:items-center md:justify-between">
              <p className="t-h3">¿Te interesa aplicar esto en tu organización?</p>
              <Button href="#formulario">Hablemos</Button>
            </div>
          </div>
        </div>
      </article>

      <Section tone="surface">
        <SectionHeader
          eyebrow="Blog"
          title="Seguí leyendo"
          action={
            <Button href="/blogs" variant="tertiary">
              Ver todas las notas
            </Button>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {related.map((p, i) => (
            <li key={p.id} data-reveal style={{ ["--d" as string]: i }}>
              <Link
                href={`/blog/article/${p.id}`}
                className="spotlight glow-border group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg/60"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <time dateTime={p.date} className="text-sm text-muted">{formatDate(p.date)}</time>
                  <h3 className="t-h3 transition-colors group-hover:text-accent">{p.title}</h3>
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
