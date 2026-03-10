'use client'

import { useEffect, useRef } from 'react'

export default function AvatarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let THREE: typeof import('three')
    let renderer: import('three').WebGLRenderer
    let raf: number

    const init = async () => {
      THREE = await import('three')
      const canvas = canvasRef.current
      if (!canvas) return

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(440, 440)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.z = 3.2

      // Main shape
      const geo = new THREE.OctahedronGeometry(1, 2)
      const mat = new THREE.MeshStandardMaterial({
        color: 0x161b22, emissive: 0x3fb950, emissiveIntensity: 0.04,
        transparent: true, opacity: 0.92,
      })
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)

      // Wireframe
      const wm = new THREE.MeshBasicMaterial({ color: 0x3fb950, wireframe: true, transparent: true, opacity: 0.12 })
      const wire = new THREE.Mesh(geo.clone(), wm)
      wire.scale.setScalar(1.02)
      scene.add(wire)

      // Inner glow
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x58a6ff, transparent: true, opacity: 0.05 })
      ))

      // Orbit rings
      const mkRing = (r: number, c: number, tilt: number) => {
        const rg = new THREE.TorusGeometry(r, 0.004, 8, 80)
        const rm = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.45 })
        const ring = new THREE.Mesh(rg, rm)
        ring.rotation.x = tilt
        return ring
      }
      const r1 = mkRing(1.35, 0x3fb950, Math.PI / 6)
      const r2 = mkRing(1.55, 0x58a6ff, Math.PI / 2.5)
      const r3 = mkRing(1.75, 0xbc8cff, Math.PI / 1.6)
      scene.add(r1); scene.add(r2); scene.add(r3)

      // Lights
      scene.add(new THREE.AmbientLight(0x8b949e, 0.5))
      const dl = new THREE.DirectionalLight(0x3fb950, 1.2)
      dl.position.set(3, 3, 3)
      scene.add(dl)
      const bl = new THREE.PointLight(0x58a6ff, 1, 8)
      bl.position.set(-2, 1, 2)
      scene.add(bl)

      let trgX = 0, trgY = 0
      const onMove = (e: MouseEvent) => {
        const container = containerRef.current
        if (!container) return
        const rc = container.getBoundingClientRect()
        trgY = ((e.clientX - rc.left) / rc.width - 0.5) * 0.8
        trgX = ((e.clientY - rc.top) / rc.height - 0.5) * -0.6
      }
      containerRef.current?.addEventListener('mousemove', onMove)

      let t = 0
      const animate = () => {
        raf = requestAnimationFrame(animate)
        t += 0.01
        mesh.rotation.y += (trgY - mesh.rotation.y) * 0.05 + 0.003
        mesh.rotation.x += (trgX - mesh.rotation.x) * 0.05
        wire.rotation.copy(mesh.rotation)
        r1.rotation.z = t * 0.4
        r2.rotation.z = -t * 0.3
        r3.rotation.z = t * 0.2
        bl.position.x = Math.sin(t * 0.7) * 2
        bl.position.z = Math.cos(t * 0.7) * 2
        renderer.render(scene, camera)
      }
      animate()
    }

    init()
    return () => {
      cancelAnimationFrame(raf)
      renderer?.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', aspectRatio: '1', background: 'var(--bg-overlay)' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}