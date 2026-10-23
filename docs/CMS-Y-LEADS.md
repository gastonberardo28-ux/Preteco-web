# Blog y leads

| Qué | Dónde vive | Quién lo usa |
| --- | --- | --- |
| **Artículos del blog** | Planilla de Google **Preteco · Blog (CMS)** | Cualquiera del equipo que escriba notas |
| **Leads comerciales** (formulario de contacto) | **Salesforce**, como *Lead* | Equipo comercial |
| **Todos los formularios** (contacto, postulaciones, propuestas de post, compliance) | **Supabase**, tabla `leads` | Respaldo y registro completo |

## 1. Blog

### Configuración (una vez)

1. Abrí **Preteco · Blog (CMS)** → **Compartir** → *Acceso general*: **Cualquier persona con el enlace** → rol **Lector**.
2. Copiá el ID de la planilla (lo que está entre `/d/` y `/edit` en la URL).
3. En Vercel → *Settings → Environment Variables*, cargá:
   - `BLOG_SHEET_ID` = el ID del paso 2
   - `REVALIDATE_SECRET` = una clave larga inventada (por ejemplo, de un generador de contraseñas)
4. *Opcional, para publicar al instante:* en la planilla, **Extensiones → Apps Script**, pegá `scripts/apps-script/blog.gs`, guardá, y en *Configuración del proyecto → Propiedades del script* agregá `SITE_URL` (la URL del sitio, sin barra al final) y `REVALIDATE_SECRET` (la misma de Vercel). Recargá la planilla: aparece el menú **Preteco**.
5. Redeploy en Vercel para que tome las variables.

### Cómo escribir un artículo

Una fila = un artículo.

| Columna | Qué poner |
| --- | --- |
| `id` | Un número que no se repita. Define la URL: `/blog/article/<id>` |
| `publicado` | `SI` para que aparezca, `NO` para borrador |
| `fecha` | `2026-10-30` o `30/10/2026` |
| `titulo` | Título del artículo |
| `bajada` | Una o dos frases; se ve debajo del título y en la tarjeta |
| `categoria` | `IA`, `Cloud`, `Seguridad`, `Datos`, `Desarrollo`, `CriticalOps` (cualquier otra también funciona, con un ícono genérico) |
| `imagen` | Link de una imagen. Sirve un link de Google Drive si la imagen está compartida con "Cualquier persona con el enlace" |
| `cuerpo` | El texto, con este formato simple: `## Subtítulo`, `### Subtítulo chico`, `- punto de lista`, `**negrita**`. Dejá una línea en blanco entre párrafos (en la celda: Ctrl/Cmd + Enter para salto de línea) |

- Los cambios aparecen en el sitio solos en **hasta 5 minutos**, o al instante con **Preteco → Publicar cambios**.
- Si `cuerpo` está vacío, el sitio usa el texto guardado en el repo (`src/content/blog/<id>.md`). Así están los 10 artículos migrados: podés editar su título, bajada, imagen o despublicarlos desde la planilla, y si pegás un cuerpo nuevo, reemplaza al del repo.
- Si la planilla no se puede leer, el sitio muestra el contenido del repo: el blog nunca queda vacío.

## 2. Leads

### Cómo funciona

1. Cada envío de cualquier formulario se guarda en Supabase (tabla `leads`).
2. Si es el formulario de **contacto**, además se crea un **Lead en Salesforce** (origen "Web") y en Supabase queda anotado el Id del Lead o el error, si lo hubo.
3. Postulaciones, propuestas de post y consultas de compliance quedan **solo en Supabase**: no son oportunidades comerciales.

Si Salesforce falla, el lead no se pierde: queda en Supabase con `sf_status = error` para reenviarlo.

### Supabase (una vez)

1. En Vercel → tu proyecto → **Storage → Create / Connect → Supabase** (o creá el proyecto en supabase.com). Si lo conectás desde Vercel, las variables `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` se cargan solas.
2. En Supabase → **SQL Editor → New query**, pegá `supabase/migrations/001_leads.sql` y ejecutalo.
3. Para ver los leads: Supabase → **Table Editor → leads** (o la vista `leads_recientes`). Desde ahí filtrás, cambiás el `estado`, agregás `notas` y exportás a CSV.

La tabla tiene la seguridad por filas activada y sin permisos públicos: solo el servidor del sitio (con la service_role key) puede escribir, y solo las personas con acceso al proyecto de Supabase pueden verla. **Nunca** pongas la service_role key en una variable `NEXT_PUBLIC_…`.

### Salesforce (una vez)

**Opción recomendada: Connected App (API).** Confirma que el Lead se creó y guarda su Id.

1. Salesforce → **Setup → App Manager → New Connected App** (o *External Client App* en orgs nuevas).
2. Activá **OAuth**, callback `https://login.salesforce.com/services/oauth2/success`, scopes **Manage user data via APIs (api)**.
3. Activá **Enable Client Credentials Flow** y, en *Manage → Edit Policies*, elegí un **Run As** (un usuario de integración con permiso para crear Leads).
4. Copiá **Consumer Key** y **Consumer Secret**.
5. En Vercel cargá:
   - `SF_LOGIN_URL` = `https://<tu-dominio>.my.salesforce.com` (Setup → My Domain)
   - `SF_CLIENT_ID` = Consumer Key
   - `SF_CLIENT_SECRET` = Consumer Secret
   - `SF_LEAD_SOURCE` = `Web` (o el valor del picklist *Lead Source* que usen)

**Opción simple: Web-to-Lead.** Sin Connected App, pero Salesforce no confirma si el Lead se creó.

1. Setup → **Web-to-Lead** → activalo.
2. Copiá el **Organization ID** (Setup → Company Information) en `SF_ORG_ID`.

Si están las dos configuradas, se usa la API.

### Qué llega a Salesforce

| Campo del Lead | Viene de |
| --- | --- |
| First Name / Last Name | "Nombre y apellido" (la última palabra va como apellido) |
| Email, Phone | Email, Teléfono |
| Company | Empresa (si falta: "Sin especificar") |
| Lead Source | `SF_LEAD_SOURCE` (por defecto "Web") |
| Description | Tema de interés, mensaje y página desde donde se envió |

Si tienen reglas de duplicados, el Lead se guarda igual y el equipo comercial decide. Para mapear "interés" a un campo propio de Salesforce, hay que agregarlo en `src/lib/leads/salesforce.ts`.

Después de cargar variables en Vercel, hacé **Redeploy**.

### Seguridad

- Campo trampa invisible que descarta envíos de bots.
- Validación de nombre y email en el servidor; solo se guardan los campos previstos.
