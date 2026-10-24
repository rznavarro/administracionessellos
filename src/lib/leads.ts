// Envío del formulario al endpoint de site.form.endpoint (vive en el hosting, fuera de este repo).
// Contrato: POST con JSON con estas claves; el servidor responde {ok:true}.

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
export const PREFILL_EVENT = 'adminor:prefill';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const track = (event: string, params: Record<string, string>) => {
  if (window.gtag) window.gtag('event', event, params);
};

export async function sendLead(endpoint: string, lead: Lead): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  });
  const json = (await response.json()) as { ok?: boolean };
  if (!json.ok) throw new Error(`${endpoint} respondió sin ok`);
}
