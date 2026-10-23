# preteco-web

Sitio institucional de [Preteco](https://preteco.com), con el concepto visual **"Preteco OS"**: la web presentada como una consola.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Geist / Geist Mono.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx            # fuentes, metadata y SEO
│   ├── page.tsx              # home: arma las secciones
│   ├── globals.css           # design tokens (@theme) y utilidades
│   └── api/contact/route.ts  # endpoint del formulario (TODO: proveedor de email/CRM)
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx + Terminal.tsx   # terminal interactiva por módulo
│   ├── StackTicker.tsx           # marquee de partners
│   ├── Services.tsx              # servicios como tabla de procesos
│   ├── AiReadiness.tsx           # chequeo interactivo de madurez IA
│   ├── Cases.tsx                 # casos como git log
│   ├── Team.tsx                  # valores como archivo de config
│   ├── Blog.tsx
│   ├── Contact.tsx               # formulario estilo CLI
│   ├── Footer.tsx
│   └── ui.tsx                    # Button, Container, títulos, cursor
└── content/
    └── site.ts               # TODO el copy del sitio
```

## Editar contenido

Todos los textos, servicios, casos, valores y links están en `src/content/site.ts`. Los componentes solo se ocupan del diseño.

## Diseño

Los colores y las fuentes son tokens en `src/app/globals.css` (bloque `@theme`). Para cambiar el acento, editá `--color-accent`.

## Pendientes

- [ ] Artículos reales del blog (hoy hay placeholders) — idealmente MDX o un CMS.
- [ ] Conectar `/api/contact` a un proveedor de email o CRM.
- [ ] URLs reales de redes sociales y página de Compliance.
- [ ] Páginas internas: detalle de servicio, detalle de caso, nosotros, productos.
- [ ] Logos de partners en SVG para el ticker.

## Deploy

Pensado para [Vercel](https://vercel.com): importá el repo y no hace falta configuración extra.
