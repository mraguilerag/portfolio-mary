import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import { avatarWaypoints } from './avatarWaypoints'
import { blendTransform } from './blendTransform'
import { debugState } from './debugState'
import { experienceConfig } from './experienceConfig'
import AvatarModel from './models/AvatarModel'

interface AvatarRigProps {
  pointerRef: MutableRefObject<{ x: number; y: number }>
}

// Scene-owned transform. AvatarModel owns the replaceable visual/animation
// implementation, so swapping the placeholder never changes scroll waypoints.
export default function AvatarRig({ pointerRef }: AvatarRigProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    const t = blendTransform(avatarWaypoints)
    group.position.set(t.x, t.y, t.z)
    group.rotation.y = t.rotationY
    group.scale.setScalar(t.scale)

    debugState.avatarPosition.x = group.position.x
    debugState.avatarPosition.y = group.position.y
    debugState.avatarPosition.z = group.position.z
    debugState.avatarRotation.y = group.rotation.y
  })

  if (!experienceConfig.showAvatar) return null

  return (
    <group ref={groupRef} name="AvatarGroup">
      <AvatarModel pointerRef={pointerRef} />
    </group>
  )
}
