/* Mejora UX: en el original cada pilar abría un modal; ahora se despliega
   en el lugar (sin perder el contexto) y funciona con teclado y lectores de pantalla.
   Usa <details>/<summary> nativos: accesible y sin JavaScript. */
export function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) {
  return (
    <div className="grid gap-3">
      {items.map((it) => (
        <details key={it.title} className="group rounded-2xl border border-line bg-bg open:border-accent/50">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-lg text-ink [&::-webkit-details-marker]:hidden">
            {it.title}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-6 pb-6 text-ink/90">{it.content}</div>
        </details>
      ))}
    </div>
  );
}
