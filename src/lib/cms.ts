import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { posts as localPosts } from "@/content/company";
import { asset } from "@/lib/asset";

/* ═════════════════════════════════════════════════════════════════════
   Blog desde Google Sheets
   - La planilla "Preteco · Blog (CMS)" es la fuente de los artículos.
   - Se lee como CSV (la planilla debe estar compartida como "Cualquier
     persona con el enlace: lector") y se cachea 5 minutos.
   - Si la columna "cuerpo" está vacía, se usa el Markdown del repo
     (src/content/blog/<id>.md), así los artículos migrados siguen igual.
   - Si la planilla no está configurada o falla, el sitio usa el contenido
     local: el blog nunca queda vacío.
   ═════════════════════════════════════════════════════════════════════ */

export type Post = {
  id: number;
  date: string; // YYYY-MM-DD
  title: string;
  dek: string;
  tag: string;
  image: string;
  url: string;
  body: string;
};

export const BLOG_REVALIDATE_SECONDS = 300;
const DEFAULT_IMAGE = asset("/assets/image/ia.png");

export async function getPosts(): Promise<Post[]> {
  const sheetId = process.env.BLOG_SHEET_ID;
  if (sheetId) {
    try {
      const fromSheet = await fetchSheetPosts(sheetId);
      if (fromSheet.length > 0) return sortPosts(fromSheet);
    } catch (e) {
      console.error("[cms] No se pudo leer la planilla del blog, uso contenido local.", e);
    }
  }
  return sortPosts(
    localPosts.map((p) => ({ id: p.id, date: p.date, title: p.title, dek: p.dek, tag: p.tag, image: p.image, url: p.url, body: localBody(p.id) })),
  );
}

export async function getPost(id: string | number) {
  const all = await getPosts();
  return all.find((p) => String(p.id) === String(id));
}

async function fetchSheetPosts(sheetId: string): Promise<Post[]> {
  const gid = process.env.BLOG_SHEET_GID ?? "0";
  const res = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`, {
    next: { revalidate: BLOG_REVALIDATE_SECONDS, tags: ["blog"] },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  if (text.trimStart().startsWith("<")) throw new Error("La planilla no es pública (devolvió HTML).");

  const [header, ...rows] = parseCsv(text);
  const col = (name: string) => header.findIndex((h) => normalize(h) === name);
  const c = {
    id: col("id"),
    publicado: col("publicado"),
    fecha: col("fecha"),
    titulo: col("titulo"),
    bajada: col("bajada"),
    categoria: col("categoria"),
    imagen: col("imagen"),
    cuerpo: col("cuerpo"),
  };
  if (c.id < 0 || c.titulo < 0) throw new Error("Faltan columnas obligatorias (id, titulo).");

  const out: Post[] = [];
  for (const r of rows) {
    const get = (i: number) => (i >= 0 ? (r[i] ?? "").trim() : "");
    const id = Number(get(c.id));
    const title = get(c.titulo);
    if (!id || !title) continue;
    if (!/^(si|sí|yes|true|1|x)$/i.test(get(c.publicado))) continue;
    const date = parseDate(get(c.fecha));
    if (!date) continue;
    const body = get(c.cuerpo) || localBody(id);
    if (!body) continue;
    out.push({
      id,
      date,
      title,
      dek: get(c.bajada),
      tag: get(c.categoria) || "Blog",
      image: resolveImage(get(c.imagen)),
      url: `/blog/article/${id}`,
      body,
    });
  }
  return out;
}

function localBody(id: number) {
  const file = join(process.cwd(), "src/content/blog", `${id}.md`);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

function sortPosts(list: Post[]) {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id));
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

/** Acepta 2026-10-30, 30/10/2026 y 30-10-2026. */
function parseDate(v: string): string | null {
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = v.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return null;
}

/** Links de Google Drive → imagen directa; rutas "/..." → assets del sitio; URLs → tal cual. */
function resolveImage(v: string) {
  if (!v) return DEFAULT_IMAGE;
  const drive = v.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/);
  if (drive) return `https://lh3.googleusercontent.com/d/${drive[1]}=w1600`;
  if (v.startsWith("/")) return asset(v);
  if (/^https?:\/\//.test(v)) return v;
  return DEFAULT_IMAGE;
}

/** Parser CSV (RFC 4180): comillas, comas y saltos de línea dentro de celdas. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}
