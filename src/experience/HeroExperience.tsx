import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { isWebGLAvailable } from '../lib/webgl'
import { useScrollTimeline } from './useScrollTimeline'
import OverlayPanels from './OverlayPanels'
import { profile } from '../data/profile'
import './experience.css'

const ExperienceCanvas = lazy(() => import('./ExperienceCanvas'))
const DebugHud = lazy(() => import('./DebugHud'))

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const handler = () => setIsMobile(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isMobile
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

export default function HeroExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [webglOk] = useState(() => isWebGLAvailable())
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const [debugEnabled] = useState(
    () => new URLSearchParams(window.location.search).get('debugExperience') === '1',
  )

  useScrollTimeline(wrapperRef)

  const useStaticFallback = !webglOk || reducedMotion

  return (
    <div className="xp-root" id="top" ref={wrapperRef}>
      <div className="xp-scroll-space">
        <div className="xp-sticky">
          {useStaticFallback ? (
            <StaticFallback />
          ) : (
            <Suspense fallback={null}>
              <ExperienceCanvas isMobile={isMobile} reducedMotion={reducedMotion} />
            </Suspense>
          )}
          {!useStaticFallback && <OverlayPanels />}
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
