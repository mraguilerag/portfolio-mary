import { scrollProgress, type SceneKey } from './scrollProgress'
import { SCENE_ORDER } from './cameraWaypoints'
import type { TransformWaypoints } from './avatarWaypoints'

const result = { x: 0, y: 0, z: 0, rotationY: 0, scale: 1 }

// Weighted blend of a waypoint set using the current scene weights. Pure
// function of scrollProgress — called fresh every frame, nothing accumulates,
// so scrolling back up retraces the exact same values.
export function blendTransform(waypoints: TransformWaypoints) {
  let x = 0
  let y = 0
  let z = 0
  let rotationY = 0
  let scale = 0
  let total = 0

  ;(SCENE_ORDER as SceneKey[]).forEach((key) => {
    const w = scrollProgress.weights[key]
    if (w <= 0) return
    const wp = waypoints[key]
    x += wp.position.x * w
    y += wp.position.y * w
    z += wp.position.z * w
    rotationY += wp.rotationY * w
    scale += wp.scale * w
    total += w
  })

  if (total <= 0) {
    const hero = waypoints.hero
    result.x = hero.position.x
    result.y = hero.position.y
    result.z = hero.position.z
    result.rotationY = hero.rotationY
    result.scale = hero.scale
    return result
  }

  result.x = x / total
  result.y = y / total
  result.z = z / total
  result.rotationY = rotationY / total
  result.scale = scale / total
  return result
}
