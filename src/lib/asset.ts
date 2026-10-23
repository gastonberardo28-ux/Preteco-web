/**
 * Las imágenes se sirven por ahora desde el sitio actual (https://preteco.com).
 * Corré `npm run fetch-assets` para descargarlas a /public, y después definí
 * NEXT_PUBLIC_ASSET_BASE="" (vacío) en Vercel para servirlas desde este proyecto.
 */
const BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "https://preteco.com";

export function asset(path: string) {
  return `${BASE}${path}`;
}

export const img = (file: string) => asset(`/assets/image/${file}`);
export const cdn = (file: string) => asset(`/preteco/preteco-web/${file}`);
