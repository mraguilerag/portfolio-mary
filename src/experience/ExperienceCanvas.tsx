import { useMemo, useRef, useState, useEffect, type MutableRefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraRig from './CameraRig'
import AvatarRig from './AvatarRig'
import EnvironmentRig from './EnvironmentRig'
import { cameraWaypointsDesktop, cameraWaypointsMobile } from './cameraWaypoints'
import { debugState } from './debugState'

interface ExperienceCanvasProps {
  active: boolean
  isMobile: boolean
  reducedMotion: boolean
  onReady?: () => void
}

export default function ExperienceCanvas({ active, isMobile, reducedMotion, onReady }: ExperienceCanvasProps) {
  const pointerRef: MutableRefObject<{ x: number; y: number }> = useRef({ x: 0, y: 0 })
  const [isTabVisible, setIsTabVisible] = useState(() => !document.hidden)
  // ?debugExperience=1 keeps the frameloop alive even if the Page Visibility
  // API reports the tab as hidden (e.g. an automated/offscreen browser
  // context used for QA) — a developer actively inspecting the debug HUD
  // has implicitly opted out of the background-tab pause.
  const forceActive = useMemo(
    () => new URLSearchParams(window.location.search).get('debugExperience') === '1',
    [],
  )
  const waypoints = useMemo(
    () => (isMobile ? cameraWaypointsMobile : cameraWaypointsDesktop),
    [isMobile],
  )
  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1.25] : [1, 1.5]), [isMobile])

  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    if (isMobile || reducedMotion) return
    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: Math.min(1, Math.max(-1, (e.clientX / window.innerWidth) * 2 - 1)),
        y: Math.min(1, Math.max(-1, (e.clientY / window.innerHeight) * 2 - 1)),
      }
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [isMobile, reducedMotion])

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows={false}
      frameloop={(isTabVisible && active) || forceActive ? 'always' : 'never'}
      onCreated={({ gl, size }) => {
        // Transparent clear so the page's cursor-following ambient glow
        // (AmbientBackground, position:fixed behind everything) shows
        // through the scene instead of being hidden behind an opaque canvas
        // for the whole ~560vh height of the hero experience.
        gl.setClearColor('#0a0a0a', 0)
        debugState.fps = 0
        onReady?.()
        void size
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} color="#f4f1ec" />
      <pointLight position={[-2, 0.5, 2]} intensity={0.7} color="#b9a0ff" />
      <pointLight position={[2, -0.5, 1.5]} intensity={0.5} color="#ff4d5a" />

      <CameraRig waypoints={waypoints} />
      <AvatarRig pointerRef={pointerRef} />
      <EnvironmentRig />
    </Canvas>
  )
}
