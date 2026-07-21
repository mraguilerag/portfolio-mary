import { useEffect, useRef } from 'react'
import { profile } from '../data/profile'

export default function About() {
  const underlineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = underlineRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-drawing')
        requestAnimationFrame(() => {
          el.classList.remove('is-drawing')
          el.classList.add('is-drawn')
        })
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="profile" className="section about">
      <p className="eyebrow reveal">Perfil</p>

      <div className="about-grid">
        <h2 className="about-title reveal">
          {profile.aboutTitleLines.map((line, i) => (
            <span key={line} className="about-title-line">
              {line}
              {i === 0 && <span ref={underlineRef} className="about-title-underline" />}
            </span>
          ))}
        </h2>

        <div className="about-body reveal">
          {profile.aboutParagraphs.map((paragraph, i) => (
            <p key={i} className="about-paragraph">
              {paragraph}
            </p>
          ))}

          <div className="about-tools">
            <p className="about-tools-label">Herramientas y forma de trabajo</p>
            <ul className="about-tools-list">
              {profile.tools.map((tool) => (
                <li key={tool} tabIndex={0}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
