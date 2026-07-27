export type AvatarMode = 'procedural' | 'gltf'

export type AvatarClipName = 'idle' | 'working' | 'standing' | 'turn' | 'wave' | 'contactIdle'

export interface AvatarConfig {
  mode: AvatarMode
  modelUrl: string
  transform: {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: number
  }
  clips: Record<AvatarClipName, string>
}

export interface ExperienceConfig {
  showAvatar: boolean
  showDesk: boolean
  showEnvironment: boolean
  useHologramTransition: boolean
  enableCursorParallax: boolean
  enableAudio: boolean
  avatar: AvatarConfig
}

// Switching `avatar.mode` to `gltf` and changing `avatar.modelUrl` is enough to
// replace the procedural placeholder. Scene/scroll transforms stay on the
// outer AvatarRig, so they never depend on internal GLTF node names.
export const experienceConfig: ExperienceConfig = {
  showAvatar: true,
  showDesk: true,
  showEnvironment: true,
  useHologramTransition: true,
  enableCursorParallax: true,
  enableAudio: false,
  avatar: {
    mode: 'procedural',
    modelUrl: '/models/maria-avatar.glb',
    transform: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: 1,
    },
    clips: {
      idle: 'idle',
      working: 'working',
      standing: 'standing',
      turn: 'turn',
      wave: 'wave',
      contactIdle: 'contactIdle',
    },
  },
}
