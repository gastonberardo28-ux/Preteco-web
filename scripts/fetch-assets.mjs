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

let ok = 0;
let fail = 0;
for (const p of [...paths].sort()) {
  const dest = join(PUBLIC, p);
  if (existsSync(dest)) { ok++; continue; }
  try {
    const res = await fetch(ORIGIN + p);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", p);
  } catch (e) {
    fail++;
    console.warn("✗", p, e.message);
  }
}
console.log(`\n${ok} archivos listos, ${fail} con error. Ahora definí NEXT_PUBLIC_ASSET_BASE="" en Vercel.`);
