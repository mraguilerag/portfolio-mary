import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAvatarMotion, type PointerState } from './avatarMotion'

interface ProceduralAvatarProps {
  pointerRef: MutableRefObject<PointerState>
  clickSignalRef: MutableRefObject<number>
  reducedMotion: boolean
}

const SKIN = '#f2ddc4'
const HAIR = '#e3c17e'
const OUTFIT = '#141414'
const DRESS = '#f4f1ec'
const LAVENDER = '#b9a0ff'
const CORAL = '#ff4d5a'
const EYES = '#2b2620'

export default function ProceduralAvatar({ pointerRef, clickSignalRef, reducedMotion }: ProceduralAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const chestRef = useRef<THREE.Mesh>(null)
  const hairRef = useRef<THREE.Group>(null)
  const bowRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)

  useAvatarMotion({ groupRef, headRef, pointerRef, reducedMotion, clickSignalRef })

  const nextBlink = useRef(2 + Math.random() * 2)
  const blinkStart = useRef<number | null>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (chestRef.current) {
      const breathe = reducedMotion ? 0 : Math.sin(t * 0.9) * 0.014
      chestRef.current.scale.set(1 + breathe * 0.5, 1 + breathe, 1 + breathe * 0.5)
    }
    if (hairRef.current) {
      hairRef.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 1.1) * 0.035
    }
    if (bowRef.current) {
      bowRef.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 1.6 + 1) * 0.1
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      if (reducedMotion) {
        leftEyeRef.current.scale.y = 1
        rightEyeRef.current.scale.y = 1
      } else {
        if (blinkStart.current === null && t > nextBlink.current) blinkStart.current = t
        if (blinkStart.current !== null) {
          const progress = (t - blinkStart.current) / 0.14
          const closed = progress < 1 ? Math.sin(Math.min(progress, 1) * Math.PI) : 0
          const scaleY = 1 - closed * 0.9
          leftEyeRef.current.scale.y = scaleY
          rightEyeRef.current.scale.y = scaleY
          if (progress >= 1) {
            blinkStart.current = null
            nextBlink.current = t + 2.5 + Math.random() * 3
          }
        }
      }
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <mesh ref={chestRef} position={[0, -0.02, 0]}>
        <capsuleGeometry args={[0.24, 0.16, 6, 12]} />
        <meshStandardMaterial color={OUTFIT} roughness={0.6} />
      </mesh>

      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.24, 0.54, 0.72, 24, 1, true]} />
        <meshStandardMaterial color={DRESS} roughness={0.75} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-0.34, -0.14, 0]} rotation={[0, 0, 0.22]}>
        <capsuleGeometry args={[0.062, 0.3, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.85} />
      </mesh>
      <mesh position={[0.34, -0.14, 0]} rotation={[0, 0, -0.22]}>
        <capsuleGeometry args={[0.062, 0.3, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.85} />
      </mesh>

      <group ref={headRef} position={[0, 0.35, 0]}>
        <mesh>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color={SKIN} roughness={0.85} />
        </mesh>

        <mesh ref={leftEyeRef} position={[-0.12, 0.03, 0.29]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={EYES} roughness={0.4} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.12, 0.03, 0.29]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={EYES} roughness={0.4} />
        </mesh>

        <mesh position={[-0.2, -0.06, 0.24]}>
          <circleGeometry args={[0.045, 16]} />
          <meshStandardMaterial color={CORAL} transparent opacity={0.28} />
        </mesh>
        <mesh position={[0.2, -0.06, 0.24]}>
          <circleGeometry args={[0.045, 16]} />
          <meshStandardMaterial color={CORAL} transparent opacity={0.28} />
        </mesh>

        <group ref={hairRef}>
          <mesh position={[0, 0.05, -0.05]}>
            <sphereGeometry args={[0.37, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} />
          </mesh>

          <mesh position={[-0.28, -0.08, 0.1]} rotation={[0, 0, 0.32]}>
            <capsuleGeometry args={[0.028, 0.32, 4, 8]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} />
          </mesh>
          <mesh position={[0.28, -0.08, 0.1]} rotation={[0, 0, -0.32]}>
            <capsuleGeometry args={[0.028, 0.32, 4, 8]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} />
          </mesh>

          <mesh position={[0, 0.16, -0.33]} rotation={[0.55, 0, 0]}>
            <capsuleGeometry args={[0.075, 0.55, 6, 10]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} />
          </mesh>

          <group ref={bowRef} position={[0, 0.32, -0.16]}>
            <mesh position={[-0.045, 0, 0]} rotation={[0, 0, 0.5]}>
              <coneGeometry args={[0.045, 0.09, 8]} />
              <meshStandardMaterial color={LAVENDER} roughness={0.5} />
            </mesh>
            <mesh position={[0.045, 0, 0]} rotation={[0, 0, -0.5]}>
              <coneGeometry args={[0.045, 0.09, 8]} />
              <meshStandardMaterial color={LAVENDER} roughness={0.5} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color={CORAL} roughness={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
