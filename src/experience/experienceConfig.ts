export interface ExperienceConfig {
  showAvatar: boolean
  showDesk: boolean
  showEnvironment: boolean
  enableHologram: boolean
  enableCursorParallax: boolean
  enableAudio: boolean
  avatarModelUrl: string
}

// Swap avatarModelUrl to '/models/maria-avatar.glb' once the definitive rig
// exists. AvatarRig falls back to a primitive mannequin until a GLTF is
// actually present — no lookup by internal model node names happens here.
export const experienceConfig: ExperienceConfig = {
  showAvatar: true,
  showDesk: true,
  showEnvironment: true,
  enableHologram: true,
  enableCursorParallax: true,
  enableAudio: false,
  avatarModelUrl: '/models/avatar-placeholder.glb',
}

export type AvatarClipName = 'idle' | 'standing' | 'turn' | 'walk' | 'wave' | 'contactIdle'

// Documents which clips the current placeholder mannequin can actually play.
// AvatarRig has no GLTF animation clips yet, so every name below resolves to
// a procedural (position/rotation driven) substitute instead of a real clip.
export const AVAILABLE_CLIPS: Record<AvatarClipName, boolean> = {
  idle: false,
  standing: false,
  turn: false,
  walk: false,
  wave: false,
  contactIdle: false,
}
