import { projects } from '../data/profile'

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <p className="eyebrow reveal">Proyectos seleccionados</p>
      <h2 className="section-title reveal">Trabajo en curso y casos de estudio</h2>

      <div className="projects-list">
        {projects.map((project) => (
          <article key={project.id} className="project-block reveal">
            <div className="project-media" aria-hidden={project.image ? undefined : 'true'}>
              {project.image ? (
                <img src={project.image.src} alt={project.image.alt} loading="lazy" />
              ) : (
                <div className="project-media-placeholder">
                  <span>{project.number}</span>
                </div>
              )}
            </div>

            <div className="project-info">
              <div className="project-info-header">
                <span className="project-number">{project.number}</span>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-meta">
                    {project.year} · {project.status}
                  </p>
                </div>
              </div>

              <dl className="project-details">
                <div className="project-detail">
                  <dt>Rol</dt>
                  <dd>{project.role}</dd>
                </div>
                <div className="project-detail">
                  <dt>Propósito</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div className="project-detail">
                  <dt>Herramientas</dt>
                  <dd>
                    <ul className="project-tools">
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              {project.link ? (
                <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                  Ver proyecto <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="project-link project-link--pending">CASO DE ESTUDIO EN PREPARACIÓN</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
