import Link from "next/link";
import { posts } from "@/content/site";
import { Container, SectionLabel } from "./ui";

export function Blog() {
  return (
    <section id="blog" className="border-b border-line">
      <Container className="flex flex-col gap-9 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3.5">
            <SectionLabel>05 / changelog</SectionLabel>
            <h2 className="m-0 text-[clamp(30px,3.4vw,44px)] leading-[1.05] font-semibold tracking-[-1px] text-ink">
              Lo último del blog
            </h2>
          </div>
          <Link href="#blog" className="font-mono text-[13px] text-accent hover:text-accent-hover">
            ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {posts.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="flex flex-col gap-3.5 rounded-lg border border-line bg-panel p-6 text-text no-underline transition-colors hover:border-line-2"
            >
              <span className="font-mono text-xs text-dim">
                {p.date} · {p.tag}
              </span>
              <span className="text-[21px] leading-tight font-semibold">{p.title}</span>
              <span className="text-[15px] text-muted">{p.excerpt}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
