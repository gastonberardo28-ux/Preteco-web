import { img } from "@/lib/asset";

/* Casos de éxito. Para agregar uno, copiá un bloque { ... } y cambiá los datos.
   "service.href" es la página de servicio a la que lleva la tarjeta. */
export const cases = [
  {
    client: "EPEC Córdoba",
    summary: "Modernización para una energía más eficiente.",
    image: img("miniCardImg1.jpg"),
    badge: img("oraclePartner.svg"),
    badgeAlt: "Oracle Partner",
    service: { label: "Modernización de infraestructura", href: "/services/cloud-modernization-infrastructure" },
  },
  {
    client: "Federación Patronal",
    summary: "Migración y rediseño de su sistema de gestión.",
    image: img("miniCardImg2.jpg"),
    service: { label: "Modernización de aplicaciones legacy", href: "/services/legacy-apps" },
  },
  {
    client: "INDEC",
    summary: "Fortalecer la seguridad y privacidad de sus datos.",
    image: img("miniCardImg3.jpg"),
    service: { label: "CriticalOps", href: "/services/critical-ops" },
  },
];
