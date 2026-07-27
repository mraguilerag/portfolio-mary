# Asset licenses

Registro de recursos visuales y tipográficos utilizados por el portafolio. Las dependencias de código conservan las licencias declaradas en sus propios paquetes.

| Recurso | Autor o procedencia | URL de origen | Licencia | Modificaciones | Ubicación local |
| --- | --- | --- | --- | --- | --- |
| Avatar procedural y geometrías del estudio | Implementación original para el portafolio de María Aguilera | No aplica; creado como código Three.js dentro del proyecto | Recurso propio del proyecto | Geometrías, materiales y animación procedural optimizados para WebGL | `src/experience/models/AvatarModel.tsx`, `src/experience/EnvironmentRig.tsx` |
| Shader holográfico | Implementación original para el portafolio de María Aguilera | No aplica; GLSL creado dentro del proyecto | Recurso propio del proyecto | Fresnel, scanlines, ruido y máscara vertical originales | `src/experience/hologramMaterial.ts` |
| Portadas editoriales de proyectos | Implementación original del repositorio de María Aguilera | No aplica; SVG inline creado dentro del proyecto | Recurso propio del proyecto | Adaptadas a la paleta del portafolio | `src/components/ProjectCover.tsx` |
| Favicon M/A | Repositorio original de María Aguilera | No aplica | Uso propio del portafolio; no se concede una licencia de redistribución separada | SVG optimizado para 64×64 | `public/favicon.svg` |
| Instrument Sans | Instrument; diseño de Rodrigo Fuenzalida con dirección de Jordan Egstad | https://github.com/Instrument/instrument-sans | SIL Open Font License 1.1 | Sin modificaciones; servido mediante Google Fonts | Remoto, declarado en `index.html` |
| IBM Plex Mono | IBM | https://github.com/IBM/plex | SIL Open Font License 1.1 | Sin modificaciones; servido mediante Google Fonts | Remoto, declarado en `index.html` |

## Modelos pendientes

No se incluye actualmente ningún GLB, HDRI, textura descargada ni recurso procedente de `david-hckh.com`. El avatar definitivo deberá almacenarse en `public/models/maria-avatar.glb` y añadirse a este registro antes de activar `experienceConfig.avatar.mode = 'gltf'`.
