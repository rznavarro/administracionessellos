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
    // Colores que usan los fondos WebGL (Aurora, LightRays). Mantener en sintonía con global.css
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
    description: 'ADMINOR: administración de edificios y condominios. Visitas con informe y gasto común claro.',
    ogTitle: 'ADMINOR | Administración de Edificios y Condominios',
    ogDescription:
      'Cuidamos el lugar donde vives, el estado de sus instalaciones y tu tranquilidad. Visitas semanales con informe, respuesta en menos de 24 horas y transparencia total en costos.',
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
    links: [
      { label: 'Cómo trabajamos', href: '#modelo' },
      { label: 'Gasto común', href: '#ggcc' },
      { label: 'Seguridad', href: '#seg' },
      { label: 'Preguntas', href: '#faq' }
    ],
    cta: { label: 'Evalúa tu comunidad', href: '#form' }
  },

  hero: {
    badge: 'Administración de edificios y condominios',
    titleLead: 'No solo administramos.',
    titleVerb: 'Cuidamos',
    rotating: ['el lugar donde vives', 'tu edificio', 'tu condominio', 'tu tranquilidad'],
    subtitle:
      'Mantenciones preventivas para que nada falle, supervisión en terreno todas las semanas y en línea 24/7, seguridad con protocolos definidos y cada gasto controlado con total transparencia.',
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
    },
    // Cifras de la hero. `value` anima el número (p. ej. { value: 10, suffix: '+', label: 'Años de experiencia' })
    stats: [
      { text: '<24h', label: 'Respuesta a toda solicitud' },
      { text: '24/7', label: 'Supervisión online' }
    ] as { value?: number; suffix?: string; text?: string; label: string }[]
  },

  form: {
    // Adónde se envía el formulario (POST con JSON; debe responder {"ok": true})
    endpoint: '/contacto.php',
    title: 'Cuéntanos de tu comunidad',
    subtitle: 'Te contactamos en menos de 24 horas.',
    submit: 'Quiero que me contacten',
    model: '**Nosotros hacemos el trabajo; el comité supervisa y fiscaliza.** Juntos fijamos objetivos y normas.',
    success: {
      title: 'Recibimos tu solicitud',
      text: 'Te contactaremos en menos de 24 horas.',
      // Solo se muestra si hay WhatsApp configurado
      direct: '¿Quieres comunicarte de forma directa?',
      whatsapp: 'Contactar por WhatsApp',
      whatsappMessage: 'Hola, acabo de enviar el formulario en la web. Soy {nombre}.',
      details: 'Completar los detalles de mi comunidad',
      detailsHint: '2 minutos, opcional. Nos ayuda a preparar una propuesta a la medida.'
    },
    detailsSubmit: 'Enviar detalles',
    done: {
      title: 'Listo, gracias',
      text: 'Con estos datos preparamos una propuesta personalizada para tu comunidad.'
    },
    error: 'No se pudo enviar. Intenta de nuevo en unos minutos.',
    options: {
      comite: ['Sí, soy presidente del comité', 'Sí, soy parte del comité', 'No'],
      tipo: ['Edificio', 'Condominio de casas', 'Inmobiliaria'],
      ascensores: ['Sí', 'No'],
      calderas: ['Sí, caldera central', 'No, cada depto tiene su calefón', 'No sé'],
      espacios: ['No tiene', '1 a 3', 'Más de 3']
    }
  },

  dolor: {
    tag: 'Identificación',
    title: '¿Te pasa alguna de estas?',
    text: 'Si reconoces aunque sea una, tu comunidad necesita una administración que se tome las cosas en serio.',
    items: [
      {
        icon: 'receipt',
        quote: '“Los gastos comunes suben y nadie me explica por qué”',
        answer:
          'Transparencia total en costos: cada peso tiene nombre, proveedor y justificación. Lo comunicamos mensualmente para que no te sorprendan.'
      },
      {
        icon: 'wrench',
        quote: '“Se rompió algo y llevan semanas sin arreglarlo”',
        answer: 'No esperamos a que se rompa. Mantenciones preventivas calendarizadas: ascensores, calderas, gas, bombas.'
      },
      {
        icon: 'mailX',
        quote: '“Le mando mensaje al administrador y no me responde”',
        answer: 'Canal directo y compromiso real: toda solicitud se responde en menos de 24 horas. Toda.'
      },
      {
        icon: 'handCoins',
        quote: '“No sé si los proveedores son los mejores o los más caros”',
        answer: 'Buscamos proveedores que garanticen el mejor resultado al mejor costo para la comunidad.'
      },
      {
        icon: 'presentation',
        quote: '“En la asamblea me muestran números que no entiendo”',
        answer: 'Reportes hechos para que los entienda cualquier persona. Si no se entiende, no sirve.'
      },
      {
        icon: 'house',
        quote: '“Vivo en un condominio de casas y nadie supervisa nada”',
        answer:
          'También administramos condominios de casas, con altos estándares de seguridad: guardias y control perimetral en convenio con empresas especialistas, áreas verdes, portones y gastos comunes claros.'
      }
    ] as { icon: IconName; quote: string; answer: string }[],
    cta: { label: '¿Te identificas? Haz el test gratuito', href: '#test' }
  },

  modelo: {
    tag: 'Cómo trabajamos',
    title: 'El comité supervisa. Nosotros hacemos el trabajo.',
    paragraphs: [
      'Con ADMINOR, el comité no tiene que perseguir proveedores, cotizar reparaciones ni estar encima de cada mantención. Su rol es supervisar y fiscalizar; el nuestro es ejecutar.',
      'Juntos fijamos los objetivos, las metas y las normas de la comunidad. Desde ahí, hacerlas cumplir es responsabilidad nuestra, y el comité ve cada avance sin tener que hacer el trabajo.'
    ],
    steps: [
      {
        icon: 'compass',
        title: 'Juntos fijamos el rumbo',
        text: 'Al comenzar definimos con el comité los objetivos, las metas y las normas: qué se prioriza, qué se espera de cada área y cómo se mide.'
      },
      {
        icon: 'hammer',
        title: 'Nosotros ejecutamos y hacemos cumplir',
        text: 'Mantenciones, proveedores, personal, cobranza y reglamento: nuestro equipo se hace cargo del día a día y de que lo acordado se cumpla.'
      },
      {
        icon: 'clipboardCheck',
        title: 'El comité fiscaliza nuestro trabajo',
        text: 'Con informes de terreno semanales con fotos, reportes de gasto en palabras simples y seguimiento de cada solicitud, el comité revisa nuestros avances cuando quiera.'
      }
    ] as { icon: IconName; title: string; text: string }[]
  },

  compromiso: {
    tag: 'Nuestro compromiso',
    title: 'Comunicación directa, clara y a tiempo',
    // Las palabras entre ** quedan destacadas en el efecto de revelado
    text: 'Es lo que más nos piden los comités, y es lo que garantizamos: **toda solicitud respondida en menos de 24 horas,** por un canal directo con quien administra tu comunidad y no con un correo que nadie lee.'
  },

  pilares: {
    supervision: {
      id: 'como',
      badge: 'Pilar 1 — Supervisión permanente',
      title: 'Ojos en tu comunidad, siempre: en terreno y en línea',
      text: 'No administramos desde un escritorio. Nuestro equipo va a tu comunidad todas las semanas, recorre cada área con checklists internos y documenta todo con fotos. Y entre visita y visita, la supervisión sigue: remota, en línea, 24/7.',
      // Captura vertical (p. ej. un informe de visita) que se muestra en un teléfono. null = sin imagen
      image: null as null | { src: string; alt: string; width: number; height: number },
      cards: [
        {
          icon: 'calendarCheck',
          title: 'Vamos a tu comunidad todas las semanas',
          text: 'Inspección en terreno semanal con informe y registro fotográfico. El comité siempre sabe qué se revisó, en qué estado está cada área y qué viene después.'
        },
        {
          icon: 'mailCheck',
          title: 'Ningún correo queda sin respuesta',
          text: 'Sabemos lo frustrante que es escribirle al administrador y sentir que hablas al vacío. Acá no pasa: cada solicitud se registra, se responde en menos de 24 horas y se le hace seguimiento hasta que queda resuelta. No persigues a nadie — nosotros te mantenemos informado.'
        },
        {
          icon: 'monitorSmartphone',
          title: 'Supervisión remota, en línea 24/7',
          text: 'Tu comunidad no queda sola entre visitas: seguimiento en línea permanente de solicitudes, mantenciones y estado general, los 7 días de la semana.'
        },
        {
          icon: 'calendarClock',
          title: 'Mantenciones preventivas calendarizadas',
          text: 'No reparamos. Prevenimos. Ascensores, calderas, gas, bombas de agua — todo con calendario y seguimiento. Art. 20, Ley 21.442.'
        },
        {
          icon: 'users',
          title: 'Supervisión de personal',
          text: 'Comunicación constante con mayordomos y conserjes. Checklists internos de gestión. Verificamos que cada persona cumpla su función.'
        },
        {
          icon: 'badgeCheck',
          title: 'Proveedores evaluados',
          text: 'Seleccionamos proveedores que garanticen el mejor resultado al mejor costo. Los evaluamos periódicamente.'
        }
      ] as { icon: IconName; title: string; text: string }[]
    },
    finanzas: {
      id: 'finanzas',
      badge: 'Pilar 2 — Finanzas claras',
      title: 'Sabes exactamente en qué se gasta cada peso',
      text: 'Transparencia en costos de verdad: comunicamos periódicamente en qué se gasta el gasto común, revisamos cada cobro y trabajamos con fondos de reserva para que las emergencias no afecten el presupuesto.',
      // Captura de la plataforma de gastos comunes, en un marco de navegador. null = sin imagen
      image: null as null | { src: string; alt: string; width: number; height: number },
      cards: [
        {
          icon: 'layoutDashboard',
          title: 'La mejor plataforma de gastos comunes',
          text: 'Cada residente ve en qué y cómo se usa su plata — ingresos, egresos, morosidad, fondo de reserva — cuando quiera, sin pedirlo. Acceso en línea 24/7.'
        },
        {
          icon: 'piggyBank',
          title: 'Gasto común estable y predecible',
          text: 'Fondos de reserva (Art. 39, Ley 21.442) para absorber emergencias sin que el gasto común se dispare.'
        },
        {
          icon: 'fileSearch',
          title: 'Revisión de todos los cobros',
          text: 'Revisamos cada factura: proveedores, electricidad, agua, gas. Si algo está mal cobrado, lo reclamamos, corregimos e informamos.'
        },
        {
          icon: 'trendingUp',
          title: 'Si el gasto común varía, sabes por qué',
          text: 'Te entregamos una explicación clara y precisa de cada variación del gasto común, sin que tengas que pedirla. Mereces estar informado de lo que pasa con tu plata. Art. 21, Ley 21.442.'
        }
      ] as { icon: IconName; title: string; text: string }[],
      legal: {
        title: 'Estabilidad y excelente manejo financiero',
        text: 'Siempre dentro del marco legal — Ley 21.442 y su Reglamento: cuenta bancaria (Art. 33), presupuesto en asamblea (Art. 22), registro de copropietarios (Art. 9).'
      }
    },
    seguridad: {
      id: 'seg',
      badge: 'Pilar 3 — Seguridad y cuidado del lugar',
      title: 'Un edificio cuidado es un edificio seguro',
      text: 'La seguridad no es solo una cámara en la entrada. Es que las calderas estén certificadas, los ascensores al día, los accesos controlados y cada emergencia con protocolo definido antes de que ocurra. Y cuando la comunidad necesita vigilancia real — como en los condominios de casas — también la tenemos.',
      cards: [
        {
          icon: 'cog',
          title: 'Instalaciones críticas certificadas',
          text: 'Gas, calderas, ascensores y bombas con mantenciones y certificaciones al día. La primera seguridad es que nada falle.'
        },
        {
          icon: 'shieldCheck',
          title: 'Guardias y vigilancia para condominios de casas',
          text: 'Altos estándares de seguridad: guardias, control perimetral y accesos cuidados, en convenio con empresas de seguridad especialistas. Para que vivas tranquilo.'
        },
        {
          icon: 'handshake',
          title: 'Convenios con especialistas',
          text: 'Tu comunidad accede a empresas de seguridad probadas, en convenio directo con nosotros — no a la primera cotización que llegó.'
        },
        {
          icon: 'clipboardList',
          title: 'Protocolos antes de la emergencia',
          text: 'Control de accesos, rondas, plan de emergencia, coordinación con conserjería: cada situación tiene procedimiento definido, documentado y auditable por el comité.'
        }
      ] as { icon: IconName; title: string; text: string }[]
    }
  },

  gastoComun: {
    tag: 'El gasto común',
    title: ['Bajar el gasto común es fácil.', 'Lo difícil es que te dé tranquilidad.'],
    paragraphs: [
      'Cualquiera puede recortar mantenciones — hacerlas baratas, o simplemente no hacerlas — y mostrar un gasto común más bajo. Por un año. Hasta que la comunidad pasa la cuenta: **filtraciones, ascensores fallando, cámaras malas, espacios comunes desgastados, reparaciones de emergencia, incluso demandas.**',
      'La mayoría de las administraciones ni siquiera recorta: simplemente reacciona. Apagan incendios a medida que aparecen — y las cuotas extraordinarias son la prueba.'
    ],
    band: ['Prevenir', 'Provisionar', 'Anticipar', 'Tranquilidad'],
    compare: {
      bad: {
        title: 'Recortar o reaccionar',
        items: [
          'Filtraciones',
          'Ascensores fallando',
          'Cámaras malas',
          'Espacios comunes desgastados',
          'Reparaciones de emergencia',
          'Cuotas extraordinarias'
        ]
      },
      good: {
        title: 'Provisionar y anticiparse',
        items: [
          'Mantenciones preventivas calendarizadas',
          'Fondo de reserva para absorber emergencias',
          'Gasto común estable y predecible',
          'Cada variación explicada, sin que la pidas'
        ]
      }
    },
    sello:
      'Lo difícil es que el gasto común **provisione, se anticipe y te entregue tranquilidad**. Ese es nuestro sello.'
  },

  testimonios: {
    tag: 'Experiencias reales',
    title: 'Lo que dicen nuestros edificios',
    text: 'Les preguntamos directamente a nuestros clientes qué es lo que más valoran.',
    // Testimonios de clientes de ADMINOR. Vacío = no se muestra la sección
    items: [] as { name: string; meta: string; quote: string; featured?: boolean }[]
  },

  test: {
    id: 'test',
    tag: 'Autoevaluación',
    title: '¿Cómo está tu comunidad realmente?',
    text: 'Responde estas preguntas y descubre si tu administración está a la altura de lo que tu comunidad necesita.',
    meta: '7 preguntas · 2 minutos · resultado inmediato',
    // Cada opción vale su índice: 0 = bien, 2 = mal
    questions: [
      { q: '¿Recibes un desglose claro de los gastos comunes cada mes?', o: ['Sí, cada mes', 'A veces', 'Casi nunca'] },
      { q: '¿Las mantenciones y certificaciones críticas están al día?', o: ['Todas al día', 'Algunas atrasadas', 'No estoy seguro'] },
      { q: '¿Cuánto tarda tu administración en responder?', o: ['Menos de 24 hrs', 'Varios días', 'Casi no responden'] },
      { q: '¿La morosidad está controlada?', o: ['Sí', 'Es un problema', 'Sin plan claro'] },
      { q: '¿Revisan cobros de servicios y optimizan proveedores?', o: ['Sí, activamente', 'Solo si insistimos', 'No'] },
      { q: '¿Sabes si hay fondo de reserva y para qué se usa?', o: ['Sí', 'Creo que sí', 'No sé'] },
      { q: '¿El reglamento de copropiedad está actualizado?', o: ['Sí', 'No estoy seguro', 'No'] }
    ],
    // `below`: proporción de respuestas negativas (0 a 1) bajo la cual aplica el resultado
    results: [
      {
        below: 0.3,
        tone: 'good',
        title: 'Tu comunidad parece estar en buenas manos',
        text: 'Eso habla bien de tu comunidad y de quienes la administran. Mantener un edificio o condominio bien cuidado requiere constancia — asegúrate de que siga así. Si en algún momento sientes que algo cambia o necesitas una segunda mirada, estamos disponibles.'
      },
      {
        below: 0.6,
        tone: 'warn',
        title: 'Hay aspectos de tu comunidad que necesitan atención',
        text: 'Cuando estas señales aparecen, es porque algo no se está haciendo con la rigurosidad que tu comunidad merece. El bolsillo de cada residente y el estado del edificio dependen de que alguien se tome esto en serio. Si quieres asegurarte de que tu administración esté a la altura, escríbenos.'
      },
      {
        below: 1.01,
        tone: 'bad',
        title: 'Tu comunidad merece una administración más seria',
        text: 'Lo que describes no es normal y no debería serlo. Tu bolsillo, tu edificio y la tranquilidad de quienes viven ahí dependen de que alguien haga bien este trabajo. Nosotros nos dedicamos exactamente a resolver lo que estás viviendo. Escríbenos y conversemos.'
      }
    ] as { below: number; tone: 'good' | 'warn' | 'bad'; title: string; text: string }[],
    cta: 'Solicitar una evaluación'
  },

  cobertura: {
    title: 'Administramos exclusivamente comunidades en',
    text: 'Así garantizamos lo que prometemos: **presencia real en terreno**, **respuesta en menos de 24 horas** y un equipo que conoce cada comunidad.'
  },

  faq: {
    tag: 'Preguntas frecuentes',
    title: 'Lo que nos preguntan siempre',
    helpTitle: '¿No está tu pregunta?',
    helpText: 'Escríbenos y te respondemos en menos de 24 horas.',
    items: [
      {
        q: '¿Cómo es el proceso para cambiar de administración?',
        a: 'Está regulado por la Ley 21.442 y es más simple de lo que parece: el administrador se mantiene en su cargo solo mientras cuente con la confianza de la asamblea, y puede ser removido en cualquier momento por acuerdo de ella (art. 18). El proceso típico: 1) El comité de administración o copropietarios que representen al menos el 10% de los derechos del condominio solicitan tratar el tema (art. 14) — y desde la nueva ley la designación o remoción del administrador puede verse incluso en asamblea ordinaria, sin esperar una extraordinaria. 2) Se cita con entre 5 y 15 días de anticipación (art. 16), en sesión presencial, telemática o mixta. 3) La asamblea acuerda la remoción y designa al reemplazo con las mayorías que fija el cuadro del artículo 15. 4) La designación del nuevo administrador se reduce a escritura pública, y el saliente debe entregar la documentación completa junto a su rendición de cuentas final documentada (art. 21): libros de actas, contabilidad, contratos, planos y respaldos. Los errores más comunes: citaciones fuera de plazo, actas sin las formalidades y traspasos sin inventario de documentos. Nosotros acompañamos todo el proceso: convocatoria, acta, quórums, escritura y transición documental y financiera, para que la comunidad no quede ni un día a la deriva.'
      },
      {
        q: '¿Qué hace una empresa administradora de edificios y condominios?',
        a: 'La Ley 21.442 (art. 20) le encarga al administrador el cuidado de los bienes comunes y la gestión integral de la comunidad: cobrar y rendir los gastos comunes, mantener al día las mantenciones y certificaciones obligatorias (gas, ascensores), contratar y supervisar al personal, gestionar proveedores, contratar los seguros que exige la ley, ejecutar los acuerdos de la asamblea y del comité, y rendir cuentas documentadas — la ley exige rendición mensual al comité de administración (art. 21). Además debe contar con inscripción vigente en el Registro Nacional de Administradores (art. 19). Una buena administradora suma lo que la ley no exige pero la comunidad nota: visitas regulares a terreno con informes fotográficos, mantenciones preventivas calendarizadas en vez de reparaciones de emergencia, revisión de cada cobro de servicios, explicación clara de cada variación del gasto común y respuesta rápida a los residentes — nuestro estándar es responder toda solicitud en menos de 24 horas. Al evaluar una administradora pide tres cosas: cómo y con qué frecuencia rinde cuentas, cómo documenta sus visitas, y cuánto demora en responder. En esos tres detalles se nota la diferencia entre administrar y cuidar.'
      },
      {
        q: '¿Cuánto cobran?',
        a: 'Depende del tamaño de la comunidad y los servicios que necesite. Evaluamos tu caso y entregamos una propuesta clara. Sin costos ocultos ni compromisos de largo plazo: transparencia en costos desde la primera conversación.'
      },
      {
        q: '¿Administran condominios de casas?',
        a: 'Sí. Además de edificios, administramos condominios de casas con altos estándares de seguridad: guardias y control perimetral en convenio con empresas de seguridad especialistas, áreas verdes, portones y gastos comunes con la misma transparencia.'
      },
      {
        q: '¿Cómo sé en qué se gasta mi gasto común?',
        a: 'Trabajamos con la mejor plataforma de gastos comunes del mercado: cada residente puede ver en qué y cómo se usa su plata — ingresos, egresos, morosidad, fondo de reserva — cuando quiera, sin pedirlo.'
      },
      {
        q: '¿Qué diferencia hay entre mantención preventiva y reparación?',
        a: 'Reparar es arreglar algo que ya se rompió (caro, urgente, incómodo). Prevenir es hacer mantenciones calendarizadas para que no se rompa. Priorizamos lo segundo.'
      },
      {
        q: '¿Qué es el fondo de reserva y por qué importa?',
        a: 'La Ley 21.442 (art. 39) obliga a todo condominio a tener un fondo común de reserva, formado con un recargo no inferior al 5% del gasto común mensual, más las multas e intereses y los pagos por uso y goce exclusivo de bienes comunes. Debe mantenerse en una cuenta bancaria o en instrumentos financieros a nombre de la comunidad, y su uso lo autoriza el comité de administración. ¿Por qué importa? Porque es la diferencia entre una emergencia absorbida y una cuota extraordinaria: cuando el fondo existe y se gestiona bien, una reparación mayor no dispara el gasto común del mes. En nuestras comunidades el fondo se informa en cada rendición: cuánto hay, dónde está y en qué se usó.'
      },
      {
        q: '¿Qué pasa si no estamos conformes?',
        a: 'Pueden dar cese al servicio según lo que establece la ley. No amarramos a nadie con contratos eternos.'
      },
      {
        q: '¿Con qué frecuencia van a la comunidad?',
        a: 'Todas las semanas. Cada visita queda documentada con fotos, checklist e informe para el comité. Y entre visitas, supervisión remota en línea 24/7.'
      },
      {
        q: '¿Cómo manejan la morosidad?',
        a: 'Con protocolo, no con improvisación. La ley establece que los gastos comunes se pagan dentro de los 10 primeros días desde el aviso de cobro (art. 7, Ley 21.442). Nuestro protocolo: aviso temprano apenas se genera el atraso, gestión directa con el residente, convenios de pago cuando corresponde y, si es necesario, acciones de cobranza. La ley también permite, con acuerdo del comité, suspender servicios como electricidad o calefacción a unidades con 3 o más cuotas impagas (art. 20 N°9) — herramienta que usamos solo como último recurso y siempre dentro del marco legal. Lo importante: la morosidad se informa al comité todos los meses, con montos y estado de gestión de cada caso. Una morosidad controlada evita que los que pagan terminen financiando a los que no.'
      },
      {
        q: 'Mi administrador no responde, ¿qué puedo hacer?',
        a: 'Es uno de los reclamos más comunes en las comunidades, y la ley te da herramientas concretas. Primero, deja el reclamo por escrito, con copia al comité de administración: el administrador tiene la obligación legal de rendir cuentas documentadas al comité todos los meses (art. 21, Ley 21.442), así que el silencio no es un estilo, es un incumplimiento. Segundo, si la desidia continúa, el comité o copropietarios que representen el 10% de los derechos pueden pedir que el tema se trate en asamblea (art. 14) — incluso en la ordinaria — porque el administrador es removible en cualquier momento si pierde la confianza de la asamblea (art. 18). Tercero, para los casos graves, el Juzgado de Policía Local puede exigirle judicialmente la rendición de cuentas y resolver los conflictos de copropiedad (art. 44). En paralelo, mira los síntomas de fondo: ¿hay informes de las visitas?, ¿las mantenciones y certificaciones están al día?, ¿el gasto común se explica o solo se cobra? Si la respuesta es no, el problema no es un mal mes: es el estándar del servicio. La autoevaluación gratuita de esta página te ayuda a dimensionarlo en 2 minutos.'
      },
      {
        q: '¿Qué los hace distintos?',
        a: 'Supervisión permanente — visitas semanales a terreno con informe fotográfico y en línea 24/7 —, respuesta a toda solicitud en menos de 24 horas y transparencia total en costos. Si algo está mal cobrado, lo reclamamos.'
      },
      {
        q: '¿Mi reglamento de copropiedad necesita estar actualizado?',
        a: 'Sí. La Ley 21.442 exige que los reglamentos de copropiedad se ajusten a sus normas, y muchos reglamentos antiguos — dictados bajo la ley anterior (19.537) — mantienen cláusulas que hoy no son válidas o dejan a la comunidad sin herramientas que la nueva ley sí entrega. Revisamos si el tuyo cumple, qué cláusulas quedaron obsoletas y acompañamos la actualización con las formalidades que exige la ley.'
      }
    ]
  },

  cta: {
    title: '¿Quieres saber cómo está tu comunidad realmente?',
    text: 'Tu comunidad, tu bolsillo y tu tranquilidad merecen una administración que esté a la altura. Si quieres asegurarte de que tu edificio o condominio está bien cuidado, hablemos.',
    primary: 'Solicitar una propuesta personalizada',
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

  seoBlock: {
    title: 'Administración de edificios y condominios',
    text: 'ADMINOR es una empresa especializada en la administración de edificios y condominios de casas. Trabajamos conforme a la Ley 21.442 de Copropiedad Inmobiliaria: gestión financiera y de gastos comunes con transparencia total, mantenciones preventivas calendarizadas, supervisión de personal, asesoría permanente al comité de administración y visitas semanales a terreno con informes fotográficos. Nuestro objetivo es que cada comunidad funcione con procesos claros, comunicación permanente con propietarios y residentes, y un gasto común estable que dé tranquilidad.'
  },

  footer: {
    cta: {
      title: '¿Tu comunidad merece una administración más seria?',
      text: 'Conversemos. Te respondemos en menos de 24 horas.'
    },
    description: 'Administración de edificios y condominios de casas, conforme a la Ley 21.442.',
    columns: [
      {
        title: 'Navegación',
        links: [
          { label: 'Cómo trabajamos', href: '#modelo' },
          { label: 'Gasto común', href: '#ggcc' },
          { label: 'Seguridad', href: '#seg' },
          { label: 'Autoevaluación', href: '#test' },
          { label: 'Preguntas', href: '#faq' }
        ]
      }
    ],
    // Enlaces legales (política de privacidad, términos). Vacío = no se muestran
    legal: [] as { label: string; href: string }[]
  }
};

export type Site = typeof site;

// '' si no hay número de WhatsApp configurado
export const whatsappUrl = (message = site.contact.whatsappMessage) =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}` : '';
