// Convierte las imágenes originales (PNG pesados de la carpeta Imagenes/) en WebP livianos para el sitio.
// Uso: npm run imagenes
// - Entrada:  Imagenes/*.png  (originales, no se suben al repositorio)
// - Salida:   src/assets/imagenes/*.webp  (máx. 1920 px de ancho; Astro genera después AVIF/WebP responsivos)
//             public/og.jpg               (1200x630 para compartir en redes, recortada desde la imagen de la hero)
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ENTRADA = 'Imagenes';
const SALIDA = 'src/assets/imagenes';
const ANCHO_MAX = 1920;
const CALIDAD = 82;
const OG_FUENTE = '01-edificio-residencial-hero.png';

await mkdir(SALIDA, { recursive: true });
const archivos = (await readdir(ENTRADA)).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
if (!archivos.length) throw new Error(`No hay imágenes en ${ENTRADA}/`);

let totalAntes = 0;
let totalDespues = 0;
for (const archivo of archivos) {
  const origen = path.join(ENTRADA, archivo);
  // Nombre seguro para Linux/Vercel: minúsculas, sin espacios ni tildes
  const nombre = path
    .parse(archivo)
    .name.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const destino = path.join(SALIDA, `${nombre}.webp`);
  await sharp(origen).resize({ width: ANCHO_MAX, withoutEnlargement: true }).webp({ quality: CALIDAD, effort: 6 }).toFile(destino);
  const antes = (await stat(origen)).size;
  const despues = (await stat(destino)).size;
  totalAntes += antes;
  totalDespues += despues;
  console.log(`${nombre}.webp`.padEnd(46), `${(antes / 1048576).toFixed(1)} MB → ${Math.round(despues / 1024)} KB`);
}

await sharp(path.join(ENTRADA, OG_FUENTE)).resize(1200, 630, { fit: 'cover', position: 'right' }).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og.jpg');
console.log(`\n${archivos.length} imágenes: ${(totalAntes / 1048576).toFixed(0)} MB → ${(totalDespues / 1048576).toFixed(1)} MB | public/og.jpg listo`);
