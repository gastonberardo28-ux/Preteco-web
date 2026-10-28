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
  mercantil: { name: "Banco Mercantil Santa Cruz", logo: img("mercantilSantaCruz.png") },
  allianz: { name: "Allianz", logo: img("allianz.png") },
  cre: { name: "Cooperativa Rural de Electrificación", logo: img("cre.png") },
};

export type ServiceHow =
  | { kind: "text"; text: string }
  | { kind: "steps"; intro?: string; items: string[] }
  | { kind: "cards"; intro?: string; items: { title: string; text: string; bullets?: string[] }[] }
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

const serviceList: Service[] = [
  {
    slug: "critical-ops",
    formInterest: "Sistemas críticos (CriticalOps)",
    category: "Database, Middleware & Cloud",
    menuLabel: "CriticalOps",
    overviewTitle: "Gestión de sistemas críticos",
    overviewText: "Mantener tu negocio en línea nunca fue tan crítico.",
    title: "CriticalOps",
    subtitle: "Gestión de sistemas críticos y continuidad del negocio.",
    metaDescription:
      "Monitoreo y gestión proactiva 24/7 de sistemas de misión crítica en entornos on-premise, cloud o híbridos.",
    heroImage: img("database.png"),
    whatTitle: "¿Qué es CriticalOps?",
    what: "CriticalOps es el servicio de asistencia técnica en el que monitoreamos y gestionamos 24/7 tus sistemas de misión crítica para que funcionen sin interrupciones, y optimizamos tus procesos para que tu negocio sea más ágil y eficiente, en entornos on-premise, cloud o híbridos.",
    whatImage: img("critical-ops.png"),
    purposes: [
      "Asegurar la continuidad operativa.",
      "Liberar a tu equipo interno.",
      "Cumplir con SLA y estándares de seguridad.",
      "Proteger datos estratégicos.",
      "Reducir riesgos ante eventos pico.",
    ],
    how: {
      kind: "cards",
      intro:
        "Implementamos estrategias de workloads de alta disponibilidad, políticas de recuperación ante desastres y procesos ágiles que maximizan la eficiencia de tu operación.",
      items: [
        { title: "Continuidad del negocio", text: "Planificamos workloads y procesos para atender los picos de demanda y minimizar los incidentes." },
        { title: "Eficiencia operativa", text: "Optimizamos la performance de los sistemas y la velocidad de atención ante incidentes o aumentos de demanda." },
        { title: "Seguridad", text: "Definimos, implementamos y testeamos las políticas de seguridad y respaldo de datos." },
        { title: "Flexibilidad", text: "Adaptamos el servicio a la necesidad de cada cliente." },
      ],
    },
    why: [
      "Más de 28 años acompañando a empresas y organismos críticos de Latinoamérica.",
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
    category: "Database, Middleware & Cloud",
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
    purposeIntro:
      "Tocar un sistema que funciona implica riesgos, pero mantener software o infraestructura obsoleta te expone a vulnerabilidades, reduce la eficiencia y te quita compatibilidad con las herramientas que necesitás para innovar y escalar.",
    how: {
      kind: "cards",
      intro: "Migramos con mínima interrupción del servicio, mientras tu equipo sigue trabajando con normalidad.",
      items: [
        { title: "Planificación", text: "Analizamos el entorno actual y planificamos y probamos la estrategia de migración que mejor se adapta a tu negocio." },
        { title: "Arquitectura", text: "Diseñamos la nueva arquitectura evaluando las opciones más efectivas, con capacity planning incluido." },
        { title: "Migración", text: "Ejecutamos la transición con simulaciones previas, manteniendo la integridad de tus datos." },
        { title: "Test", text: "Probamos la actualización minimizando el impacto en la disponibilidad del servicio." },
      ],
    },
    // Mejora: el original repetía acá, textual, el paso 3 de "¿Cómo lo hacemos?".
    why: [
      "Experiencia en modernizaciones críticas y soporte especializado 24/7.",
      "Proyectos exitosos en banca, seguros y gobierno.",
    ],
    casesText:
      "Ya confiaron en nosotros EPEC, Ministerio de Hacienda Córdoba y Allianz, entre otros. Gracias a nuestras modernizaciones, lograron operar con mayor seguridad, eficiencia y capacidad de evolución tecnológica.",
    logos: ["hacienda", "allianz"],
    ctaTitle: "¿Listo para modernizar sin frenar el negocio?",
    ctaText: "Completá el formulario y coordinamos una llamada.",
  },
  {
    slug: "cloud",
    formInterest: "Cloud",
    category: "Database, Middleware & Cloud",
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
      intro:
        "Una suite completa de servicios que podés contratar en forma individual, combinada o total: desde el diseño de la arquitectura hasta la administración y evolución de tus entornos.",
      items: [
        { title: "Cloud Architecture & Capacity Planning", text: "Diseño y dimensionamiento estratégico de tu arquitectura cloud." },
        { title: "Move to Cloud", text: "Planificación y ejecución de migraciones en entornos simples, híbridos o multicloud." },
        { title: "Cloud Security Policy", text: "Definición e implementación de políticas de seguridad y compliance." },
        { title: "DBAaaS · ITaaS", text: "Nuestros DBAs y DevOps especializados en cloud complementan a tu equipo de IT, aceleran la curva de aprendizaje y te ayudan a sacarle el máximo provecho a la nube desde el día uno." },
        { title: "Cloud Technical Assistance", text: "Resolución de incidentes y asistencia técnica especializada." },
      ],
    },
    why: [
      "Equipo certificado en múltiples plataformas (Oracle, AWS, Azure, Google Cloud).",
      "Más de 28 años en proyectos de infraestructura y cloud en sectores críticos.",
      "Experiencia transversal en seguros, energía, retail, gobierno y salud.",
      "Acompañamiento para acelerar la adopción y evolucionar con entornos híbridos.",
    ],
    casesText:
      "Federación Patronal Seguros, EPEC, Molino Cañuelas y más organizaciones confiaron en Preteco para migrar, administrar y potenciar su estrategia cloud.",
    logos: [],
    ctaTitle: "¿Listo para migrar a la nube sin frenar el negocio?",
    ctaText: "Completá el formulario y coordinamos una reunión.",
  },
  {
    slug: "workforce-customer-indentity",
    formInterest: "Seguridad e identidades",
    category: "Seguridad",
    menuLabel: "Workforce & Customer Identity",
    overviewTitle: "Workforce & Customer Identity",
    overviewText: "Seguridad y confianza para cada identidad.",
    title: "Identity Management con Okta y Auth0",
    subtitle: "Todo el ciclo de vida de la identidad, para empleados, clientes, proveedores y agentes de IA.",
    metaDescription:
      "Gestión de identidades con Okta y Auth0: SSO, MFA resistente a phishing, identity governance, passwordless y acceso seguro para agentes de IA.",
    heroImage: img("workforce.png"),
    whatTitle: "¿Qué es?",
    what: "Cubrimos todo el ciclo de vida de la identidad, desde la gobernanza hasta el acceso y los controles de acceso privado. Junto a Okta brindamos una plataforma neutral, potente y extensible que pone la identidad en el centro de la seguridad de tus datos: protegemos el acceso a datos, aplicaciones y dispositivos de empleados, proveedores, clientes, socios y agentes de IA.",
    whatImage: img("workforce-customer-indentity.png"),
    purposes: [
      "Aumentar la seguridad digital y reducir riesgos de accesos no autorizados.",
      "Mejorar la experiencia de acceso para empleados y clientes.",
      "Acelerar procesos de onboarding y operaciones internas.",
      "Cumplir con regulaciones y normativas de privacidad.",
      "Dar acceso seguro a los agentes de IA que trabajan con tus herramientas y datos.",
    ],
    how: {
      kind: "cards",
      intro:
        "Integramos estas soluciones con tus sistemas legacy y plataformas cloud, sin importar quién necesite acceder, el caso de uso o el nivel de soporte que necesites.",
      items: [
        { title: "Single Sign-On", text: "Acceso seguro a aplicaciones y datos para empleados, clientes, contratistas y socios, con la mejor experiencia de trabajo." },
        { title: "Autenticación multifactor", text: "Autenticación inteligente y resistente a phishing, sin comprometer la experiencia del usuario." },
        { title: "Identity Governance", text: "Más seguridad y menos complejidad en la administración de accesos, desde una plataforma de identidades unificada." },
        { title: "Passwordless", text: "Acceso más rápido y seguro a través de autenticación biométrica." },
        { title: "Auth0 para aplicaciones de GenAI", text: "Agentes de IA que acceden de forma segura a herramientas, workflows y datos, con unas pocas líneas de código." },
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
    formInterest: "Modernización de aplicaciones",
    category: "Modernización de aplicaciones",
    menuLabel: "Modernización de aplicaciones",
    overviewTitle: "Modernización de aplicaciones",
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
          text: "Migramos el código existente con herramientas de análisis y generación basadas en IA, que respetan la lógica de negocio. Ideal para modernizaciones as is.",
          bullets: ["Código cloud-ready", "Migración a tecnologías open source", "Mayor velocidad de migración", "Microservicios nativos", "Sin reingeniería de procesos"],
        },
        {
          title: "Migración manual con reingeniería y metodologías ágiles",
          text: "Analizamos tu sistema actual, rediseñamos la arquitectura y desarrollamos una solución moderna equivalente con tecnologías open source y microservicios. Ideal para modernizar con rediseño de procesos y pantallas.",
          bullets: ["Equipos dedicados por especialidad", "Selección de tecnologías", "Escalabilidad del proceso con células de trabajo", "Implementación directa", "Alta reingeniería de procesos"],
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
      "Federación Patronal Seguros, Hospital Alemán y Cooperativa Rural de Electrificación confiaron en nosotros para transformar sus sistemas legados y habilitar nuevas oportunidades de negocio.",
    logos: ["cre"],
    ctaTitle: "¿Listo para modernizar sin frenar el negocio?",
    ctaText: "Completá el formulario y coordinamos una reunión.",
  },
  {
    slug: "data-ia",
    formInterest: "Data & IA",
    category: "Data & IA",
    menuLabel: "Data & IA",
    overviewTitle: "Data & IA",
    overviewText: "Datos ordenados e IA aplicada, del diagnóstico a producción.",
    title: "Data & IA para potenciar el talento de tu organización",
    subtitle: "Organizamos tus datos e implementamos IA para que tu equipo ponga su energía y creatividad donde más valor genera.",
    metaDescription:
      "Organizamos los datos e implementamos IA integrada a tus sistemas: AI Readiness, soluciones co-creadas (demo, PoC, MVP), arquitectura y LLMOps, y un AI Squad dedicado.",
    heroImage: img("ia.png"),
    whatTitle: "¿Qué es?",
    what: "Organizamos los datos e implementamos IA para que el talento humano de tu organización pueda poner toda su energía y creatividad en generar aún más valor para el negocio, apoyándose en insights y en herramientas de inteligencia artificial integradas a tus sistemas existentes, con los más altos niveles de seguridad.",
    whatImage: img("agent-development.png"),
    purposeIntro: "Trabajamos en cuatro frentes, para que puedas empezar por donde más lo necesites.",
    purposes: [
      "Saber qué tan preparada está tu organización para la IA y tener un roadmap concreto.",
      "Validar ideas rápido, con demos y pruebas de concepto, antes de invertir a escala.",
      "Contar con datos normalizados, integraciones y una arquitectura lista para IA.",
      "Llevar agentes, automatizaciones y modelos a producción de forma segura.",
    ],
    how: {
      kind: "cards",
      intro: "¿Qué hacemos? Cuatro frentes de trabajo:",
      items: [
        {
          title: "Transformación de negocio",
          text: "AI Readiness en cuatro niveles, del diagnóstico a la transformación.",
          bullets: ["Lite · diagnóstico rápido inicial", "Starter · evaluación por dimensiones", "Intermediate · roadmap validado a 90 días", "Advanced · transformación integral"],
        },
        {
          title: "Soluciones co-creadas",
          text: "Validamos cada idea por etapas, junto a tu equipo.",
          bullets: ["Quick Win Demo · prueba conceptual visual", "PoC · validación técnica acotada", "MVP · primera versión funcional", "Producto · solución lista para escalar"],
        },
        {
          title: "Tecnología correcta",
          text: "La base técnica para que la IA funcione en producción.",
          bullets: [
            "Arquitectura de IA",
            "Data Readiness · normalización de datos",
            "Integraciones entre sistemas",
            "Infraestructura cloud, on-premise o híbrida",
            "LLMOps · modelos en producción",
            "Seguridad, privacidad y compliance",
            "Desarrollo a medida",
          ],
        },
        {
          title: "AI Squad · IA Lab",
          text: "Un equipo dedicado que construye soluciones de IA para tu negocio.",
          bullets: ["Agentes · decisiones autónomas", "Automatizaciones · flujos sin intervención", "IA generativa · soporte de procesos con GenAI", "Predictivo / ML · predicción y análisis"],
        },
      ],
    },
    why: [
      "Más de 28 años en sistemas de misión crítica: integramos la IA con lo que ya funciona.",
      "Seguridad y compliance como pilar, desde el diseño.",
      "Un enfoque por etapas (demo, PoC, MVP, producto) que reduce el riesgo de cada inversión.",
      "Un AI Squad propio para pasar del piloto a producción.",
    ],
    casesText:
      "Organizaciones de servicios financieros, seguros, salud y sector público confían en Preteco para operar sus sistemas más críticos, y hoy suman datos e IA sobre esa misma base.",
    logos: [],
    ctaTitle: "¿Listo para poner tus datos y la IA a trabajar?",
    ctaText: "Contanos tu desafío y te proponemos por dónde empezar.",
  },
  {
    slug: "staffing-it",
    formInterest: "Staffing IT",
    category: "Staffing IT",
    menuLabel: "Staffing IT",
    overviewTitle: "Staffing IT",
    overviewText: "No solo cubrimos posiciones: construimos equipos.",
    title: "Staffing IT en modalidad de servicio continuo",
    subtitle: "No solo cubrimos posiciones. Construimos equipos que generan resultados.",
    metaDescription:
      "Staffing IT como servicio continuo: diagnóstico, gestión con IA y criterio humano, pipeline visible, sourcing multicanal, onboarding y seguimiento.",
    heroImage: img("development.png"),
    whatTitle: "¿Qué es?",
    what: "Un servicio continuo de staffing IT: entendemos tu negocio, tu stack y tu equipo, gestionamos cada búsqueda combinando IA y criterio humano, y acompañamos la integración de cada profesional para asegurar la continuidad del servicio.",
    whatImage: img("unSoloEquipo.png"),
    purposeIntro: "Resuelve los desafíos que más vemos en nuestros clientes:",
    purposes: [
      "Bajar la alta rotación.",
      "Ganar visibilidad sobre cada búsqueda.",
      "Pasar de cubrir posiciones a construir equipos.",
      "Asegurar la continuidad del servicio.",
    ],
    how: {
      kind: "cards",
      items: [
        { title: "Diagnóstico", text: "Entendemos tu negocio, tu stack y tu equipo." },
        { title: "Gestión", text: "IA + criterio humano, pipeline visible y sourcing multicanal." },
        { title: "Integración", text: "Onboarding y seguimiento continuo de cada profesional." },
      ],
    },
    why: [
      "Resultado: profesionales integrados y continuidad del servicio.",
      "Pipeline visible: sabés en qué estado está cada búsqueda.",
      "Más de 28 años armando y gestionando equipos técnicos en sistemas de misión crítica.",
    ],
    casesText:
      "Organizaciones de servicios financieros, seguros, salud y sector público confían en Preteco para sostener la operación de sus sistemas más críticos.",
    logos: [],
    ctaTitle: "¿Necesitás sumar talento IT a tu equipo?",
    ctaText: "Contanos qué perfiles buscás y coordinamos una llamada.",
  },
];


/* Áreas en el orden del deck institucional (01 Seguridad … 05 Staffing IT).
   El orden de `services` (menú y "Siguiente servicio") sale de acá. */
export const serviceGroups = [
  { name: "Seguridad", image: img("security.png"), slugs: ["workforce-customer-indentity"] },
  { name: "Database, Middleware & Cloud", image: img("database.png"), slugs: ["cloud-modernization-infrastructure", "critical-ops", "cloud"] },
  { name: "Modernización de aplicaciones", image: img("development.png"), slugs: ["legacy-apps"] },
  { name: "Data & IA", image: img("ia.png"), slugs: ["data-ia"] },
  { name: "Staffing IT", image: img("development.png"), slugs: ["staffing-it"] },
];

export const services: Service[] = serviceGroups.flatMap((g) =>
  g.slugs.map((slug) => {
    const svc = serviceList.find((s) => s.slug === slug);
    if (!svc) throw new Error(`Servicio "${slug}" listado en serviceGroups pero no definido`);
    return svc;
  }),
);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

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
