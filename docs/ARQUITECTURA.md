# Arquitectura

Documento técnico de referencia. Para editar contenido, ver `GUIA-DE-EDICION.md`.

## Stack

- **Next.js 15** (App Router, React Server Components) + **TypeScript**
- **Tailwind CSS v4**: tokens de diseño en `src/app/globals.css` (`@theme`)
- **Vercel**: hosting, previews por pull request
- Sin librerías de UI ni de animación: efectos con CSS + un único componente cliente (`Effects`)

## Capas

```
src/
├── content/          ← QUÉ dice el sitio (editable sin saber programar)
│   ├── site.ts             global: menú, pie, redes, partners, oficinas
│   ├── forms.ts            campos y textos de formularios
│   ├── icons.ts            concepto → ícono
│   ├── pages/              textos de cada página (hero, títulos de secciones, SEO)
│   ├── collections/        listas: servicios, casos, productos, equipo, compliance, blog (respaldo)
│   └── blog/<id>.md        cuerpo de los artículos migrados (respaldo de la planilla)
│
├── components/       ← CÓMO se ve (bloques reutilizables)
│   ├── ui.tsx              Button, Actions, Section, SectionHeader, Breadcrumbs, JsonLd, rich(), cardCls()
│   ├── PageHero.tsx        hero único para todas las páginas
│   ├── Icon.tsx            set de íconos SVG propio + IconTile
│   ├── cards.tsx           CaseCards, PostCards
│   ├── ContactForm.tsx     formulario (cliente)
│   ├── TeamGrid.tsx        grilla de equipo expandible (cliente)
│   ├── Accordion.tsx       <details> nativo
│   ├── Header.tsx / Footer.tsx
│   ├── Effects.tsx         motor de animaciones (cliente, único)
│   └── Counter.tsx         números animados (cliente)
│
├── app/              ← DÓNDE: una carpeta por URL; solo arma secciones con content + components
│   ├── page.tsx            /
│   ├── services/…          /services y /services/[slug]
│   ├── blog/article/[id]   artículos (mismas URLs que el sitio anterior)
│   ├── api/contact         recibe formularios → Supabase + Salesforce
│   ├── api/revalidate      publica cambios de la planilla al instante
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
│   └── layout.tsx          fuentes, header/footer, JSON-LD de la organización
│
└── lib/              ← lógica sin interfaz
    ├── cms.ts              lee el blog desde Google Sheets (caché 5 min, respaldo local)
    ├── leads/              clientes de Supabase y Salesforce
    ├── seo.ts              pageMeta() (canonical, OG) y datos de la organización
    ├── auto.ts             valores calculados ("auto:team" → cantidad real)
    ├── markdown.tsx        renderer mínimo para artículos
    └── asset.ts            rutas de imágenes
```

**Regla:** las páginas (`app/`) no contienen textos; los componentes no contienen datos de negocio. Así el contenido se edita sin tocar diseño y el diseño cambia sin tocar contenido.

## Convenciones

- **Textos:** todo string visible va en `content/`. Resaltar con `*asteriscos*` (lo procesa `rich()`).
- **Botones como datos:** `{ label, href, variant }` y se dibujan con `<Actions>`.
- **Números vivos:** `"auto:<clave>"` en `content/` se resuelve en `lib/auto.ts`.
- **SEO por página:** `export const metadata = pageMeta(c.seo, "/ruta")`.
- **Animación:** `data-reveal` (+ `--d` para escalonar). Lo visible al cargar se muestra al instante; el resto al entrar en pantalla. Respeta `prefers-reduced-motion`.
- **Mobile primero:** los grids arrancan en 1 columna; los botones de acciones ocupan el ancho completo en mobile (`w-full sm:w-auto`); objetivos táctiles de 44 px o más.
- **Accesibilidad:** H1 por página, migas de pan con `aria-current`, foco visible, `<details>` nativo, textos alternativos vacíos en imágenes decorativas.

## SEO técnico

- Metadata por página con URL canónica y Open Graph (`lib/seo.ts`)
- Imagen para redes generada (`app/opengraph-image.tsx`) y favicon (`app/icon.svg`)
- Datos estructurados: `Organization` (todas), `Service` (servicios), `BlogPosting` y `BreadcrumbList` (artículos y servicios)
- `sitemap.xml` dinámico con servicios y artículos; `robots.txt`
- Mismas URLs que el sitio anterior

## Integraciones

Ver `docs/CMS-Y-LEADS.md`. Variables de entorno en `.env.example`. Sin variables, el sitio funciona igual (blog local, formularios solo registrados en logs).
