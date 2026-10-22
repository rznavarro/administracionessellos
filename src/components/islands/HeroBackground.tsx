import { useEffect, useState } from 'react';
import Aurora from '../reactbits/Aurora';

type Hints = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

const START_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown'] as const;

// Aurora sobre la hero. Compilar su shader bloquea el hilo principal, así que arranca con la primera
// interacción (mover el mouse, tocar, scroll o teclado) y no durante la carga; entra con su propia
// animación de aparición. Hasta entonces se ve el degradado .hero-fallback, que también es lo que queda
// con "ahorro de datos" o en teléfonos modestos. Con reduced-motion, Aurora dibuja un cuadro estático.
export default function HeroBackground({ colors }: { colors: string[] }) {
  const [enabled, setEnabled] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const nav = navigator as Hints;
    const small = window.innerWidth < 768;
    const modest = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3;
    setNarrow(small);
    if (nav.connection?.saveData || (small && modest)) return undefined;

    const start = () => {
      setEnabled(true);
      START_EVENTS.forEach(name => window.removeEventListener(name, start));
    };
    START_EVENTS.forEach(name => window.addEventListener(name, start, { passive: true, once: true }));
    return () => START_EVENTS.forEach(name => window.removeEventListener(name, start));
  }, []);

  if (!enabled) return null;

  return (
    <Aurora
      colorStops={colors}
      amplitude={1.1}
      blend={0.6}
      height={0.55}
      glow={0.7}
      speed={0.6}
      layers={narrow ? 1 : 2}
      opacity={0.85}
      mouseInteraction
      dpr={1}
    />
  );
}
