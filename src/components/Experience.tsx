import { experience } from '../data/profile'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <p className="eyebrow reveal">Experiencia</p>
      <h2 className="section-title reveal">Un recorrido corto, pero enfocado.</h2>

      <ol className="timeline reveal-group">
        {experience.map((item) => (
          <li key={item.id} className="timeline-item">
            <div className="timeline-marker" aria-hidden="true" />
            <div className="glass timeline-card">
              <span className="timeline-period">{item.period}</span>
              <h3 className="timeline-role">{item.role}</h3>
              <span className="timeline-org">{item.org}</span>
              <p className="timeline-description">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
