import { useEffect, useRef } from 'react'

/**
 * CursorGlow — un halo de vidrio que sigue al cursor con un pequeño delay.
 * Detalle sutil que refuerza la identidad "UX/UI + vidrio + luz" sin
 * sobrecargar la interfaz. Se desactiva en touch y con reduced-motion.
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
    }
    window.addEventListener('pointermove', handleMove)

    let frameId: number
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      frameId = requestAnimationFrame(animateRing)
    }
    animateRing()

    return () => {
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
