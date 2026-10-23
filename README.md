# preteco-web

Réplica del sitio institucional de [Preteco](https://preteco.com) con el mismo contenido, estructura e identidad visual (DM Sans / DM Mono, verde #CBFF00 sobre #141900), más una serie de mejoras de UX/UI.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

## Desarrollo

```bash
npm install
npm run dev            # http://localhost:3000
npm run build
```

## Imágenes

Todas las imágenes y PDF (127 archivos) están en `public/`, así que el sitio no depende del anterior.

Si se agrega una imagen nueva del sitio viejo al código, `npm run fetch-assets` la descarga (también corre solo en GitHub Actions cuando cambia el script). Las fotos del equipo y las portadas del blog se bajan pidiendo antes un link firmado a `/service/file/…`, como hace el sitio actual.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Home |
| `/services` | Servicios, metodología y herramientas |
| `/services/[slug]` | 7 páginas de servicio (una sola plantilla) |
| `/products` | Oracle, Okta, MuleSoft, AWS |
| `/cases` | Casos de éxito |
| `/blogs` | Blog |
| `/blog/article/[id]` | Artículos (se editan desde la planilla de Google) |
| `/about-us` | Nosotros, valores, equipo y búsqueda de talentos |
| `/compliance` | Programa de compliance |
| `/contact` | Contacto y oficinas |

Se mantienen las mismas URLs que el sitio actual para no perder SEO ni links existentes.

## Documentación

| Documento | Para quién |
| --- | --- |
| [`docs/GUIA-DE-EDICION.md`](docs/GUIA-DE-EDICION.md) | **Cualquier persona del equipo**: dónde está cada texto, cómo cambiarlo desde GitHub, cómo agregar personas, casos, servicios o secciones |
| [`docs/CMS-Y-LEADS.md`](docs/CMS-Y-LEADS.md) | Blog desde Google Sheets y formularios hacia Supabase y Salesforce |
| [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) | Desarrolladores: capas, convenciones, SEO técnico |

**En una línea:** los textos y datos están en `src/content/`, el diseño en `src/components/`, y cada URL en `src/app/`.

## Mejoras de UX/UI respecto del sitio actual

**Botones y jerarquía**
- Los CTA con borde punteado en mayúsculas se reemplazaron por un sistema de tres niveles: primario sólido, secundario con borde fino y link con flecha.
- Un CTA de contacto fijo en el header.

**Estructura y accesibilidad**
- Cada página tiene un H1 real (la home no tenía ninguno) y metadata propia para SEO; sitemap y robots.
- Link para saltar al contenido, foco visible, navegación por teclado, `aria-current` en el menú.
- Menú mobile completo y dropdown de servicios accesible.
- Respeta "reducir movimiento" del sistema.

**Servicios**
- Las páginas de servicio tenían la ilustración del hero tapando el título: ahora texto e imagen no se superponen.
- Cada servicio muestra solo los logos de los clientes que menciona (antes todas las páginas repetían la misma grilla, aunque el texto nombrara otros clientes).
- "¿Para qué sirve?" pasó de cajas centradas a una lista con íconos, fácil de escanear.
- "¿Por qué elegir Preteco?" usa un estilo consistente (antes los colores alternaban al azar).
- Se eliminaron textos duplicados (un punto repetido textual en infraestructura y dos en agentes de IA).
- Link al siguiente servicio al final de cada página.
- Los 5 pasos de "Así trabajamos" eran un carrusel donde solo se leía el primero: ahora se ven todos.

**Formularios**
- Validación con mensajes claros, estados de envío, éxito y error.
- Campos con `name` y `autocomplete` (el original no tenía `name`).
- El formulario de búsqueda de talentos pide LinkedIn/CV y área, en vez de "Empresa".
- El formulario de contacto pregunta el tema de interés, preseleccionado según la página.

**Contenido y otras páginas**
- Blog ordenado por fecha, con título primero, bajada legible y sin textos cortados.
- Casos: las cards parecían clickeables pero no llevaban a ningún lado; ahora enlazan al servicio aplicado.
- Se quitó el filtro "Casos" de la home, que tenía una sola opción.
- Productos: Oracle no tenía título y en el resto el título estaba pegado a la descripción sin espacio.
- Equipo: grilla completa con nombres (antes era un carrusel de 8 páginas sin nombres).
- Compliance: los pilares abrían modales; ahora se despliegan en el lugar. La tabla de fabricantes muestra links legibles en vez de URLs crudas. Las métricas quedan en una fila pareja.
- Contacto: los 4 mapas embebidos (lentos e incómodos en mobile) se reemplazaron por links "Cómo llegar".
- Corrección de typos y voseo consistente ("estrategicos", "mejora continúa", "Optimiza", "Accede", "Contáctanos", signos de pregunta faltantes).

## Pendientes

- [ ] Agregar las ilustraciones internas de los artículos (en el sitio actual están incrustadas en el texto; se migró solo la imagen de portada).
- [x] Blog en Google Sheets; leads en Supabase y Salesforce: ver `docs/CMS-Y-LEADS.md`.
- [ ] **Página de AI Readiness:** hoy enlaza a `preteco.com/ai-readiness/` del sitio anterior. Cuando el dominio apunte al sitio nuevo, ese link deja de funcionar: hay que migrarla o mover el sitio viejo a un subdominio.
