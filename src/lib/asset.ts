/**
 * Las imágenes y documentos viven en /public (se descargan del sitio anterior con
 * `npm run fetch-assets`). Si alguna vez hiciera falta servirlas desde otro dominio
 * o CDN, definí NEXT_PUBLIC_ASSET_BASE con esa URL base.
 */
const BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "";

export function asset(path: string) {
  return `${BASE}${path}`;
}

export const img = (file: string) => asset(`/assets/image/${file}`);
export const cdn = (file: string) => asset(`/preteco/preteco-web/${file}`);
