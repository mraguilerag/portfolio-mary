import { useEffect, useMemo, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { debugState } from '../debugState'

interface GltfAvatarModelProps {
  url: string
  idleClip: string
}

export default function GltfAvatarModel({ url, idleClip }: GltfAvatarModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(url)
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene)
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      object.geometry = object.geometry.clone()
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => material.clone())
        : object.material.clone()
    })
    return clone
  }, [scene])
  const { actions, names } = useAnimations(animations, groupRef)

  useEffect(() => {
    const action = actions[idleClip] ?? actions[names[0]]
    if (!action) {
      debugState.activeClip = 'none'
      return
    }
    debugState.activeClip = action.getClip().name
    action.reset().fadeIn(0.35).play()
    return () => {
      action.fadeOut(0.25)
    }
  }, [actions, idleClip, names])

  useEffect(() => {
    return () => {
      clonedScene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material.dispose())
      })
    }
  }, [clonedScene])

  return (
    <group ref={groupRef} name="GltfAvatarModel">
      <primitive object={clonedScene} />
    </group>
  )
}
