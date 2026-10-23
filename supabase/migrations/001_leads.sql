-- Leads del sitio web de Preteco.
-- Correr una vez en Supabase: SQL Editor → New query → pegar y ejecutar.

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  origen          text not null check (origen in ('contact', 'careers', 'blog', 'compliance')),
  nombre          text not null,
  email           text not null,
  telefono        text,
  empresa         text,
  interes         text,
  linkedin        text,
  area            text,
  tema            text,
  mensaje         text,
  pagina          text,
  user_agent      text,
  -- Seguimiento interno
  estado          text not null default 'nuevo' check (estado in ('nuevo', 'contactado', 'calificado', 'descartado')),
  notas           text,
  -- Sincronización con Salesforce (solo formularios de contacto)
  sf_status       text not null default 'no_aplica' check (sf_status in ('no_aplica', 'pendiente', 'enviado', 'error')),
  sf_lead_id      text,
  sf_error        text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_origen_idx on public.leads (origen);
create index if not exists leads_email_idx on public.leads (lower(email));

-- Seguridad: nadie puede leer ni escribir con la clave pública (anon).
-- El sitio escribe desde el servidor con la service_role key, que saltea RLS.
alter table public.leads enable row level security;

comment on table public.leads is 'Formularios del sitio web. Los de contacto también se crean como Lead en Salesforce.';

-- Vista práctica para el día a día (más recientes primero).
create or replace view public.leads_recientes
with (security_invoker = true) as
select created_at, origen, nombre, email, empresa, interes, estado, sf_status, sf_lead_id, mensaje
from public.leads
order by created_at desc;
