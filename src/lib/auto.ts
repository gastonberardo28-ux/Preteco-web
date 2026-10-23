import { team, values } from "@/content/collections/team";
import { services } from "@/content/collections/services";
import { compliancePillars } from "@/content/collections/compliance";
import type { HeroStat } from "@/components/PageHero";

/* Valores que se calculan solos a partir del contenido, para que los números
   del sitio nunca queden desactualizados. En content/pages se escriben así:
     { value: "auto:team", label: "personas en el equipo" }
     eyebrow: "auto:team personas"                                        */

const AUTO: Record<string, () => number> = {
  team: () => team.length,
  values: () => values.length,
  services: () => services.length,
  pillars: () => compliancePillars.length,
};

export type StatInput = { value: number | string; prefix?: string; suffix?: string; label: string };

export function resolveStats(list: StatInput[]): HeroStat[] {
  return list.map((s) => ({
    ...s,
    value: typeof s.value === "number" ? s.value : (AUTO[String(s.value).replace("auto:", "")]?.() ?? 0),
  }));
}

export function autoText(text: string) {
  return text.replace(/auto:(\w+)/g, (_, key: string) => String(AUTO[key]?.() ?? ""));
}
