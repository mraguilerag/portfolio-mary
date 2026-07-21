import { useEffect, useRef } from 'react'
import { profile } from '../data/profile'

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const list = listRef.current
    if (!list) return

    const items = Array.from(list.querySelectorAll<HTMLElement>('.process-item'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = items.indexOf(el)
          el.classList.add('is-drawing')
          window.setTimeout(() => {
            el.classList.remove('is-drawing')
            el.classList.add('is-drawn')
          }, index * 120)
          observer.unobserve(el)
        })
      },
      { threshold: 0.4 },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="section process">
      <p className="eyebrow reveal">Proceso</p>
      <h2 className="section-title reveal">{profile.processTitle}</h2>

      <ol className="process-list reveal-group" ref={listRef}>
        {profile.process.map((phase) => (
          <li key={phase.number} className="process-item" tabIndex={0}>
            <span className="process-number">{phase.number}</span>
            <div className="process-content">
              <h3 className="process-phase-title">{phase.title}</h3>
              <p className="process-phase-text">{phase.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
