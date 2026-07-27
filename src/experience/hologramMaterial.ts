import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

// Original shader for María Aguilera's portfolio — not adapted from any
// reference site. Fresnel rim + vertical scanlines + hashed noise, revealed
// bottom-to-top as uProgress rises, tinted across the lavender/coral pair.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vLocalY;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vLocalY = position.y;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uFresnelStrength;
  uniform float uScanlineDensity;
  uniform float uNoiseStrength;
  uniform float uHeightMin;
  uniform float uHeightMax;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vLocalY;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), viewDir), 0.0, 1.0), uFresnelStrength);

    float heightT = clamp((vLocalY - uHeightMin) / max(uHeightMax - uHeightMin, 0.0001), 0.0, 1.0);
    float revealEdge = uProgress * 1.15 - 0.05;
    float reveal = smoothstep(revealEdge - 0.08, revealEdge + 0.08, heightT);
    reveal = 1.0 - reveal;

    float scan = sin(vLocalY * uScanlineDensity - uTime * 2.2) * 0.5 + 0.5;
    float noise = (hash(vec2(vLocalY * 40.0, uTime * 6.0)) - 0.5) * uNoiseStrength;

    vec3 base = mix(uColorA, uColorB, fresnel);
    vec3 color = base + scan * 0.12 + noise;

    float alpha = uOpacity * reveal * (0.35 + fresnel * 0.65);
    alpha *= 0.75 + scan * 0.25;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`

const HologramMaterialImpl = shaderMaterial(
  {
    uProgress: 0,
    uTime: 0,
    uOpacity: 1,
    uFresnelStrength: 1.8,
    uScanlineDensity: 26,
    uNoiseStrength: 0.06,
    uHeightMin: -0.9,
    uHeightMax: 0.7,
    uColorA: new THREE.Color('#b9a0ff'),
    uColorB: new THREE.Color('#ff4d5a'),
  },
  vertexShader,
  fragmentShader,
)

extend({ HologramMaterial: HologramMaterialImpl })

declare module '@react-three/fiber' {
  interface ThreeElements {
    hologramMaterial: {
      ref?: React.Ref<InstanceType<typeof HologramMaterialImpl>>
      uProgress?: number
      uTime?: number
      uOpacity?: number
      uFresnelStrength?: number
      uScanlineDensity?: number
      uNoiseStrength?: number
      uHeightMin?: number
      uHeightMax?: number
      transparent?: boolean
      side?: THREE.Side
      depthWrite?: boolean
      key?: string
    }
  }
}

export type HologramMaterialInstance = THREE.ShaderMaterial & {
  uProgress: number
  uTime: number
  uOpacity: number
  uFresnelStrength: number
  uScanlineDensity: number
  uNoiseStrength: number
  uHeightMin: number
  uHeightMax: number
}

export { HologramMaterialImpl }
