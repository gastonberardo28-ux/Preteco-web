import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED = ["nombre", "email", "telefono", "empresa", "interes", "linkedin", "area", "tema", "mensaje", "origen"] as const;

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

  if (!data.nombre || !data.email || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  // TODO: conectar a un proveedor real (Resend, SendGrid, HubSpot, Salesforce...).
  // `origen` indica qué formulario se usó: contact | careers | blog | compliance.
  // Las credenciales van en variables de entorno (ver .env.example), nunca en el código.
  console.log("[formulario]", data);

  return NextResponse.json({ ok: true });
}
