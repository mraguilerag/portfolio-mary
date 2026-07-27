// Single mutable source of truth for the experience timeline. Deliberately
// NOT React state: useFrame (R3F) and the overlay DOM mutations both read
// `scrollProgress.value` every tick without triggering React re-renders.
// Only the debug HUD samples it through polling, at a throttled interval.

export type SceneKey = 'hero' | 'transition' | 'profile' | 'projectsIntro' | 'contact'

export interface ScrollProgressState {
  value: number
  segment: SceneKey
  weights: Record<SceneKey, number>
}

export const scrollProgress: ScrollProgressState = {
  value: 0,
  segment: 'hero',
  weights: { hero: 1, transition: 0, profile: 0, projectsIntro: 0, contact: 0 },
}

// Scene ranges as [inStart, inEnd] fractions of total progress. Weight is a
// trapezoid: rises across the "in" edge, flat in the middle, falls across
// the "out" edge — enables smooth cross-fades between camera waypoints.
const SCENE_RANGES: Record<SceneKey, [number, number]> = {
  hero: [0, 0.16],
  transition: [0.14, 0.46],
  profile: [0.44, 0.72],
  projectsIntro: [0.7, 0.94],
  contact: [0.92, 1],
}

const EDGE = 0.06

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function weightFor(progress: number, [start, end]: [number, number]) {
  if (progress <= start - EDGE || progress >= end + EDGE) return 0
  const inEdge = clamp01((progress - (start - EDGE)) / EDGE)
  const outEdge = clamp01(((end + EDGE) - progress) / EDGE)
  return Math.min(inEdge, outEdge)
}

export function updateScrollProgress(progress: number) {
  scrollProgress.value = progress

  let topKey: SceneKey = 'hero'
  let topWeight = -1
  ;(Object.keys(SCENE_RANGES) as SceneKey[]).forEach((key) => {
    const w = weightFor(progress, SCENE_RANGES[key])
    scrollProgress.weights[key] = w
    if (w > topWeight) {
      topWeight = w
      topKey = key
    }
  })
  scrollProgress.segment = topKey
}

export function getSceneRange(key: SceneKey) {
  return SCENE_RANGES[key]
}
