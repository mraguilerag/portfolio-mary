import { lazy, Suspense, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ProceduralAvatar from './ProceduralAvatar'
import { avatarConfig } from './avatarConfig'
import type { PointerState } from './avatarMotion'

// Lazy so drei's GLTFLoader/useGLTF machinery only ships once mode is
// actually switched to 'gltf' — today's bundle stays procedural-only.
const GltfAvatar = lazy(() => import('./GltfAvatar'))

interface AvatarCanvasProps {
  pointerRef: MutableRefObject<PointerState>
  clickSignalRef: MutableRefObject<number>
  reducedMotion: boolean
  active: boolean
}

function ReactiveLights({ pointerRef }: { pointerRef: MutableRefObject<PointerState> }) {
  const lavenderRef = useRef<THREE.PointLight>(null)
  const coralRef = useRef<THREE.PointLight>(null)

  useFrame((_, delta) => {
    const proximity = 1 - Math.min(Math.hypot(pointerRef.current.x, pointerRef.current.y), 1)
    if (lavenderRef.current) {
      lavenderRef.current.intensity = THREE.MathUtils.damp(
        lavenderRef.current.intensity,
        0.9 + proximity * 0.5,
        4,
        delta,
      )
    }
    if (coralRef.current) {
      coralRef.current.intensity = THREE.MathUtils.damp(coralRef.current.intensity, 0.7 + proximity * 0.4, 4, delta)
    }
  })

  return (
    <>
      <pointLight ref={lavenderRef} position={[-1.5, 0.5, 1.5]} intensity={0.9} color="#b9a0ff" />
      <pointLight ref={coralRef} position={[1.5, -0.5, 1]} intensity={0.7} color="#ff4d5a" />
    </>
  )
}

export default function AvatarCanvas({ pointerRef, clickSignalRef, reducedMotion, active }: AvatarCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, -0.05, 2.9], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 3, 2]} intensity={0.6} color="#f4f1ec" />
      <ReactiveLights pointerRef={pointerRef} />

      {avatarConfig.mode === 'gltf' ? (
        <Suspense fallback={null}>
          <GltfAvatar
            url={avatarConfig.modelUrl}
            pointerRef={pointerRef}
            clickSignalRef={clickSignalRef}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      ) : (
        <ProceduralAvatar pointerRef={pointerRef} clickSignalRef={clickSignalRef} reducedMotion={reducedMotion} />
      )}
    </Canvas>
  )
}
