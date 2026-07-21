/**
 * Edita este archivo para actualizar todo el contenido del portafolio.
 * No es necesario tocar los componentes para cambiar textos, proyectos o datos.
 */

export const profile = {
  name: 'María Aguilera',
  firstName: 'MARÍA',
  lastName: 'AGUILERA',
  greeting: "HELLO, I'M",
  roleLines: ['UX/UI DESIGNER', 'FRONT-END STUDENT'],
  role: 'Diseñadora UX/UI · Front-End en formación',
  location: 'Chile',
  email: 'mraguilerag@gmail.com',
  siteUrl: 'https://maryui.vercel.app/',

  heroSupport:
    'Me obsesiona entender por qué una experiencia funciona —y cómo hacerla más clara, útil y visualmente memorable. Diseño desde la investigación y sigo aprendiendo a llevar cada decisión hasta el código.',

  navAvailability: 'DISPONIBLE PARA OPORTUNIDADES UX/UI · CHILE / REMOTO',

  aboutTitleLines: ['Curiosidad como método.', 'Estética con propósito.'],
  aboutParagraphs: [
    'Soy diseñadora UX/UI certificada y estudiante de Front-End. Llegué al diseño movida por una curiosidad constante: entender cómo piensan las personas, por qué ciertas experiencias se sienten naturales y qué decisiones convierten una interfaz en algo realmente útil.',
    'Mi proceso no termina en una pantalla bonita. Investigo, organizo información, construyo flujos, prototipo, pruebo y ajusto. Hoy complemento ese recorrido con código para comprender mejor la viabilidad de lo que diseño y colaborar de forma más cercana con desarrollo.',
    'Estoy construyendo una carrera que sigue en movimiento: aprendo, cuestiono y busco desafíos que me obliguen a mirar los problemas desde nuevas perspectivas.',
  ],

  tools: [
    'UX Research',
    'Interaction Design',
    'UI Design',
    'Information Architecture',
    'Prototyping',
    'Usability Testing',
    'Figma',
    'HTML / CSS',
  ],

  processTitle: 'Cómo doy forma a una idea',
  process: [
    {
      number: '01',
      title: 'ENTENDER',
      text: 'Investigar a las personas, sus necesidades y el contexto del problema.',
    },
    {
      number: '02',
      title: 'ORDENAR',
      text: 'Transformar hallazgos en arquitectura de información, flujos y wireframes.',
    },
    {
      number: '03',
      title: 'DISEÑAR',
      text: 'Construir interfaces, sistemas visuales y prototipos con intención.',
    },
    {
      number: '04',
      title: 'VALIDAR Y ACERCAR AL CÓDIGO',
      text: 'Probar, ajustar y comprender cómo cada decisión puede convertirse en una experiencia funcional.',
    },
  ],

  journeyTitle: 'Una trayectoria que sigue creciendo.',
  journeyIntro:
    'Mi recorrido se construye en movimiento: cada proyecto suma nuevas preguntas, herramientas y una forma más consciente de diseñar.',

  contactTitleLines: ['¿Diseñamos una experiencia', 'que valga la pena recordar?'],
  contactText:
    'Estoy buscando mi próxima oportunidad como diseñadora UX/UI junior y abierta a colaborar con equipos que valoren la investigación, el criterio visual y el aprendizaje continuo.',

  footerText: 'Diseñado y desarrollado por María Aguilera · Chile · 2026',

  socials: [
    { label: 'GitHub', url: 'https://github.com/mraguilerag' },
  ],
}

export type Project = {
  id: string
  number: string
  title: string
  year: string
  status: string
  role: string
  problem: string
  tools: string[]
  link?: string
  image?: { src: string; alt: string }
}

export const projects: Project[] = [
  {
    id: 'michi-gastos',
    number: '01',
    title: 'Michi Gastos',
    year: '2026',
    status: 'EN LÍNEA',
    role: 'Diseño de interfaz y construcción Front-End de una herramienta personal para organizar y visualizar gastos.',
    problem:
      'Aplicación web personal para calcular y visualizar gastos diarios, semanales y mensuales de forma simple y visual.',
    tools: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Three Fiber'],
    link: 'https://cutecalculo.vercel.app/',
  },
  {
    id: 'ledcam',
    number: '02',
    title: 'LEDCAM',
    year: '2026—ACTUALIDAD',
    status: 'PROYECTO EN CURSO',
    role: 'Investigación, arquitectura de información, user flows, wireframes, prototipado y diseño de interfaces para una plataforma de iluminación y energía solar.',
    problem:
      'Plataforma web para una empresa de iluminación y paneles solares. El objetivo es dar forma a un producto digital claro para presentar y gestionar su oferta.',
    tools: ['UX Research', 'Information Architecture', 'User Flows', 'Wireframing', 'Prototyping', 'UI Design'],
  },
  {
    id: 'recetas',
    number: '03',
    title: 'App de recetas',
    year: '2024–2025',
    status: 'CASO DE ESTUDIO',
    role: 'Diseño UX/UI de extremo a extremo: investigación, arquitectura de información y prototipado.',
    problem:
      'Aplicación móvil diseñada mediante un proceso centrado en el usuario, desde la investigación hasta la validación con pruebas de usabilidad.',
    tools: ['UX Research', 'Information Architecture', 'Prototyping', 'Usability Testing'],
  },
]

export type JourneyItem = {
  id: string
  period: string
  title: string
  org: string
  ongoing?: boolean
}

export const journey: JourneyItem[] = [
  {
    id: 'journey-01',
    period: '2026—ACTUALIDAD',
    title: 'Formación en Desarrollo Front-End',
    org: 'Desafío Latam',
    ongoing: true,
  },
  {
    id: 'journey-02',
    period: '2026',
    title: 'Michi Gastos',
    org: 'Proyecto personal',
  },
  {
    id: 'journey-03',
    period: '2026—ACTUALIDAD',
    title: 'LEDCAM',
    org: 'Proyecto independiente',
    ongoing: true,
  },
  {
    id: 'journey-04',
    period: '2024—2026',
    title: 'Certificación en Diseño UX/UI',
    org: 'Desafío Latam',
  },
  {
    id: 'journey-05',
    period: '2024—2025',
    title: 'Caso de estudio: plataforma de recetas',
    org: 'Desafío Latam',
  },
]
