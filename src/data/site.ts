// Todo el contenido y la marca del sitio viven en este archivo.
// Para reutilizar la plantilla con otro cliente se edita esto (y los colores en src/styles/global.css).
// Texto enriquecido: **negrita** y [enlace](/url) se convierten en HTML con src/lib/rich.ts.

import type { IconName } from '../lib/icons';

export const site = {
  brand: {
    name: 'ADMINOR',
    shortName: 'ADMINOR',
    // Logo en blanco con fondo transparente (el nav y el footer son oscuros). Se generó desde logo/
    // (JPEG original) con transparencia según la luminosidad. La bajada va como texto en el footer.
    logo: { src: '/logo-adminor.webp', width: 1086, height: 211, alt: 'ADMINOR' },
    tagline: 'Somos tu norte en Administración',
    favicon: '/favicon-adminor.png',
    touchIcon: '/logo-adminor-touch.png',
    // Colores que usa el fondo WebGL (LightRays). Mantener en sintonía con global.css
    colors: { navy: '#152A45', blue: '#2D6098', sky: '#7FA7D6', mist: '#D6E4F0', green: '#1F7A4A' },
    // Crédito opcional en el footer (p. ej. la agencia). Vacío = no se muestra
    credit: { label: '', href: '' }
  },

  // Datos de contacto de ADMINOR (pendientes). Todo campo vacío oculta lo que depende de él:
  // sin `whatsapp` no hay botones de WhatsApp; sin `phoneHref` no se muestra el teléfono, etc.
  contact: {
    phoneDisplay: '', // ej. '+56 9 1234 5678'
    phoneHref: '', // ej. 'tel:+56912345678'
    whatsapp: '', // solo dígitos con código de país, ej. '56912345678'
    whatsappMessage: 'Hola, quiero saber más sobre la administración de mi comunidad.',
    email: '',
    hours: '',
    // Inscripción en el Registro Nacional de Administradores (Ley 21.442), ej. 'Ley 21.442 · Registro Nacional de Administradores'
    registry: '',
    // Número de inscripción en el Registro Nacional de Administradores. Vacío = no se muestra
    registryNumber: ''
  },

  // Redes sociales. Vacías = no se muestran
  socials: [] as { label: string; href: string }[],

  // Comunas donde opera ADMINOR. Vacío = no se muestra la sección de cobertura
  comunas: [] as string[],

  seo: {
    title: 'Administración de Edificios y Condominios | ADMINOR',
    description: 'ADMINOR administra edificios y condominios con informe semanal y gasto común claro. Pide tu propuesta gratis.',
    ogTitle: 'ADMINOR | Administración de Edificios y Condominios',
    ogDescription: 'Informe semanal con fotos, gasto común claro y respuesta en menos de 24 horas. Pide tu propuesta gratis.',
    // Pendientes del dominio de ADMINOR. Vacío = no se emite la etiqueta
    ogImage: '', // URL absoluta de la imagen para redes, ej. 'https://dominio.cl/og.jpg'
    canonical: '', // ej. 'https://dominio.cl/'
    locale: 'es_CL',
    googleVerification: '', // token de Google Search Console
    measurementScript: '', // script de analítica propio, ej. '/analitica.js'
    business: {
      description: 'Administración de edificios y condominios de casas conforme a la Ley 21.442.',
      locality: '',
      region: '',
      country: 'CL',
      priceRange: '$$'
    }
  },

  nav: {
    // Botón del nav (y de la barra fija móvil). La página es corta: no hay menú de enlaces
    cta: { label: 'Pedir propuesta', href: '#form' }
  },

  hero: {
    // Titular directo: qué es y qué recibe el cliente. `titleAccent` va en cursiva serif
    titleLead: 'Administración de edificios y condominios',
    titleAccent: 'con informe semanal y gasto común claro',
    subtitle: 'Cotiza en 24 horas, sin compromiso.',
    // Tres beneficios bajo el subtítulo
    benefits: [
      { icon: 'mailCheck', label: 'Respuesta en 24 horas' },
      { icon: 'calendarCheck', label: 'Visita semanal con informe' },
      { icon: 'receipt', label: 'Gasto común transparente' }
    ] as { icon: IconName; label: string }[],
    // Foto de fondo de la hero (va al 22% de opacidad y en modo luminosidad: basta en escala de grises).
    // `variants`: versiones más chicas para el srcset
    image: {
      src: '/edificio-residencial.webp',
      variants: [
        { src: '/edificio-residencial-640.webp', width: 640 },
        { src: '/edificio-residencial-960.webp', width: 960 }
      ],
      alt: 'Edificio residencial',
      width: 1100,
      height: 1320
    }
  },

  form: {
    // Adónde se envía el formulario (POST con JSON; debe responder {"ok": true})
    endpoint: '/contacto.php',
    title: 'Pide tu propuesta gratis',
    subtitle: 'Déjanos tus datos y te contactamos.',
    submit: 'Quiero mi propuesta gratis',
    trust: 'Sin compromiso · Respuesta en menos de 24 horas',
    error: 'No se pudo enviar. Intenta de nuevo en unos minutos.',
    success: {
      title: '¡Recibimos tu solicitud!',
      text: 'Te contactaremos en menos de 24 horas.',
      // Solo se muestra si hay WhatsApp configurado
      direct: '¿Prefieres hablar ya?',
      whatsapp: 'Escribir por WhatsApp',
      whatsappMessage: 'Hola, acabo de enviar el formulario en la web. Soy {nombre}.'
    }
  },

  beneficios: {
    tag: '¿Por qué ADMINOR?',
    title: 'Lo que recibe tu comunidad',
    cta: 'Pedir propuesta',
    items: [
      { icon: 'mailCheck', title: 'Respuesta en 24 horas', text: 'Toda solicitud tiene respuesta en menos de un día.' },
      { icon: 'calendarCheck', title: 'Informe semanal con fotos', text: 'Visita en terreno cada semana, documentada para el comité.' },
      {
        icon: 'receipt',
        title: 'Gasto común claro',
        text: 'Cada cobro revisado, cada variación explicada y fondo de reserva (Art. 39, Ley 21.442).'
      },
      { icon: 'wrench', title: 'Mantenciones al día', text: 'Ascensores, calderas y gas con calendario preventivo.' }
    ] as { icon: IconName; title: string; text: string }[]
  },

  modelo: {
    tag: 'Cómo funciona',
    title: 'Empezar es simple',
    steps: [
      { icon: 'clipboardList', title: 'Déjanos tus datos', text: 'Completa el formulario en menos de un minuto.' },
      { icon: 'badgeCheck', title: 'Recibe tu propuesta', text: 'Te contactamos en menos de 24 horas con una propuesta a la medida.' },
      { icon: 'handshake', title: 'Nos hacemos cargo', text: 'Acompañamos todo el traspaso: asamblea, documentos y proveedores.' }
    ] as { icon: IconName; title: string; text: string }[]
  },

  testimonios: {
    tag: 'Experiencias reales',
    title: 'Lo que dicen nuestros edificios',
    text: 'Les preguntamos directamente a nuestros clientes qué es lo que más valoran.',
    // Testimonios de clientes de ADMINOR. Vacío = no se muestra la sección
    items: [] as { name: string; meta: string; quote: string; featured?: boolean }[]
  },

  cobertura: {
    title: 'Administramos exclusivamente comunidades en',
    text: 'Así garantizamos lo que prometemos: **presencia real en terreno**, **respuesta en menos de 24 horas** y un equipo que conoce cada comunidad.'
  },

  faq: {
    tag: 'Preguntas frecuentes',
    title: 'Lo que nos preguntan antes de contratar',
    items: [
      {
        q: '¿Cuánto cobran?',
        a: 'Depende del tamaño de la comunidad y de los servicios que necesite. Te entregamos una propuesta clara, sin costos ocultos ni compromisos de largo plazo.'
      },
      {
        q: '¿Qué pasa si no estamos conformes?',
        a: 'Pueden dar cese al servicio según lo que establece la ley. No amarramos a nadie con contratos eternos.'
      },
      {
        q: '¿Con qué frecuencia van a la comunidad?',
        a: 'Todas las semanas. Cada visita queda documentada con fotos, checklist e informe para el comité.'
      },
      {
        q: '¿Cómo es el proceso para cambiar de administración?',
        a: 'La asamblea puede remover al administrador en cualquier momento (art. 18, Ley 21.442). Se cita con 5 a 15 días de anticipación (art. 16), se acuerda el cambio y la designación del nuevo administrador se reduce a escritura pública. Nosotros acompañamos todo el proceso, incluido el traspaso de documentos.'
      },
      {
        q: '¿Administran condominios de casas?',
        a: 'Sí. Además de edificios, administramos condominios de casas, con guardias y control de accesos en convenio con empresas de seguridad especialistas.'
      }
    ]
  },

  cta: {
    title: '¿Listo para una administración más clara?',
    text: 'Déjanos tus datos y recibe tu propuesta en menos de 24 horas.',
    primary: 'Pedir mi propuesta gratis',
    whatsapp: 'Escribir por WhatsApp'
  },

  recursos: {
    id: 'her',
    tag: 'Recursos para tu comunidad',
    title: 'Esto es lo mínimo que deberías recibir de tu administración',
    text: 'Creemos que toda comunidad debería poder exigir lo básico, tenga o no un buen administrador. Por eso preparamos estas guías: para que sepas exactamente qué esperar, qué exigir y cómo prepararte. Si después de leerlas sientes que algo no cuadra en tu edificio, ya sabes por dónde empezar.',
    // Guías descargables (PDF en public/). Vacío = no se muestra la sección
    items: [] as { icon: IconName; color: string; title: string; text: string; href: string; cta: string; pages: string[] }[]
  },

  footer: {
    description: 'Administración de edificios y condominios de casas, conforme a la Ley 21.442.',
    // Enlaces legales (política de privacidad, términos). Vacío = no se muestran
    legal: [] as { label: string; href: string }[]
  }
};

export type Site = typeof site;

// '' si no hay número de WhatsApp configurado
export const whatsappUrl = (message = site.contact.whatsappMessage) =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}` : '';
