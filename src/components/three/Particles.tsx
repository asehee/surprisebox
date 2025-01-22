import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

export const createCodeParticle = (scene: THREE.Scene, position: THREE.Vector3) => {
  // 파티클 생성 로직...
}

// src/lib/three/constants.ts

export const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 0, 5)

export const BOX_COLORS = {
  main: 0xff4444,
  lid: 0xdd3333
}

export const CODE_SNIPPETS = [
  'const',
  'let',
  'function',
  'if',
  'for',
  'return',
  'class',
  'import',
  'export'
]
