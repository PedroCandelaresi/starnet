import { leadServiceLabels, type LeadService } from "@/lib/lead-form";

const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_WHATSAPP = "5492994668764";

export const siteConfig = {
  name: "STARNET",
  legalName: "STARNET",
  description:
    "Servicios tecnológicos y soluciones digitales en Neuquén Capital. Soporte técnico, mantenimiento, diseño web, menús QR y sistemas web a medida.",
  slogan: "Servicios tecnológicos y soluciones digitales",
  phoneDisplay: "+54 9 299 466-8764",
  phoneHref: "tel:+5492994668764",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP,
  location: "Neuquén Capital",
  province: "Neuquén",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
  contactEmail: process.env.CONTACT_EMAIL,
};

export const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export type ServiceIconKey = "support" | "optimization" | "web" | "qr" | "systems";

export type ServiceItem = {
  slug: string;
  service: LeadService;
  icon: ServiceIconKey;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  image?: string;
  bullets: string[];
  outcomes: string[];
  deliverables: string[];
  idealFor: string[];
  timeline: string;
};

export const services: ServiceItem[] = [
  {
    slug: "servicio-tecnico-pc",
    service: "TECH_SUPPORT",
    icon: "support",
    title: leadServiceLabels.TECH_SUPPORT,
    shortTitle: "Soporte técnico",
    summary:
      "Diagnóstico, reparación y puesta a punto de PCs y notebooks para uso personal, profesional o comercial.",
    description:
      "Detectamos fallas, resolvemos problemas de hardware o software y te entregamos un equipo estable, seguro y listo para trabajar.",
    image: "/brand/service-hardware.png",
    bullets: [
      "Diagnóstico claro y recomendaciones sin vueltas",
      "Reparación de fallas frecuentes de hardware y software",
      "Instalación de sistema, drivers y herramientas esenciales",
    ],
    outcomes: [
      "Equipos funcionando con más estabilidad y menos interrupciones",
      "Mejor rendimiento para estudio, trabajo o gestión del negocio",
      "Acompañamiento técnico si el problema reaparece",
    ],
    deliverables: [
      "Revisión técnica inicial",
      "Informe simple del problema detectado",
      "Configuración final y prueba de funcionamiento",
    ],
    idealFor: [
      "Usuarios particulares",
      "Profesionales que trabajan con su notebook todos los días",
      "Comercios que necesitan equipos confiables",
    ],
    timeline: "Respuesta inicial rápida y coordinación según urgencia.",
  },
  {
    slug: "mantenimiento-optimizacion",
    service: "MAINTENANCE",
    icon: "optimization",
    title: leadServiceLabels.MAINTENANCE,
    shortTitle: "Mantenimiento",
    summary:
      "Limpieza, optimización y mejoras para extender la vida útil de tus equipos y evitar problemas recurrentes.",
    description:
      "Aplicamos mantenimiento preventivo y ajustes de rendimiento para que tus equipos trabajen mejor, más frescos y con menos riesgo de fallas.",
    image: "/brand/service-hardware.png",
    bullets: [
      "Limpieza interna y control de temperatura",
      "Optimización de inicio, sistema y almacenamiento",
      "Recomendaciones de mejora según uso y presupuesto",
    ],
    outcomes: [
      "Equipos más ágiles para tareas diarias",
      "Menos cuelgues, ruido y temperatura excesiva",
      "Mayor continuidad operativa para estudio o trabajo",
    ],
    deliverables: [
      "Checklist técnico del estado del equipo",
      "Optimización de software y configuración",
      "Sugerencia de upgrade si aporta valor real",
    ],
    idealFor: [
      "Negocios con PCs de atención al público",
      "Usuarios que sienten su equipo lento",
      "Equipos que necesitan mantenimiento periódico",
    ],
    timeline: "Ideal para atención preventiva y mejoras planificadas.",
  },
  {
    slug: "diseno-web",
    service: "WEB_DESIGN",
    icon: "web",
    title: leadServiceLabels.WEB_DESIGN,
    shortTitle: "Diseño web",
    summary:
      "Sitios web modernos, rápidos y orientados a generar consultas, ventas o posicionamiento de marca.",
    description:
      "Creamos páginas web con enfoque comercial, buena experiencia de usuario y base técnica sólida para crecer a futuro.",
    image: "/brand/service-web.png",
    bullets: [
      "Diseño responsive pensado primero para mobile",
      "Copy comercial claro y enfocado en conversión",
      "SEO base, formularios y CTA integrados",
    ],
    outcomes: [
      "Mejor presencia digital y más confianza de marca",
      "Un canal propio para captar clientes y consultas",
      "Base lista para sumar portfolio, blog o nuevas secciones",
    ],
    deliverables: [
      "Diseño visual profesional alineado a tu marca",
      "Estructura de contenidos y CTA comerciales",
      "Publicación lista para producción",
    ],
    idealFor: [
      "Servicios profesionales",
      "Emprendimientos que necesitan presencia online seria",
      "Negocios que quieren escalar sus canales digitales",
    ],
    timeline: "Planificación clara, iteraciones cortas y entrega lista para publicar.",
  },
  {
    slug: "menu-qr",
    service: "QR_MENU",
    icon: "qr",
    title: leadServiceLabels.QR_MENU,
    shortTitle: "Menú QR",
    summary:
      "Menús digitales prácticos, fáciles de actualizar y pensados para mejorar la experiencia en bares, restaurantes y comercios.",
    description:
      "Desarrollamos menús QR visuales y simples de usar para que tus clientes accedan rápido desde el celular y tu negocio gane prolijidad operativa.",
    image: "/brand/service-qr.png",
    bullets: [
      "Visual limpio y ordenado por categorías",
      "Acceso rápido con QR listo para imprimir y usar",
      "Preparado para actualizaciones futuras",
    ],
    outcomes: [
      "Atención más ágil en el punto de venta",
      "Mejor presentación del menú y promociones",
      "Menos dependencia de impresiones frecuentes",
    ],
    deliverables: [
      "Menú digital responsive",
      "QR descargable para mostrador o mesas",
      "Estructura lista para sumar cambios posteriores",
    ],
    idealFor: [
      "Bares y cafeterías",
      "Restaurantes y locales gastronómicos",
      "Negocios que quieran simplificar catálogos impresos",
    ],
    timeline: "Implementación ágil y lista para empezar a usar rápido.",
  },
  {
    slug: "sistemas-a-medida",
    service: "CUSTOM_SYSTEMS",
    icon: "systems",
    title: leadServiceLabels.CUSTOM_SYSTEMS,
    shortTitle: "Sistemas a medida",
    summary:
      "Herramientas web personalizadas para ordenar procesos, automatizar tareas y adaptar la tecnología a tu operación real.",
    description:
      "Analizamos el flujo de trabajo de tu negocio y desarrollamos un sistema web simple, escalable y alineado a tus objetivos operativos.",
    image: "/brand/logo-primary.jpeg",
    bullets: [
      "Relevamiento del proceso actual y puntos de mejora",
      "Desarrollo modular para crecer sin rehacer todo",
      "Enfoque en claridad, velocidad y mantenibilidad",
    ],
    outcomes: [
      "Procesos más ordenados y trazables",
      "Menos tareas manuales repetitivas",
      "Una solución propia pensada para tu negocio",
    ],
    deliverables: [
      "Propuesta funcional según necesidad real",
      "Sistema web con acceso desde navegador",
      "Base lista para evolucionar con nuevos módulos",
    ],
    idealFor: [
      "Negocios con procesos manuales repetitivos",
      "Equipos que necesitan centralizar información",
      "Empresas que buscan digitalizar operaciones",
    ],
    timeline: "Trabajo por etapas, prioridades claras y evolución continua.",
  },
];

export const featuredStats = [
  { value: "Respuesta ágil", label: "Contacto directo por WhatsApp y seguimiento cercano." },
  { value: "Visión técnica + comercial", label: "Soluciones que resuelven hoy y sirven para crecer." },
  { value: "Neuquén Capital", label: "Presencia local con foco en clientes de la zona." },
] as const;

export const reasons = [
  {
    title: "Un solo aliado para soporte y producto digital",
    description:
      "Desde una notebook con fallas hasta una web orientada a captar clientes, resolvemos tecnología con criterio de negocio.",
  },
  {
    title: "Explicamos claro, sin tecnicismos innecesarios",
    description:
      "Priorizamos diagnósticos entendibles, tiempos realistas y decisiones con impacto concreto.",
  },
  {
    title: "Implementación enfocada en conversión",
    description:
      "Cada página, formulario y CTA se piensa para que sea más fácil que el cliente te contacte.",
  },
  {
    title: "Base escalable desde el día uno",
    description:
      "Los proyectos quedan listos para sumar blog, portfolio, integraciones o nuevas funcionalidades sin rehacer todo.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Relevamiento rápido",
    description:
      "Escuchamos el problema o la oportunidad, entendemos el contexto y definimos el objetivo comercial o técnico.",
  },
  {
    step: "02",
    title: "Diagnóstico y propuesta",
    description:
      "Traducimos la necesidad en un plan concreto: alcance, prioridad, tiempos y mejor alternativa.",
  },
  {
    step: "03",
    title: "Implementación prolija",
    description:
      "Ejecutamos con foco en calidad, velocidad y una experiencia clara para el usuario final.",
  },
  {
    step: "04",
    title: "Entrega y seguimiento",
    description:
      "Aseguramos que todo quede funcionando y dejamos el camino preparado para evolucionar.",
  },
] as const;

export const testimonials = [
  {
    name: "Mariana G.",
    role: "Comercio minorista",
    quote:
      "Necesitábamos resolver una notebook y de paso ordenar nuestra presencia online. STARNET respondió rápido y con una propuesta clara.",
  },
  {
    name: "Lucas R.",
    role: "Emprendimiento gastronómico",
    quote:
      "El menú QR quedó simple, prolijo y fácil de mostrar. Nuestros clientes lo usan sin explicaciones y eso nos agilizó la atención.",
  },
  {
    name: "Valentina P.",
    role: "Servicios profesionales",
    quote:
      "La web transmite más confianza y ahora las consultas llegan mucho mejor filtradas. Se nota el enfoque comercial en cada detalle.",
  },
] as const;

export const faqItems = [
  {
    question: "¿Trabajan solo en Neuquén Capital?",
    answer:
      "La referencia local visible es Neuquén Capital, pero varios servicios digitales pueden coordinarse también de forma remota.",
  },
  {
    question: "¿El formulario guarda las consultas?",
    answer:
      "Sí. El sitio queda preparado para registrar cada lead en PostgreSQL a través de Prisma, con validación cliente y servidor.",
  },
  {
    question: "¿Puedo contactarme directo por WhatsApp?",
    answer:
      "Sí. El sitio incorpora CTA visibles, botón flotante y un mensaje prearmado según el servicio de interés.",
  },
  {
    question: "¿Se puede ampliar con portfolio o blog más adelante?",
    answer:
      "Sí. La arquitectura queda lista para sumar nuevas rutas y módulos sin rehacer la base del proyecto.",
  },
] as const;

export const aboutValues = [
  {
    title: "Cercanía profesional",
    description:
      "STARNET combina trato directo con criterio técnico para resolver rápido y generar confianza desde el primer contacto.",
  },
  {
    title: "Orden y mantenibilidad",
    description:
      "Se privilegia una base clara, escalable y fácil de mantener, tanto en soporte como en desarrollo web.",
  },
  {
    title: "Orientación a resultados",
    description:
      "La tecnología se usa para vender mejor, trabajar más cómodo y sostener el crecimiento del negocio.",
  },
] as const;

export const serviceSlugMap = new Map(services.map((service) => [service.slug, service]));
