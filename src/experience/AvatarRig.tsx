import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollProgress } from './scrollProgress'
import { avatarWaypoints } from './avatarWaypoints'
import { blendTransform } from './blendTransform'
import { debugState } from './debugState'
import { experienceConfig } from './experienceConfig'
import type { HologramMaterialInstance } from './hologramMaterial'
import './hologramMaterial'

const SKIN = '#f2ddc4'
const HAIR = '#e3c17e'
const OUTFIT = '#141414'
const DRESS = '#f4f1ec'
const LAVENDER = '#b9a0ff'

interface AvatarRigProps {
  pointerRef: MutableRefObject<{ x: number; y: number }>
}

// Placeholder mannequin: no GLB rig exists yet (see experienceConfig.avatarModelUrl),
// so the figure is built from primitives. It is designed to be swapped for a
// GLTF later without the controller logic above it changing — the waypoint
// blend only ever touches this component's root group.
export default function AvatarRig({ pointerRef }: AvatarRigProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headGroupRef = useRef<THREE.Group>(null)
  const solidBodyRef = useRef<THREE.MeshStandardMaterial>(null)
  const hologramBodyRef = useRef<HologramMaterialInstance>(null)
  const solidDressRef = useRef<THREE.MeshStandardMaterial>(null)
  const hologramDressRef = useRef<HologramMaterialInstance>(null)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const t = blendTransform(avatarWaypoints)
    const idle = Math.sin(state.clock.elapsedTime * 0.9) * 0.015
    group.position.set(t.x, t.y + idle, t.z)
    group.rotation.y = t.rotationY
    group.scale.setScalar(t.scale)

    if (headGroupRef.current && experienceConfig.enableCursorParallax) {
      const targetY = THREE.MathUtils.clamp(pointerRef.current.x * 0.18, -0.18, 0.18)
      const targetX = THREE.MathUtils.clamp(-pointerRef.current.y * 0.1, -0.1, 0.1)
      headGroupRef.current.rotation.y = THREE.MathUtils.damp(headGroupRef.current.rotation.y, targetY, 5, delta)
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(headGroupRef.current.rotation.x, targetX, 5, delta)
    }

    // Hologram conversion is driven by the "profile" scene weight — pure
    // function of scroll, fades solid materials out as the shader fades in.
    const hologramWeight = experienceConfig.enableHologram ? scrollProgress.weights.profile : 0
    if (solidBodyRef.current) solidBodyRef.current.opacity = 1 - hologramWeight
    if (solidDressRef.current) solidDressRef.current.opacity = 1 - hologramWeight
    if (hologramBodyRef.current) {
      hologramBodyRef.current.uProgress = hologramWeight
      hologramBodyRef.current.uOpacity = hologramWeight
      hologramBodyRef.current.uTime = state.clock.elapsedTime
    }
    if (hologramDressRef.current) {
      hologramDressRef.current.uProgress = hologramWeight
      hologramDressRef.current.uOpacity = hologramWeight
      hologramDressRef.current.uTime = state.clock.elapsedTime
    }

    debugState.avatarPosition.x = group.position.x
    debugState.avatarPosition.y = group.position.y
    debugState.avatarPosition.z = group.position.z
    debugState.avatarRotation.y = group.rotation.y
    debugState.hologramProgress = hologramWeight
  })

  if (!experienceConfig.showAvatar) return null

  return (
    <group ref={groupRef} dispose={null}>
      {/* Torso */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.5, 6, 16]} />
        <meshStandardMaterial ref={solidBodyRef} color={OUTFIT} roughness={0.6} transparent />
      </mesh>
      {/* Hologram overlay — a separate mesh sharing the torso's geometry.
          A single mesh can only carry one material, so the solid→hologram
          cross-fade is done by stacking two meshes rather than two materials
          on one. */}
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.262, 0.5, 6, 16]} />
        <hologramMaterial ref={hologramBodyRef} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Skirt / lower silhouette */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.26, 0.5, 0.62, 24, 1, true]} />
        <meshStandardMaterial ref={solidDressRef} color={DRESS} roughness={0.75} side={THREE.DoubleSide} transparent />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.262, 0.502, 0.622, 24, 1, true]} />
        <hologramMaterial ref={hologramDressRef} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.12, -1.05, 0]}>
        <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
        <meshStandardMaterial color={OUTFIT} roughness={0.65} />
      </mesh>
      <mesh position={[0.12, -1.05, 0]}>
        <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
        <meshStandardMaterial color={OUTFIT} roughness={0.65} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.36, 0.05, 0]} rotation={[0, 0, 0.18]}>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.85} />
      </mesh>
      <mesh position={[0.36, 0.05, 0]} rotation={[0, 0, -0.18]}>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.85} />
      </mesh>

      {/* Head */}
      <group ref={headGroupRef} position={[0, 0.62, 0]}>
        <mesh>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshStandardMaterial color={SKIN} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.05, -0.03]}>
          <sphereGeometry args={[0.205, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.16, -0.16]} rotation={[0.5, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} />
        </mesh>
        <mesh position={[-0.06, 0.16, 0.1]}>
          <coneGeometry args={[0.025, 0.05, 8]} />
          <meshStandardMaterial color={LAVENDER} roughness={0.5} />
        </mesh>
        <mesh position={[0.06, 0.16, 0.1]}>
          <coneGeometry args={[0.025, 0.05, 8]} />
          <meshStandardMaterial color={LAVENDER} roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
