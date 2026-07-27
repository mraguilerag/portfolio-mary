import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { blendTransform } from './blendTransform'
import {
  chairWaypoints,
  decorationsWaypoints,
  deskWaypoints,
  environmentWaypoints,
  screenWaypoints,
} from './avatarWaypoints'
import { experienceConfig } from './experienceConfig'
import { debugState } from './debugState'

function useBlendedGroup(waypoints: Parameters<typeof blendTransform>[0]) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const group = ref.current
    if (!group) return
    const t = blendTransform(waypoints)
    group.position.set(t.x, t.y, t.z)
    group.rotation.y = t.rotationY
    group.scale.setScalar(t.scale)
  })
  return ref
}

function DeskGroup() {
  const ref = useBlendedGroup(deskWaypoints)
  return (
    <group ref={ref} name="DeskSurfaceGroup">
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1.1, 0.06, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[-0.48, -0.35, -0.24]}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      <mesh position={[0.48, -0.35, -0.24]}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      <mesh position={[-0.48, -0.35, 0.24]}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      <mesh position={[0.48, -0.35, 0.24]}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
    </group>
  )
}

function ChairGroup() {
  const ref = useBlendedGroup(chairWaypoints)
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 20]} />
        <meshStandardMaterial color="#f4f1ec" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.28, -0.2]}>
        <boxGeometry args={[0.4, 0.5, 0.06]} />
        <meshStandardMaterial color="#f4f1ec" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.55, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
    </group>
  )
}

function ScreenGroup() {
  const ref = useBlendedGroup(screenWaypoints)
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.55, 0.35, 0.03]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.017]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial color="#b9a0ff" emissive="#b9a0ff" emissiveIntensity={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.06, 0.14, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
    </group>
  )
}

function DecorationsGroup() {
  const ref = useBlendedGroup(decorationsWaypoints)
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.14, 16]} />
        <meshStandardMaterial color="#ff4d5a" roughness={0.6} />
      </mesh>
      <mesh position={[0.18, 0.02, 0.1]} rotation={[0.3, 0.4, 0]}>
        <boxGeometry args={[0.12, 0.16, 0.01]} />
        <meshStandardMaterial color="#f4f1ec" roughness={0.8} />
      </mesh>
    </group>
  )
}

function FloorAndBackdrop() {
  const ref = useBlendedGroup(environmentWaypoints)
  return (
    <group ref={ref} name="EnvironmentGroup">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, -3]}>
        <planeGeometry args={[9, 5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </group>
  )
}

export default function EnvironmentRig() {
  useFrame(() => {
    debugState.deskVisible = experienceConfig.showDesk
  })

  return (
    <>
      {experienceConfig.showEnvironment && <FloorAndBackdrop />}
      {experienceConfig.showDesk && (
        <group name="DeskGroup">
          <DeskGroup />
          <ChairGroup />
          <ScreenGroup />
          <DecorationsGroup />
        </group>
      )}
    </>
  )
}
