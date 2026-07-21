import { useRef } from 'react'
import { profile } from '../data/profile'

export default function Contact() {
  const emailRef = useRef<HTMLAnchorElement>(null)

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = emailRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16
    const y = (e.clientY - rect.top - rect.height / 2) * 0.24
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handlePointerLeave = () => {
    const el = emailRef.current
    if (el) el.style.transform = ''
  }

  return (
    <section id="contact" className="section contact">
      <p className="eyebrow reveal">Contacto</p>
      <h2 className="contact-title reveal-group">
        {profile.contactTitleLines.map((line) => (
          <span key={line} className="contact-title-line">
            {line}
          </span>
        ))}
      </h2>

      <p className="contact-text reveal">{profile.contactText}</p>

      <div className="contact-actions reveal">
        <a
          ref={emailRef}
          href={`mailto:${profile.email}`}
          className="contact-email"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {profile.email}
        </a>

        {profile.socials.length > 0 && (
          <ul className="contact-socials">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="footer">
        <p>{profile.footerText}</p>
      </footer>
    </section>
  )
}
