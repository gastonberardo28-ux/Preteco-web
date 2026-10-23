/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/content/collections/blog";
import { articlePage as c } from "@/content/pages/article";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { tagIcon } from "@/content/icons";
import { Markdown, readingMinutes } from "@/lib/markdown";
import { getPosts } from "@/lib/cms";
import { Breadcrumbs, Button, JsonLd, Section, SectionHeader } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { HeroBackground } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Carousel } from "@/components/Carousel";

/* ARTÍCULO · el contenido viene de la planilla del blog; textos fijos en content/pages/article.ts */

// Misma URL que el sitio actual (/blog/article/N) para no romper links ni SEO.
// Los artículos nuevos de la planilla se generan la primera vez que alguien los visita
// y se actualizan cada 5 minutos (o al instante con /api/revalidate).
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ id: String(p.id) }));
}

type Props = { params: Promise<{ id: string }> };

const findPost = async (id: string) => (await getPosts()).find((p) => String(p.id) === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await findPost((await params).id);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.dek }, `/blog/article/${post.id}`, {
    openGraph: { title: post.title, description: post.dek, images: [post.image], type: "article", publishedTime: post.date },
  });
}

export default async function ArticlePage({ params }: Props) {
  const posts = await getPosts();
  const { id } = await params;
  const post = posts.find((p) => String(p.id) === id);
  if (!post) notFound();

  const body = post.body;
  const related = [
    ...posts.filter((p) => p.id !== post.id && p.tag === post.tag),
    ...posts.filter((p) => p.id !== post.id && p.tag !== post.tag),
  ].slice(0, 3);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-line/60">
          <HeroBackground />
          <div className="container-page grid gap-10 py-12 md:gap-12 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="flex flex-col gap-5 md:gap-6">
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blogs" }, { label: post.title }]} />
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
                  {readingMinutes(body)} {c.readingTime}
                </span>
              </p>
              <h1 className="words max-w-[22ch] font-mono text-[clamp(28px,3.8vw,50px)] leading-[1.1] tracking-[-0.04em] text-accent [overflow-wrap:anywhere]">
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
        <div className="container-page py-12 md:py-24">
          <div className="mx-auto max-w-[70ch]">
            <Markdown source={body} />
            <div data-reveal className="mt-14 flex flex-col items-stretch gap-5 rounded-3xl border border-violet/30 bg-violet-deep/40 p-6 sm:items-start md:flex-row md:items-center md:justify-between md:p-7">
              <p className="t-h3">{c.inlineCta.text}</p>
              <Button href="#formulario" className="w-full sm:w-auto">
                {c.inlineCta.label}
              </Button>
            </div>
          </div>
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.dek,
          image: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
          datePublished: post.date,
          url: `${SITE_URL}/blog/article/${post.id}`,
          author: { "@type": "Organization", name: "Preteco" },
          publisher: { "@type": "Organization", name: "Preteco", logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/image/logo.svg` } },
        }}
      />

      <Section tone="surface">
        <SectionHeader
          eyebrow={c.related.eyebrow}
          title={c.related.title}
          action={
            <Button href="/blogs" variant="tertiary">
              {c.related.link}
            </Button>
          }
        />
        <Carousel until="md" label="Artículos relacionados" className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
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
        </Carousel>
      </Section>

      <Section>
        <ContactForm title={c.form.title} text={c.form.text} />
      </Section>
    </>
  );
}
