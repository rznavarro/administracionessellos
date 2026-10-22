# Landing Administraciones Roselló — plantilla Astro + React Bits

Home de administracionesrosello.cl rehecha como plantilla reutilizable. El sitio original quedó en
[legacy/index.html](legacy/index.html) como referencia.

- **Astro 7**: genera HTML estático (todo el contenido queda en el HTML, bueno para SEO).
- **React 19**: solo en las "islas" animadas o interactivas.
- **React Bits**: Aurora, LightRays, MagicBento, SpotlightCard, TiltedCard, Stepper, StarBorder, ClickSpark,
  Magnet, RotatingText, ShinyText, GradientText, CountUp, ScrollReveal, ScrollVelocity, CurvedLoop,
  LogoLoop, AnimatedContent y StaggeredMenu.
- **Tailwind CSS 4**: estilos.

## Comandos

Requiere Node 22 o superior.

```sh
npm install
npm run dev       # http://localhost:4321 — incluye un mock de /contacto.php (el payload se ve en la consola)
npm run build     # genera dist/
npm run preview   # sirve dist/ (sin mock: el formulario da error, es esperable)
npm run check     # revisión de tipos
```

## Usar la plantilla con otro cliente

1. **Contenido y marca:** todo está en [src/data/site.ts](src/data/site.ts): textos, contacto, comunas,
   FAQ, testimonios, test, recursos, footer y SEO. El JSON-LD (LocalBusiness y FAQPage) se genera desde ahí.
   - En los textos, `**negrita**` y `[enlace](/url)` se convierten en HTML.
   - Los campos que se dejan vacíos no se muestran: `contact.hours`, `contact.registryNumber`, `socials`,
     `footer.legal` y `brand.credit`.
2. **Colores:** los tokens están en `@theme`, en [src/styles/global.css](src/styles/global.css) (`--color-b1…`).
   Los fondos WebGL usan además `brand.colors` en `site.ts`; hay que mantener los dos sincronizados.
3. **Imágenes y PDF:** van en `public/`. Si se cambia la foto de la hero, hay que generar también su versión
   de 640 px (`hero.image.small`).
4. **Íconos:** se nombran desde `site.ts` y se registran en [src/lib/icons.ts](src/lib/icons.ts) (Lucide).

## Estructura

```
src/data/site.ts            contenido y marca
src/layouts/Base.astro      <head>: SEO, OG, JSON-LD, /medicion.js, fuentes
src/pages/index.astro       orden de las secciones
src/components/sections/    una sección por archivo (.astro, HTML estático)
src/components/islands/     componentes React con estado (formulario, test, menú, etc.)
src/components/reactbits/   componentes copiados de React Bits (algunos adaptados, ver abajo)
src/components/ui/          botón, encabezados, tarjetas, carpeta de recursos
src/lib/leads.ts            envío a /contacto.php (cookie anti-bot, reintento ante 409, honeypot)
```

Cambios hechos a los componentes de React Bits:

- **MagicBento:** sin los gráficos de demostración ni `@hugeicons`.
- **Stepper:** íconos de Lucide en lugar de `@hugeicons`.
- **StaggeredMenu:** textos en español, logo opcional, se cierra al elegir un enlace, `inert` cuando
  está cerrado y oculto antes de hidratar.
- **ScrollReveal:** prop `text`, etiqueta configurable y palabras marcadas con `**`.
- **GradientText:** modo `inline` para texto que se parte en varias líneas.
- **CurvedLoop:** alto configurable.
- **TiltedCard:** imagen con `loading="lazy"`.
- **Folder:** la versión actual es un motor WebGL de unas 2.500 líneas. En su lugar,
  [src/components/ui/FolderLite.astro](src/components/ui/FolderLite.astro) es una versión CSS con el mismo efecto.

## Formulario y medición

- La hero envía el lead con 4 campos y luego ofrece completar los detalles. Son **dos POST** a `/contacto.php`
  con el mismo contrato JSON que el formulario original:
  - El primero llega con `comite` y `tipo` = `"Sin indicar"`.
  - El segundo agrega `complemento: "1"`.
  - `/medicion.js` le pone el mismo `_envio_id` a ambos.
- `generate_lead` se dispara una vez, con `{ form: 'contacto' }` como antes. `/medicion.js` lo convierte en
  conversión de Ads y mide solo los clics a `wa.me` y `tel:`. Por eso el WhatsApp del formulario es un botón
  con `window.open`, igual que en el sitio original, y no se cuenta dos veces.

## Despliegue

`npm run build` y subir **el contenido de `dist/`** a la raíz del hosting. Hay que tener cuidado de **no borrar**
lo que vive solo en el servidor:

- `contacto.php` y `medicion.js`
- `sitemap.xml`
- las carpetas `crisis-financiera/`, `condominio-de-casas/`, `inmobiliarias/` y `como-cambiar-de-administracion/`
- la imagen OG `.jpg`

**Vercel** (administracionessellos.vercel.app): [vercel.json](vercel.json) fija el framework, el build y la
carpeta `dist/`, así que cada push a `main` se construye solo. En Vercel no existen `contacto.php` ni
`medicion.js`, por lo que ahí el formulario muestra el mensaje de error. Sirve como vista previa; el sitio
real sigue siendo el hosting PHP.

## Rendimiento

- Aurora arranca con la primera interacción (mover el mouse, scroll, toque o teclado), porque compilar
  su shader bloquearía la carga. En teléfonos modestos o con ahorro de datos se queda el degradado CSS.
- Las secciones bajo el pliegue usan `content-visibility: auto` (clase `.cv-auto`, con altos estimados).
- Lighthouse en local (build): **móvil 91 · escritorio 99**, Accesibilidad 100, SEO 100.
