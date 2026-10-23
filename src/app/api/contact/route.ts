import { NextResponse } from "next/server";

type Payload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  mensaje?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const nombre = body.nombre?.trim();
  const email = body.email?.trim();
  if (!nombre || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  // TODO: conectar a un proveedor real (Resend, SendGrid, HubSpot, Salesforce...).
  // Las credenciales van en variables de entorno (ver .env.example), nunca en el código.
  console.log("[contacto]", {
    nombre,
    email,
    telefono: body.telefono?.trim() ?? "",
    empresa: body.empresa?.trim() ?? "",
    mensaje: body.mensaje?.trim() ?? "",
  });

  return NextResponse.json({ ok: true });
}
