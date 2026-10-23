import { cdn, img } from "@/lib/asset";

/* ── Casos ───────────────────────────────────────────────────────────── */
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
  },
  {
    id: "okta",
    name: "Okta",
    title: "Gestión de identidades y accesos (IAM)",
    text: "Protegé a tus usuarios y empleados con una plataforma de autenticación segura y experiencias digitales fluidas, garantizando el cumplimiento y la confianza.",
    logo: img("oktalogo.svg"),
  },
  {
    id: "mulesoft",
    name: "MuleSoft",
    title: "Integración de aplicaciones y datos",
    text: "Conectá sistemas, dispositivos y aplicaciones de manera ágil, rápida y segura, logrando una integración empresarial que acelera la innovación.",
    logo: img("mulesoft.svg"),
  },
  {
    id: "aws",
    name: "AWS",
    title: "Servicios cloud escalables y seguros",
    text: "Accedé a servicios en la nube líderes a nivel mundial, con la flexibilidad y seguridad que tu negocio necesita para crecer sin límites.",
    logo: img("awslogo.svg"),
  },
];

/* ── Nosotros ────────────────────────────────────────────────────────── */
export const values = [
  "Colaboración real",
  "Compromiso con el resultado",
  "Transparencia",
  "Especialización",
  "Escucha activa",
  "Curiosidad y mejora continua",
];

// Mejora UX: el original tenía los nombres solo en el alt de las fotos.
const teamRaw: [string, string][] = [
  ["María Fernicola", "85fbd232-92b2-4095-988e-2353ab537c68.jpg"],
  ["Gonzalo Cianci", "b16a172f-ec43-4f3e-a365-339694976c61.jpg"],
  ["Victoria Reguera", "594b81f5-a1dd-4829-acba-d9c64fcb8e52.jpg"],
  ["Daniel Monea", "8c5d21a3-fe25-476d-8fbd-40b9f6ef736d.jpg"],
  ["Isabel Papeschi", "6c10f953-f561-4e49-9e1b-3177cf1cb6d3.jpg"],
  ["Rafael Barrios", "19f8523b-b326-4181-a76f-17d8b81f2fde.jpg"],
  ["Gonzalo Prada", "42dd2ce9-a916-4cf8-9c59-6654f5c35326.jpg"],
  ["Rodrigo Humedes", "1f085660-5ded-4a35-b368-f31c7d56fe8e.jpg"],
  ["Natalia Abati", "e9eb3d46-58e1-4eb5-a832-4c5164f80426.jpg"],
  ["Camila Roldán", "cf19311a-2d91-44ec-a0f9-24199d0f4ea7.jpg"],
  ["Cristian Romero", "b4808c22-9931-4271-81e9-51d16017215e.jpg"],
  ["Maximiliano Ortiz", "9310fdbf-91d3-43db-a1e0-d147f348d1a0.jpg"],
  ["Ramiro Ibañez", "6ece5d61-c207-432d-a552-d735a960bdb1.jpg"],
  ["Sergio Marangani", "d0c7231f-8f10-40c9-8a81-c2ee810f7398.jpg"],
  ["Enrique Fernández", "fa6c50c7-dbe7-4a16-99de-49f27d32b554.jpg"],
  ["Delicia Andino", "03f08945-4500-47ca-8b0f-a4579e298b6d.jpg"],
  ["Federico Ríos", "934c7e1f-7ad9-4457-a7e1-3bf510144dd4.jpg"],
  ["Emmanuel Muñoz", "dff75831-8a34-421a-876a-b69b1be07cf8.jpg"],
  ["Daniel Calandra", "1397c0c6-decc-4054-8904-6596bfbc85bd.jpg"],
  ["Marcelo Quesada", "501ce896-3a36-49ec-a4a0-c0929300a8b7.jpg"],
  ["Rosario Moyano", "56d3b9f9-1a77-476c-87b9-409a9e02fa23.jpg"],
  ["Florencia Fenoglio", "374bc32e-44be-4a3e-8a53-01548418c849.jpg"],
  ["Ailén Rotbard", "a6a413bd-55c9-4d0b-9e77-7feda7e6ac6a.jpg"],
  ["Juan Salomon", "af86dd8d-7832-4102-99af-2b4ae0d09208.jpg"],
  ["Alejandro Schneider", "13778180-d7bf-4b29-844d-bc73bf8b0de1.jpg"],
  ["Claudia Caballero", "db391897-2c61-4777-9391-dc6e296b9da1.jpg"],
  ["Daniel Egea", "b8918829-89be-4abf-9ec3-3bc8a5e946d2.jpg"],
  ["Nicolás Jara", "65f764e6-a344-46b3-91b0-6ff23d3ba52d.jpg"],
  ["José Luis Duette", "8bec2988-00b1-4a98-8218-03e0f4569b2d.jpg"],
  ["Jeanette Martínez", "788186fd-5ac3-4157-a426-67efa44537c4.jpg"],
  ["Matías Alvarez", "859309a9-f7ac-42ab-94b2-0347d5830e97.jpg"],
  ["Nicolás López", "7bc91743-fcfd-4667-834e-f8f13fc1e543.jpg"],
  ["Víctor Mileto", "6c1b5994-0ada-47d9-ad0f-7915603a0199.jpg"],
  ["Virginia Correa", "2e7c4917-fc97-4b7a-8ac8-047a999d5c5e.jpg"],
  ["Laura Niveyro", "a641df4b-5135-4a09-b41b-c224a7c029c3.jpg"],
  ["Lucas Bastitta", "94b13659-352f-480d-96f1-116f3e1f79e6.jpg"],
  ["Marcelo Escalada", "3b719cde-81c0-4358-92f5-d2777d173ab1.jpg"],
  ["Marta Monacci", "645e6417-62a2-478f-be07-18b7894f82fd.jpg"],
  ["Jonathan Varela", "229507a4-a7f0-4180-83e2-d7cca5429c1c.jpg"],
  ["María Prieto", "27983d68-ff0f-4b65-b297-8778a9bc2997.jpg"],
  ["Héctor Fare", "e79c4c66-a23b-40ab-8a49-9a033c9c4922.jpg"],
  ["Lautaro Illescas", "6f5bd1dd-eb52-4424-8fab-aac701bc8e4c.jpg"],
  ["Natalia Masuccio", "362ba7d7-d1da-42e7-8b69-75a2104221d0.jpg"],
  ["Mónica Corominas", "4e8da020-e128-41aa-8ad1-fe77ff0917da.jpg"],
  ["Lucía Gómez Salinas", "007f5be2-426d-4bb9-8d4a-9c252c2dae9e.jpg"],
  ["Alfonsina Martínez", "2b7a1d09-c669-4e40-af7d-946bab85949e.png"],
  ["Gastón Persico", "a1f5b29a-5533-4ba1-b334-a85ca27504d3.jpg"],
  ["Erick Vargas", "c362faed-bde6-48c9-8469-7bf62186909f.jpg"],
  ["Elsa Di Giacomo", "fb4c5202-f8ac-4eb1-b0f2-4ecb91ed7982.jpg"],
  ["Edgardo Esteves", "20a1dfbd-f610-46f8-9761-d3e2574c66dd.jpg"],
  ["Fabián La Rocca", "181f81f3-0b69-43b1-a269-317f2e960dbc.jpg"],
  ["Gonzalo Valdez", "c19abb8d-dad7-4f79-bcc1-c645bdbe9906.jpg"],
  ["Juan Martín Muguerza", "be8b1ec9-cc12-46cb-a73b-13d93631905e.jpg"],
  ["Keila Figueroa", "b6d22779-94ba-4ea2-b29d-f6f541099afc.jpg"],
  ["Maximiliano Grippo", "4484c8bb-b4f8-4571-8824-5fe1abb9f6f2.jpg"],
  ["Carolina Corbani", "5e61147d-708f-46d3-8e62-e8e0d971fdd9.jpg"],
  ["Deborah Alandia", "d66864e8-3e61-4842-bcfb-d70429bd21da.jpg"],
  ["Cristian Rodriguez", "787c8fb1-a100-4fca-ac32-f6bf4efb5585.jpg"],
  ["Germán Munich", "63608196-8faf-48d8-805a-f607dd9bfcf5.jpg"],
  ["Alejandra Mata Brito", "69341d89-4b21-4cfa-a912-7ae983af72d0.jpg"],
  ["Víctor Grillo", "a5802832-331a-43d6-a251-ff0b29ea2c0f.jpg"],
  ["Julieta Suárez", "71c7179b-1647-4da2-9075-39a3caa2fae1.jpg"],
  ["Santiago Raineri", "12ea0c2a-d496-4a95-9d9e-c3917aeba9ca.jpg"],
  ["Ana Loiacono", "de1e10d3-d8cc-480b-bd55-67a760f8bc40.jpg"],
  ["Lautaro Jaime", "26a9b174-c62f-4c12-860d-aa2a35b59d84.jpeg"],
  ["Daniel Campos", "dfc422fc-028a-486a-ac68-3266175abd83.jpg"],
  ["Ana Davalillo", "b47ccba7-00c3-46d5-a7f4-4643a1d497c4.jpg"],
  ["Matías Romero", "af4fde58-ded8-4b01-96a8-944d18fa0c29.jpg"],
  ["Rubén Krasulak", "d7bd05dc-11cb-4287-a108-f244ce1a9ba8.jpg"],
  ["Manuel Ludman", "2ace31fb-f0fc-40cb-bd46-8ca6a45062e9.jpg"],
  ["Enrique Hornos", "1294dd36-b9d0-49a4-9295-2bdd5bd5a1a1.jpg"],
  ["Paula Costa", "c925bdcf-0e8e-4600-8761-7a334fd339db.jpg"],
  ["Natalia Alcaraz", "b0a3c636-a795-40d9-8892-fc84e3bd4e9d.jpg"],
];
export const team = teamRaw.map(([name, file]) => ({ name, photo: cdn(file) }));

/* ── Blog ────────────────────────────────────────────────────────────────
   Mejora UX: ordenado por fecha (el original estaba desordenado), título
   primero y bajada abajo, sin títulos cortados ni extractos repetidos.
   El cuerpo de cada artículo está en src/content/blog/<id>.md */
const blogRaw = [
  { id: 3, date: "2026-01-27", title: "Oracle Database 23ai: las últimas novedades de la base de datos que impulsa la nueva era de la IA empresarial", dek: "Cómo Oracle 23ai integra inteligencia artificial, seguridad y continuidad operativa en una única plataforma.", image: "f0724a38-0ccb-4b8c-9cce-d48bbd085e8b.webp", tag: "Datos" },
  { id: 4, date: "2026-02-18", title: "Preteco y la gestión de sistemas de misión crítica: cómo garantizar la continuidad del negocio con operación 24/7", dek: "Cómo garantizamos disponibilidad, seguridad y operación 24/7 en entornos donde fallar no es una opción.", image: "8fb125a2-525e-4bd1-a97e-2aded35f4cf8.webp", tag: "CriticalOps" },
  { id: 2, date: "2026-01-26", title: "Okta: funcionalidades clave para una gestión moderna y segura de identidades", dek: "Cómo Okta permite implementar Identity & Access Management con enfoque Zero Trust.", image: "34a88048-1f7c-426e-98d8-d0255e2690cb.webp", tag: "Seguridad" },
  { id: 6, date: "2026-02-20", title: "Estrategia multicloud", dek: "Agilidad, resiliencia y competitividad para el negocio.", image: "c536649b-febb-4493-a8a0-1f3ffa52189e.webp", tag: "Cloud" },
  { id: 7, date: "2026-02-27", title: "Migración de cargas a la nube en Latinoamérica", dek: "Un enfoque basado en un marco de tres pilares.", image: "6b3c96c0-3e99-4e62-a681-a8da91782211.webp", tag: "Cloud" },
  { id: 8, date: "2026-04-20", title: "Oracle y el origen silencioso de la IA empresarial: cómo construir inteligencia donde viven los datos", dek: "¿Cómo integrar la IA con los datos críticos del negocio sin complejizar la arquitectura?", image: "08385008-4cf0-40a1-820c-7204ebdd762e.webp", tag: "IA" },
  { id: 9, date: "2026-07-23", title: "OCI para minería: costos de infraestructura en Argentina", dek: "La volatilidad cambiaria encarece la infraestructura on-premise en minería. Cómo OCI convierte ese gasto en algo predecible y escalable.", image: "d8b431fa-a5d8-4e22-8df6-b47a6dc50a48.webp", tag: "Cloud" },
  { id: 11, date: "2026-07-23", title: "El costo real de mantener un sistema legacy: lo que aparece en la factura y lo que no", dek: "Mantener una aplicación legacy cuesta más de lo que muestra la factura de TI. Los costos ocultos y cómo reducirlos.", image: "ac2a1028-e87f-42cc-b04e-b2c417899712.webp", tag: "Desarrollo" },
  { id: 10, date: "2026-07-23", title: "Harvest Now, Decrypt Later: el riesgo oculto de tus datos a futuro", dek: "Tus datos pueden estar comprometidos hoy y no saberlo hasta dentro de años. Qué es este riesgo y cómo proteger su confidencialidad.", image: "05c35e42-5cb6-4d49-a52d-61f5848af104.png", tag: "Seguridad" },
  { id: 12, date: "2026-08-25", title: "El fraude bancario cambió de forma y los controles tradicionales no lo notaron", dek: "Durante años, los bancos construyeron sus defensas contra el fraude pensando en el perímetro.", image: "acb28c99-bb4f-4262-9795-8938ed21a644.webp", tag: "Seguridad" },
];

export const posts = blogRaw
  .map((p) => ({ ...p, image: cdn(p.image), url: `/blog/article/${p.id}` }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id));

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
}

/* ── Compliance ──────────────────────────────────────────────────────── */
export const complianceStats = [
  { value: "+10.259 días", label: "sin sanciones ni multas" },
  { value: "+USD 2M", label: "ahorrados previniendo incumplimientos y sanciones" },
  { value: "822 perfiles", label: "de terceros relacionados bajo monitoreo continuo" },
];

export const compliancePillars = [
  {
    title: "Cultura de integridad y liderazgo ético",
    items: [
      "Compromiso de los accionistas, el Comité de Ética y Compliance y la Alta Dirección, liderando con el ejemplo nuestra cultura de integridad, ética y compliance.",
      "Comité de Ética y Compliance que supervisa con autonomía e independencia la ejecución del Programa de Compliance y el funcionamiento del Sistema de Control Interno.",
      "Reporting anual y dashboard de KPIs en tiempo real que acompañan el día a día de nuestras operaciones.",
    ],
  },
  {
    title: "Tolerancia cero al soborno y a cualquier hecho de corrupción",
    items: [
      "Medidas AB&C de cumplimiento obligatorio para todos los miembros de Preteco, en el marco de nuestro sistema de gestión antisoborno y el Programa de Compliance.",
      "Supervisión de interacciones con el sector público.",
      "Gestión de conflictos de interés y control de regalos y hospitalidades.",
    ],
  },
  {
    title: "Sistema de Control Interno (SCI)",
    items: [
      "Trazabilidad de todas nuestras operaciones.",
      "Contabilidad precisa, con registros claros y transparentes que promueven la integridad financiera.",
      "Procesos documentados con foco en la delimitación de roles, la segregación de funciones y los controles por oposición.",
    ],
  },
  {
    title: "Evaluación de riesgos y mejora continua",
    items: [
      "Evaluación periódica y documentada de riesgos de compliance y corrupción.",
      "Identificación y monitoreo continuo de riesgos emergentes en la industria.",
      "Controles continuos y auditorías sobre la efectividad del Sistema de Compliance y del Sistema de Control Interno.",
    ],
  },
  {
    title: "Interacciones con terceros y debida diligencia",
    items: [
      "Procesos de due diligence sobre todos los terceros que interactúan con la empresa (proveedores, socios comerciales, agentes, colaboradores).",
      "Revisión de antecedentes y monitoreo continuo de alertas y listas de sanciones.",
      "Compromisos de integridad y confidencialidad en los documentos que rigen nuestras relaciones con terceros.",
    ],
  },
  {
    title: "Formación y concientización continua",
    items: [
      "Programas semestrales de capacitación para empleados, directivos y terceros vinculados.",
      "Onboarding de colaboradores.",
      "Talleres ad hoc de contenidos específicos, adaptados a diferentes funciones y riesgos, con evaluaciones de comprensión.",
      "Anticipación y sensibilización sobre riesgos emergentes.",
    ],
  },
  {
    title: "Línea ética y protección al denunciante",
    items: [
      "Plataforma administrada por terceros externos e independientes.",
      "Investigaciones objetivas, protocolizadas y confidenciales.",
      "Posibilidad de reportar hechos o inquietudes de forma anónima.",
      "Ninguna represalia contra denunciantes.",
    ],
    link: { label: "Ir a la Línea Ética", href: "https://www2.bdolineaetica.com/preteco/new" },
  },
];

export const codesOfConduct = [
  { label: "Código de conducta para colaboradores", href: "/assets/docs/codigo-conducta-colaboradores.pdf" },
  { label: "Código de conducta para terceros", href: "/assets/docs/codigo-conducta-terceros.pdf" },
];

export const vendorTrust = [
  { vendor: "AWS", trust: "https://aws.amazon.com/es/trust-center/", privacy: "https://aws.amazon.com/es/compliance/data-protection/" },
  { vendor: "Denodo", trust: "https://www.denodo.com/en/denodo-security", privacy: "https://www.denodo.com/en/privacy-notice" },
  { vendor: "Ionate", trust: "https://www.ionate.io/company/about/", privacy: "https://www.ionate.io/resources/white-papers/" },
  { vendor: "Oracle", trust: "https://www.oracle.com/ar/trust/", privacy: "https://www.oracle.com/legal/privacy/" },
  { vendor: "Okta", trust: "https://trust.okta.com/", privacy: null },
  { vendor: "Salesforce", trust: "https://trust.salesforce.com/", privacy: "https://www.salesforce.com/company/legal/privacy/" },
  { vendor: "SAS", trust: "https://www.sas.com/en_sa/trust-center.html", privacy: null },
];

export const frameworks = ["GDPR", "ISO 27001", "ISO 27017", "ISO 27018", "PCI DSS", "CSA STAR", "NIST 800-171", "SOC 1", "SOC 2", "SOC 3"];
