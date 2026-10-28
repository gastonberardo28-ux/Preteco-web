import { img } from "@/lib/asset";

/* ── Productos ───────────────────────────────────────────────────────────
   Mejora: el original no tenía título en Oracle y en el resto pegaba el
   título con la descripción sin espacio ("(IAM)Protege", "datosConecta"). */
export const products = [
  {
    id: "oracle",
    name: "Oracle",
    title: "Datos y aplicaciones críticas",
    text: "Optimizá la gestión de datos críticos, aplicaciones y operaciones con soluciones Oracle que aseguran alto rendimiento, escalabilidad y máxima seguridad.",
    logo: img("oraclelogo.svg"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 254 / 33,
  },
  {
    id: "aws",
    name: "AWS",
    title: "Servicios cloud escalables y seguros",
    text: "Accedé a servicios en la nube líderes a nivel mundial, con la flexibilidad y seguridad que tu negocio necesita para crecer sin límites.",
    logo: img("awslogo.svg"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 80 / 49,
  },
  {
    id: "okta",
    name: "Okta",
    title: "Gestión de identidades y accesos (IAM)",
    text: "Protegé a tus usuarios y empleados con una plataforma de autenticación segura y experiencias digitales fluidas, garantizando el cumplimiento y la confianza.",
    logo: img("oktalogo.svg"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 143 / 49,
  },
  {
    id: "denodo",
    name: "Denodo",
    title: "Gestión lógica de datos",
    text: "Integrá y accedé a los datos de toda tu organización en tiempo real, sin moverlos ni duplicarlos, con una capa de datos unificada y gobernada, lista para analítica e IA.",
    logo: img("denodo.png"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 214 / 58,
  },
  {
    id: "sas",
    name: "SAS",
    title: "Analítica avanzada e IA",
    text: "Convertí tus datos en decisiones con la plataforma de analítica, machine learning e IA de SAS, con gobierno y confiabilidad de nivel empresarial.",
    logo: img("sas-logo.svg"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 103 / 44,
  },
];
