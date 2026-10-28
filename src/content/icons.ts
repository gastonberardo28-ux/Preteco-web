import type { IconName } from "@/components/Icon";

/* Qué ícono representa a cada servicio, área y concepto. Centralizado para que
   el mismo concepto use siempre el mismo ícono en todo el sitio. */

export const serviceIcon: Record<string, IconName> = {
  "critical-ops": "activity",
  "cloud-modernization-infrastructure": "server",
  cloud: "cloud",
  "workforce-customer-indentity": "key",
  "legacy-apps": "refresh",
  "data-ia": "chart",
  "staffing-it": "users",
};

export const groupIcon: Record<string, IconName> = {
  Seguridad: "shield",
  "Database, Middleware & Cloud": "database",
  "Modernización de aplicaciones": "code",
  "Data & IA": "network",
  "Staffing IT": "users",
};

export const pillarIcons: IconName[] = ["users", "shield", "layers", "chart", "handshake", "graduation", "megaphone"];

