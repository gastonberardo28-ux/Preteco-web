import type { IconName } from "@/components/Icon";
import { team } from "./collections/team";
import { COMPLIANCE_EMAIL } from "./site";

/* ═════════════════════════════════════════════════════════════════════
   FORMULARIOS · campos, opciones y textos de cada variante
   - contact     → páginas comerciales (se crea un Lead en Salesforce)
   - careers     → "Trabajá con nosotros" en Nosotros
   - blog        → "Proponé un post" en el Blog
   - compliance  → página de Compliance
   El título y la bajada de cada formulario se definen en content/pages/<página>.ts
   ═════════════════════════════════════════════════════════════════════ */

export type FormVariant = "contact" | "careers" | "blog" | "compliance";

export type FormField = {
  /** Nombre técnico: así se guarda en Supabase/Salesforce. No cambiar sin avisar. */
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  /** Si tiene opciones, se muestra como desplegable. */
  options?: string[];
  /** Ocupa el ancho completo en desktop. */
  wide?: boolean;
};

/** Opciones de "¿Sobre qué querés hablar?". Cada servicio preselecciona la suya (campo formInterest). */
export const interestOptions = [
  "Seguridad e identidades",
  "Modernización de infraestructura",
  "Sistemas críticos (CriticalOps)",
  "Cloud",
  "Modernización de aplicaciones",
  "Data & IA",
  "Staffing IT",
  "Productos (Oracle, AWS, Okta, Denodo, SAS)",
  "Otro",
];

const nombre: FormField = { name: "nombre", label: "Nombre y apellido", required: true, placeholder: "Juan Pérez", autoComplete: "name" };
const email: FormField = { name: "email", label: "Email", type: "email", required: true, placeholder: "juan@empresa.com", autoComplete: "email" };
const telefono: FormField = { name: "telefono", label: "Teléfono", type: "tel", placeholder: "+54 11 3601 0545", autoComplete: "tel" };
const empresa: FormField = { name: "empresa", label: "Empresa", placeholder: "Nombre de tu empresa", autoComplete: "organization" };

export const formFields: Record<FormVariant, FormField[]> = {
  contact: [nombre, email, telefono, empresa, { name: "interes", label: "¿Sobre qué querés hablar?", options: interestOptions, wide: true }],
  careers: [
    nombre,
    email,
    telefono,
    { name: "linkedin", label: "LinkedIn o CV online", type: "url", placeholder: "https://linkedin.com/in/…", autoComplete: "url" },
    {
      name: "area",
      label: "Área de interés",
      options: ["Desarrollo", "Cloud e infraestructura", "Datos e IA", "Seguridad", "UX/UI", "Gestión de proyectos", "Comercial", "Otra"],
      wide: true,
    },
  ],
  blog: [nombre, email, empresa, { name: "tema", label: "Tema del post", placeholder: "Ej.: IA aplicada a seguros" }],
  compliance: [nombre, email, telefono, empresa],
};

/** Campo de texto libre al final de cada formulario. */
export const formMessage: Record<FormVariant, { label: string; placeholder: string }> = {
  contact: { label: "Mensaje", placeholder: "Contanos brevemente tu desafío o lo que necesitás." },
  careers: { label: "Contanos sobre vos", placeholder: "Tu experiencia, qué te interesa y por qué Preteco." },
  blog: { label: "Tu idea", placeholder: "Resumí en pocas líneas de qué trataría el post." },
  compliance: { label: "Consulta", placeholder: "Escribí tu consulta." },
};

/** Etiqueta chica arriba del título del formulario. */
export const formEyebrow: Record<FormVariant, string> = {
  contact: "Contacto",
  careers: "Trabajá con nosotros",
  blog: "Escribí en el blog",
  compliance: "Puertas abiertas",
};

/** Puntos con ícono al costado del formulario. */
export const formPoints: Record<FormVariant, { icon: IconName; text: string }[]> = {
  contact: [
    { icon: "clock", text: "Te respondemos a la brevedad" },
    { icon: "calendar", text: "Coordinamos una llamada sin compromiso" },
    { icon: "globe", text: "Equipos en Argentina, Uruguay y Bolivia" },
  ],
  careers: [
    { icon: "users", text: `Un equipo de ${team.length} personas` },
    { icon: "graduation", text: "Formación y especialización continua" },
    { icon: "globe", text: "Proyectos en toda Latinoamérica" },
  ],
  blog: [
    { icon: "pen", text: "Compartí tu experiencia y aprendizajes" },
    { icon: "book", text: "IA, cloud, datos y seguridad" },
  ],
  compliance: [
    { icon: "mail", text: COMPLIANCE_EMAIL },
    { icon: "shield", text: "Consultas tratadas con confidencialidad" },
  ],
};

export const formMessages = {
  required: "Este campo es obligatorio.",
  invalidEmail: "Revisá el formato del email.",
  invalid: "Revisá el formato.",
  sending: "Enviando…",
  submit: "Enviar",
  successTitle: "¡Gracias! Recibimos tu mensaje.",
  successText: "Te vamos a responder a la brevedad.",
  sendAnother: "Enviar otro mensaje",
  error: "No pudimos enviar tu mensaje. Probá de nuevo en unos minutos.",
  requiredNote: "Los campos con * son obligatorios.",
};
