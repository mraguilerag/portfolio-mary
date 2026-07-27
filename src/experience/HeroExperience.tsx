import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { isWebGLAvailable } from '../lib/webgl'
import { useScrollTimeline } from './useScrollTimeline'
import OverlayPanels from './OverlayPanels'
import ExperienceErrorBoundary from './ExperienceErrorBoundary'
import { profile } from '../data/profile'
import './experience.css'

const ExperienceCanvas = lazy(() => import('./ExperienceCanvas'))
const DebugHud = lazy(() => import('./DebugHud'))

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = () => setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

function StaticFallback() {
  return (
    <div className="xp-fallback">
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
      <p className="xp-panel-body" style={{ marginTop: '1.5rem' }}>
        {profile.heroSupport}
      </p>
    </div>
  )
}

function CanvasLoading({ failed = false }: { failed?: boolean }) {
  return (
    <div className="xp-canvas-loading" role="status" aria-live="polite">
      <span className="xp-canvas-loading-mark" aria-hidden="true" />
      <span>{failed ? 'La escena 3D no está disponible.' : 'Cargando experiencia 3D…'}</span>
    </div>
  )
}

export default function HeroExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [webglOk] = useState(() => isWebGLAvailable())
  const [isExperienceVisible, setIsExperienceVisible] = useState(true)
  const [debugEnabled] = useState(
    () => new URLSearchParams(window.location.search).get('debugExperience') === '1',
  )

  const useStaticFallback = !webglOk || reducedMotion
  useScrollTimeline(wrapperRef, !useStaticFallback)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || useStaticFallback) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsExperienceVisible(entry.isIntersecting),
      { rootMargin: '120px 0px' },
    )
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [useStaticFallback])

  const handleExperienceReady = () => {
    window.dispatchEvent(new Event('portfolio:experience-ready'))
  }

  return (
    <div className={`xp-root${useStaticFallback ? ' xp-root--static' : ''}`} id="top" ref={wrapperRef}>
      <div className="xp-scroll-space">
        <div className="xp-sticky">
          {useStaticFallback ? (
            <StaticFallback />
          ) : (
            <div
              className="xp-canvas-shell"
              data-active={isExperienceVisible}
              role="img"
              aria-label="Escena 3D de un estudio creativo con un avatar que acompaña el recorrido del portafolio."
            >
              <ExperienceErrorBoundary fallback={<CanvasLoading failed />}>
                <Suspense fallback={<CanvasLoading />}>
                  <ExperienceCanvas
                    active={isExperienceVisible}
                    isMobile={isMobile}
                    reducedMotion={reducedMotion}
                    onReady={handleExperienceReady}
                  />
                </Suspense>
              </ExperienceErrorBoundary>
            </div>
          )}
          {!useStaticFallback && <OverlayPanels active={isExperienceVisible} />}
          {!useStaticFallback && debugEnabled && (
            <Suspense fallback={null}>
              <DebugHud />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
