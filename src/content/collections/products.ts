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
    id: "okta",
    name: "Okta",
    title: "Gestión de identidades y accesos (IAM)",
    text: "Protegé a tus usuarios y empleados con una plataforma de autenticación segura y experiencias digitales fluidas, garantizando el cumplimiento y la confianza.",
    logo: img("oktalogo.svg"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 143 / 49,
  },
  {
    id: "mulesoft",
    name: "MuleSoft",
    title: "Integración de aplicaciones y datos",
    text: "Conectá sistemas, dispositivos y aplicaciones de manera ágil, rápida y segura, logrando una integración empresarial que acelera la innovación.",
    logo: img("mulesoft.svg"),
    /** Proporción ancho / alto del logo: se usa para que todos se vean del mismo "peso". */
    logoRatio: 217 / 65,
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
];
