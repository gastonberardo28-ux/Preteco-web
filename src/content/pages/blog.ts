import type { Action } from "@/components/ui";

/* ═════════════════════════════════════════════════════════════════════
   BLOG · preteco.com/blogs
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const blogPage = {
  seo: { title: "Blog", description: "Tendencias, buenas prácticas y aprendizajes sobre IA, cloud, datos y seguridad." },
  hero: {
    eyebrow: "Blog",
    title: "Ideas que suman. Experiencia que se comparte.",
    text: "Tendencias, buenas prácticas y aprendizajes de nuestro trabajo diario.",
    actions: [{ label: "Proponé un post", href: "#formulario", variant: "secondary" }] satisfies Action[],
  },
  empty: "Muy pronto vas a encontrar nuevas notas acá.",
  form: { title: "¿Querés sumar tu mirada?", text: "Completá el formulario y envianos tu idea de post." },
};
