import Link from "next/link";
import { footerNav, socials } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 pt-16 pb-10">
        <div className="flex flex-wrap justify-between gap-10">
          <p className="m-0 max-w-[420px] text-[26px] leading-tight tracking-[-0.5px] text-ink">
            Trabajamos con vos para crear <span className="text-accent">impacto.</span>
          </p>
          <nav aria-label="Pie" className="grid grid-cols-2 gap-x-12 gap-y-2.5 font-mono text-sm">
            {footerNav.map((item) => (
              <Link key={item.label} href={item.href} className="text-soft no-underline hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div
          aria-hidden="true"
          className="font-mono text-[clamp(72px,17vw,240px)] leading-[0.85] font-semibold tracking-[-0.06em] text-accent select-none"
        >
          preteco_
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-dashed border-line-2 pt-5 font-mono text-xs text-dim">
          <span>© {new Date().getFullYear()} Preteco · todos los derechos reservados</span>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="text-soft hover:text-accent" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
