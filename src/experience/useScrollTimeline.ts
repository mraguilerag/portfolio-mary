import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { updateScrollProgress } from './scrollProgress'

gsap.registerPlugin(ScrollTrigger)

// Drives the whole experience from ONE ScrollTrigger with scrub:true over a
// tall wrapper. Lenis only smooths the raw wheel/touch input; the actual
// timeline value always comes from ScrollTrigger's own progress, so reverse
// scroll is exact and nothing accumulates independently of scroll position.
export function useScrollTimeline(wrapperRef: React.RefObject<HTMLElement>) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis: Lenis | null = null
    let cleanupTicker: (() => void) | null = null
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        // `lerp` (per-frame catch-up rate), not `duration` (fixed-length
        // tween). `duration` restarts a full-length ease on every wheel
        // event, so continuous/rapid wheel input barely advances — it feels
        // stuck. `lerp` recomputes velocity from the live target every
        // frame, so it accumulates rapid ticks correctly and stays responsive.
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      })
      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)

      // gsap.ticker reports `time` in SECONDS since the ticker started;
      // Lenis.raf expects a millisecond timestamp (like performance.now()).
      // Passing seconds straight through made Lenis think ~0ms elapsed per
      // frame, so its lerp/duration smoothing crawled at ~1/1000th speed —
      // this was the actual cause of the scroll feeling "stuck".
      const raf = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      cleanupTicker = () => gsap.ticker.remove(raf)
    }

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        updateScrollProgress(self.progress)
      },
    })

    const handleVisibility = () => {
      if (document.hidden) {
        lenis?.stop()
      } else {
        lenis?.start()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      trigger.kill()
      cleanupTicker?.()
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [wrapperRef])
}
