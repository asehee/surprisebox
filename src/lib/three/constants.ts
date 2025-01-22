// src/lib/three/constants.ts
import * as THREE from 'three'

// 카메라 설정
export const CAMERA_CONFIG = {
  fov: 75,
  near: 0.1,
  far: 1000,
  position: new THREE.Vector3(0, 0, 5)
} as const

// 초기 카메라 위치
export const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 0, 5)

// 렌더러 설정
export const RENDERER_CONFIG = {
  antialias: true,
  alpha: true,
  pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
} as const

// 조명 설정
export const LIGHTS = {
  ambient: {
    color: 0xffffff,
    intensity: 0.5
  },
  directional: {
    color: 0xffffff,
    intensity: 1,
    position: new THREE.Vector3(2, 2, 2)
  }
} as const

// 상자 색상
export const BOX_COLORS = {
  main: 0xff4444,   // 상자 본체 색상 (빨간색)
  lid: 0xdd3333     // 상자 뚜껑 색상 (어두운 빨간색)
} as const

// 상자 재질 설정
export const BOX_MATERIAL_CONFIG = {
  metalness: 0.5,   // 금속성 (0-1)
  roughness: 0.1    // 거칠기 (0-1)
} as const

// 상자 크기 설정
export const BOX_DIMENSIONS = {
  body: {
    width: 1,
    height: 1,
    depth: 1
  },
  lid: {
    width: 1.1,     // 본체보다 약간 크게
    height: 0.1,    // 얇은 뚜껑
    depth: 1.1,     // 본체보다 약간 크게
    offsetY: 0.5    // 뚜껑의 Y축 오프셋
  }
} as const

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  rotationSpeed: 0.01,          // 기본 회전 속도
  lidOpenSpeed: 0.05,           // 뚜껑이 열리는 속도
  lidOpenAngle: Math.PI * -0.8, // 뒤로 열리는 각도 (약 144도)
  quaternionSlerpFactor: 0.1    // 회전 보간 계수
} as const

// 파티클 설정
export const PARTICLE_CONFIG = {
  maxParticles: 20,          // 최대 파티클 수
  spawnInterval: 100,        // 생성 간격 (밀리초)
  gravity: 0.005,           // 중력 효과
  initialVelocity: {
    x: 0.1,                 // 최대 X축 초기 속도
    y: 0.2,                 // 최대 Y축 초기 속도
    z: 0.1                  // 최대 Z축 초기 속도
  },
  rotation: {
    x: 0.02,               // X축 회전 속도
    y: 0.01                // Y축 회전 속도
  },
  size: {
    text: 0.2,             // 텍스트 크기
    height: 0.05           // 텍스트 두께
  },
  despawnY: -5             // 파티클이 사라지는 Y 좌표
} as const

// 코드 스니펫 목록
export const CODE_SNIPPETS = [
  // 기본 키워드
  'const',
  'let',
  'function',
  'class',
  'return',
  // 제어문
  'if',
  'for',
  'while',
  'switch',
  // 비동기 관련
  'async',
  'await',
  'Promise',
  // 오류 처리
  'try',
  'catch',
  'throw',
  // 화살표 함수
  '=>',
  // ES6+ 기능
  '...args',
  '?.', 
  '??',
  // 괄호류
  '{}',
  '[]',
  '<>',
  // 연산자
  '===',
  '!==',
  '&&',
  '||',
  // 주석
  '//',
  '/* */'
] as const

// 파티클 색상 팔레트
export const COLOR_PALETTE = [
  0x61dafb,  // React blue
  0x764abc,  // Redux purple
  0x2c8ebb,  // Typescript blue
  0xf1502f,  // Git red
  0x61dbfb,  // Next.js light blue
  0x41b883,  // Vue.js green
  0xe34c26,  // HTML orange
  0x563d7c,  // Bootstrap purple
  0xf7df1e,  // JavaScript yellow
  0x3178c6   // TypeScript blue
] as const

// 브라우저 환경 체크
export const isBrowser = typeof window !== 'undefined'