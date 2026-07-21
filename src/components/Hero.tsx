import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroAvatarStage from './HeroAvatarStage'
import { profile } from '../data/profile'

export default function Hero() {
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([])
  const entryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const nameLines = nameRefs.current.filter(Boolean)
    const entryTargets = entryRef.current
      ? entryRef.current.querySelectorAll('[data-hero-entry]')
      : []

    // One-shot mount entrance, intentionally left to run to completion:
    // killing/reverting on cleanup would fire immediately under React
    // StrictMode's dev-only double-invoke (before the delay elapses) and
    // leave the elements stuck in their "from" state.
    gsap.fromTo(
      nameLines,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 0.1 },
    )
    gsap.fromTo(
      entryTargets,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.5 },
    )
  }, [])

  return (
    <section id="top" className="hero">
      <div className="hero-grid" ref={entryRef}>
        <p className="hero-greeting" data-hero-entry>
          {profile.greeting}
        </p>

        <h1 className="hero-name" aria-label={`${profile.firstName} ${profile.lastName}`}>
          <span className="hero-name-mask">
            <span
              className="hero-name-line"
              ref={(el) => {
                nameRefs.current[0] = el
              }}
            >
              {profile.firstName}
            </span>
          </span>
          <span className="hero-name-mask">
            <span
              className="hero-name-line"
              ref={(el) => {
                nameRefs.current[1] = el
              }}
            >
              {profile.lastName}
            </span>
          </span>
        </h1>

        <div className="hero-avatar" data-hero-entry>
          <HeroAvatarStage />
        </div>

        <div className="hero-role" data-hero-entry>
          {profile.roleLines.map((line) => (
            <p key={line} className="hero-role-line">
              {line}
            </p>
          ))}
        </div>

        <p className="hero-support" data-hero-entry>
          {profile.heroSupport}
        </p>

        <a href="#projects" className="hero-link" data-hero-entry>
          Explorar proyectos <span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  )
}
