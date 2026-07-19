import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="about-grid">
        <div className="reveal">
          <p className="eyebrow">Sobre mí</p>
          <h2 className="section-title">
            De la investigación al <span className="gradient-text">pixel final</span>.
          </h2>
          {profile.aboutParagraphs.map((paragraph, i) => (
            <p key={i} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="glass about-tools reveal">
          <p className="eyebrow">Herramientas</p>
          <ul className="tools-list">
            {profile.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
