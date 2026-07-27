import { useEffect, useState } from 'react'
import { scrollProgress } from './scrollProgress'
import { debugState } from './debugState'

interface Snapshot {
  progress: number
  segment: string
  camPos: string
  camTarget: string
  avatarPos: string
  avatarRot: string
  desk: boolean
  hologram: number
  activeClip: string
  fps: number
  dpr: number
  viewport: string
}

function readSnapshot(fps: number): Snapshot {
  return {
    progress: scrollProgress.value,
    segment: scrollProgress.segment,
    camPos: `${debugState.cameraPosition.x.toFixed(2)}, ${debugState.cameraPosition.y.toFixed(2)}, ${debugState.cameraPosition.z.toFixed(2)}`,
    camTarget: `${debugState.cameraTarget.x.toFixed(2)}, ${debugState.cameraTarget.y.toFixed(2)}, ${debugState.cameraTarget.z.toFixed(2)}`,
    avatarPos: `${debugState.avatarPosition.x.toFixed(2)}, ${debugState.avatarPosition.y.toFixed(2)}, ${debugState.avatarPosition.z.toFixed(2)}`,
    avatarRot: debugState.avatarRotation.y.toFixed(2),
    desk: debugState.deskVisible,
    hologram: debugState.hologramProgress,
    activeClip: debugState.activeClip,
    fps,
    dpr: window.devicePixelRatio,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  }
}

export default function DebugHud() {
  const [snapshot, setSnapshot] = useState<Snapshot>(() => readSnapshot(0))

  useEffect(() => {
    let frameCount = 0
    let lastFpsSample = performance.now()
    let fps = 0
    let rafId = 0

    const rafTick = () => {
      frameCount += 1
      const now = performance.now()
      if (now - lastFpsSample >= 500) {
        fps = Math.round((frameCount * 1000) / (now - lastFpsSample))
        frameCount = 0
        lastFpsSample = now
      }
      rafId = requestAnimationFrame(rafTick)
    }
    rafId = requestAnimationFrame(rafTick)

    const interval = window.setInterval(() => {
      setSnapshot(readSnapshot(fps))
    }, 200)

    return () => {
      cancelAnimationFrame(rafId)
      window.clearInterval(interval)
    }
  }, [])

  return (
    <div className="xp-debug-hud">
      <div>progress: {(snapshot.progress * 100).toFixed(1)}%</div>
      <div>segment: {snapshot.segment}</div>
      <div>camera pos: [{snapshot.camPos}]</div>
      <div>camera target: [{snapshot.camTarget}]</div>
      <div>avatar pos: [{snapshot.avatarPos}]</div>
      <div>avatar rot.y: {snapshot.avatarRot}</div>
      <div>desk visible: {String(snapshot.desk)}</div>
      <div>hologram: {(snapshot.hologram * 100).toFixed(0)}%</div>
      <div>clip: {snapshot.activeClip}</div>
      <div>fps: {snapshot.fps}</div>
      <div>dpr: {snapshot.dpr}</div>
      <div>viewport: {snapshot.viewport}</div>
    </div>
  )
}
