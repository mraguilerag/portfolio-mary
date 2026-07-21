import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="profile" className="section about">
      <p className="eyebrow reveal">Perfil</p>

      <div className="about-grid">
        <h2 className="about-title reveal">
          {profile.aboutTitleLines.map((line) => (
            <span key={line} className="about-title-line">
              {line}
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
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
