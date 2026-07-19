# Portafolio — María Aguilera G.

Portafolio UX/UI & Frontend. React + TypeScript + Vite + Three.js + GSAP.

## Cómo correrlo (en VS Code / Claude Code)

```bash
npm install
npm run dev
```

Abre el link que muestre la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Dónde editar el contenido

Todo el texto, proyectos, formación y contacto está centralizado en:

```
src/data/profile.ts
```

No necesitas tocar los componentes para cambiar textos — edita ese archivo.

## Estructura

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx          → incluye el prisma 3D
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx    → timeline
│   ├── Contact.tsx
│   ├── PrismScene.tsx    → escena Three.js (shader de vidrio)
│   └── CursorGlow.tsx    → cursor personalizado
├── data/
│   └── profile.ts        → EDITA AQUÍ tu info
├── hooks/
│   └── useScrollReveal.ts → animaciones GSAP + ScrollTrigger
└── styles/
    └── index.css          → tokens de diseño (colores, tipografía)
```

## Deploy en Vercel

Vite se detecta automáticamente en Vercel, no necesitas configuración extra.

**Opción A — desde GitHub (recomendada):**
1. Sube esta carpeta a un repositorio de GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. Entra a [vercel.com](https://vercel.com) → "Add New Project" → importa el repo.
3. Vercel detecta "Vite" solo. Framework Preset: `Vite`, Build Command: `npm run build`, Output Directory: `dist`. Deploy.

**Opción B — desde la terminal:**
```bash
npm install -g vercel
vercel
```
Sigue las instrucciones (login, nombre del proyecto) y listo — te da una URL de producción.

Cada vez que hagas `git push` a la rama principal, Vercel vuelve a desplegar solo.

## Ideas para seguir personalizando

- **Avatar 3D real**: si consigues un modelo `.glb` (por ejemplo exportado
  desde [Ready Player Me](https://readyplayer.me)), puedes cargarlo con
  `GLTFLoader` de Three.js en `PrismScene.tsx` en vez del icosaedro actual.
- **Imágenes de proyectos**: agrega tus capturas en `public/` y referencia
  la ruta desde `src/data/profile.ts` (agrega un campo `image` a cada
  proyecto y muéstralo en `Projects.tsx`).
- **Componentes extra**: [reactbits.dev](https://reactbits.dev) tiene
  componentes animados gratuitos (MIT) que se copian y pegan directo si
  quieres sumar algún efecto adicional.
- **Deploy**: este proyecto está listo para Vercel o Netlify — solo
  conecta el repositorio de GitHub y usa el comando de build por defecto
  (`npm run build`, carpeta `dist`).
