import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveals `.reveal` elements (and staggered children of `.reveal-group`) as
 * they scroll into view. The hidden "from" state is only ever applied inside
 * each trigger's onEnter callback — never up front — so if a trigger's
 * position is ever miscalculated (e.g. because the lazily-loaded hero avatar
 * or web fonts shift layout after this effect runs), the element simply
 * stays at its normal, visible CSS state instead of getting stuck invisible.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const triggers: ScrollTrigger[] = []
    const tweens: gsap.core.Tween[] = []

    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            tweens.push(
              gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
            )
          },
        }),
      )
    })

    gsap.utils.toArray<HTMLElement>('.reveal-group').forEach((group) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: group,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            tweens.push(
              gsap.fromTo(
                group.children,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
              ),
            )
          },
        }),
      )
    })

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => {})
    window.addEventListener('load', refresh)

    const resizeObserver = new ResizeObserver(() => refresh())
    resizeObserver.observe(document.body)

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      tweens.forEach((tween) => tween.kill())
      window.removeEventListener('load', refresh)
      resizeObserver.disconnect()
    }
  }, [])
}
