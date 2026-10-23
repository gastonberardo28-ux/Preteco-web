import { Icon, type IconName } from "./Icon";

/* Acordeón nativo (<details>): accesible y sin JavaScript, con ícono y animación de apertura. */
export function Accordion({ items }: { items: { title: string; icon?: IconName; content: React.ReactNode }[] }) {
  return (
    <div className="grid gap-3">
      {items.map((it, i) => (
        <details
          key={it.title}
          data-reveal
          style={{ ["--d" as string]: i % 4 }}
          className="spotlight group rounded-2xl border border-line bg-bg/60 transition-colors open:border-violet/50 open:bg-surface"
        >
          <summary className="flex min-h-18 cursor-pointer list-none items-center gap-4 px-5 py-4 text-lg text-ink md:px-6 [&::-webkit-details-marker]:hidden">
            {it.icon && (
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet transition-colors group-open:border-accent/40 group-open:bg-accent/10 group-open:text-accent">
                <Icon name={it.icon} className="size-5" />
              </span>
            )}
            <span className="flex-1 font-medium">{it.title}</span>
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-6 text-text/90 md:px-6 md:pl-20">{it.content}</div>
        </details>
      ))}
    </div>
  );
}
