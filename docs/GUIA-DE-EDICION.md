# Guía de edición del sitio

Esta guía es para cualquier persona del equipo, sepa o no programar. La idea central:

> **Los textos y datos están en `src/content/`. El diseño está en `src/components/`.**
> Para cambiar lo que dice el sitio casi nunca hace falta tocar diseño.

---

## 1. Cómo hacer un cambio (sin instalar nada)

1. Entrá al repo en GitHub: `github.com/gastonberardo28-ux/Preteco-web`.
2. Buscá el archivo con la tabla de abajo (tecla `t` en GitHub abre el buscador de archivos).
3. Tocá el **lápiz** ✏️ (*Edit this file*), cambiá el texto **entre comillas** y no toques nada más.
4. Abajo elegí **"Create a new branch… and start a pull request"** y confirmá.
5. En el pull request, Vercel publica una **vista previa** con tu cambio (link en un comentario del bot de Vercel). Revisala.
6. Si está bien, tocá **Merge**. En 1–2 minutos queda publicado.

Si algo sale mal, el pull request muestra un ❌ y el sitio publicado **no se rompe**: los cambios con error nunca llegan a producción.

### Reglas para no romper nada

- Cambiá solo lo que está **entre comillas** `"…"`.
- Si el texto tiene comillas adentro, usá comillas tipográficas “así” o `\"`.
- No borres comas, llaves `{ }` ni corchetes `[ ]`.
- `*texto entre asteriscos*` en un título lo muestra **resaltado en lima**.
- No cambies los campos `slug`, `id`, `href` o `name` salvo que sepas lo que hacés: rompen links o formularios.

---

## 2. ¿Dónde está cada cosa?

### Textos de cada página

| Quiero cambiar… | Archivo |
| --- | --- |
| Textos de la **home** (título, tarjetas, números, títulos de secciones) | `src/content/pages/home.ts` |
| Textos de **/services** (hero, metodología, stack) | `src/content/pages/services.ts` |
| Botones y títulos fijos de **cada página de servicio** | `src/content/pages/services.ts` → `serviceDetail` |
| **Productos** | `src/content/pages/products.ts` |
| **Casos** | `src/content/pages/cases.ts` |
| **Blog** (página de listado) | `src/content/pages/blog.ts` |
| Textos fijos de **cada artículo** ("Seguí leyendo", etc.) | `src/content/pages/article.ts` |
| **Nosotros** | `src/content/pages/about.ts` |
| **Compliance** (hero, métricas, títulos) | `src/content/pages/compliance.ts` |
| **Contacto** | `src/content/pages/contact.ts` |
| Página de **error 404** | `src/content/pages/not-found.ts` |
| Título y descripción para **Google** de cada página | campo `seo` dentro del archivo de esa página |

### Contenido que se repite (listas)

| Quiero cambiar… | Archivo |
| --- | --- |
| Un **servicio** (qué es, beneficios, cómo lo hacemos, casos, logos) | `src/content/collections/services.ts` |
| Los **5 pasos** de la metodología y las **herramientas** | `src/content/collections/services.ts` (`workSteps`, `tools`) |
| Los **casos de éxito** | `src/content/collections/cases.ts` |
| Los **productos** (Oracle, Okta…) | `src/content/collections/products.ts` |
| El **equipo** y los **valores** | `src/content/collections/team.ts` |
| Los **pilares de compliance**, códigos de conducta, fabricantes | `src/content/collections/compliance.ts` |
| Los **artículos del blog** | La **planilla de Google** "Preteco · Blog (CMS)" (ver `docs/CMS-Y-LEADS.md`) |

### Todo el sitio

| Quiero cambiar… | Archivo |
| --- | --- |
| **Menú** principal | `src/content/site.ts` → `mainNav` |
| **Pie de página** (textos y links) | `src/content/site.ts` → `footer`, `footerNav` |
| **Redes sociales**, **partners**, **oficinas**, mail de compliance | `src/content/site.ts` |
| Texto del **botón fijo de mobile** según la sección (o en qué páginas no aparece) | `src/content/site.ts` → `stickyCta` |
| Campos y textos de los **formularios** | `src/content/forms.ts` |
| Qué **ícono** usa cada servicio, área o pilar | `src/content/icons.ts` (lista de íconos disponibles en `src/components/Icon.tsx`). Criterio: íconos solo donde ayudan a reconocer algo; para listas de conceptos (valores, pasos) se usan números |
| **Colores** y **tipografías** | `src/app/globals.css` (bloque `@theme`) — *tarea de diseño* |

### Imágenes

Las imágenes están en `public/`. Para reemplazar una, subí un archivo nuevo **con el mismo nombre** a la misma carpeta (GitHub → *Add file → Upload files*). Para usar una nueva, subila y escribí su nombre donde corresponda (por ejemplo `img("mi-imagen.png")` para `public/assets/image/mi-imagen.png`).

---

## 3. Tareas frecuentes, paso a paso

### Cambiar un número de la home o de Nosotros
En `src/content/pages/home.ts` → `hero.stats`. Los valores `"auto:team"` y `"auto:services"` se calculan solos (cantidad de personas y de servicios): no hace falta tocarlos.

### Agregar una persona al equipo
1. Subí la foto (cuadrada, ~600 px) a `public/preteco/preteco-web/`.
2. En `src/content/collections/team.ts`, agregá una línea en `teamRaw`: `["Nombre Apellido", "nombre-del-archivo.jpg"],`
3. El contador de personas del sitio se actualiza solo. El orden no importa: el equipo se mezcla cada hora y las fotos visibles van rotando para que todos aparezcan.

### Agregar un caso de éxito
En `src/content/collections/cases.ts`, copiá un bloque `{ … }` completo, pegalo debajo y cambiá cliente, resumen, imagen y servicio relacionado.

### Agregar un servicio nuevo
1. En `src/content/collections/services.ts`, copiá un bloque completo de `services` y cambiá todos sus textos. Elegí un `slug` nuevo (sin espacios ni tildes, por ejemplo `data-analytics`): será la URL `/services/data-analytics`.
2. En el mismo archivo, sumá ese `slug` a un grupo de `serviceGroups` (o creá un grupo nuevo).
3. En `src/content/icons.ts`, asignale un ícono en `serviceIcon`.
4. Listo: aparece en el menú, en la home, en /services, en el pie y en el sitemap automáticamente.

### Publicar un artículo
Desde la planilla de Google, sin tocar código. Ver `docs/CMS-Y-LEADS.md`.

---

## 4. Agregar una sección nueva a una página

*Requiere alguien que se anime a copiar y pegar código. Si no, pedíselo a quien mantenga el sitio con esta guía.*

Cada página es un archivo en `src/app/<página>/page.tsx` y se arma apilando **secciones**. Para sumar una:

1. Agregá los textos en el archivo de contenido de esa página (`src/content/pages/…`):

   ```ts
   novedad: {
     eyebrow: "Novedades",
     title: "Lanzamos *algo nuevo*",
     text: "Una o dos frases que expliquen la novedad.",
     items: ["Primer punto", "Segundo punto", "Tercer punto"],
   },
   ```

2. En el `page.tsx`, pegá este bloque donde quieras que aparezca (entre dos `<Section>`):

   ```tsx
   <Section tone="surface">
     <SectionHeader eyebrow={c.novedad.eyebrow} title={c.novedad.title} text={c.novedad.text} />
     <ul className="mt-10 grid gap-4 md:grid-cols-3">
       {c.novedad.items.map((t) => (
         <li key={t} data-reveal className={cardCls() + " p-6"}>
           {t}
         </li>
       ))}
     </ul>
   </Section>
   ```

### Bloques disponibles

Todos están en `src/components/`. Usarlos mantiene el diseño consistente en todo el sitio.

| Bloque | Para qué | Dónde se ve un ejemplo |
| --- | --- | --- |
| `PageHero` | Encabezado de página: etiqueta, título animado, bajada, botones, imagen o números | Arriba de todas las páginas |
| `Section` | Contenedor de una sección. `tone="surface"` cambia el fondo para alternar | Todas las páginas |
| `SectionHeader` | Etiqueta + título + bajada + link a la derecha | Comienzo de cada sección |
| `Button` / `Actions` | Botones primario (lima), secundario (violeta) y terciario (link) | Heros y secciones |
| `IconTile` / `Icon` | Ícono suelto o en baldosa sobria | Tarjetas de servicios |
| `Carousel` | Convierte una grilla en fila deslizable en mobile (`until="sm" \| "md" \| "lg"`), con puntos de navegación | Blog y casos en la home, productos, oficinas |
| `Check` | Tilde para listas de beneficios | "¿Para qué sirve?" en servicios |
| `Accordion` | Lista desplegable | Pilares de Compliance |
| `CaseCards` / `PostCards` | Tarjetas de casos y de artículos | Home, Casos, Blog |
| `TeamGrid` | Grilla de personas con "ver todo" | Nosotros |
| `ContactForm` | Formulario (`variant`: contact, careers, blog, compliance). En mobile se muestra paso a paso, una pregunta por vez | Final de cada página |
| `Breadcrumbs` | Migas de pan (Inicio / Servicios / …) | Páginas de servicio y artículos |
| `cardCls()` | Estilo estándar de tarjeta con borde y luz al pasar el mouse | — |

Las animaciones se activan agregando `data-reveal` a cualquier elemento (aparece al hacer scroll). Variantes: `data-reveal="fade"`, `"scale"`, `"left"`. Para escalonar varios, sumá `style={{ ["--d" as string]: 1 }}`, `2`, `3`…

### Agregar una página nueva

1. Creá `src/content/pages/mi-pagina.ts` copiando la estructura de `cases.ts`.
2. Creá la carpeta `src/app/mi-pagina/` con un `page.tsx` copiado de `src/app/cases/page.tsx`, cambiando los imports al nuevo archivo de contenido.
3. Si va en el menú, sumala a `mainNav` en `src/content/site.ts`, y al sitemap en `src/app/sitemap.ts`.
