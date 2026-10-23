import { cases } from "@/content/site";
import { Container, SectionLabel, SectionTitle } from "./ui";

export function Cases() {
  return (
    <section id="casos" className="border-b border-line">
      <Container className="flex flex-col gap-12 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <SectionLabel>03 / casos</SectionLabel>
            <SectionTitle>Deployado en producción.</SectionTitle>
          </div>
          <span className="font-mono text-[13px] text-muted">$ git log --clientes --oneline</span>
        </div>

        <ol className="m-0 ml-2 flex list-none flex-col border-l border-line-2 p-0">
          {cases.map((c) => (
            <li
              key={c.hash}
              className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-3 border-b border-[#1b2210] py-8 pl-10 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-10 -left-[7px] size-[13px] rounded-full border-2 border-accent bg-bg"
              />
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[13px] text-accent">
                  commit {c.hash} · {c.sector}
                </span>
                <span className="text-[30px] font-semibold tracking-[-0.8px]">{c.client}</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[15px] text-[#dce3c8]">{c.message}</span>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-[3px] border border-line-2 px-2.5 py-1 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
