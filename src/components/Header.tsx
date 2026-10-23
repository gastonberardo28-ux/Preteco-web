import Link from "next/link";
import { nav } from "@/content/site";
import { Button, Cursor } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        <Link href="#top" className="flex items-center gap-2.5 font-mono text-xl font-semibold tracking-[-0.5px] text-accent no-underline">
          <Cursor className="h-[18px] w-2.5" />
          preteco
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap gap-x-[22px] gap-y-1 font-mono text-[13px]">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="text-soft no-underline hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="size-2 animate-pulse-soft rounded-full bg-accent" aria-hidden="true" />
            todos los sistemas operativos
          </span>
          <Button href="#contacto">agendar_llamada()</Button>
        </div>
      </div>
    </header>
  );
}
