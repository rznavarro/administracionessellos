import { MapPin } from 'lucide-react';
import LogoLoop, { type LogoItem } from '../reactbits/LogoLoop';

export interface Item {
  comunidad: string;
  foto?: string;
  // URL optimizada de la foto (la resuelve Referencias.astro a partir de `foto`)
  image?: string;
  comuna: string;
  tipo: string;
  unidades?: string;
  quote?: string;
  autor?: string;
  cargo?: string;
}

function Card({ item }: { item: Item }) {
  return (
    <figure className="group w-[290px] whitespace-normal rounded-2xl bg-b1 text-left text-white shadow-[var(--shadow-soft)] sm:w-[330px]">
      <div className="relative overflow-hidden rounded-2xl">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-[200px] w-full bg-b2" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-b1 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-3 left-4 z-10 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/85">
          <MapPin size={13} aria-hidden="true" />
          {item.comuna} · {item.tipo}
          {item.unidades ? ` · ${item.unidades}` : ''}
        </span>
      </div>
      <div className="px-5 pb-5 pt-3">
        <p className="text-[16px] font-semibold leading-tight">{item.comunidad}</p>
        {item.quote && (
          <blockquote className="mt-3 border-b border-white/20 pb-4 text-[14.5px] leading-[1.65] text-white/85">“{item.quote}”</blockquote>
        )}
        {item.autor && (
          <figcaption className="mt-4 leading-tight">
            <span className="block text-[14px]">— {item.autor}</span>
            {item.cargo && <span className="mt-1 block text-[13px] font-medium text-[#A9C8EC]">{item.cargo}</span>}
          </figcaption>
        )}
      </div>
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
