import { profile } from '../data/profile'

export default function Process() {
  return (
    <section id="process" className="section process">
      <p className="eyebrow reveal">Proceso</p>
      <h2 className="section-title reveal">{profile.processTitle}</h2>

      <ol className="process-list reveal-group">
        {profile.process.map((phase) => (
          <li key={phase.number} className="process-item">
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
