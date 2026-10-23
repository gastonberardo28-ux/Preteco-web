import { img } from "@/lib/asset";

/* ═════════════════════════════════════════════════════════════════════
   SERVICIOS · todo el contenido de /services y de cada /services/<slug>
   - Para editar un servicio: buscá su "slug" y cambiá los textos.
   - Para agregar uno: copiá un bloque completo de `services`, cambiá el slug,
     sumalo a un grupo en `serviceGroups` y asignale un ícono en content/icons.ts.
   ═════════════════════════════════════════════════════════════════════ */

/* ── Logos de clientes disponibles ──────────────────────────────────────
   Mejora UX: el sitio original mostraba la MISMA grilla de logos en todas
   las páginas de servicio, aunque el texto nombrara a otros clientes.
   Ahora cada servicio muestra solo los logos de los clientes que menciona. */
export const clientLogos: Record<string, { name: string; logo: string }> = {
  arca: { name: "ARCA (ex AFIP)", logo: img("arca.png") },
  indec: { name: "INDEC", logo: img("indec.png") },
  hacienda: { name: "Ministerio de Hacienda Córdoba", logo: img("ministerioDeHaciendoCordoba.png") },
  cajaValores: { name: "Caja de Valores", logo: img("cajaDeValores.png") },
  artear: { name: "ARTEAR", logo: img("artear.png") },
  mercantil: { name: "Banco Mercantil Santa Cruz", logo: img("mercantilSantaCruz.png") },
  allianz: { name: "Allianz", logo: img("allianz.png") },
  cre: { name: "Cooperativa Rural de Electrificación", logo: img("cre.png") },
};

export type ServiceHow =
  | { kind: "text"; text: string }
  | { kind: "steps"; intro?: string; items: string[] }
  | { kind: "cards"; intro?: string; items: { title: string; text: string }[] }
  | { kind: "list"; intro?: string; items: string[] };

export type Service = {
  /** Parte final de la URL: /services/<slug>. No cambiar: rompe links existentes. */
  slug: string;
  /** Opción que queda preseleccionada en "¿Sobre qué querés hablar?" del formulario. */
  formInterest: string;
  category: string;
  menuLabel: string;
  overviewTitle: string;
  overviewText: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  heroImage: string;
  whatTitle: string;
  what: string;
  whatImage: string;
  purposeIntro?: string;
  purposes: string[];
  how: ServiceHow;
  why: string[];
  casesText: string;
  logos: (keyof typeof clientLogos)[];
  ctaTitle: string;
  ctaText: string;
};

export const services: Service[] = [
  {
    slug: "critical-ops",
    formInterest: "Sistemas críticos (CriticalOps)",
    category: "Database, Middleware & Virtualización",
    menuLabel: "CriticalOps",
    overviewTitle: "Gestión de sistemas críticos",
    overviewText: "Mantener tu negocio en línea nunca fue tan crítico.",
    title: "CriticalOps",
    subtitle: "Gestión de sistemas críticos y continuidad del negocio.",
    metaDescription:
      "Monitoreo y gestión proactiva 24/7 de sistemas de misión crítica en entornos on-premise, cloud o híbridos.",
    heroImage: img("database.png"),
    whatTitle: "¿Qué es CriticalOps?",
    what: "CriticalOps es el servicio de monitoreo y gestión proactiva 24/7 para sistemas de misión crítica, diseñado para garantizar continuidad operativa, alta disponibilidad y seguridad en entornos on-premise, cloud o híbridos.",
    whatImage: img("critical-ops.png"),
    purposes: [
      "Asegurar la continuidad operativa.",
      "Liberar a tu equipo interno.",
      "Cumplir con SLA y estándares de seguridad.",
      "Proteger datos estratégicos.",
      "Reducir riesgos ante eventos pico.",
    ],
    how: {
      kind: "text",
      text: "Implementamos estrategias de workloads de alta disponibilidad, políticas de recuperación ante desastres y procesos ágiles que maximizan la eficiencia de tu operación.",
    },
    why: [
      "Más de 25 años acompañando a empresas y organismos críticos de Latinoamérica.",
      "Experiencia comprobada en entornos on-premise, cloud, híbridos y multicloud.",
      "Equipo senior especializado en continuidad IT y compliance.",
      "Conocimiento profundo de sectores altamente críticos como banca, salud, gobierno, energía y seguros.",
    ],
    casesText:
      "Empresas como ARCA (ex AFIP), INDEC, EPEC, Allianz y Banco Mercantil Santa Cruz ya confían en CriticalOps para mantener en funcionamiento sus sistemas más sensibles, respaldando operaciones en contextos de alta demanda y escenarios críticos.",
    logos: ["arca", "indec", "allianz", "mercantil"],
    ctaTitle: "¿Listo para garantizar la continuidad de tu negocio?",
    ctaText: "Completá el formulario y coordinamos una llamada.",
  },
  {
    slug: "cloud-modernization-infrastructure",
    formInterest: "Modernización de infraestructura",
    category: "Database, Middleware & Virtualización",
    menuLabel: "Modernización de infraestructura",
    overviewTitle: "Modernización de infraestructura",
    overviewText: "Modernizá tu base tecnológica sin frenar el negocio.",
    title: "Modernización y migración de infraestructura IT sin interrupción",
    subtitle: "Actualizamos tu infraestructura para que sea más segura y eficiente.",
    metaDescription:
      "Modernizamos tu infraestructura IT migrando data centers a OCI, AWS o entornos multicloud, con mínima interrupción.",
    heroImage: img("database.png"),
    whatTitle: "¿Qué es?",
    what: "Un servicio integral que moderniza tu infraestructura IT migrando data centers a OCI, AWS o entornos multicloud, asegurando mínima interrupción, reducción de riesgos y escalabilidad.",
    whatImage: img("modernization.png"),
    purposes: [
      "Reducir vulnerabilidades.",
      "Optimizar costos operativos.",
      "Preparar tu infraestructura para la nube y la innovación.",
      "Asegurar compatibilidad tecnológica.",
    ],
    how: {
      kind: "steps",
      items: [
        "Realizamos un análisis exhaustivo del entorno actual y de las necesidades del negocio.",
        "Diseñamos arquitecturas modernas, implementamos capacity planning y validamos la integridad de los datos.",
        "Ejecutamos migraciones seguras con simulaciones previas, mientras tu equipo continúa trabajando sin interrupciones.",
      ],
    },
    // Mejora: el original repetía acá, textual, el paso 3 de "¿Cómo lo hacemos?".
    why: [
      "Experiencia en modernizaciones críticas y soporte especializado 24/7.",
      "Proyectos exitosos en banca, seguros y gobierno.",
    ],
    casesText:
      "Ya confiaron en nosotros EPEC, Ministerio de Hacienda Córdoba, Global Processing, Allianz y ARTEAR, entre otros. Gracias a nuestras modernizaciones, lograron operar con mayor seguridad, eficiencia y capacidad de evolución tecnológica.",
    logos: ["hacienda", "allianz", "artear"],
    ctaTitle: "¿Listo para modernizar sin frenar el negocio?",
    ctaText: "Completá el formulario y coordinamos una llamada.",
  },
  {
    slug: "cloud",
    formInterest: "Cloud",
    category: "Cloud",
    menuLabel: "Cloud",
    overviewTitle: "Cloud Adoption Services",
    overviewText: "Llevá tu negocio a la nube, sin fricciones.",
    title: "Cloud Adoption Services",
    subtitle: "Servicios de adopción, migración y optimización en la nube.",
    metaDescription:
      "Adopción, migración y optimización cloud con estrategias híbridas y multicloud, migración de workloads críticos y automatización DevOps.",
    heroImage: img("cloud.png"),
    whatTitle: "¿Qué es?",
    what: "Cloud Adoption Services acompaña a tu negocio en el viaje hacia la nube, con estrategias híbridas y multicloud, migración de workloads críticos y automatización DevOps.",
    whatImage: img("cloud2.png"),
    purposes: [
      "Migrar entornos on-premise a la nube.",
      "Diseñar arquitecturas escalables.",
      "Optimizar costos y mejorar los entornos cloud.",
      "Fortalecer la seguridad en cada fase.",
    ],
    how: {
      kind: "cards",
      items: [
        { title: "Cloud Architecture & Capacity Planning", text: "Diseño y dimensionamiento estratégico de tu arquitectura cloud." },
        { title: "Move to Cloud", text: "Planificación y ejecución de migraciones en entornos simples, híbridos o multicloud." },
        { title: "Cloud Security Policy", text: "Definición e implementación de políticas de seguridad y compliance." },
        { title: "Managed Cloud Services", text: "Soporte y operación avanzada para sacar el máximo provecho desde el día uno." },
        { title: "Cloud Technical Assistance", text: "Resolución de incidentes y asistencia técnica especializada." },
        { title: "Virtual Networking", text: "Diseño y gestión de redes virtuales alineadas a tus requisitos de seguridad y rendimiento." },
      ],
    },
    why: [
      "Equipo certificado en múltiples plataformas (Oracle, AWS, Azure, Google Cloud).",
      "Más de 25 años en proyectos de infraestructura y cloud en sectores críticos.",
      "Experiencia transversal en seguros, energía, retail, gobierno y salud.",
      "Acompañamiento para acelerar la adopción y evolucionar con entornos híbridos.",
    ],
    casesText:
      "Federación Patronal Seguros, EPEC, Arcos Dorados, Molino Cañuelas y más organizaciones confiaron en Preteco para migrar, administrar y potenciar su estrategia cloud.",
    logos: [],
    ctaTitle: "¿Listo para migrar a la nube sin frenar el negocio?",
    ctaText: "Completá el formulario y coordinamos una reunión.",
  },
  {
    slug: "agent-development",
    formInterest: "Inteligencia artificial",
    category: "Inteligencia artificial",
    menuLabel: "Desarrollo de agentes",
    overviewTitle: "Desarrollo de agentes",
    overviewText: "Sumá inteligencia a tu operación.",
    title: "Desarrollo de agentes de inteligencia artificial para empresas",
    subtitle: "Creamos agentes de IA que potencian tu equipo y se adaptan a tu negocio.",
    metaDescription:
      "Agentes de IA que se integran a tus sistemas para automatizar procesos, responder consultas en tiempo real y potenciar el trabajo humano.",
    heroImage: img("ia.png"),
    whatTitle: "¿Qué es?",
    what: "Creamos agentes de IA que se integran en tus sistemas para automatizar procesos, responder consultas en tiempo real y potenciar el trabajo humano.",
    whatImage: img("agent-development.png"),
    purposes: [
      "Liberar talento humano de tareas repetitivas.",
      "Mejorar la experiencia del cliente con respuestas inmediatas y personalizadas.",
      "Acceder a insights relevantes para tomar mejores decisiones.",
      "Reducir costos operativos y mejorar la velocidad de respuesta en procesos críticos.",
    ],
    how: {
      kind: "list",
      intro:
        "Utilizamos tecnologías líderes como AWS API, MuleSoft y Red Hat OpenShift para garantizar soluciones escalables, seguras y flexibles.",
      items: [
        "Analizamos en profundidad tus procesos y los puntos críticos donde la IA puede generar más valor.",
        "Diseñamos agentes entrenables y personalizados, ajustados a tu cultura y tu stack tecnológico.",
        "Los integramos con tus sistemas existentes, asegurando máxima compatibilidad y seguridad.",
        "Trabajamos con metodología ágil, foco en resultados y acompañamiento experto en cada etapa.",
      ],
    },
    why: [
      "Experiencia desarrollando soluciones de IA aplicadas a procesos críticos en diferentes industrias.",
      "Metodología ágil, enfoque en compliance y soluciones de IA escalables.",
      "Alto nivel de personalización y adaptación a tus sistemas y cultura organizacional.",
      "Seguridad como pilar: cumplimiento de estándares y buenas prácticas para proteger tus datos y operaciones.",
    ],
    casesText:
      "Organizaciones de salud, fintech y aseguradoras ya confían en nuestros agentes para mejorar la atención al cliente, optimizar procesos internos y acelerar la toma de decisiones, manteniendo siempre un alto estándar de calidad y seguridad.",
    logos: [],
    ctaTitle: "¿Listo para que tu negocio piense y actúe con inteligencia?",
    ctaText: "Contactanos y diseñemos juntos tu próximo agente.",
  },
  {
    slug: "workforce-customer-indentity",
    formInterest: "Seguridad e identidades",
    category: "Seguridad",
    menuLabel: "Workforce & Customer Identity",
    overviewTitle: "Workforce & Customer Identity",
    overviewText: "Seguridad y confianza para cada identidad.",
    title: "Identity Management con Okta y Auth0",
    subtitle: "Seguridad y acceso inteligente para empleados y clientes.",
    metaDescription:
      "Gestión de identidades con SSO, MFA y governance centralizada para proteger los accesos de clientes y empleados.",
    heroImage: img("workforce.png"),
    whatTitle: "¿Qué es?",
    what: "Soluciones de gestión de identidades que combinan Single Sign-On (SSO), Multi-Factor Authentication (MFA) y governance centralizada para proteger los accesos de clientes y empleados.",
    whatImage: img("workforce-customer-indentity.png"),
    purposes: [
      "Aumentar la seguridad digital y reducir riesgos de accesos no autorizados.",
      "Mejorar la experiencia de acceso para empleados y clientes.",
      "Acelerar procesos de onboarding y operaciones internas.",
      "Cumplir con regulaciones y normativas de privacidad.",
    ],
    how: {
      kind: "list",
      items: [
        "Integramos autenticación multifactor y políticas avanzadas de seguridad para proteger todos los puntos de entrada.",
        "Aseguramos compatibilidad con tus sistemas legacy y plataformas cloud.",
      ],
    },
    why: [
      "Experiencia comprobada en sectores regulados como banca, salud y seguros.",
      "Visión integral: seguridad, cumplimiento normativo y foco en la experiencia del usuario.",
      "Capacidad para gestionar entornos complejos con múltiples aplicaciones y puntos de acceso.",
      "Enfoque colaborativo y transparente, alineado a la cultura y objetivos de tu organización.",
      "Partnership con líderes como Okta y Auth0.",
    ],
    casesText:
      "Bancos, aseguradoras y organizaciones públicas ya confían en nuestras soluciones para gestionar millones de identidades con seguridad y eficiencia, reduciendo incidentes y fortaleciendo la confianza en sus canales digitales.",
    logos: [],
    ctaTitle: "¿Listo para proteger tu negocio desde la identidad?",
    ctaText: "Contactanos y diseñemos juntos una estrategia de acceso segura y escalable.",
  },
  {
    slug: "legacy-apps",
    formInterest: "Desarrollo y modernización de aplicaciones",
    category: "Desarrollo",
    menuLabel: "Modernización de aplicaciones legacy",
    overviewTitle: "Modernización de aplicaciones legacy",
    overviewText: "Transformá tu legado en innovación.",
    title: "Transformá tu legado en innovación",
    subtitle: "Modernización de aplicaciones legacy con microservicios y cloud.",
    metaDescription:
      "Convertimos sistemas monolíticos en aplicaciones modernas basadas en microservicios, cloud y open source, preservando la lógica de negocio.",
    heroImage: img("development.png"),
    whatTitle: "¿Qué es?",
    what: "Convertimos sistemas monolíticos en aplicaciones modernas basadas en microservicios, cloud y tecnologías open source, preservando la lógica de negocio.",
    whatImage: img("legacy-apps.png"),
    purposeIntro:
      "Modernizar significa más flexibilidad, velocidad y seguridad para innovar, escalar y adaptarte sin perder el conocimiento crítico que reside en tus sistemas actuales.",
    purposes: [
      "Reducir costos de mantenimiento.",
      "Mejorar la experiencia del usuario.",
      "Habilitar la integración con IA.",
      "Asegurar compatibilidad con nuevas tecnologías.",
    ],
    how: {
      kind: "cards",
      intro: "Ofrecemos dos enfoques complementarios, según tus necesidades:",
      items: [
        {
          title: "Migración automatizada (AI/ML)",
          text: "Migramos el código existente con herramientas inteligentes para acelerar el proceso. Preservamos la lógica del negocio y dejamos el sistema listo para la nube.",
        },
        {
          title: "Migración manual con reingeniería y metodologías ágiles",
          text: "Analizamos tu sistema actual, rediseñamos la arquitectura y desarrollamos una solución moderna equivalente con tecnologías open source y microservicios. Nuestras células especializadas colaboran con tu equipo y garantizan una rápida salida al negocio.",
        },
      ],
    },
    why: [
      "Experiencia en proyectos complejos de banca, salud y gobierno, con reducción de riesgos y escalabilidad garantizada.",
      "Capacidad para trabajar con cualquier stack legacy (Oracle Forms, AS400, Mainframe, Visual Studio, Cobol, entre otros).",
      "Metodologías ágiles y foco en resultados concretos: menor tiempo de proyecto, menor costo y mayor aprovechamiento del conocimiento existente.",
      "Preparación para arquitecturas cloud, on-premise o híbridas, listas para escalar en múltiples plataformas.",
    ],
    casesText:
      "Federación Patronal Seguros, Hospital Alemán, Hospital Garrahan y Cooperativa Rural de Electrificación confiaron en nosotros para transformar sus sistemas legados y habilitar nuevas oportunidades de negocio.",
    logos: ["cre"],
    ctaTitle: "¿Listo para modernizar sin frenar el negocio?",
    ctaText: "Completá el formulario y coordinamos una reunión.",
  },
  {
    slug: "app-development",
    formInterest: "Desarrollo y modernización de aplicaciones",
    category: "Desarrollo",
    menuLabel: "Desarrollo de aplicaciones",
    overviewTitle: "Desarrollo de aplicaciones",
    overviewText: "Convertí tus ideas en soluciones digitales reales.",
    title: "Desarrollo de aplicaciones a medida para empresas",
    subtitle:
      "Convertí tus ideas en soluciones digitales reales. Creamos aplicaciones a medida para que tu negocio crezca, innove y se diferencie.",
    metaDescription:
      "Aplicaciones web, móviles y empresariales a medida que automatizan procesos, mejoran la experiencia del cliente y optimizan decisiones.",
    heroImage: img("development.png"),
    whatTitle: "¿Qué es?",
    what: "Creamos aplicaciones web, móviles y empresariales personalizadas, que automatizan procesos, mejoran la experiencia del cliente y optimizan las decisiones de negocio.",
    whatImage: img("app-development.png"),
    purposeIntro:
      "Te permite adaptarte a las necesidades de tu organización, generar valor diferencial y tomar decisiones basadas en datos conectados.",
    purposes: [
      "Personalizar la relación con el cliente.",
      "Automatizar procesos críticos para ganar eficiencia.",
      "Diferenciarte en el mercado con experiencias digitales innovadoras.",
      "Tomar decisiones basadas en datos y procesos conectados.",
    ],
    how: {
      kind: "list",
      items: [
        "Equipos ágiles y multidisciplinarios que trabajan desde la idea hasta el soporte post-implementación.",
        "Células de trabajo especializadas, que pueden integrarse a tu equipo actual o funcionar de forma autónoma.",
        "DevOps y tecnologías de vanguardia para garantizar escalabilidad y rendimiento.",
      ],
    },
    why: [
      "Experiencia comprobada en múltiples sectores y metodologías ágiles para reducir los tiempos de salida a producción.",
      "Flexibilidad total: nos adaptamos a tus necesidades, sin imponer estructuras rígidas.",
      "Relación cercana y transparente, basada en la confianza y en la búsqueda constante de resultados concretos.",
      "Compromiso real con el éxito y la innovación de tu negocio.",
    ],
    casesText:
      "Ministerio de Salud de Panamá, Molino Cañuelas, OMINT, Sanatorio Modelo de Quilmes y NewTravel son algunas de las organizaciones que confiaron en nosotros para desarrollar soluciones que transformaron sus operaciones y experiencias digitales.",
    logos: [],
    ctaTitle: "¿Listo para convertir tu idea en una solución real?",
    ctaText: "Completá el formulario y coordinamos una reunión.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceGroups = [
  { name: "Database, Middleware & Virtualización", image: img("database.png"), slugs: ["critical-ops", "cloud-modernization-infrastructure"] },
  { name: "Cloud", image: img("cloud.png"), slugs: ["cloud"] },
  { name: "Inteligencia artificial", image: img("ia.png"), slugs: ["agent-development"] },
  { name: "Seguridad", image: img("security.png"), slugs: ["workforce-customer-indentity"] },
  { name: "Desarrollo", image: img("development.png"), slugs: ["legacy-apps", "app-development"] },
];

export const workSteps = [
  {
    phase: "Conexión inicial",
    title: "Nos conocemos",
    text: "Todo comienza con una conversación. Queremos entender tu negocio, tu cultura, tus desafíos y tus aspiraciones. Esta etapa es fundamental para construir una colaboración genuina.",
  },
  {
    phase: "Diagnóstico estratégico",
    title: "Identificamos el desafío",
    text: "Analizamos tu situación actual y juntos detectamos el desafío clave que, al ser abordado, potenciará el desarrollo de tu empresa. Este diagnóstico nos permite enfocar los esfuerzos en lo que realmente genera impacto.",
  },
  {
    phase: "Diseño integral",
    title: "Creamos un plan a medida",
    text: "Diseñamos una solución personalizada, integral y escalable. Nuestro enfoque considera todos los aspectos de tu operación, combinando tecnología, procesos y personas para lograr una transformación exitosa.",
  },
  {
    phase: "Implementación evolutiva",
    title: "Ejecutamos la solución",
    text: "Ponemos en marcha el plan con precisión y agilidad. Implementamos soluciones que no solo resuelven el desafío identificado, sino que también habilitan nuevas capacidades para el crecimiento futuro.",
  },
  {
    phase: "Acompañamiento continuo",
    title: "Estamos con vos",
    text: "No terminamos cuando el proyecto se implementa. Te acompañamos durante todo el proceso y después, asegurando que la solución evolucione y siga generando valor en el tiempo.",
  },
];

export const tools = [
  { area: "UX/UI", items: ["Figma", "Maze", "FigJam", "Google Forms", "Lookback"] },
  { area: "Desarrollo", items: ["Oracle", "MySQL", "PostgreSQL", "Okta", "Ionate", "Java", "Angular", "Salesforce", "SAS"] },
  { area: "Gestión ágil", items: ["Jira", "Trello", "Notion", "Miro"] },
];
