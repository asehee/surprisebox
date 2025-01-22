// src/components/three/SurpriseBox.tsx
import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { BOX_COLORS, ANIMATION_CONFIG, PARTICLE_CONFIG, CODE_SNIPPETS } from '@/lib/three/constants'

interface Particle {
  mesh: THREE.Object3D
  velocity: THREE.Vector3
}

export class SurpriseBox {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private box: THREE.Object3D
  private particles: Particle[]
  private isAnimating: boolean
  private boxOpened: boolean
  private animationFrameId: number | null
  private container: HTMLElement

  constructor(container: HTMLElement) {
    this.container = container
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.particles = []
    this.isAnimating = false
    this.boxOpened = false
    this.animationFrameId = null

    const faces = [
      new THREE.PlaneGeometry(1, 1),
      new THREE.PlaneGeometry(1, 1),
      new THREE.PlaneGeometry(1, 1),
      new THREE.PlaneGeometry(1, 1),
      new THREE.PlaneGeometry(1, 1),
      new THREE.PlaneGeometry(1, 1)
    ]

    const material = new THREE.MeshStandardMaterial({
      color: BOX_COLORS.main,
      side: THREE.DoubleSide
    })

    const faceMeshes = faces.map((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, material)
      
      switch(index) {
        case 0: 
          mesh.position.z = 0.5
          break
        case 1: 
          mesh.position.z = -0.5
          mesh.rotation.y = Math.PI
          break
        case 2: 
          mesh.position.x = -0.5
          mesh.rotation.y = -Math.PI / 2
          break
        case 3: 
          mesh.position.x = 0.5
          mesh.rotation.y = Math.PI / 2
          break
        case 4: 
          mesh.position.y = 0.5
          mesh.rotation.x = -Math.PI / 2
          break
        case 5: 
          mesh.position.y = -0.5
          mesh.rotation.x = Math.PI / 2
          break
      }
      return mesh
    })

    this.box = new THREE.Group()
    faceMeshes.forEach(mesh => this.box.add(mesh))

    this.setupScene()
    this.createBox()
    this.addEventListeners()
    this.animate()
  }

  private setupScene(): void {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)

    this.camera.position.set(0, 0, 5)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(2, 2, 2)
    this.scene.add(directionalLight)
  }

  private createBox(): void {
    this.scene.add(this.box)
  }

  private handleClick = (): void => {
    if (!this.boxOpened) {
        this.openBox();
    }
}

  private openBox(): void {
    this.boxOpened = true;
    this.isAnimating = true;

    setTimeout(() => {
        let particleCount = 0;
        const spawnInterval = setInterval(() => {
            if (particleCount >= 20) {
                clearInterval(spawnInterval);
                return;
            }
            this.createCodeParticle();
            particleCount++;
        }, 100);
    }, 300);
}

  private createCodeParticle(): void {
    const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
    
    const loader = new FontLoader()
    loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(snippet, {
        font: font,
        size: 0.15,
        height: 0.03
      })

      const color = Math.random() * 0xffffff
      const textMaterial = new THREE.LineBasicMaterial({
        color: color
      })

      const textEdgesGeometry = new THREE.EdgesGeometry(textGeometry)
      const textMesh = new THREE.LineSegments(textEdgesGeometry, textMaterial)

      textGeometry.computeBoundingBox()
      const textWidth = textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x
      
      const boxPosition = new THREE.Vector3()
      this.box.getWorldPosition(boxPosition)
      
      textMesh.position.set(
        boxPosition.x + (Math.random() * 0.5 - 0.25),
        boxPosition.y,
        boxPosition.z + (Math.random() * 0.5 - 0.25)
      )

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        Math.random() * 0.2,
        (Math.random() - 0.5) * 0.1
      )

      this.particles.push({
        mesh: textMesh,
        velocity: velocity
      })
      this.scene.add(textMesh)
    })
  }



  private updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i]
      
      particle.velocity.y -= 0.005

      particle.mesh.position.add(particle.velocity)
      particle.mesh.rotateX(0.02)
      particle.mesh.rotateY(0.01)

      if (particle.mesh.position.y < -5) {
        this.scene.remove(particle.mesh)
        if (particle.mesh instanceof THREE.LineSegments) {
          if (particle.mesh.geometry) {
            particle.mesh.geometry.dispose()
          }
          if (particle.mesh.material instanceof THREE.Material) {
            particle.mesh.material.dispose()
          } else if (Array.isArray(particle.mesh.material)) {
            particle.mesh.material.forEach(material => material.dispose())
          }
        }
        this.particles.splice(i, 1)
      }
    }
  }

  private onWindowResize = (): void => {
    if (!this.container) return

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  }

  private addEventListeners(): void {
    window.addEventListener('resize', this.onWindowResize)
    this.container.addEventListener('click', this.handleClick)
  }

  private removeEventListeners(): void {
    window.removeEventListener('resize', this.onWindowResize)
    this.container.removeEventListener('click', this.handleClick)
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate)

    // boxOpened 조건 제거하고 항상 회전하도록 수정
    this.box.rotation.y += 0.01  // 우측으로 회전

    if (this.isAnimating) {
        this.updateParticles()
    }

    this.renderer.render(this.scene, this.camera)
}

  public dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }

    this.removeEventListeners()

    this.particles.forEach(particle => {
      this.scene.remove(particle.mesh)
      if (particle.mesh instanceof THREE.LineSegments) {
        if (particle.mesh.geometry) {
          particle.mesh.geometry.dispose()
        }
        if (particle.mesh.material instanceof THREE.Material) {
          particle.mesh.material.dispose()
        } else if (Array.isArray(particle.mesh.material)) {
          particle.mesh.material.forEach(material => material.dispose())
        }
      }
    })

    if (this.box instanceof THREE.Group) {
      this.box.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (child.material instanceof THREE.Material) {
            child.material.dispose()
          } else if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose())
          }
        }
      })
    }
    
    this.renderer.dispose()
    this.container.removeChild(this.renderer.domElement)
  }
}