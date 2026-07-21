import { useRef, type MutableRefObject } from 'react'
import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import { useAvatarMotion, type PointerState } from './avatarMotion'

interface GltfAvatarProps {
  url: string
  pointerRef: MutableRefObject<PointerState>
  clickSignalRef: MutableRefObject<number>
  reducedMotion: boolean
}

// Loads /public/models/maria-avatar.glb once avatarConfig.mode is 'gltf'.
// Reuses the same entrance/cursor-follow/click-reaction motion as
// ProceduralAvatar so swapping modes doesn't require touching the stage,
// camera, lights or fallbacks.
export default function GltfAvatar({ url, pointerRef, clickSignalRef, reducedMotion }: GltfAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(url)

  useAvatarMotion({ groupRef, pointerRef, reducedMotion, clickSignalRef })

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}
