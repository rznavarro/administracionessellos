import { Quote } from 'lucide-react';
import LogoLoop, { type LogoItem } from '../reactbits/LogoLoop';

interface Item {
  name: string;
  meta: string;
  quote: string;
  featured?: boolean;
}

const initials = (name: string) =>
  name
    .replace(/^(Edificio|Cliente)\s+/i, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');

function Card({ item }: { item: Item }) {
  return (
    <figure
      className={`flex min-h-[236px] w-[300px] flex-col whitespace-normal rounded-2xl border p-6 text-left sm:w-[370px] ${
        item.featured ? 'border-b3/60 bg-b5' : 'border-g4/70 bg-white'
      } shadow-[var(--shadow-soft)]`}
    >
      <Quote size={26} className={item.featured ? 'text-b3' : 'text-b4'} aria-hidden="true" />
      <blockquote className="mt-3 text-[15px] leading-[1.7] text-g2">“{item.quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-b1 text-[12.5px] font-semibold leading-none text-white">
          {initials(item.name)}
        </span>
        <span className="leading-tight">
          <span className="block text-[14px] font-semibold text-g1">{item.name}</span>
          <span className="mt-1 block text-[12.5px] text-g3">{item.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ items }: { items: Item[] }) {
  const toLogos = (list: Item[]): LogoItem[] =>
    list.map(item => ({ node: <Card item={item} />, title: item.name, ariaLabel: `${item.name}: ${item.quote}` }));
  const half = Math.ceil(items.length / 2);
  // Dos filas en sentidos opuestos; cada fila muestra todo, en distinto orden
  const rowA = toLogos(items);
  const rowB = toLogos([...items.slice(half), ...items.slice(0, half)]);

  return (
    <div className="flex flex-col gap-5">
      <LogoLoop logos={rowA} speed={34} direction="left" gap={20} logoHeight={16} pauseOnHover fadeOut fadeOutWidth={0.08} intro={false} ariaLabel="Testimonios de clientes" />
      {/* La segunda fila repite los mismos testimonios: se oculta a lectores de pantalla */}
      <div aria-hidden="true">
        <LogoLoop logos={rowB} speed={30} direction="right" gap={20} logoHeight={16} pauseOnHover fadeOut fadeOutWidth={0.08} intro={false} ariaLabel="Testimonios de clientes" />
      </div>
    </div>
  );
}
