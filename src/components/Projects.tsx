import { useEffect } from 'react'
import { projects } from '../data/profile'
import ProjectCover from './ProjectCover'

export default function Projects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const covers = document.querySelectorAll<HTMLElement>('.project-cover')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.clipPath = 'inset(0 0 100% 0)'
          requestAnimationFrame(() => {
            el.style.transition = 'clip-path 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
            el.style.clipPath = 'inset(0 0 0% 0)'
          })
          observer.unobserve(el)
        })
      },
      { threshold: 0.2 },
    )
    covers.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="section projects">
      <p className="eyebrow reveal">Proyectos seleccionados</p>
      <h2 className="section-title reveal">Trabajo en curso y casos de estudio</h2>

      <div className="projects-list">
        {projects.map((project) => {
          const cover = project.image ? (
            <img src={project.image.src} alt={project.image.alt} loading="lazy" />
          ) : (
            <ProjectCover id={project.id} title={project.title} />
          )

          return (
            <article key={project.id} className="project-block reveal">
              <div className="project-media">
                {project.link && !project.image ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-media-link"
                    aria-label={`Ver ${project.title} (se abre en una pestaña nueva)`}
                  >
                    {cover}
                  </a>
                ) : (
                  cover
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
          )
        })}
      </div>
    </section>
  )
}
