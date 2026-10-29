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
    // DEMO: reemplazar por la inscripción real antes de publicar
    registry: 'Inscrita en el Registro Nacional de Administradores',
    // Número de inscripción en el Registro Nacional de Administradores. Vacío = no se muestra
    registryNumber: '000000 (demo)'
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
    // Foto de fondo de la hero: nombre del archivo en src/assets/imagenes (sin extensión)
    image: {
      name: '01-edificio-residencial-hero',
      alt: 'Fachada de un edificio residencial moderno con jardines'
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
    // `foto`: nombre del archivo en src/assets/imagenes (sin extensión)
    items: [
      {
        foto: '08-control-accesos',
        alt: 'Residente con su perro siendo recibida por el conserje en el lobby',
        title: 'Respuesta en 24 horas',
        text: 'Toda solicitud tiene respuesta en menos de un día.'
      },
      {
        foto: '04-revision-informe',
        alt: 'Checklist de una visita en una tablet junto a un informe impreso',
        title: 'Informe semanal con fotos',
        text: 'Visita en terreno cada semana, documentada para el comité.'
      },
      {
        foto: '11-gasto-comun-transparente',
        alt: 'Planilla de gastos comunes con gráficos en un computador',
        title: 'Gasto común claro',
        text: 'Cada cobro revisado, cada variación explicada y fondo de reserva (Art. 39, Ley 21.442).'
      },
      {
        foto: '07-mantencion-caldera',
        alt: 'Técnico revisando la sala de calderas de un edificio',
        title: 'Mantenciones al día',
        text: 'Ascensores, calderas y gas con calendario preventivo.'
      }
    ] as { foto: string; alt: string; title: string; text: string }[]
  },

  modelo: {
    tag: 'Cómo funciona',
    title: 'Empezar es simple',
    steps: [
      { icon: 'clipboardList', title: 'Déjanos tus datos', text: 'Completa el formulario en menos de un minuto.' },
      { icon: 'badgeCheck', title: 'Recibe tu propuesta', text: 'Te contactamos en menos de 24 horas con una propuesta a la medida.' },
      { icon: 'handshake', title: 'Nos hacemos cargo', text: 'Acompañamos todo el traspaso: asamblea, documentos y proveedores.' }
    ] as { icon: IconName; title: string; text: string }[],
    image: {
      name: '14-traspaso-documentos',
      alt: 'Apretón de manos entre una administradora y un cliente al cerrar un acuerdo',
      badge: 'Respuesta en menos de 24 horas'
    }
  },

  // Mosaico de fotos que responde "¿administran lo mío?"
  cubrimos: {
    tag: 'Qué cubrimos',
    title: 'Todo lo que tu edificio necesita',
    cta: 'Pedir propuesta',
    items: [
      { foto: '03-administrador-visita', alt: 'Persona con una tablet recorriendo el lobby de un edificio', label: 'Visita semanal en terreno' },
      { foto: '06-mantencion-ascensor', alt: 'Técnico con una tablet junto a la máquina de un ascensor', label: 'Ascensores' },
      { foto: '09-porteria-segura', alt: 'Entrada iluminada de un edificio al anochecer, con conserjería', label: 'Seguridad y accesos' },
      { foto: '10-proveedores-coordinacion', alt: 'Administradora y técnico revisando una tablet junto al ascensor', label: 'Proveedores coordinados' },
      { foto: '02-condominio-jardines', alt: 'Edificio con jardines, vecinos y una mascota paseando', label: 'Edificios' },
      { foto: '13-condominio-casas', alt: 'Condominio con senderos, jardines y portón de acceso', label: 'Condominios de casas' }
    ] as { foto: string; alt: string; label: string }[]
  },

  // Comunidades de referencia (slide). Vacío = no se muestra la sección.
  // Cargar SOLO comunidades que ADMINOR administra de verdad y citas con autorización escrita de quien las dice.
  referencias: {
    tag: 'Comunidades de referencia',
    title: 'Comunidades que ya confían en ADMINOR',
    text: 'Edificios y condominios que administramos hoy.',
    // DEMO: datos ficticios solo para mostrar el diseño al cliente. Reemplazar por comunidades reales antes de publicar
    items: [
      { comunidad: 'Edificio Alto Parque', foto: '01-edificio-residencial-hero', comuna: 'Las Condes', tipo: 'Edificio residencial', unidades: '120 unidades', quote: 'Ahora entendemos en qué se va cada peso del gasto común. El informe semanal nos ahorró muchas reuniones.', autor: 'Carolina M.', cargo: 'Presidenta del comité' },
      { comunidad: 'Torre Los Aromos', foto: '15-edificio-atardecer', comuna: 'Vitacura', tipo: 'Edificio residencial', unidades: '85 unidades', quote: 'Las mantenciones están al día y cuando pedimos algo responden el mismo día.', autor: 'Andrés P.', cargo: 'Copropietario' },
      { comunidad: 'Condominio Valle Norte', foto: '13-condominio-casas', comuna: 'Las Condes', tipo: 'Condominio de casas', unidades: '40 casas', quote: 'Ordenaron proveedores y accesos. Se nota la presencia en terreno cada semana.', autor: 'Marcela R.', cargo: 'Tesorera del comité' },
      { comunidad: 'Edificio Mirador del Sol', foto: '02-condominio-jardines', comuna: 'Vitacura', tipo: 'Edificio residencial', unidades: '200 unidades', quote: 'El traspaso fue ordenado: documentos, proveedores y asamblea, todo sin sobresaltos.', autor: 'Felipe T.', cargo: 'Administrador del comité' },
      { comunidad: 'Torre Parque Central', foto: '09-porteria-segura', comuna: 'Las Condes', tipo: 'Edificio residencial', unidades: '150 unidades', quote: 'Transparencia total en los cobros y respuestas rápidas. Lo recomendamos.', autor: 'Isabel V.', cargo: 'Presidenta del comité' }
    ] as { comunidad: string; foto?: string; comuna: string; tipo: string; unidades?: string; quote?: string; autor?: string; cargo?: string }[]
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
    whatsapp: 'Escribir por WhatsApp',
    image: {
      name: '15-edificio-atardecer',
      alt: 'Fachada de un edificio residencial al atardecer, con luces cálidas'
    }
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
