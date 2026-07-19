import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="glass contact-panel reveal">
        <p className="eyebrow">Contacto</p>
        <h2 className="section-title">
          Construyamos algo <span className="gradient-text">juntos</span>.
        </h2>
        <p className="contact-text">
          Estoy abierta a prácticas, proyectos freelance y colaboraciones. Escríbeme y te respondo pronto.
        </p>

        <div className="contact-actions">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            {profile.email}
          </a>
        </div>

        <ul className="contact-socials">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a href={social.url} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </footer>
    </section>
  )
}
