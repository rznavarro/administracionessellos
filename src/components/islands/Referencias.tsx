import { Building2, Quote } from 'lucide-react';
import LogoLoop, { type LogoItem } from '../reactbits/LogoLoop';

interface Item {
  comunidad: string;
  comuna: string;
  tipo: string;
  unidades?: string;
  quote?: string;
  autor?: string;
  cargo?: string;
}

function Card({ item }: { item: Item }) {
  return (
    <figure className="flex min-h-[236px] w-[300px] flex-col whitespace-normal rounded-2xl border border-g4/70 bg-white p-6 text-left shadow-[var(--shadow-soft)] sm:w-[370px]">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-b5 text-b1">
          <Building2 size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold text-g1">{item.comunidad}</span>
          <span className="mt-1 block text-[12.5px] text-g3">
            {item.comuna} · {item.tipo}
            {item.unidades ? ` · ${item.unidades}` : ''}
          </span>
        </span>
      </div>
      {item.quote && (
        <>
          <Quote size={22} className="mt-4 text-b4" aria-hidden="true" />
          <blockquote className="mt-2 text-[14.5px] leading-[1.65] text-g2">“{item.quote}”</blockquote>
        </>
      )}
      {item.autor && (
        <figcaption className="mt-auto pt-4 text-[13px] leading-tight">
          <span className="block font-semibold text-g1">{item.autor}</span>
          {item.cargo && <span className="mt-1 block text-g3">{item.cargo}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export default function Referencias({ items }: { items: Item[] }) {
  const logos: LogoItem[] = items.map(item => ({
    node: <Card item={item} />,
    title: item.comunidad,
    ariaLabel: `${item.comunidad}, ${item.comuna}`
  }));

  return <LogoLoop logos={logos} speed={34} direction="left" gap={20} logoHeight={16} pauseOnHover fadeOut fadeOutWidth={0.08} intro={false} ariaLabel="Comunidades de referencia" />;
}
