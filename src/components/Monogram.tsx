import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Firma visual original de María: "M/A" construido en SVG con dos capas de
 * color (lavanda y coral) ligeramente desfasadas sobre una capa base clara,
 * simulando un desplazamiento cromático. Reacciona al cursor con un parallax
 * muy sutil. Es un gesto gráfico, no un logo terminado ni un avatar 3D.
 */
export default function Monogram() {
  const rootRef = useRef<HTMLDivElement>(null)
  const coralRef = useRef<SVGGElement>(null)
  const lavenderRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const coral = coralRef.current
    const lavender = lavenderRef.current
    if (!root || !coral || !lavender) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const moveCoral = gsap.quickTo(coral, 'x', { duration: 0.6, ease: 'power3.out' })
    const moveCoralY = gsap.quickTo(coral, 'y', { duration: 0.6, ease: 'power3.out' })
    const moveLavender = gsap.quickTo(lavender, 'x', { duration: 0.8, ease: 'power3.out' })
    const moveLavenderY = gsap.quickTo(lavender, 'y', { duration: 0.8, ease: 'power3.out' })

    const handlePointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const py = ((e.clientY - rect.top) / rect.height) * 2 - 1
      moveCoral(px * 6)
      moveCoralY(py * 4)
      moveLavender(px * -8)
      moveLavenderY(py * -5)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div ref={rootRef} className="monogram" aria-hidden="true">
      <svg viewBox="0 0 200 140" className="monogram-svg">
        <g ref={coralRef} className="monogram-layer monogram-layer--coral">
          <text x="4" y="108">M/A</text>
        </g>
        <g ref={lavenderRef} className="monogram-layer monogram-layer--lavender">
          <text x="4" y="108">M/A</text>
        </g>
        <g className="monogram-layer monogram-layer--base">
          <text x="4" y="108">M/A</text>
        </g>
      </svg>
    </div>
  )
}
