import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// En producción el formulario postea a /contacto.php del hosting. En `npm run dev` ese archivo
// no existe, así que este middleware responde {ok:true} y muestra el payload en consola.
// Solo corre en dev: no afecta al build ni a `npm run preview`.
const mockContacto = (req, res) => {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    console.log('\n[contacto.php mock]', body);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
  });
};

const contactoMock = {
  name: 'contacto-php-mock',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/contacto.php', mockContacto);
  }
};

export default defineConfig({
  integrations: [react()],
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss(), contactoMock] }
});
