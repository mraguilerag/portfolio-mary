import { useRef } from 'react'

interface ProjectCoverProps {
  id: string
  title: string
}

// Temporary editorial covers built with SVG/CSS while real project imagery
// isn't ready yet. Swap for `project.image` in profile.ts once it exists —
// see Projects.tsx.
export default function ProjectCover({ id, title }: ProjectCoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isCoarsePointer = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  ).current
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ).current

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoarsePointer || prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--tilt-x', `${(py - 0.5) * -6}deg`)
    el.style.setProperty('--tilt-y', `${(px - 0.5) * 6}deg`)
    el.style.setProperty('--spot-x', `${px * 100}%`)
    el.style.setProperty('--spot-y', `${py * 100}%`)
    el.style.setProperty('--beam-angle', `${(px - 0.5) * 50}deg`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
    el.style.setProperty('--spot-x', '50%')
    el.style.setProperty('--spot-y', '30%')
    el.style.setProperty('--beam-angle', '0deg')
  }

  return (
    <div
      ref={ref}
      className={`project-cover project-cover--${id}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {id === 'michi-gastos' && <MichiGastosArt />}
      {id === 'ledcam' && <LedcamArt />}
      {id === 'recetas' && <RecetasArt />}
      <span className="project-cover-label">{title}</span>
    </div>
  )
}

function MichiGastosArt() {
  return (
    <svg viewBox="0 0 320 240" className="project-cover-art" aria-hidden="true">
      <rect x="0" y="0" width="320" height="240" fill="#141414" />
      <g opacity="0.9">
        <rect x="48" y="140" width="26" height="60" rx="4" fill="#b9a0ff" />
        <rect x="88" y="108" width="26" height="92" rx="4" fill="#ff4d5a" />
        <rect x="128" y="128" width="26" height="72" rx="4" fill="#f4f1ec" />
        <rect x="168" y="90" width="26" height="110" rx="4" fill="#b9a0ff" />
      </g>
      <circle cx="252" cy="70" r="26" fill="none" stroke="#ff4d5a" strokeWidth="2" />
      <circle cx="252" cy="70" r="10" fill="#ff4d5a" opacity="0.6" />
      <path d="M232 46 L240 32 L246 44 Z" fill="#f4f1ec" />
      <path d="M272 46 L264 32 L258 44 Z" fill="#f4f1ec" />
    </svg>
  )
}

function LedcamArt() {
  return (
    <svg viewBox="0 0 320 240" className="project-cover-art" aria-hidden="true">
      <rect x="0" y="0" width="320" height="240" fill="#0b0b0c" />
      <g className="project-cover-beams">
        <line x1="160" y1="120" x2="20" y2="20" stroke="#ffd60a" strokeWidth="1.5" opacity="0.5" />
        <line x1="160" y1="120" x2="300" y2="24" stroke="#ffd60a" strokeWidth="1.5" opacity="0.5" />
        <line x1="160" y1="120" x2="14" y2="210" stroke="#ffd60a" strokeWidth="1.5" opacity="0.35" />
        <line x1="160" y1="120" x2="306" y2="216" stroke="#ffd60a" strokeWidth="1.5" opacity="0.35" />
      </g>
      <circle cx="160" cy="120" r="18" fill="#ffd60a" opacity="0.9" />
      <circle cx="160" cy="120" r="36" fill="none" stroke="#ffd60a" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

function RecetasArt() {
  return (
    <svg viewBox="0 0 320 240" className="project-cover-art" aria-hidden="true">
      <rect x="0" y="0" width="320" height="240" fill="#f4f1ec" />
      <path
        d="M30 190 Q120 130 160 170 Q210 220 290 150"
        fill="none"
        stroke="#ff4d5a"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="70" cy="70" r="28" fill="#141414" opacity="0.85" />
      <circle cx="140" cy="52" r="16" fill="#ff4d5a" opacity="0.8" />
      <circle cx="190" cy="90" r="20" fill="#b9a0ff" opacity="0.8" />
      <circle cx="250" cy="60" r="12" fill="#141414" opacity="0.7" />
    </svg>
  )
}
