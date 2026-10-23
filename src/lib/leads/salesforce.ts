/* Crea Leads en Salesforce.
   Modo recomendado: API REST con una Connected App (OAuth "client credentials").
     SF_LOGIN_URL      https://<tu-dominio>.my.salesforce.com
     SF_CLIENT_ID      Consumer Key de la Connected App
     SF_CLIENT_SECRET  Consumer Secret
   Modo simple (sin Connected App): Web-to-Lead con SF_ORG_ID. No confirma si el lead
   se creó ni devuelve su Id, por eso es solo la alternativa. */

export type LeadInput = {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  interes?: string;
  mensaje?: string;
  pagina?: string;
};

const API_VERSION = "v61.0";

export const salesforceMode = (): "api" | "web-to-lead" | null => {
  if (process.env.SF_LOGIN_URL && process.env.SF_CLIENT_ID && process.env.SF_CLIENT_SECRET) return "api";
  if (process.env.SF_ORG_ID) return "web-to-lead";
  return null;
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: "", last: parts[0] };
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
}

function description(l: LeadInput) {
  return [
    l.interes && `Interés: ${l.interes}`,
    l.mensaje && `Mensaje:\n${l.mensaje}`,
    l.pagina && `Enviado desde: ${l.pagina}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

/* ── API REST ─────────────────────────────────────────────────────────── */

let token: { access: string; instance: string } | null = null;

async function getToken(force = false) {
  if (token && !force) return token;
  const res = await fetch(`${process.env.SF_LOGIN_URL!.replace(/\/$/, "")}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SF_CLIENT_ID!,
      client_secret: process.env.SF_CLIENT_SECRET!,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Salesforce auth ${res.status}: ${await res.text()}`);
  const j = (await res.json()) as { access_token: string; instance_url: string };
  token = { access: j.access_token, instance: j.instance_url };
  return token;
}

async function createViaApi(l: LeadInput, retry = true): Promise<string> {
  const t = await getToken();
  const { first, last } = splitName(l.nombre);
  const res = await fetch(`${t.instance}/services/data/${API_VERSION}/sobjects/Lead`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${t.access}`,
      "Content-Type": "application/json",
      // Si hay reglas de duplicados, igual guardamos: el equipo comercial decide.
      "Sforce-Duplicate-Rule-Header": "allowSave=true",
    },
    body: JSON.stringify({
      FirstName: first || undefined,
      LastName: last,
      Email: l.email,
      Phone: l.telefono || undefined,
      Company: l.empresa || "Sin especificar",
      LeadSource: process.env.SF_LEAD_SOURCE || "Web",
      Description: description(l) || undefined,
    }),
    cache: "no-store",
  });
  if (res.status === 401 && retry) {
    await getToken(true);
    return createViaApi(l, false);
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`Salesforce ${res.status}: ${JSON.stringify(body)}`);
  return (body as { id: string }).id;
}

/* ── Web-to-Lead ─────────────────────────────────────────────────────── */

async function createViaWebToLead(l: LeadInput): Promise<string | null> {
  const { first, last } = splitName(l.nombre);
  const form = new URLSearchParams({
    oid: process.env.SF_ORG_ID!,
    first_name: first,
    last_name: last,
    email: l.email,
    phone: l.telefono ?? "",
    company: l.empresa || "Sin especificar",
    lead_source: process.env.SF_LEAD_SOURCE || "Web",
    description: description(l),
  });
  const res = await fetch("https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
    cache: "no-store",
    redirect: "manual",
  });
  if (res.status >= 400) throw new Error(`Web-to-Lead ${res.status}`);
  return null; // Web-to-Lead no devuelve el Id del Lead
}

export async function createSalesforceLead(l: LeadInput): Promise<string | null> {
  const mode = salesforceMode();
  if (mode === "api") return createViaApi(l);
  if (mode === "web-to-lead") return createViaWebToLead(l);
  throw new Error("Salesforce sin configurar");
}
