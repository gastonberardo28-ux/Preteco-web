/* ── Compliance: pilares del programa, códigos de conducta y fabricantes.
   Los textos de la página (hero, métricas, títulos) están en content/pages/compliance.ts */

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
