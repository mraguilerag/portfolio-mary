import { projects } from '../data/profile'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="eyebrow reveal">Proyectos</p>
      <h2 className="section-title reveal">
        Trabajo seleccionado <span className="gradient-text">2024 — 2025</span>
      </h2>

      <div className="projects-grid reveal-group">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link ?? '#'}
            className="glass project-card"
          >
            <div className="project-card-top">
              <span className="project-year">{project.year}</span>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <ul className="project-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  )
}
