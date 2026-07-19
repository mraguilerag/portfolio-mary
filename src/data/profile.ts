/**
 * ==========================================================================
 * EDITA ESTE ARCHIVO para personalizar todo el contenido del portafolio.
 * No necesitas tocar los componentes para cambiar textos, proyectos, etc.
 * ==========================================================================
 */

export const profile = {
  name: 'María Aguilera G.',
  role: 'Diseñadora UX/UI · Front-End en formación',
  location: 'Chile',
  email: 'mraguilerag@gmail.com',
  website: 'https://www.maririagui.com',
  heroTitle: 'Diseño interfaces que la gente entiende sin pensar.',
  heroSubtitle:
    'Diseñadora UX/UI certificada y en formación Front-End. Motivada por resolver problemas mediante soluciones digitales con impacto real — curiosa, creativa y en constante aprendizaje.',
  aboutParagraphs: [
    'Soy diseñadora UX/UI certificada, actualmente en formación como desarrolladora Front-End. Me mueve resolver problemas reales a través de productos digitales bien pensados.',
    'Trabajo con procesos centrados en el usuario: investigación, arquitectura de información, prototipado y testing de usabilidad — y disfruto llevar esas decisiones hasta el código.',
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
  softSkills: [
    'Pensamiento analítico',
    'Trabajo en equipo',
    'Atención al detalle',
    'Aprendizaje continuo',
  ],
  languages: [
    { label: 'Español', level: 'Nativo' },
    { label: 'Inglés', level: 'Avanzado' },
  ],
  education: [
    {
      title: 'Certificación en Diseño UX/UI',
      org: 'Desafío Latam',
      period: '2024 — 2026',
    },
    {
      title: 'Desarrollo Front-End (en curso)',
      org: 'Desafío Latam',
      period: '2026 — Actualidad',
    },
  ],
  socials: [
    { label: 'Sitio web', url: 'https://www.maririagui.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/tuusuario' },
    { label: 'Behance', url: 'https://behance.net/tuusuario' },
  ],
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'proj-01',
    title: 'App de recetas — Caso de estudio UX/UI',
    description:
      'Aplicación móvil diseñada mediante un proceso centrado en el usuario: investigación, arquitectura de información, diseño de interfaces, prototipado y validación con pruebas de usabilidad.',
    tags: ['UX Research', 'Prototyping', 'Usability Testing'],
    year: '2024 — 2025',
    link: '#',
  },
  {
    id: 'proj-02',
    title: 'Plataforma web — Iluminación y paneles solares',
    description:
      'Producto digital para una empresa de iluminación y paneles solares, integrando diseño UX/UI y herramientas de IA en el flujo de trabajo.',
    tags: ['UI Design', 'IA', 'Producto digital'],
    year: '2026 — Actualidad',
    link: '#',
  },
]

export type ExperienceItem = {
  id: string
  role: string
  org: string
  period: string
  description: string
}

export const experience: ExperienceItem[] = [
  {
    id: 'exp-01',
    role: 'Desarrollo Front-End (en curso)',
    org: 'Desafío Latam',
    period: '2026 — Actualidad',
    description:
      'Formación en desarrollo Front-End, complementando el perfil de diseño UX/UI con la implementación real de interfaces.',
  },
  {
    id: 'exp-02',
    role: 'Producto digital — Iluminación y paneles solares',
    org: 'Proyecto independiente',
    period: '2026 — Actualidad',
    description:
      'Diseño de plataforma web para una empresa de iluminación y paneles solares, integrando UX/UI y herramientas de IA.',
  },
  {
    id: 'exp-03',
    role: 'Caso de estudio UX/UI — App de recetas',
    org: 'Desafío Latam',
    period: '2024 — 2025',
    description:
      'Investigación, arquitectura de información, prototipado y pruebas de usabilidad para una aplicación móvil de recetas.',
  },
  {
    id: 'exp-04',
    role: 'Certificación en Diseño UX/UI',
    org: 'Desafío Latam',
    period: '2024 — 2026',
    description:
      'Formación en UX Research, Interaction Design, UI Design, arquitectura de información y prototipado.',
  },
]
