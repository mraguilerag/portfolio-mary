export type AvatarMode = 'procedural' | 'gltf'

export interface AvatarConfig {
  mode: AvatarMode
  modelUrl: string
}

// Swap `mode` to 'gltf' once /public/models/maria-avatar.glb exists.
// Layout, camera, lights, interactions and fallbacks stay the same either way.
export const avatarConfig: AvatarConfig = {
  mode: 'procedural',
  modelUrl: '/models/maria-avatar.glb',
}
