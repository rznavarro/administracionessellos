// Envío del formulario a /contacto.php (vive en el hosting, fuera de este repo).
// Mismo contrato que el formulario original: JSON con estas claves y respuesta {ok:true}.

export interface Lead {
  nombre: string;
  telefono: string;
  correo: string;
  comite: string;
  comuna: string;
  tipo: string;
  torres: string;
  pisos: string;
  deptos: string;
  ascensores: string;
  calderas: string;
  espacios: string;
  motivo: string;
  importante: string;
  // Honeypot anti-spam: siempre vacío para personas
  web: string;
  // '1' cuando es el segundo envío con los detalles de la comunidad
  complemento?: string;
}

export const emptyLead: Lead = {
  nombre: '',
  telefono: '',
  correo: '',
  comite: '',
  comuna: '',
  tipo: '',
  torres: '',
  pisos: '',
  deptos: '',
  ascensores: '',
  calderas: '',
  espacios: '',
  motivo: '',
  importante: '',
  web: ''
};

// Evento con el que la autoevaluación precarga el motivo en el formulario de la hero
export const PREFILL_EVENT = 'rosello:prefill';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const track = (event: string, params: Record<string, string>) => {
  if (window.gtag) window.gtag('event', event, params);
};

// Cookie anti-bot del hosting: sin ella el POST rebota con 409
export const setHumanCookie = () => {
  document.cookie = 'humans_21909=1; path=/; max-age=31536000';
};

export async function sendLead(lead: Lead): Promise<void> {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  };
  let response = await fetch('/contacto.php', options);
  if (response.status === 409) {
    setHumanCookie();
    response = await fetch('/contacto.php', options);
  }
  const json = (await response.json()) as { ok?: boolean };
  if (!json.ok) throw new Error('contacto.php respondió sin ok');
}
