import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import Stepper, { Step } from '../reactbits/Stepper';
import CountUp from '../reactbits/CountUp';
import { PREFILL_EVENT } from '../../lib/leads';

interface Question {
  q: string;
  o: string[];
}

interface Result {
  below: number;
  tone: 'good' | 'warn' | 'bad';
  title: string;
  text: string;
}

const TONES = {
  good: { ring: '#1F7A4A', soft: 'bg-gr2 text-gr', label: 'Bien encaminada' },
  warn: { ring: '#B7791F', soft: 'bg-[#FDF3DC] text-[#8A5A0B]', label: 'Requiere atención' },
  bad: { ring: '#B42318', soft: 'bg-danger2 text-danger', label: 'Necesita un cambio' }
};

export default function SelfTest({ questions, results, cta }: { questions: Question[]; results: Result[]; cta: string }) {
  const total = questions.length;
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => Array(total).fill(undefined));
  const advanceTimer = useRef<number>(0);

  const done = step > total;
  // Cada opción vale su índice (0 = bien, 2 = mal). Igual que el test original
  const negative = answers.reduce<number>((sum, value) => sum + (value ?? 0), 0) / (total * 2);
  const health = Math.round((1 - negative) * 100);
  const result = results.find(item => negative < item.below) ?? results[results.length - 1];
  const tone = TONES[result.tone];

  const choose = (question: number, option: number) => {
    setAnswers(current => current.map((value, index) => (index === question ? option : value)));
    window.clearTimeout(advanceTimer.current);
    if (question + 1 < total) advanceTimer.current = window.setTimeout(() => setStep(question + 2), 320);
  };

  const reset = () => {
    setAnswers(Array(total).fill(undefined));
    setStep(1);
  };

  const requestEvaluation = () => {
    window.dispatchEvent(
      new CustomEvent(PREFILL_EVENT, { detail: { motivo: `Autoevaluación web: ${health}/100 — ${result.title}.` } })
    );
    const form = document.getElementById('form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => form?.querySelector<HTMLInputElement>('input[name="nombre"]')?.focus({ preventScroll: true }), 700);
  };

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <Stepper
      step={step}
      onStepChange={setStep}
      onFinalStepCompleted={() => setStep(total + 1)}
      indicator="bars"
      theme="light"
      accentColor="#152A45"
      width="100%"
      radius={26}
      linear
      backButtonText="Anterior"
      nextButtonText="Siguiente"
      completeButtonText="Ver mi resultado"
      nextButtonProps={{ disabled: !done && answers[step - 1] === undefined }}
      completedContent={
        <div className="flex flex-col items-center gap-6 px-1 pb-2 pt-3 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative grid size-[132px] shrink-0 place-items-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="#EBF1F8" strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={tone.ring}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - health / 100) }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <span className="text-center leading-none">
              <span className="block text-[34px] font-bold tracking-[-0.03em] text-g1">
                {done && <CountUp to={health} duration={1.4} />}
              </span>
              <span className="mt-1 block text-[11px] font-medium text-g3">de 100</span>
            </span>
          </div>
          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${tone.soft}`}>
              {tone.label}
            </span>
            <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-g1">{result.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-g3">{result.text}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <button
                type="button"
                onClick={requestEvaluation}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-b1 px-5 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-b2"
              >
                {cta} <ArrowRight size={17} />
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-[13.5px] font-medium text-g3 transition hover:text-g1"
              >
                <RotateCcw size={15} /> Repetir
              </button>
            </div>
          </div>
        </div>
      }
    >
      {questions.map((question, index) => (
        <Step key={question.q} title={`Pregunta ${index + 1}`}>
          <fieldset className="pb-1 pt-2">
            <legend className="text-[12px] font-semibold uppercase tracking-[0.16em] text-b3">
              Pregunta {index + 1} de {total}
            </legend>
            <p className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.015em] text-g1">{question.q}</p>
            <div className="mt-5 grid gap-2.5" role="radiogroup" aria-label={question.q}>
              {question.o.map((option, optionIndex) => {
                const selected = answers[index] === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => choose(index, optionIndex)}
                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[14.5px] transition ${
                      selected
                        ? 'border-b1 bg-b1 text-white shadow-[0_10px_24px_-14px_rgb(21_42_69/0.8)]'
                        : 'border-g4 bg-white text-g2 hover:border-b3 hover:bg-b6'
                    }`}
                  >
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition ${
                        selected ? 'border-white' : 'border-g4 group-hover:border-b3'
                      }`}
                    >
                      {selected && <span className="size-2 rounded-full bg-white" />}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </Step>
      ))}
    </Stepper>
  );
}
