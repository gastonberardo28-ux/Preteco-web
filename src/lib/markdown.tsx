import { readFileSync } from "node:fs";
import { join } from "node:path";

/* Renderer mínimo de Markdown para los artículos del blog (sin dependencias).
   Soporta: ## y ### títulos, listas con "-", párrafos y **negrita**. */

type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; text: string };

export function readArticle(id: number | string) {
  return readFileSync(join(process.cwd(), "src/content/blog", `${id}.md`), "utf8");
}

export function parse(md: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] | null = null;
  const flush = () => {
    if (list) blocks.push({ type: "ul", items: list });
    list = null;
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("- ")) {
      (list ??= []).push(line.slice(2));
      continue;
    }
    flush();
    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else blocks.push({ type: "p", text: line });
  }
  flush();
  return blocks;
}

export function readingMinutes(md: string) {
  return Math.max(1, Math.round(md.split(/\s+/).length / 220));
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="flex flex-col gap-5 text-lg leading-[1.75] text-ink/90">
      {parse(source).map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} className="mt-8 font-mono text-[clamp(24px,2.4vw,30px)] leading-snug text-accent">
              {inline(b.text)}
            </h2>
          );
        if (b.type === "h3")
          return (
            <h3 key={i} className="mt-4 text-xl font-medium text-ink">
              {inline(b.text)}
            </h3>
          );
        if (b.type === "ul")
          return (
            <ul key={i} className="grid gap-2 pl-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{inline(it)}</span>
                </li>
              ))}
            </ul>
          );
        return <p key={i}>{inline(b.text)}</p>;
      })}
    </div>
  );
}
