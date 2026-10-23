import { cdn } from "@/lib/asset";

/* ── Blog ────────────────────────────────────────────────────────────────
   Mejora UX: ordenado por fecha (el original estaba desordenado), título
   primero y bajada abajo, sin títulos cortados ni extractos repetidos.
   El cuerpo de cada artículo está en src/content/blog/<id>.md.
   OJO: el blog se edita desde la planilla de Google (ver docs/CMS-Y-LEADS.md).
   Esta lista es el respaldo que se usa si la planilla no está configurada. */
const blogRaw = [
  { id: 3, date: "2026-01-27", title: "Oracle Database 23ai: las últimas novedades de la base de datos que impulsa la nueva era de la IA empresarial", dek: "Cómo Oracle 23ai integra inteligencia artificial, seguridad y continuidad operativa en una única plataforma.", image: "f0724a38-0ccb-4b8c-9cce-d48bbd085e8b.webp", tag: "Datos" },
  { id: 4, date: "2026-02-18", title: "Preteco y la gestión de sistemas de misión crítica: cómo garantizar la continuidad del negocio con operación 24/7", dek: "Cómo garantizamos disponibilidad, seguridad y operación 24/7 en entornos donde fallar no es una opción.", image: "8fb125a2-525e-4bd1-a97e-2aded35f4cf8.webp", tag: "CriticalOps" },
  { id: 2, date: "2026-01-26", title: "Okta: funcionalidades clave para una gestión moderna y segura de identidades", dek: "Cómo Okta permite implementar Identity & Access Management con enfoque Zero Trust.", image: "34a88048-1f7c-426e-98d8-d0255e2690cb.webp", tag: "Seguridad" },
  { id: 6, date: "2026-02-20", title: "Estrategia multicloud", dek: "Agilidad, resiliencia y competitividad para el negocio.", image: "c536649b-febb-4493-a8a0-1f3ffa52189e.webp", tag: "Cloud" },
  { id: 7, date: "2026-02-27", title: "Migración de cargas a la nube en Latinoamérica", dek: "Un enfoque basado en un marco de tres pilares.", image: "6b3c96c0-3e99-4e62-a681-a8da91782211.webp", tag: "Cloud" },
  { id: 8, date: "2026-04-20", title: "Oracle y el origen silencioso de la IA empresarial: cómo construir inteligencia donde viven los datos", dek: "¿Cómo integrar la IA con los datos críticos del negocio sin complejizar la arquitectura?", image: "08385008-4cf0-40a1-820c-7204ebdd762e.webp", tag: "IA" },
  { id: 9, date: "2026-07-23", title: "OCI para minería: costos de infraestructura en Argentina", dek: "La volatilidad cambiaria encarece la infraestructura on-premise en minería. Cómo OCI convierte ese gasto en algo predecible y escalable.", image: "d8b431fa-a5d8-4e22-8df6-b47a6dc50a48.webp", tag: "Cloud" },
  { id: 11, date: "2026-07-23", title: "El costo real de mantener un sistema legacy: lo que aparece en la factura y lo que no", dek: "Mantener una aplicación legacy cuesta más de lo que muestra la factura de TI. Los costos ocultos y cómo reducirlos.", image: "ac2a1028-e87f-42cc-b04e-b2c417899712.webp", tag: "Desarrollo" },
  { id: 10, date: "2026-07-23", title: "Harvest Now, Decrypt Later: el riesgo oculto de tus datos a futuro", dek: "Tus datos pueden estar comprometidos hoy y no saberlo hasta dentro de años. Qué es este riesgo y cómo proteger su confidencialidad.", image: "05c35e42-5cb6-4d49-a52d-61f5848af104.png", tag: "Seguridad" },
  { id: 12, date: "2026-08-25", title: "El fraude bancario cambió de forma y los controles tradicionales no lo notaron", dek: "Durante años, los bancos construyeron sus defensas contra el fraude pensando en el perímetro.", image: "acb28c99-bb4f-4262-9795-8938ed21a644.webp", tag: "Seguridad" },
];

export const posts = blogRaw
  .map((p) => ({ ...p, image: cdn(p.image), url: `/blog/article/${p.id}` }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id));

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
}
