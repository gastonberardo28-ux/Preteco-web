import { Actions } from "@/components/ui";
import { HeroBackground } from "@/components/PageHero";
import { notFoundPage as c } from "@/content/pages/not-found";

/* 404 · textos en content/pages/not-found.ts */
export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <div className="container-page flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20 md:py-24">
        <p className="t-eyebrow">{c.eyebrow}</p>
        <h1 className="t-display-sm max-w-[16ch]">{c.title}</h1>
        <p className="t-lead max-w-[50ch]">{c.text}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Actions items={c.actions} />
        </div>
      </div>
    </section>
  );
}
