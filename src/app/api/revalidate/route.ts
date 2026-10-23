import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/* Publica al instante los cambios de la planilla del blog (sin esperar los 5 minutos).
   Lo llama el menú "Preteco → Publicar cambios" de la planilla, o se puede abrir:
   https://<tu-sitio>/api/revalidate?secret=<REVALIDATE_SECRET> */
async function handle(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  revalidateTag("blog");
  return NextResponse.json({ ok: true, revalidated: "blog", at: new Date().toISOString() });
}

export const GET = handle;
export const POST = handle;
