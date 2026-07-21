import { useEffect } from 'react'

// A single fixed layer, decorative only (aria-hidden), that nudges a soft
// radial glow toward the cursor. Disabled entirely on touch and
// reduced-motion by simply not attaching the listener.
export default function AmbientBackground() {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    let raf = 0
    let targetX = 50
    let targetY = 20
    let currentX = 50
    let currentY = 20

    const handlePointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100
      targetY = (e.clientY / window.innerHeight) * 100
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    const tick = () => {
      if (!document.hidden) {
        currentX += (targetX - currentX) * 0.04
        currentY += (targetY - currentY) * 0.04
        document.documentElement.style.setProperty('--cursor-x', `${currentX}%`)
        document.documentElement.style.setProperty('--cursor-y', `${currentY}%`)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="ambient-layer" aria-hidden="true" />
}
