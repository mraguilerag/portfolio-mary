// Plain mutable telemetry bag written by the R3F rigs every frame and read
// by DebugHud on a throttled interval (never via React state in the hot path).
export const debugState = {
  cameraPosition: { x: 0, y: 0, z: 0 },
  cameraTarget: { x: 0, y: 0, z: 0 },
  avatarPosition: { x: 0, y: 0, z: 0 },
  avatarRotation: { x: 0, y: 0, z: 0 },
  deskVisible: true,
  hologramProgress: 0,
  activeClip: 'procedural-idle',
  fps: 0,
}
