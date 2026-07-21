import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

const links = [
  { number: '01', label: 'PROYECTOS', href: '#projects' },
  { number: '02', label: 'PERFIL', href: '#profile' },
  { number: '03', label: 'TRAYECTORIA', href: '#journey' },
  { number: '04', label: 'CONTACTO', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="navbar">
      <a href="#top" className="navbar-mark">
        M/A
      </a>

      <p className="navbar-status">{profile.navAvailability}</p>

      <nav className="navbar-links" aria-label="Navegación principal">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="navbar-link">
            <span className="navbar-link-number">{link.number}</span>
            <span className="navbar-link-mask">
              <span className="navbar-link-label">{link.label}</span>
              <span className="navbar-link-label" aria-hidden="true">
                {link.label}
              </span>
            </span>
          </a>
        ))}
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        className="navbar-menu-button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(true)}
      >
        MENÚ
      </button>

      <div
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        hidden={!isOpen}
      >
        <div className="mobile-menu-header">
          <span className="navbar-mark">M/A</span>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-menu-close"
            onClick={() => setIsOpen(false)}
          >
            CERRAR
          </button>
        </div>

        <nav className="mobile-menu-links" aria-label="Navegación móvil">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              onClick={() => setIsOpen(false)}
            >
              <span className="navbar-link-number">{link.number}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="mobile-menu-status">{profile.navAvailability}</p>
      </div>
    </header>
  )
}
