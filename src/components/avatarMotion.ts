import { useRef, type MutableRefObject, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface PointerState {
  x: number
  y: number
}

interface UseAvatarMotionArgs {
  groupRef: RefObject<THREE.Group>
  headRef?: RefObject<THREE.Group>
  pointerRef: MutableRefObject<PointerState>
  reducedMotion: boolean
  clickSignalRef: MutableRefObject<number>
}

const ENTRANCE_DELAY = 0.35
const ENTRANCE_DURATION = 1.3

// Shared by ProceduralAvatar and GltfAvatar: mount entrance from the right,
// clamped cursor-follow on the head/body, idle bob, and a decaying click
// reaction burst layered on top of the look rotation.
export function useAvatarMotion({
  groupRef,
  headRef,
  pointerRef,
  reducedMotion,
  clickSignalRef,
}: UseAvatarMotionArgs) {
  const clockStart = useRef<number | null>(null)
  const lastClickSignal = useRef(0)
  const clickBurst = useRef(0)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    if (clockStart.current === null) clockStart.current = t

    if (reducedMotion) {
      group.position.set(0, 0, 0)
      group.scale.setScalar(1)
      group.rotation.set(0, 0, 0)
    } else {
      const elapsed = Math.max(t - clockStart.current - ENTRANCE_DELAY, 0)
      const progress = Math.min(elapsed / ENTRANCE_DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      group.position.x = THREE.MathUtils.lerp(1.4, 0, eased)
      group.position.y = THREE.MathUtils.lerp(-0.15, 0, eased) + Math.sin(t * 0.6) * 0.02
      group.scale.setScalar(THREE.MathUtils.lerp(0.82, 1, eased))
      group.rotation.y = THREE.MathUtils.lerp(0.45, 0, eased)
    }

    if (clickSignalRef.current !== lastClickSignal.current) {
      lastClickSignal.current = clickSignalRef.current
      clickBurst.current = 1
    }
    clickBurst.current = THREE.MathUtils.damp(clickBurst.current, 0, 4, delta)

    if (!reducedMotion) {
      const target = headRef?.current ?? group
      const targetY = THREE.MathUtils.clamp(pointerRef.current.x * 0.28, -0.28, 0.28)
      const targetX = THREE.MathUtils.clamp(-pointerRef.current.y * 0.16, -0.16, 0.16)
      const burstTilt = clickBurst.current * 0.22
      target.rotation.y = THREE.MathUtils.damp(target.rotation.y, targetY + burstTilt, 5, delta)
      target.rotation.x = THREE.MathUtils.damp(target.rotation.x, targetX, 5, delta)
      target.rotation.z = THREE.MathUtils.damp(target.rotation.z, clickBurst.current * 0.1, 5, delta)
    }
  })

  return { clickBurstRef: clickBurst }
}
