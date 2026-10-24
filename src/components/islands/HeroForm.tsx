import { useEffect, useId, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import SpotlightCard from '../reactbits/SpotlightCard';
import StarBorder from '../reactbits/StarBorder';
import ClickSpark from '../reactbits/ClickSpark';
import Stepper, { Step } from '../reactbits/Stepper';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { PREFILL_EVENT, emptyLead, sendLead, track, type Lead } from '../../lib/leads';

interface Props {
  endpoint: string;
  title: string;
  subtitle: string;
  submit: string;
  modelHtml: string;
  errorHtml: string;
  success: {
    title: string;
    text: string;
    direct: string;
    whatsapp: string;
    whatsappMessage: string;
    details: string;
    detailsHint: string;
  };
  detailsSubmit: string;
  done: { title: string; text: string };
  options: {
    comite: string[];
    tipo: string[];
    ascensores: string[];
    calderas: string[];
    espacios: string[];
  };
  whatsapp: string;
}

type Phase = 'contact' | 'sent' | 'details' | 'done';

const INPUT =
  'peer w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[14.5px] text-white outline-none transition duration-200 placeholder:text-transparent focus:border-white/55 focus:bg-white/[0.1] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:[transition:background-color_9999s]';
const FLOAT_LABEL =
  'pointer-events-none absolute left-4 text-white/55 transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-white/75 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]';

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  maxLength = 120,
  autoComplete,
  inputMode,
  min,
  max
}: {
  label: string;
  name: keyof Lead;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        max={max}
        placeholder={label}
        className={`${INPUT} h-[54px] pt-4`}
      />
      <label htmlFor={id} className={`${FLOAT_LABEL} top-1/2 -translate-y-1/2 text-[14px]`}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required
}: {
  label: string;
  name: keyof Lead;
  value: string;
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  const id = useId();
  const filled = value !== '';
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${INPUT} h-[54px] cursor-pointer appearance-none pr-10 pt-4 [&>option]:text-g1 ${filled ? '' : 'text-transparent'}`}
      >
        <option value="" disabled hidden />
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          filled ? 'top-2.5 text-[11px] text-white/75' : 'top-1/2 -translate-y-1/2 text-[14px] text-white/55'
        }`}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        aria-hidden="true"
      >
        <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange
}: {
  label: string;
  name: keyof Lead;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const id = useId();
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={3000}
        rows={3}
        placeholder={label}
        className={`${INPUT} resize-none pb-3 pt-7 leading-relaxed`}
      />
      <label htmlFor={id} className={`${FLOAT_LABEL} top-4 text-[14px]`}>
        {label}
      </label>
    </div>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroForm(props: Props) {
  const { options } = props;
  const [phase, setPhase] = useState<Phase>('contact');
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [detailsStep, setDetailsStep] = useState(1);

  const update =
    (name: keyof Lead) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setLead(current => ({ ...current, [name]: event.target.value }));

  // La autoevaluación puede precargar el motivo con su resultado
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const motivo = (event as CustomEvent<{ motivo: string }>).detail?.motivo;
      if (motivo) setLead(current => ({ ...current, motivo }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSending(true);
    setError(false);
    try {
      // Primer envío: solo contacto. Los campos que el formulario original pedía como
      // obligatorios van marcados para que el correo no llegue con huecos.
      await sendLead(props.endpoint, {
        ...emptyLead,
        ...lead,
        comite: lead.comite || 'Sin indicar',
        tipo: lead.tipo || 'Sin indicar'
      });
      track('generate_lead', { form: 'contacto' });
      setPhase('sent');
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const submitDetails = async () => {
    setSending(true);
    setError(false);
    try {
      await sendLead(props.endpoint, { ...emptyLead, ...lead, comite: lead.comite || 'Sin indicar', complemento: '1' });
      setPhase('done');
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  // Botón + window.open para medir el clic con su origen. Sin número configurado no hay botones
  const hasWhatsapp = props.whatsapp !== '';
  const openWhatsapp = () => {
    track('whatsapp_click', { origen: 'formulario' });
    const text = props.success.whatsappMessage.replace('{nombre}', lead.nombre || '');
    window.open(`https://wa.me/${props.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const errorNote = error && (
    <p
      role="alert"
      className="mt-3 rounded-lg bg-[#FFB4A8]/10 px-3 py-2 text-center text-[12.5px] leading-snug text-[#FFC9BF] [&_strong]:text-white"
      dangerouslySetInnerHTML={{ __html: props.errorHtml }}
    />
  );

  return (
    <SpotlightCard
      theme="dark"
      spotlightColor="#9FC3EA"
      intensity={0.22}
      borderGlow={0.9}
      spotlightSize={320}
      className="backdrop-blur-xl"
      style={
        {
          '--spotlight-card-surface': 'linear-gradient(160deg, rgba(255,255,255,0.11), rgba(255,255,255,0.04))',
          '--spotlight-card-border': 'rgba(255, 255, 255, 0.16)',
          '--spotlight-card-shadow': '0 40px 80px -40px rgba(0, 0, 0, 0.65)',
          padding: 'clamp(22px, 4vw, 34px)'
        } as CSSProperties
      }
    >
      <div className="mb-6">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11.5px] font-medium text-white/80">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
          </span>
          Respuesta en menos de 24 horas
        </p>
        <h2 className="text-[clamp(1.35rem,2.4vw,1.6rem)] font-bold leading-tight tracking-[-0.02em] text-white">
          {phase === 'contact' ? props.title : phase === 'done' ? props.done.title : props.success.title}
        </h2>
        {phase === 'contact' && <p className="mt-1.5 text-[14px] text-white/65">{props.subtitle}</p>}
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {phase === 'contact' && (
            <Panel key="contact">
              <form onSubmit={submitContact} className="relative grid gap-3">
                <input
                  type="text"
                  name="web"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={lead.web}
                  onChange={update('web')}
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />
                <Field label="Nombre" name="nombre" value={lead.nombre} onChange={update('nombre')} required autoComplete="name" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    value={lead.telefono}
                    onChange={update('telefono')}
                    required
                    maxLength={30}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <Field
                    label="Correo"
                    name="correo"
                    type="email"
                    value={lead.correo}
                    onChange={update('correo')}
                    required
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
                <Field label="Comuna" name="comuna" value={lead.comuna} onChange={update('comuna')} required autoComplete="address-level2" />
                <ClickSpark sparkColor={['#ffffff', '#9FC3EA', '#4ADE80']} sparkCount={10} sparkRadius={34} className="mt-2">
                  <StarBorder
                    as="button"
                    type="submit"
                    disabled={sending}
                    className="h-[54px] w-full text-[15px]"
                    radius={14}
                    color="#9FC3EA"
                    backgroundColor="#ffffff"
                    textColor="#152A45"
                    borderColor="rgba(255, 255, 255, 0.35)"
                    duration={5}
                    glow={0.8}
                  >
                    {sending ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" /> Enviando…
                      </>
                    ) : (
                      <>
                        {props.submit} <ArrowRight size={18} />
                      </>
                    )}
                  </StarBorder>
                </ClickSpark>
                {errorNote}
                <p
                  className="mt-1 border-l-2 border-white/25 pl-3 text-[12.5px] leading-relaxed text-white/60 [&_strong]:font-medium [&_strong]:text-white/85"
                  dangerouslySetInnerHTML={{ __html: props.modelHtml }}
                />
              </form>
            </Panel>
          )}

          {phase === 'sent' && (
            <Panel key="sent">
              <div className="flex items-start gap-3 rounded-2xl border border-[#4ADE80]/25 bg-[#4ADE80]/10 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#4ADE80] text-b1">
                  <Check size={18} strokeWidth={2.6} />
                </span>
                <p className="text-[14px] leading-relaxed text-white/85">
                  {props.success.text}
                  {hasWhatsapp && ` ${props.success.direct}`}
                </p>
              </div>
              {hasWhatsapp && (
                <button
                  type="button"
                  onClick={openWhatsapp}
                  className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-wa text-[15px] font-semibold text-[#073b1f] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgb(37_211_102/0.6)]"
                >
                  <WhatsAppIcon size={19} /> {props.success.whatsapp}
                </button>
              )}
              <button
                type="button"
                onClick={() => setPhase('details')}
                className="group mt-3 flex w-full items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-left transition hover:border-white/35 hover:bg-white/[0.08]"
              >
                <span>
                  <span className="block text-[14px] font-semibold text-white">{props.success.details}</span>
                  <span className="mt-0.5 block text-[12.5px] text-white/55">{props.success.detailsHint}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-white/70 transition group-hover:translate-x-1" />
              </button>
            </Panel>
          )}

          {phase === 'details' && (
            <Panel key="details">
              <Stepper
                step={detailsStep}
                onStepChange={setDetailsStep}
                theme="dark"
                frame={false}
                width="100%"
                linear
                accentColor="#ffffff"
                style={
                  {
                    '--stepper-tile': 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.09))',
                    '--stepper-tile-edge': 'rgba(255, 255, 255, 0.16)',
                    '--stepper-tile-highlight': 'rgba(255, 255, 255, 0.2)',
                    '--stepper-tile-shadow': '0 6px 16px -8px rgba(0, 0, 0, 0.5)',
                    '--stepper-well': 'rgba(255, 255, 255, 0.06)'
                  } as CSSProperties
                }
                backButtonText="Volver"
                nextButtonText="Continuar"
                completeButtonText={sending ? 'Enviando…' : props.detailsSubmit}
                nextButtonProps={{
                  disabled: sending || (detailsStep === 1 && !lead.tipo),
                  onClick: event => {
                    if (detailsStep === 2) {
                      event.preventDefault();
                      void submitDetails();
                    }
                  }
                }}
              >
                <Step title="Tu comunidad">
                  <div className="grid gap-3 pt-1">
                    <SelectField label="Tu comunidad" name="tipo" value={lead.tipo} options={options.tipo} onChange={update('tipo')} required />
                    <SelectField
                      label="¿Eres parte del comité actual?"
                      name="comite"
                      value={lead.comite}
                      options={options.comite}
                      onChange={update('comite')}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Torres" name="torres" type="number" inputMode="numeric" min={1} max={99} value={lead.torres} onChange={update('torres')} />
                      <Field label="Pisos" name="pisos" type="number" inputMode="numeric" min={1} max={60} value={lead.pisos} onChange={update('pisos')} />
                      <Field label="Deptos/piso" name="deptos" type="number" inputMode="numeric" min={1} max={40} value={lead.deptos} onChange={update('deptos')} />
                    </div>
                    <SelectField
                      label="¿Tiene ascensores?"
                      name="ascensores"
                      value={lead.ascensores}
                      options={options.ascensores}
                      onChange={update('ascensores')}
                    />
                  </div>
                </Step>
                <Step title="Qué buscas">
                  <div className="grid gap-3 pt-1">
                    <SelectField
                      label="¿Tiene caldera de agua caliente?"
                      name="calderas"
                      value={lead.calderas}
                      options={options.calderas}
                      onChange={update('calderas')}
                    />
                    <SelectField
                      label="Espacios comunes (gym, quinchos, sala…)"
                      name="espacios"
                      value={lead.espacios}
                      options={options.espacios}
                      onChange={update('espacios')}
                    />
                    <TextArea label="¿Por qué buscas nueva administración?" name="motivo" value={lead.motivo} onChange={update('motivo')} />
                    <TextArea
                      label="¿Qué es lo más importante que debe tener una administración para ti?"
                      name="importante"
                      value={lead.importante}
                      onChange={update('importante')}
                    />
                  </div>
                </Step>
              </Stepper>
              {errorNote}
            </Panel>
          )}

          {phase === 'done' && (
            <Panel key="done">
              <div className="flex flex-col items-center py-4 text-center">
                <span className="mb-4 grid size-14 place-items-center rounded-full bg-[#4ADE80] text-b1 shadow-[0_0_0_8px_rgba(74,222,128,0.15)]">
                  <Check size={28} strokeWidth={2.6} />
                </span>
                <p className="max-w-xs text-[14.5px] leading-relaxed text-white/75">{props.done.text}</p>
                {hasWhatsapp && (
                  <button
                    type="button"
                    onClick={openWhatsapp}
                    className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-wa px-6 text-[14.5px] font-semibold text-[#073b1f] transition hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon size={18} /> {props.success.whatsapp}
                  </button>
                )}
              </div>
            </Panel>
          )}
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
}
