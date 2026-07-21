import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import AvatarErrorBoundary from './AvatarErrorBoundary'
import AvatarSilhouette from './AvatarSilhouette'
import { isWebGLAvailable } from '../lib/webgl'

const AvatarCanvas = lazy(() => import('./AvatarCanvas'))

export default function HeroAvatarStage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const clickSignalRef = useRef(0)

  const [webglOk] = useState(() => isWebGLAvailable())
  const [isTabVisible, setIsTabVisible] = useState(() => !document.hidden)
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const isTouch = useMemo(() => window.matchMedia('(pointer: coarse)').matches, [])

  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container || isTouch || reducedMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointerRef.current = {
        x: clampUnit(((e.clientX - rect.left) / rect.width) * 2 - 1),
        y: clampUnit(((e.clientY - rect.top) / rect.height) * 2 - 1),
      }
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [isTouch, reducedMotion])

  const handleActivate = () => {
    clickSignalRef.current += 1
  }

  return (
    <div
      ref={containerRef}
      className="hero-avatar-stage"
      aria-hidden="true"
      onClick={handleActivate}
    >
      {webglOk ? (
        <AvatarErrorBoundary fallback={<AvatarSilhouette />}>
          <Suspense fallback={<AvatarSilhouette />}>
            <AvatarCanvas
              pointerRef={pointerRef}
              clickSignalRef={clickSignalRef}
              reducedMotion={reducedMotion}
              active={isTabVisible}
            />
          </Suspense>
        </AvatarErrorBoundary>
      ) : (
        <AvatarSilhouette />
      )}
    </div>
  )
}

function clampUnit(value: number) {
  return Math.min(1, Math.max(-1, value))
}
