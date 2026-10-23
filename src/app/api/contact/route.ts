import { NextResponse } from "next/server";
import { insertLead, supabaseConfigured, updateLead } from "@/lib/leads/supabase";
import { createSalesforceLead, salesforceMode } from "@/lib/leads/salesforce";

/* Flujo de cada envío:
   1. Se guarda SIEMPRE en Supabase (respaldo y registro de todos los formularios).
   2. Si es del formulario de contacto, se crea el Lead en Salesforce y se anota
      el resultado (Id o error) en la fila de Supabase.
   Postulaciones, propuestas de post y consultas de compliance quedan solo en Supabase. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORIGENES = ["contact", "careers", "blog", "compliance"] as const;
const FIELDS = ["nombre", "email", "telefono", "empresa", "interes", "linkedin", "area", "tema", "mensaje", "pagina"] as const;

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Campo trampa: si un bot lo completó, respondemos OK sin guardar nada.
  if (typeof raw.website === "string" && raw.website.trim()) return NextResponse.json({ ok: true });

  const data: Record<string, string> = {};
  for (const key of FIELDS) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) data[key] = v.trim().slice(0, 4000);
  }
  const origen = ORIGENES.includes(raw.origen as (typeof ORIGENES)[number]) ? (raw.origen as string) : "contact";

  if (!data.nombre || !data.email || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const toSalesforce = origen === "contact" && salesforceMode() !== null;
  let leadId: string | null = null;
  let saved = false;

  // 1) Supabase
  if (supabaseConfigured()) {
    try {
      leadId = await insertLead({
        origen,
        ...Object.fromEntries(FIELDS.map((f) => [f, data[f] ?? null])),
        user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
        sf_status: toSalesforce ? "pendiente" : "no_aplica",
      });
      saved = true;
    } catch (e) {
      console.error("[leads] Error guardando en Supabase:", e);
    }
  }

  // 2) Salesforce (solo contacto)
  if (toSalesforce) {
    try {
      const sfId = await createSalesforceLead(data as { nombre: string; email: string });
      saved = true;
      if (leadId) await updateLead(leadId, { sf_status: "enviado", sf_lead_id: sfId, sf_error: null }).catch(() => {});
    } catch (e) {
      console.error("[leads] Error creando el Lead en Salesforce:", e);
      if (leadId) await updateLead(leadId, { sf_status: "error", sf_error: String(e).slice(0, 1000) }).catch(() => {});
    }
  }

  if (!supabaseConfigured() && salesforceMode() === null) {
    console.warn("[leads] Supabase y Salesforce sin configurar. Lead recibido:", { origen, ...data });
    return NextResponse.json({ ok: true, stored: false });
  }

  if (!saved) return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 502 });
  return NextResponse.json({ ok: true, stored: true });
}
