# ADMINOR — landing en Astro + React Bits

Sitio de ADMINOR ("Somos tu norte en Administración"), administración de edificios y condominios.
Está armado como plantilla: el contenido y la marca viven en un solo archivo.

- **Astro 7** genera el HTML estático, así que todo el contenido queda en el HTML y sirve para SEO.
- **React 19** se usa solo en las "islas" animadas o interactivas.
- **React Bits** aporta: Aurora, LightRays, SpotlightCard, StarBorder, ClickSpark, Magnet, LogoLoop y AnimatedContent.
- **Tailwind CSS 4** para los estilos.

## Comandos

Requiere Node 22.12 o superior.

```sh
npm install
npm run dev       # http://localhost:4321 — incluye un mock del endpoint del formulario (el payload se ve en la consola)
npm run build     # genera dist/
npm run preview   # sirve dist/ (sin mock: el formulario muestra error, es esperable)
npm run check     # revisión de tipos
```

## Pendiente de completar con datos de ADMINOR

Todo se edita en [src/data/site.ts](src/data/site.ts). Lo que queda vacío no se muestra.

| Dato | Campo en `site.ts` | Qué aparece al completarlo |
|---|---|---|
| Teléfono | `contact.phoneDisplay`, `contact.phoneHref` | En el nav, el FAQ, el footer y el menú móvil |
| WhatsApp | `contact.whatsapp` | Botón flotante, barra móvil, CTA final, footer, FAQ y éxito del formulario |
| Correo | `contact.email` | En el footer y el menú móvil |
| Inscripción en el Registro de Administradores | `contact.registry`, `contact.registryNumber` | En la hero y el footer |
| Comunas donde opera | `comunas` | Sección de cobertura, footer y JSON-LD |
| Dominio | `seo.canonical`, `seo.ogImage` | Canonical, `og:url` y `og:image` |
| Google Search Console | `seo.googleVerification` | Metaetiqueta de verificación |
| Analítica | `seo.measurementScript` | `<script>` en el `<head>` |
| Endpoint del formulario | `form.endpoint` (por defecto `/contacto.php`) | Recibe un POST JSON y debe responder `{"ok": true}` |
| Testimonios | `testimonios.items` | Sección de testimonios |
| Guías PDF | `recursos.items` (archivos en `public/`) | Sección de recursos |
| Redes, enlaces legales, crédito | `socials`, `footer.legal`, `brand.credit` | Footer |

Los textos de servicio (respuesta en 24 h, visita semanal, informe con fotos) son contenido de plantilla y hay que validarlos con ADMINOR. Por ejemplo: respuesta en
menos de 24 horas, visitas semanales, supervisión 24/7 y convenios de seguridad. La foto de la hero
(`public/edificio-residencial.webp`) es genérica; si existe una propia, conviene reemplazarla junto con su
versión de 640 px.

## Marca

- **Logo:** `public/logo-adminor.webp`, en blanco con fondo transparente para el nav y el footer oscuros.
  Se generó desde el JPEG original de `logo/`, calculando la transparencia según la luminosidad.
- **Favicon e ícono de iOS:** `favicon-adminor.png` y `logo-adminor-touch.png`, la "A" del logo.
- **Colores:** tokens en `@theme` de [src/styles/global.css](src/styles/global.css) (`--color-b1…`). Los fondos
  WebGL usan además `brand.colors` en `site.ts`; hay que mantener ambos sincronizados.
- **Íconos:** se nombran en `site.ts` y se registran en [src/lib/icons.ts](src/lib/icons.ts) (Lucide).

## Estructura de la página

La página es corta y va directo a la conversión: **5 bloques**, todos con un CTA al formulario o a WhatsApp.

1. **Hero:** propuesta de valor, 3 beneficios y formulario de 3 campos (nombre, teléfono y correo).
2. **Por qué ADMINOR:** 4 beneficios de una línea.
3. **Cómo funciona:** 3 pasos.
4. **Preguntas clave:** 5 objeciones (se genera también el JSON-LD de FAQPage).
5. **CTA final.**

Los testimonios, la cobertura y los recursos (guías PDF) se muestran solo cuando tienen datos en `site.ts`.

```
src/data/site.ts            contenido y marca
src/layouts/Base.astro      <head>: SEO, OG, JSON-LD, analítica opcional y fuentes
src/pages/index.astro       orden de las secciones
src/components/sections/    una sección por archivo (.astro, HTML estático)
src/components/islands/     componentes React con estado (formulario, fondo, línea de tiempo, testimonios)
src/components/reactbits/   componentes copiados de React Bits
src/components/ui/          botón, encabezados, tarjetas, carpeta de recursos
src/lib/leads.ts            envío del formulario (POST JSON a form.endpoint)
```

## Formulario

El formulario pide solo **nombre, teléfono y correo**: menos campos, más conversión. Hace **un POST** al endpoint
(`form.endpoint`). Los campos que el servidor puede exigir, y que ya no se piden (`comuna`, `comite`, `tipo`),
viajan como `"Sin indicar"`; el resto del contrato JSON no cambia. Si la página tiene `gtag`, se dispara
`generate_lead` una vez y `whatsapp_click` en los botones de WhatsApp.

## Despliegue

`npm run build` y subir **el contenido de `dist/`** al hosting, junto al endpoint del formulario.

**Vercel:** [vercel.json](vercel.json) fija el framework, el build y la carpeta `dist/`, así que cada push a `main`
se construye solo. Vercel no ejecuta PHP; si el endpoint es `contacto.php`, el formulario funciona solo en un
hosting que lo tenga.

## Rendimiento

- Aurora arranca con la primera interacción (mover el mouse, scroll, toque o teclado), porque compilar su shader
  bloquearía la carga. En teléfonos modestos o con ahorro de datos se queda el degradado CSS.
- Las secciones bajo el pliegue usan `content-visibility: auto` (clase `.cv-auto`, con altos estimados).
