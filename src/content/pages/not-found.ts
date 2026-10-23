import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   PÁGINA 404 · cuando una URL no existe
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const notFoundPage = {
  eyebrow: "Error 404",
  title: "No encontramos esta página.",
  text: "Puede que se haya movido o que el link esté mal escrito.",
  actions: [
    { label: "Ir al inicio", href: "/", variant: "primary" },
    { label: "Contactanos", href: "/contact", variant: "secondary" },
  ] satisfies Action[],
};
