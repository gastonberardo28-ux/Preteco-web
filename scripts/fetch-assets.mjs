// Descarga a /public todas las imágenes y documentos que el código referencia del sitio actual.
// Uso: npm run fetch-assets   (después commiteá la carpeta public/)
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const ORIGIN = "https://preteco.com";
const SRC = new URL("../src", import.meta.url).pathname;
const PUBLIC = new URL("../public", import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const paths = new Set();
for (const file of walk(SRC)) {
  if (!/\.(ts|tsx)$/.test(file)) continue;
  const code = readFileSync(file, "utf8");
  for (const m of code.matchAll(/img\(\s*"([^"]+)"\s*\)/g)) paths.add(`/assets/image/${m[1]}`);
  for (const m of code.matchAll(/cdn\(\s*"([^"]+)"\s*\)/g)) paths.add(`/preteco/preteco-web/${m[1]}`);
  for (const m of code.matchAll(/["'`](\/assets\/(?:image|docs)\/[^"'`]+)["'`]/g)) paths.add(m[1]);
  // Archivos del CDN declarados como datos (equipo, blog): nombres tipo UUID
  for (const m of code.matchAll(/"([0-9a-f]{8}-[0-9a-f-]{27}\.(?:jpe?g|png|webp))"/g)) paths.add(`/preteco/preteco-web/${m[1]}`);
}

// Las fotos del equipo y las portadas del blog no son públicas: el sitio actual
// pide primero un link firmado (que vence) a /service/file/<archivo> y con ese baja la imagen.
async function resolveUrl(p) {
  const cdnPrefix = "/preteco/preteco-web/";
  if (!p.startsWith(cdnPrefix)) return ORIGIN + p;
  const name = p.slice(cdnPrefix.length);
  const res = await fetch(`${ORIGIN}/service/file/${name}`, {
    headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json", "X-Enable-CORS": "true", "X-Active-CORS": "-" },
  });
  if (!res.ok) throw new Error(`link firmado: HTTP ${res.status}`);
  const signed = (await res.text()).trim().replace(/^"|"$/g, "");
  if (!/^https?:\/\//.test(signed) && !signed.startsWith("/")) throw new Error("respuesta inesperada al pedir el link firmado");
  return new URL(signed, ORIGIN).toString();
}

let ok = 0;
let fail = 0;
const failures = [];
for (const p of [...paths].sort()) {
  const dest = join(PUBLIC, p);
  if (existsSync(dest)) { ok++; continue; }
  try {
    const res = await fetch(await resolveUrl(p));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if ((res.headers.get("content-type") || "").includes("text/html")) throw new Error("devolvió HTML en vez del archivo");
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", p);
  } catch (e) {
    fail++;
    failures.push(`${p}  ${e.message}`);
    console.warn("✗", p, e.message);
  }
}
console.log(`\n${ok} archivos listos, ${fail} con error.`);
writeFileSync(new URL("./fetch-assets-report.txt", import.meta.url), `${ok} ok, ${fail} con error\n${failures.join("\n")}\n`);
if (fail) process.exitCode = 1;
