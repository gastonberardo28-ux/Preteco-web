# Blog y leads con Google Sheets

El sitio usa dos planillas de Google Drive:

| Planilla | Para qué | ¿Pública? |
| --- | --- | --- |
| **Preteco · Blog (CMS)** | Escribir y publicar artículos del blog | Sí, solo lectura con el enlace (el contenido ya es público) |
| **Preteco · Leads del sitio** | Recibir los formularios del sitio | **No.** Solo la ven las personas con las que la compartas |

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

### Configuración (una vez)

1. Abrí **Preteco · Leads del sitio** → **Extensiones → Apps Script**. Borrá lo que haya y pegá `scripts/apps-script/leads.gs`. Guardá.
2. *Configuración del proyecto* (ícono de engranaje) → *Propiedades del script* → agregá:
   - `SECRET` = una clave larga inventada
   - `NOTIFY_EMAIL` = (opcional) mail(s) que reciben un aviso por cada lead, separados por coma
3. **Implementar → Nueva implementación** → tipo **Aplicación web**:
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
   - Autorizá los permisos que pide Google (la primera vez muestra un aviso de "app no verificada": *Configuración avanzada → Ir a…*). Es tu propio script.
4. Copiá la URL que termina en `/exec`.
5. En Vercel cargá `LEADS_WEBHOOK_URL` (la URL del paso 4) y `LEADS_WEBHOOK_SECRET` (la misma clave que `SECRET`). Redeploy.

> Si cambiás el código del script, hacé **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga siendo la misma.

### Qué se guarda

Una fila por envío con: fecha, origen (Contacto, Trabajá con nosotros, Propuesta de post, Compliance), nombre, email, teléfono, empresa, interés, LinkedIn, área, tema, mensaje, página desde donde se envió, **estado** (arranca en "Nuevo") y **notas** para el seguimiento comercial.

### Seguridad

- La planilla de leads nunca se publica: el sitio le envía los datos al script con una clave compartida.
- El formulario tiene un campo trampa invisible que descarta envíos de bots.
- Los textos que empiezan con `=`, `+`, `-` o `@` se guardan como texto para que no se ejecuten como fórmulas.
