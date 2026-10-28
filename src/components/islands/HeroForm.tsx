import { useId, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, LoaderCircle, Lock } from 'lucide-react';
import SpotlightCard from '../reactbits/SpotlightCard';
import StarBorder from '../reactbits/StarBorder';
import ClickSpark from '../reactbits/ClickSpark';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { emptyLead, sendLead, track, type Lead } from '../../lib/leads';

interface Props {
  endpoint: string;
  title: string;
  subtitle: string;
  submit: string;
  trust: string;
  error: string;
  success: {
    title: string;
    text: string;
    direct: string;
    whatsapp: string;
    whatsappMessage: string;
  };
  whatsapp: string;
}

const INPUT =
  'peer w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[14.5px] text-white outline-none transition duration-200 placeholder:text-transparent focus:border-white/55 focus:bg-white/[0.1] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:[transition:background-color_9999s]';
const FLOAT_LABEL =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-white/55 transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-white/75 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]';

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  maxLength = 120,
  autoComplete,
  inputMode
}: {
  label: string;
  name: keyof Lead;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email';
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
        required
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={label}
        className={`${INPUT} h-[54px] pt-4`}
      />
      <label htmlFor={id} className={FLOAT_LABEL}>
        {label}
        <span aria-hidden="true"> *</span>
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
  const [sent, setSent] = useState(false);
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const update = (name: keyof Lead) => (event: ChangeEvent<HTMLInputElement>) =>
    setLead(current => ({ ...current, [name]: event.target.value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSending(true);
    setError(false);
    try {
      // El formulario es corto a propósito (nombre, teléfono y correo): lo demás se conversa en el contacto.
      // Los campos que el servidor puede exigir van marcados para que el correo no llegue con huecos.
      await sendLead(props.endpoint, {
        ...emptyLead,
        ...lead,
        comuna: 'Sin indicar',
        comite: 'Sin indicar',
        tipo: 'Sin indicar'
      });
      track('generate_lead', { form: 'contacto' });
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  // Botón + window.open para medir el clic con su origen. Sin número configurado no hay botón
  const hasWhatsapp = props.whatsapp !== '';
  const openWhatsapp = () => {
    track('whatsapp_click', { origen: 'formulario' });
    const text = props.success.whatsappMessage.replace('{nombre}', lead.nombre || '');
    window.open(`https://wa.me/${props.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

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
          padding: 'clamp(22px, 4vw, 32px)'
        } as CSSProperties
      }
    >
      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!sent ? (
            <Panel key="form">
              <h2 className="text-[clamp(1.4rem,2.4vw,1.65rem)] font-bold leading-tight tracking-[-0.02em] text-white">
                {props.title}
              </h2>
              <p className="mb-5 mt-1.5 text-[14px] text-white/65">{props.subtitle}</p>

              <form onSubmit={submit} className="relative grid gap-3">
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
                <Field label="Nombre" name="nombre" value={lead.nombre} onChange={update('nombre')} autoComplete="name" />
                <Field
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={lead.telefono}
                  onChange={update('telefono')}
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
                  autoComplete="email"
                  inputMode="email"
                />
                <ClickSpark sparkColor={['#ffffff', '#9FC3EA', '#4ADE80']} sparkCount={10} sparkRadius={34} className="mt-2">
                  <StarBorder
                    as="button"
                    type="submit"
                    disabled={sending}
                    className="h-[56px] w-full text-[15.5px] font-semibold"
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
                {error && (
                  <p role="alert" className="rounded-lg bg-[#FFB4A8]/10 px-3 py-2 text-center text-[12.5px] leading-snug text-[#FFC9BF]">
                    {props.error}
                  </p>
                )}
                <p className="mt-1 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-white/60">
                  <Lock size={12} aria-hidden="true" /> {props.trust}
                </p>
              </form>
            </Panel>
          ) : (
            <Panel key="done">
              <div className="flex flex-col items-center py-4 text-center">
                <span className="mb-4 grid size-14 place-items-center rounded-full bg-[#4ADE80] text-b1 shadow-[0_0_0_8px_rgba(74,222,128,0.15)]">
                  <Check size={28} strokeWidth={2.6} />
                </span>
                <h2 className="text-[1.4rem] font-bold tracking-[-0.02em] text-white">{props.success.title}</h2>
                <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-white/75">{props.success.text}</p>
                {hasWhatsapp && (
                  <>
                    <p className="mt-5 text-[13px] text-white/60">{props.success.direct}</p>
                    <button
                      type="button"
                      onClick={openWhatsapp}
                      className="mt-2 inline-flex h-12 items-center gap-2 rounded-xl bg-wa px-6 text-[14.5px] font-semibold text-[#073b1f] transition hover:-translate-y-0.5"
                    >
                      <WhatsAppIcon size={18} /> {props.success.whatsapp}
                    </button>
                  </>
                )}
              </div>
            </Panel>
          )}
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
}
