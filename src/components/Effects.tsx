"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Un único componente que maneja todos los efectos globales, sin dependencias:
   - Entrada de elementos al hacer scroll ([data-reveal], [data-draw])
   - Spotlight que sigue al cursor en las cards (.spotlight)
   - Barra de progreso de lectura y estado "scrolleado" del header
   - Parallax suave en elementos con [data-parallax="0.2"] */
export function Effects() {
  const pathname = usePathname();

  // Scroll, cursor y parallax (una sola vez)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("fx");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        root.style.setProperty("--scroll", String(max > 0 ? y / max : 0));
        if (y > 12) root.setAttribute("data-scrolled", "");
        else root.removeAttribute("data-scrolled");
        if (!reduce) {
          document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
            const speed = Number(el.dataset.parallax) || 0.15;
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          });
        }
        ticking = false;
      });
    };

    const onPointer = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - r.left}px`);
      target.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    // Luz del hero que sigue al cursor
    const onHero = (e: PointerEvent) => {
      root.style.setProperty("--cx", `${(e.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--cy", `${(e.clientY / window.innerHeight) * 100}%`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("pointermove", onPointer, { passive: true });
    if (!reduce) window.addEventListener("pointermove", onHero, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointermove", onHero);
    };
  }, []);

  // Observa los elementos animables de cada página nueva
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), [data-draw]:not([data-in])"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    window.dispatchEvent(new Event("scroll"));
    return () => io.disconnect();
  }, [pathname]);

  return <div aria-hidden="true" className="scroll-progress" />;
}
