'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ORANGE = '#FF5A1F'

function useGlowTexture() {
  return useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,120,60,0.9)')
    g.addColorStop(0.25, 'rgba(255,90,31,0.45)')
    g.addColorStop(0.6, 'rgba(255,90,31,0.08)')
    g.addColorStop(1, 'rgba(255,90,31,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Hollow spherical shell with jittered radius for depth
      const r = 4 + Math.pow(Math.random(), 0.6) * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      arr[i * 3 + 2] = r * Math.cos(phi) - 2
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    const p = ref.current
    if (!p) return
    p.rotation.y += delta * 0.025
    if (!reduced) {
      const { x, y } = state.pointer
      p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, y * 0.12, 0.04)
      p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, -x * 0.08, 0.04)
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#F5F3EF"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function OrangeDust({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current || reduced) return
    ref.current.rotation.y -= delta * 0.08
    ref.current.rotation.x += delta * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={ORANGE}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Intelligence({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const wire = useRef<THREE.Mesh>(null)
  const glow = useGlowTexture()
  const { viewport } = useThree()
  const wide = viewport.width > 9
  const targetX = wide ? viewport.width * 0.22 : 0
  const targetY = wide ? 0.2 : 1.1
  const scale = wide ? 1 : 0.62

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const px = reduced ? 0 : state.pointer.x
    const py = reduced ? 0 : state.pointer.y
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX + px * 0.35, 0.04)
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY + py * 0.25 + Math.sin(t * 0.6) * 0.08, 0.04)
    if (wire.current && !reduced) {
      wire.current.rotation.y += delta * 0.15
      wire.current.rotation.x += delta * 0.05
    }
  })

  return (
    <group ref={group} position={[targetX, targetY, 0]} scale={scale}>
      <sprite scale={[7.5, 7.5, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh>
        <sphereGeometry args={[1.05, 54, 54]} />
        <MeshDistortMaterial
          color="#1a0c06"
          emissive={ORANGE}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.4}
          distort={reduced ? 0 : 0.28}
          speed={reduced ? 0 : 1.6}
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#F5F3EF" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[2.1, 0.004, 8, 120]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.5} />
      </mesh>
      <OrangeDust count={200} reduced={reduced} />
    </group>
  )
}

export default function HeroScene({ reduced }: { reduced: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced || !inView ? 'demand' : 'always'}
        className="!absolute inset-0"
        aria-hidden
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 3, 5]} intensity={28} color="#ffd4c2" />
        <pointLight position={[-5, -2, 3]} intensity={10} color={ORANGE} />
        <Particles count={2200} reduced={reduced} />
        <Intelligence reduced={reduced} />
        <fog attach="fog" args={['#08090B', 8, 20]} />
      </Canvas>
    </div>
  )
}
