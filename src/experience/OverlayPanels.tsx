import { useEffect, useRef } from 'react'
import { scrollProgress } from './scrollProgress'
import { profile, projects } from '../data/profile'

function applyPanelStyle(el: HTMLElement | null, weight: number, offset = 24) {
  if (!el) return
  el.style.opacity = String(weight)
  el.style.transform = `translateY(${(1 - weight) * offset}px)`
  el.style.pointerEvents = weight > 0.4 ? 'auto' : 'none'
}

export default function OverlayPanels() {
  const heroRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const tick = () => {
      const w = scrollProgress.weights
      applyPanelStyle(heroRef.current, w.hero)
      applyPanelStyle(scrollHintRef.current, Math.max(0, w.hero - scrollProgress.value * 3))
      applyPanelStyle(profileRef.current, w.profile, 32)
      applyPanelStyle(projectsRef.current, w.projectsIntro, 32)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="xp-overlay">
      <div ref={heroRef} className="xp-panel xp-panel-hero">
        <p className="xp-eyebrow">{profile.greeting}</p>
        <h1 className="xp-name">
          {profile.firstName}
          <br />
          {profile.lastName}
        </h1>
        <div className="xp-role">
          {profile.roleLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div ref={scrollHintRef} className="xp-scroll-hint">
        <span>SCROLL</span>
        <span className="xp-scroll-hint-line" aria-hidden="true" />
      </div>

      <div ref={profileRef} className="xp-panel xp-panel-profile">
        <p className="xp-panel-kicker">{profile.aboutTitleLines[0]}</p>
        <p className="xp-panel-body">{profile.aboutParagraphs[0]}</p>
      </div>

      <div ref={projectsRef} className="xp-panel xp-panel-projects">
        <p className="xp-panel-kicker">{profile.processTitle}</p>
        <p className="xp-panel-body">
          {projects[0].title} · {projects[1].title} · {projects[2].title}
        </p>
      </div>
    </div>
  )
}
