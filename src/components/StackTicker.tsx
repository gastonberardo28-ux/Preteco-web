import { stack } from "@/content/site";

export function StackTicker() {
  // La lista se duplica para que el loop del marquee sea continuo.
  const loop = [...stack, ...stack];
  return (
    <section aria-label="Stack y partners" className="overflow-hidden border-b border-line bg-panel">
      <div className="flex items-center">
        <span className="shrink-0 bg-accent px-6 py-5 font-mono text-xs font-semibold text-bg">STACK</span>
        <div className="flex-1 overflow-hidden">
          <ul className="m-0 flex w-max animate-marquee list-none gap-14 px-7 py-5 font-mono text-[15px] whitespace-nowrap text-muted">
            {loop.map((name, i) => (
              <li key={i} aria-hidden={i >= stack.length} className="flex gap-14">
                <span>{name}</span>
                <span aria-hidden="true">·</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
