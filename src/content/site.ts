// Todo el copy del sitio vive acá: editá este archivo para cambiar textos sin tocar componentes.

export const nav = [
  { label: "~/servicios", href: "#servicios" },
  { label: "~/productos", href: "#servicios" },
  { label: "~/casos", href: "#casos" },
  { label: "~/ai-readiness", href: "#ai-readiness" },
  { label: "~/nosotros", href: "#equipo" },
  { label: "~/blog", href: "#blog" },
];

export const stack = ["oracle partner", "aws", "salesforce partner", "sas", "okta", "mulesoft"];

export type TerminalLine = { text: string; tone: "muted" | "ok" | "result" };
export type TerminalTab = { id: string; label: string; cmd: string; lines: TerminalLine[] };

export const terminalTabs: TerminalTab[] = [
  {
    id: "ia",
    label: "ia",
    cmd: "preteco run --modulo ia",
    lines: [
      { text: "> conectando modelos a tus datos...", tone: "muted" },
      { text: "[ok] automatización de procesos", tone: "ok" },
      { text: "[ok] agentes para la toma de decisiones", tone: "ok" },
      { text: "[ok] diagnóstico AI Readiness", tone: "ok" },
      { text: "→ innovación empresarial acelerada", tone: "result" },
    ],
  },
  {
    id: "cloud",
    label: "cloud",
    cmd: "preteco migrate --destino cloud",
    lines: [
      { text: "> relevando infraestructura actual...", tone: "muted" },
      { text: "[ok] migración sin fricciones", tone: "ok" },
      { text: "[ok] escalado bajo demanda", tone: "ok" },
      { text: "[ok] operación segura · aws · oracle", tone: "ok" },
      { text: "→ tu negocio, listo para crecer", tone: "result" },
    ],
  },
  {
    id: "dev",
    label: "desarrollo",
    cmd: "preteco build --a-medida",
    lines: [
      { text: "> analizando el desafío de tu negocio...", tone: "muted" },
      { text: "[ok] software a medida", tone: "ok" },
      { text: "[ok] modernización de apps legacy", tone: "ok" },
      { text: "[ok] integración de sistemas · mulesoft", tone: "ok" },
      { text: "→ build exitoso", tone: "result" },
    ],
  },
  {
    id: "seguridad",
    label: "seguridad",
    cmd: "preteco secure --identidad",
    lines: [
      { text: "> auditando accesos y datos sensibles...", tone: "muted" },
      { text: "[ok] workforce & customer identity · okta", tone: "ok" },
      { text: "[ok] criticalops para sistemas críticos", tone: "ok" },
      { text: "[ok] compliance y privacidad", tone: "ok" },
      { text: "→ accesos y datos bajo control", tone: "result" },
    ],
  },
];

export const services = [
  { pid: "0x01", name: "Desarrollo de Agentes", desc: "Agentes de IA que automatizan procesos y asisten en la toma de decisiones.", href: "#contacto" },
  { pid: "0x02", name: "AI Readiness", desc: "Diagnóstico de datos, procesos e infraestructura antes de invertir en IA.", href: "#ai-readiness" },
  { pid: "0x03", name: "Cloud", desc: "Migrar, escalar y operar con seguridad en la nube, sin fricciones.", href: "#contacto" },
  { pid: "0x04", name: "Modernización de Infraestructura", desc: "Hardware y software empresarial de primer nivel, implementado y optimizado.", href: "#contacto" },
  { pid: "0x05", name: "Modernización de Aplicaciones Legacy", desc: "Sistemas críticos llevados a arquitecturas actuales sin frenar la operación.", href: "#contacto" },
  { pid: "0x06", name: "Desarrollo de Aplicaciones", desc: "Software a medida e integración de sistemas con MuleSoft.", href: "#contacto" },
  { pid: "0x07", name: "Workforce & Customer Identity", desc: "Gestión de identidades y accesos (IAM) con Okta, para empleados y clientes.", href: "#contacto" },
  { pid: "0x08", name: "CriticalOps", desc: "Operación y soporte de los sistemas que no pueden caerse.", href: "#contacto" },
];

export const readinessChecks = [
  { id: "datos", label: "Tus datos están centralizados y son confiables", defaultOn: true },
  { id: "procesos", label: "Tenés procesos clave documentados", defaultOn: false },
  { id: "cloud", label: "Tu infraestructura ya corre (o puede correr) en cloud", defaultOn: true },
  { id: "sponsor", label: "Hay un sponsor de IA en la dirección", defaultOn: false },
  { id: "metricas", label: "Medís resultados con datos, no con intuición", defaultOn: false },
];

export function readinessResult(score: number) {
  if (score <= 1)
    return { level: "inicial", advice: "Arrancaríamos ordenando datos e infraestructura: la base para que cualquier IA funcione." };
  if (score <= 3)
    return { level: "en camino", advice: "Tenés buena parte de la base. El siguiente paso es un piloto acotado sobre un proceso concreto." };
  return { level: "listo para escalar", advice: "Estás para llevar agentes de IA a producción y medir su impacto en el negocio." };
}

export const cases = [
  { hash: "e9c0b4a", sector: "energía", client: "EPEC Córdoba", message: "feat: modernización para una energía más eficiente", tags: ["oracle", "infraestructura"] },
  { hash: "4f71d2e", sector: "seguros", client: "Federación Patronal", message: "refactor: migración y rediseño del sistema de gestión", tags: ["legacy", "desarrollo"] },
  { hash: "a83e5f1", sector: "sector público", client: "INDEC", message: "security: fortalecer la seguridad y privacidad de sus datos", tags: ["seguridad", "datos"] },
];

export const values = [
  "colaboración real",
  "compromiso con el resultado",
  "transparencia",
  "especialización",
  "escucha activa",
  "curiosidad y mejora continua",
];

// TODO: reemplazar por los artículos reales del blog (o conectar a un CMS / MDX).
export const posts = [
  { date: "[FECHA]", tag: "ia", title: "[TÍTULO DEL ARTÍCULO]", excerpt: "[Bajada de una línea del artículo]", href: "#blog" },
  { date: "[FECHA]", tag: "cloud", title: "[TÍTULO DEL ARTÍCULO]", excerpt: "[Bajada de una línea del artículo]", href: "#blog" },
  { date: "[FECHA]", tag: "seguridad", title: "[TÍTULO DEL ARTÍCULO]", excerpt: "[Bajada de una línea del artículo]", href: "#blog" },
];

export const footerNav = [
  { label: "home", href: "#top" },
  { label: "ai-readiness", href: "#ai-readiness" },
  { label: "servicios", href: "#servicios" },
  { label: "nosotros", href: "#equipo" },
  { label: "productos", href: "#servicios" },
  { label: "compliance", href: "#" },
  { label: "casos", href: "#casos" },
  { label: "contacto", href: "#contacto" },
];

// TODO: completar con las URLs reales.
export const socials = [
  { label: "linkedin", href: "#" },
  { label: "instagram", href: "#" },
  { label: "facebook", href: "#" },
];
