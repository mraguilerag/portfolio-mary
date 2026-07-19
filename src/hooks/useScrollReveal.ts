import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal
 * ---------------------------------------------------------------------------
 * Anima con GSAP + ScrollTrigger (plugin gratuito, sin GSAP Club) todos los
 * elementos con la clase `.reveal` a medida que entran en viewport, y hace
 * un stagger sobre los hijos directos de `.reveal-group`.
 * Se ejecuta una vez montado el árbol (por eso corre en App, después del
 * primer render de todas las secciones).
 */
export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.reveal-group').forEach((group) => {
        const children = group.children
        gsap.from(children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}
