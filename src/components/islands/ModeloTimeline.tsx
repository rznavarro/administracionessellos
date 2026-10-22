import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import AnimatedContent from '../reactbits/AnimatedContent';
import { icons, type IconName } from '../../lib/icons';

interface Step {
  icon: IconName;
  title: string;
  text: string;
}

// Línea de tiempo cuya línea se va llenando a medida que se hace scroll
export default function ModeloTimeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <ol ref={listRef} className="relative">
      <span className="absolute bottom-7 left-[27px] top-7 w-px bg-b4" aria-hidden="true" />
      <motion.span
        className="absolute bottom-7 left-[27px] top-7 w-px origin-top bg-gradient-to-b from-b3 to-gr"
        style={{ scaleY: progress }}
        aria-hidden="true"
      />
      {steps.map((step, index) => {
        const Icon = icons[step.icon];
        return (
          <li key={step.title} className="relative grid grid-cols-[56px_1fr] gap-5 pb-12 last:pb-0">
            <span className="relative z-10 grid size-14 place-items-center rounded-2xl bg-white text-b2 shadow-[var(--shadow-soft)] ring-1 ring-b4">
              <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <AnimatedContent distance={36} direction="horizontal" duration={0.8} delay={index * 0.08} threshold={0.15}>
              <p className="pt-1 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-b3">Paso 0{index + 1}</p>
              <h3 className="mt-1.5 text-[clamp(1.15rem,2vw,1.4rem)] font-semibold leading-snug tracking-[-0.02em] text-g1">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-g3">{step.text}</p>
            </AnimatedContent>
          </li>
        );
      })}
    </ol>
  );
}
