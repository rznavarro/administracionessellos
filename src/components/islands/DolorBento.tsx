import MagicBento, { type MagicBentoItem } from '../reactbits/MagicBento';
import { icons, type IconName } from '../../lib/icons';

interface Item {
  icon: IconName;
  quote: string;
  answer: string;
}

// Patrón del bento en 3 columnas: 2+1 / 1+2 / 1+2 (la tarjeta de texto más largo va ancha)
const SPANS = [2, 1, 1, 2, 1, 2];

export default function DolorBento({ items }: { items: Item[] }) {
  const bento: MagicBentoItem[] = items.map((item, index) => {
    const Icon = icons[item.icon];
    return {
      id: index,
      colSpan: SPANS[index] ?? 1,
      content: (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-xl bg-b5 text-b2 ring-1 ring-b4/70">
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold tabular-nums tracking-[0.18em] text-b3/70">0{index + 1}</span>
          </div>
          <h3 className="mt-auto pt-5 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-g1">{item.quote}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-g3">{item.answer}</p>
        </div>
      )
    };
  });

  return (
    <MagicBento
      items={bento}
      columns={3}
      rowHeight={232}
      gap={14}
      radius={22}
      theme="light"
      glowColor="#2D6098"
      spotlightRadius={340}
      enableStars
      particleCount={16}
      clickEffect
      textAutoHide={false}
    />
  );
}
