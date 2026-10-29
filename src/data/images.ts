import type { ImageMetadata } from 'astro';

// Imágenes optimizadas por `npm run imagenes` (src/assets/imagenes/*.webp). Se piden por nombre de archivo
// sin extensión, p. ej. imagen('01-edificio-residencial-hero'), para que site.ts siga siendo solo texto.
const todas = import.meta.glob<{ default: ImageMetadata }>('../assets/imagenes/*.webp', { eager: true });

export const imagen = (nombre: string): ImageMetadata => {
  const encontrada = todas[`../assets/imagenes/${nombre}.webp`];
  if (!encontrada) throw new Error(`Falta la imagen "${nombre}" en src/assets/imagenes. Ejecuta: npm run imagenes`);
  return encontrada.default;
};
