import type { IconName } from "@/components/Icon";

/* Qué ícono representa a cada servicio, área y concepto. Centralizado para que
   el mismo concepto use siempre el mismo ícono en todo el sitio. */

export const serviceIcon: Record<string, IconName> = {
  "critical-ops": "activity",
  "cloud-modernization-infrastructure": "server",
  cloud: "cloud",
  "agent-development": "bot",
  "workforce-customer-indentity": "key",
  "legacy-apps": "refresh",
  "app-development": "layout",
};

export const groupIcon: Record<string, IconName> = {
  "Database, Middleware & Virtualización": "database",
  Cloud: "cloud",
  "Inteligencia artificial": "sparkles",
  Seguridad: "shield",
  Desarrollo: "code",
};

export const stepIcons: IconName[] = ["message", "search", "pen", "rocket", "handshake"];

export const valueIcons: IconName[] = ["users", "target", "eye", "award", "message", "sparkles"];

export const toolIcons: Record<string, IconName> = {
  "UX/UI": "pen",
  Desarrollo: "code",
  "Gestión ágil": "layers",
};

export const pillarIcons: IconName[] = ["users", "shield", "layers", "chart", "handshake", "graduation", "megaphone"];

export const tagIcon: Record<string, IconName> = {
  Datos: "database",
  CriticalOps: "activity",
  Seguridad: "shield",
  Cloud: "cloud",
  IA: "sparkles",
  Desarrollo: "code",
};
