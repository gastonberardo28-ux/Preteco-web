/* Cliente mínimo de Supabase (API REST), sin dependencias.
   Usa la service_role key: SOLO en el servidor, nunca en el navegador. */

const url = () => process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = () => Boolean(url() && key());

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: key()!,
    Authorization: `Bearer ${key()}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function insertLead(row: Record<string, string | null>): Promise<string> {
  const res = await fetch(`${url()}/rest/v1/leads`, {
    method: "POST",
    headers: headers({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert ${res.status}: ${await res.text()}`);
  const [created] = (await res.json()) as { id: string }[];
  return created.id;
}

export async function updateLead(id: string, patch: Record<string, string | null>) {
  const res = await fetch(`${url()}/rest/v1/leads?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(patch),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase update ${res.status}: ${await res.text()}`);
}
