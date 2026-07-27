import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { scrollProgress, type SceneKey } from './scrollProgress'
import { SCENE_ORDER, type CameraWaypoints } from './cameraWaypoints'
import { debugState } from './debugState'

interface CameraRigProps {
  waypoints: CameraWaypoints
}

const tmpPosition = new THREE.Vector3()
const tmpTarget = new THREE.Vector3()

export default function CameraRig({ waypoints }: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const { size } = useThree()
  const currentTarget = useRef(new THREE.Vector3(0, 0.1, 0))

  useFrame((_, delta) => {
    const camera = cameraRef.current
    if (!camera) return

    tmpPosition.set(0, 0, 0)
    tmpTarget.set(0, 0, 0)
    let fov = 32
    let totalWeight = 0

    ;(SCENE_ORDER as SceneKey[]).forEach((key) => {
      const w = scrollProgress.weights[key]
      if (w <= 0) return
      const wp = waypoints[key]
      tmpPosition.x += wp.position.x * w
      tmpPosition.y += wp.position.y * w
      tmpPosition.z += wp.position.z * w
      tmpTarget.x += wp.target.x * w
      tmpTarget.y += wp.target.y * w
      tmpTarget.z += wp.target.z * w
      fov += ((wp.fov ?? 32) - 32) * w
      totalWeight += w
    })

    if (totalWeight > 0) {
      tmpPosition.divideScalar(totalWeight)
      tmpTarget.divideScalar(totalWeight)
      fov = 32 + (fov - 32) / totalWeight
    } else {
      const hero = waypoints.hero
      tmpPosition.set(hero.position.x, hero.position.y, hero.position.z)
      tmpTarget.set(hero.target.x, hero.target.y, hero.target.z)
      fov = hero.fov ?? 32
    }

    // Damp toward the progress-derived target rather than jumping — the
    // target itself is a pure function of scroll progress, so scrolling up
    // retraces the exact same curve; damping only smooths frame-to-frame motion.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tmpPosition.x, 6, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, tmpPosition.y, 6, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tmpPosition.z, 6, delta)

    currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, tmpTarget.x, 6, delta)
    currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, tmpTarget.y, 6, delta)
    currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, tmpTarget.z, 6, delta)
    camera.lookAt(currentTarget.current)

    const nextFov = THREE.MathUtils.damp(camera.fov, fov, 6, delta)
    if (Math.abs(nextFov - camera.fov) > 0.001) {
      camera.fov = nextFov
      camera.updateProjectionMatrix()
    }

    debugState.cameraPosition.x = camera.position.x
    debugState.cameraPosition.y = camera.position.y
    debugState.cameraPosition.z = camera.position.z
    debugState.cameraTarget.x = currentTarget.current.x
    debugState.cameraTarget.y = currentTarget.current.y
    debugState.cameraTarget.z = currentTarget.current.z
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[waypoints.hero.position.x, waypoints.hero.position.y, waypoints.hero.position.z]}
      fov={waypoints.hero.fov ?? 32}
      aspect={size.width / size.height}
      near={0.1}
      far={50}
    />
  )
}
