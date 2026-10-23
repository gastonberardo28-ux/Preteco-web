import type { Action } from "@/components/ui";
import { COMPLIANCE_EMAIL } from "../site";

/* ═════════════════════════════════════════════════════════════════════
   COMPLIANCE · preteco.com/compliance
   Cambiá los textos entre comillas. *texto entre asteriscos* = resaltado lima.
   ═════════════════════════════════════════════════════════════════════ */

export const compliancePage = {
  seo: { title: "Compliance", description: "Compliance, gestión de riesgos y control interno de vanguardia para la era digital." },
  hero: {
    eyebrow: "Compliance",
    title: "Transformamos la confianza en un sistema vivo",
    text: "Compliance, gestión de riesgos y control interno de vanguardia para la era digital.",
    actions: [
      { label: "Ver el programa", href: "#pilares", variant: "primary" },
      { label: "Escribirle al equipo", href: `mailto:${COMPLIANCE_EMAIL}`, variant: "secondary" },
    ] satisfies Action[],
    stats: [
      { value: 10259, prefix: "+", label: "días sin sanciones ni multas" },
      { value: 2, prefix: "+USD ", suffix: "M", label: "ahorrados previniendo incumplimientos" },
      { value: 822, label: "terceros bajo monitoreo continuo" },
      { value: "auto:pillars", label: "pilares del programa" },
    ],
  },
  mission: {
    eyebrow: "Nuestra misión",
    title: "Integridad *sostenible*",
    text: "En Preteco, el cumplimiento no es reactivo. Nuestra gestión de riesgos y compliance se anticipa, evoluciona y actúa con base en estándares globales, tecnología segura y gobernanza ética.",
  },
  pillars: {
    eyebrow: "Cómo lo hacemos",
    title: "Compliance, gestión de riesgos y control interno: los pilares de nuestro sistema",
    codesTitle: "Nuestros códigos de conducta",
    codesText: "Descargá los códigos de conducta vigentes.",
  },
  data: {
    eyebrow: "Seguridad de los datos",
    title: "Comercialización de bienes y servicios enfocados en la seguridad de los datos",
    text: "Firmamos acuerdos de comercialización con los principales referentes tecnológicos para ofrecer soluciones innovadoras, útiles, eficaces y seguras. Las soluciones que comercializamos adoptan los más altos estándares de la industria:",
    trustLabel: "Ver trust center",
    privacyLabel: "Ver política",
  },
  form: {
    title: "¿Tenés dudas sobre compliance?",
    text: `Escribinos a ${COMPLIANCE_EMAIL} o completá el formulario.`,
  },
};
