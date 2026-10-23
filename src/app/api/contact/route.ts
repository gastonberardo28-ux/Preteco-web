import { NextResponse } from "next/server";

/* Guarda cada lead en la planilla "Preteco · Leads del sitio".
   El envío pasa por un Apps Script publicado en esa planilla (ver docs/CMS-Y-LEADS.md):
   la planilla nunca se hace pública y la clave compartida evita envíos falsos. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED = [
  "nombre",
  "email",
  "telefono",
  "empresa",
  "interes",
  "linkedin",
  "area",
  "tema",
  "mensaje",
  "origen",
  "pagina",
  "website", // honeypot anti-spam: los humanos no lo ven ni lo completan
] as const;

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const data: Record<string, string> = {};
  for (const key of ALLOWED) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) data[key] = v.trim().slice(0, 4000);
  }

  // Bot que completó el campo oculto: respondemos OK sin guardar nada.
  if (data.website) return NextResponse.json({ ok: true });

  if (!data.nombre || !data.email || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.LEADS_WEBHOOK_SECRET;
  if (!webhook || !secret) {
    console.warn("[leads] LEADS_WEBHOOK_URL/SECRET sin configurar. Lead recibido:", data);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    // Apps Script responde con una redirección: fetch la sigue y devuelve el JSON final.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, fecha: new Date().toISOString(), ...data }),
      cache: "no-store",
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !out?.ok) throw new Error(out?.error ?? `HTTP ${res.status}`);
  } catch (e) {
    console.error("[leads] No se pudo guardar el lead en la planilla:", e, data);
    return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
