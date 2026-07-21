import { journey, profile } from '../data/profile'

export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <p className="eyebrow reveal">Trayectoria</p>
      <h2 className="section-title reveal">{profile.journeyTitle}</h2>
      <p className="journey-intro reveal">{profile.journeyIntro}</p>

      <ol className="journey-list reveal-group">
        {journey.map((item) => (
          <li key={item.id} className="journey-item">
            <span className="journey-period">{item.period}</span>
            <div className="journey-content">
              <h3 className="journey-item-title">
                {item.title}
                {item.ongoing && <span className="journey-ongoing-dot" aria-hidden="true" />}
              </h3>
              <span className="journey-org">{item.org}</span>
            </div>
          </li>
        ))}
        <li className="journey-item journey-item--continues" aria-hidden="true">
          <span className="journey-period">—</span>
          <div className="journey-content">
            <span className="journey-continues-label">Sigue en construcción</span>
          </div>
        </li>
      </ol>
    </section>
  )
}
