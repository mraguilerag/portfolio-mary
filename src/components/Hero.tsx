import PrismScene from './PrismScene'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{profile.role}</p>
        <h1 className="hero-title">
          {profile.heroTitle}
        </h1>
        <p className="hero-subtitle">{profile.heroSubtitle}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">Ver proyectos</a>
          <a href="#contact" className="btn btn-ghost">Contáctame</a>
        </div>
      </div>
      <div className="hero-visual">
        <PrismScene />
      </div>
    </section>
  )
}
