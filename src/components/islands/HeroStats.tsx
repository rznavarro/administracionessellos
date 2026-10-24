import CountUp from '../reactbits/CountUp';

interface Stat {
  value?: number;
  suffix?: string;
  text?: string;
  label: string;
}

export default function HeroStats({ stats }: { stats: Stat[] }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-6 ${stats.length >= 4 ? 'sm:grid-cols-4' : stats.length === 3 ? 'sm:grid-cols-3' : 'max-w-md'}`}>
      {stats.map(stat => (
        <div key={stat.label} className="relative flex flex-col pl-4">
          <span className="absolute inset-y-1 left-0 w-px bg-gradient-to-b from-white/50 to-white/0" aria-hidden="true" />
          <dt className="order-2 mt-1.5 text-[10.5px] font-medium uppercase leading-snug tracking-[0.14em] text-white/55">
            {stat.label}
          </dt>
          <dd className="order-1 text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-none tracking-[-0.03em] text-white">
            {stat.value !== undefined ? (
              <CountUp to={stat.value} suffix={stat.suffix} duration={2.2} mode="roll" easing="spring" />
            ) : (
              stat.text
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
