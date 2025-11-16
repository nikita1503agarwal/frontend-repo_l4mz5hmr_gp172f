import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

// Simple anatomy placeholder built from primitives
function AnatomyModel({ onSelect }) {
  const hoverRef = useRef({})

  const parts = useMemo(() => ([
    { key: 'Head', type: 'sphere', position: [0, 1.6, 0], args: [0.25, 32, 32], color: '#4fd1c5', hover: '#66e0d5', label: 'Cerebrum' },
    { key: 'Torso', type: 'cylinder', position: [0, 0.9, 0], args: [0.35, 0.35, 0.9, 32], color: '#0ea5a3', hover: '#10b0ae', label: 'Thorax' },
    { key: 'LeftArm', type: 'cylinder', position: [-0.55, 1.1, 0], rotation: [0, 0, Math.PI / 2.6], args: [0.09, 0.09, 0.7, 16], color: '#0ea5a3', hover: '#10b0ae', label: 'Left Arm' },
    { key: 'RightArm', type: 'cylinder', position: [0.55, 1.1, 0], rotation: [0, 0, -Math.PI / 2.6], args: [0.09, 0.09, 0.7, 16], color: '#0ea5a3', hover: '#10b0ae', label: 'Right Arm' },
    { key: 'Pelvis', type: 'box', position: [0, 0.35, 0], args: [0.4, 0.2, 0.25], color: '#0f766e', hover: '#127f77', label: 'Pelvis' },
    { key: 'LeftLeg', type: 'cylinder', position: [-0.15, -0.2, 0], args: [0.12, 0.12, 0.9, 16], color: '#0ea5a3', hover: '#10b0ae', label: 'Left Leg' },
    { key: 'RightLeg', type: 'cylinder', position: [0.15, -0.2, 0], args: [0.12, 0.12, 0.9, 16], color: '#0ea5a3', hover: '#10b0ae', label: 'Right Leg' }
  ]), [])

  return (
    <group>
      {parts.map((p) => (
        <mesh
          key={p.key}
          position={p.position}
          rotation={p.rotation}
          onPointerOver={(e) => {
            e.stopPropagation()
            hoverRef.current[p.key] = true
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            hoverRef.current[p.key] = false
          }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect && onSelect(p.label)
          }}
          castShadow
          receiveShadow
        >
          {p.type === 'sphere' && (
            <sphereGeometry args={p.args} />
          )}
          {p.type === 'cylinder' && (
            <cylinderGeometry args={p.args} />
          )}
          {p.type === 'box' && (
            <boxGeometry args={p.args} />
          )}
          <meshStandardMaterial color={hoverRef.current[p.key] ? p.hover : p.color} metalness={0.1} roughness={0.6} />
          <Html distanceFactor={8} center style={{ pointerEvents: 'none' }}>
            <div className="px-2 py-1 text-xs rounded-full bg-white/80 text-slate-700 shadow">
              {p.key}
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  )
}

export function Scene({ onSelect }) {
  return (
    <Canvas shadows camera={{ position: [2.5, 1.8, 3], fov: 45 }} className="h-full w-full">
      <color attach="background" args={["#f8fafc"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Suspense fallback={null}>
        <AnatomyModel onSelect={onSelect} />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={1.2} maxDistance={6} />
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </Canvas>
  )
}

export default Scene
