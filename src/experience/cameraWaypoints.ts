import type { SceneKey } from './scrollProgress'

export interface CameraWaypoint {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  fov?: number
}

export type CameraWaypoints = Record<SceneKey, CameraWaypoint>

// Distances/targets are tuned so the ~2.4-unit-tall mannequin (feet ~y:-1.6,
// crown ~y:+0.8) stays fully framed with headroom at every waypoint — camera
// distance and fov were solved so visible vertical span comfortably covers
// that range instead of cropping the legs (see AvatarRig for the figure's
// local dimensions).

// Desktop: camera starts head-on and at a respectful distance, pulls back
// and orbits laterally through the transition, settles into a 3/4 profile
// view for the hologram reveal, then drifts wide to frame the incoming
// project panel.
export const cameraWaypointsDesktop: CameraWaypoints = {
  hero: {
    position: { x: 0, y: 0.2, z: 4.6 },
    target: { x: 0, y: -0.3, z: 0 },
    fov: 36,
  },
  transition: {
    position: { x: 2.1, y: 0.7, z: 5.8 },
    target: { x: 0.2, y: -0.35, z: 0 },
    fov: 38,
  },
  profile: {
    position: { x: -2.6, y: 0.4, z: 4.6 },
    target: { x: -0.3, y: -0.25, z: 0 },
    fov: 36,
  },
  projectsIntro: {
    position: { x: -1.4, y: 1, z: 6.8 },
    target: { x: 0.6, y: -0.4, z: -0.4 },
    fov: 42,
  },
  contact: {
    position: { x: 0, y: 0.5, z: 6 },
    target: { x: 0, y: -0.3, z: 0 },
    fov: 40,
  },
}

// Mobile: camera stays further back and more centered throughout — less
// lateral travel, smaller FOV swings, avatar stays framed in the safe area
// above the stacked HTML panels.
export const cameraWaypointsMobile: CameraWaypoints = {
  hero: {
    position: { x: 0, y: 0.25, z: 5.8 },
    target: { x: 0, y: -0.3, z: 0 },
    fov: 38,
  },
  transition: {
    position: { x: 0.8, y: 0.6, z: 6.8 },
    target: { x: 0.1, y: -0.35, z: 0 },
    fov: 39,
  },
  profile: {
    position: { x: -0.9, y: 0.45, z: 6, },
    target: { x: -0.15, y: -0.25, z: 0 },
    fov: 38,
  },
  projectsIntro: {
    position: { x: -0.4, y: 1, z: 7.6 },
    target: { x: 0.2, y: -0.35, z: -0.3 },
    fov: 42,
  },
  contact: {
    position: { x: 0, y: 0.6, z: 7 },
    target: { x: 0, y: -0.3, z: 0 },
    fov: 40,
  },
}

export const SCENE_ORDER: SceneKey[] = ['hero', 'transition', 'profile', 'projectsIntro', 'contact']
