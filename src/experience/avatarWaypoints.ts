import type { SceneKey } from './scrollProgress'

export interface TransformWaypoint {
  position: { x: number; y: number; z: number }
  rotationY: number
  scale: number
}

export type TransformWaypoints = Record<SceneKey, TransformWaypoint>

// Avatar: faces the viewer in the hero, turns through the transition as the
// camera swings around it, settles into a 3/4 profile for the hologram
// reveal, then eases back toward center as the projects panel approaches.
export const avatarWaypoints: TransformWaypoints = {
  hero: { position: { x: 0, y: -0.4, z: 0 }, rotationY: 0, scale: 1 },
  transition: { position: { x: 0.3, y: -0.4, z: 0.15 }, rotationY: 0.62, scale: 1 },
  profile: { position: { x: -0.2, y: -0.38, z: 0 }, rotationY: -0.4, scale: 1.03 },
  projectsIntro: { position: { x: 0.18, y: -0.35, z: -0.25 }, rotationY: 0.18, scale: 1 },
  contact: { position: { x: 0, y: -0.4, z: 0 }, rotationY: 0, scale: 1 },
}

// Desk: sits under/behind the avatar in the hero, then breaks apart and
// falls away during the transition tramo so the avatar reads as standing
// free once the hologram/profile beat begins.
export const deskWaypoints: TransformWaypoints = {
  hero: { position: { x: 0, y: -0.95, z: 0.1 }, rotationY: 0, scale: 1 },
  transition: { position: { x: -0.6, y: -2.4, z: 0.9 }, rotationY: -0.5, scale: 0.94 },
  profile: { position: { x: -1.4, y: -4.2, z: 1.6 }, rotationY: -0.9, scale: 0.85 },
  projectsIntro: { position: { x: -2, y: -5.6, z: 2 }, rotationY: -1.1, scale: 0.8 },
  contact: { position: { x: -2, y: -5.6, z: 2 }, rotationY: -1.1, scale: 0.8 },
}

export const chairWaypoints: TransformWaypoints = {
  hero: { position: { x: -0.55, y: -0.85, z: -0.15 }, rotationY: 0.2, scale: 1 },
  transition: { position: { x: -1.1, y: -2.7, z: 0.4 }, rotationY: 0.9, scale: 0.9 },
  profile: { position: { x: -1.8, y: -4.4, z: 1 }, rotationY: 1.4, scale: 0.82 },
  projectsIntro: { position: { x: -2.4, y: -5.8, z: 1.3 }, rotationY: 1.6, scale: 0.78 },
  contact: { position: { x: -2.4, y: -5.8, z: 1.3 }, rotationY: 1.6, scale: 0.78 },
}

export const screenWaypoints: TransformWaypoints = {
  hero: { position: { x: 0.05, y: -0.55, z: -0.55 }, rotationY: -0.05, scale: 1 },
  transition: { position: { x: 0.9, y: -2.1, z: 0.2 }, rotationY: 0.4, scale: 0.9 },
  profile: { position: { x: 1.6, y: -3.8, z: 1 }, rotationY: 0.8, scale: 0.8 },
  projectsIntro: { position: { x: 2.2, y: -5.2, z: 1.4 }, rotationY: 1, scale: 0.76 },
  contact: { position: { x: 2.2, y: -5.2, z: 1.4 }, rotationY: 1, scale: 0.76 },
}

export const decorationsWaypoints: TransformWaypoints = {
  hero: { position: { x: 0.6, y: -0.85, z: -0.2 }, rotationY: 0, scale: 1 },
  transition: { position: { x: 1.4, y: -2.3, z: 0.6 }, rotationY: 1.2, scale: 0.85 },
  profile: { position: { x: 2.1, y: -4, z: 1.2 }, rotationY: 2, scale: 0.7 },
  projectsIntro: { position: { x: 2.6, y: -5.4, z: 1.6 }, rotationY: 2.6, scale: 0.6 },
  contact: { position: { x: 2.6, y: -5.4, z: 1.6 }, rotationY: 2.6, scale: 0.6 },
}

// Environment (platform/floor + backdrop group): scales and lowers slightly
// as the avatar becomes the sole anchor of the composition.
export const environmentWaypoints: TransformWaypoints = {
  hero: { position: { x: 0, y: -1.1, z: 0 }, rotationY: 0, scale: 1 },
  transition: { position: { x: 0, y: -1.25, z: 0 }, rotationY: 0.05, scale: 1.08 },
  profile: { position: { x: 0, y: -1.35, z: 0 }, rotationY: 0.1, scale: 1.15 },
  projectsIntro: { position: { x: 0, y: -1.45, z: 0 }, rotationY: 0.15, scale: 1.22 },
  contact: { position: { x: 0, y: -1.45, z: 0 }, rotationY: 0.15, scale: 1.22 },
}
