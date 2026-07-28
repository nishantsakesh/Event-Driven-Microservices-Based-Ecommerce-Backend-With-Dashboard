import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Torus, Sphere, Float, Stars, OrbitControls } from '@react-three/drei';

function SceneContent() {
  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#a855f7" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={2} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Torus args={[3, 0.4, 32, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#202020" metalness={0.8} roughness={0.2} />
        </Torus>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[0.5, 32, 32]} position={[4, 2, -2]}>
          <meshStandardMaterial emissive="#06b6d4" emissiveIntensity={2} color="#000000" />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.3, 32, 32]} position={[-3, -2, 3]}>
          <meshStandardMaterial emissive="#a855f7" emissiveIntensity={2} color="#000000" />
        </Sphere>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
