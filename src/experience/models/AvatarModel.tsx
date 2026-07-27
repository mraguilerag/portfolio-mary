import { Suspense, lazy, useEffect, useRef, type MutableRefObject, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { debugState } from '../debugState'
import { experienceConfig } from '../experienceConfig'
import { scrollProgress } from '../scrollProgress'
import type { HologramMaterialInstance } from '../hologramMaterial'
import '../hologramMaterial'

const GltfAvatarModel = lazy(() => import('./GltfAvatarModel'))

const SKIN = '#f2ddc4'
const HAIR = '#e3c17e'
const OUTFIT = '#141414'
const DRESS = '#f4f1ec'
const LAVENDER = '#b9a0ff'

interface AvatarModelProps {
  pointerRef: MutableRefObject<{ x: number; y: number }>
}

interface ProceduralGeometryProps {
  headGroupRef: RefObject<THREE.Group>
  solidBodyRef: RefObject<THREE.MeshStandardMaterial>
  hologramBodyRef: RefObject<HologramMaterialInstance>
  solidDressRef: RefObject<THREE.MeshStandardMaterial>
  hologramDressRef: RefObject<HologramMaterialInstance>
}

function ProceduralAvatarGeometry({
  headGroupRef,
  solidBodyRef,
  hologramBodyRef,
  solidDressRef,
  hologramDressRef,
}: ProceduralGeometryProps) {
  return (
    <>
      <mesh position={[0, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.5, 6, 16]} />
        <meshStandardMaterial ref={solidBodyRef} color={OUTFIT} roughness={0.6} transparent />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.262, 0.5, 6, 16]} />
        <hologramMaterial ref={hologramBodyRef} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.26, 0.5, 0.62, 24, 1, true]} />
        <meshStandardMaterial ref={solidDressRef} color={DRESS} roughness={0.75} side={THREE.DoubleSide} transparent />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.262, 0.502, 0.622, 24, 1, true]} />
        <hologramMaterial ref={hologramDressRef} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <mesh position={[-0.12, -1.05, 0]}>
        <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
        <meshStandardMaterial color={OUTFIT} roughness={0.65} />
      </mesh>
      <mesh position={[0.12, -1.05, 0]}>
        <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
        <meshStandardMaterial color={OUTFIT} roughness={0.65} />
      </mesh>

      <mesh position={[-0.36, 0.05, 0]} rotation={[0, 0, 0.18]}>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.85} />
      </mesh>
      <mesh position={[0.36, 0.05, 0]} rotation={[0, 0, -0.18]}>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.85} />
      </mesh>

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
    </>
  )
}

export default function AvatarModel({ pointerRef }: AvatarModelProps) {
  const modelGroupRef = useRef<THREE.Group>(null)
  const headGroupRef = useRef<THREE.Group>(null)
  const solidBodyRef = useRef<THREE.MeshStandardMaterial>(null)
  const hologramBodyRef = useRef<HologramMaterialInstance>(null)
  const solidDressRef = useRef<THREE.MeshStandardMaterial>(null)
  const hologramDressRef = useRef<HologramMaterialInstance>(null)
  const { avatar } = experienceConfig

  useEffect(() => {
    if (avatar.mode === 'procedural') debugState.activeClip = 'procedural-idle'
  }, [avatar.mode])

  useFrame((state, delta) => {
    const modelGroup = modelGroupRef.current
    if (modelGroup) {
      const idle = Math.sin(state.clock.elapsedTime * 0.9) * 0.015
      modelGroup.position.set(
        avatar.transform.position[0],
        avatar.transform.position[1] + idle,
        avatar.transform.position[2],
      )
    }

    if (headGroupRef.current) {
      const parallax = experienceConfig.enableCursorParallax
      const targetY = parallax ? THREE.MathUtils.clamp(pointerRef.current.x * 0.18, -0.18, 0.18) : 0
      const targetX = parallax ? THREE.MathUtils.clamp(-pointerRef.current.y * 0.1, -0.1, 0.1) : 0
      headGroupRef.current.rotation.y = THREE.MathUtils.damp(headGroupRef.current.rotation.y, targetY, 5, delta)
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(headGroupRef.current.rotation.x, targetX, 5, delta)
    }

    const hologramWeight = experienceConfig.useHologramTransition ? scrollProgress.weights.profile : 0
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
    debugState.hologramProgress = hologramWeight
  })

  const proceduralFallback = (
    <ProceduralAvatarGeometry
      headGroupRef={headGroupRef}
      solidBodyRef={solidBodyRef}
      hologramBodyRef={hologramBodyRef}
      solidDressRef={solidDressRef}
      hologramDressRef={hologramDressRef}
    />
  )

  return (
    <group
      ref={modelGroupRef}
      name="AvatarModel"
      rotation={avatar.transform.rotation}
      scale={avatar.transform.scale}
    >
      {avatar.mode === 'gltf' ? (
        <Suspense fallback={proceduralFallback}>
          <GltfAvatarModel url={avatar.modelUrl} idleClip={avatar.clips.idle} />
        </Suspense>
      ) : (
        proceduralFallback
      )}
    </group>
  )
}
