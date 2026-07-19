import { profile } from '../data/profile'

const links = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#top" className="navbar-logo">
        {profile.name.split(' ')[0]}<span className="gradient-text">.</span>
      </a>
      <nav className="navbar-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="btn btn-ghost navbar-cta">
        Hablemos
      </a>
    </header>
  )
}
