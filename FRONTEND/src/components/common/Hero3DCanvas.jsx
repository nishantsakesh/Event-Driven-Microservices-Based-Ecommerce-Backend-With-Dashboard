import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshWobbleMaterial } from '@react-three/drei';

function FloatingAudioSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshWobbleMaterial 
          color="#5C9EAD" 
          factor={0.4} 
          speed={1.5} 
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

function SmallFloatingSpheres() {
  return (
    <>
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5} position={[-2.5, 1.5, -1]}>
        <mesh scale={0.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#326273" roughness={0.2} metalness={0.5} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8} position={[2.8, -1.2, -1]}>
        <mesh scale={0.7}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#E39774" roughness={0.1} metalness={0.4} />
        </mesh>
      </Float>

      <Float speed={4} rotationIntensity={0.5} floatIntensity={1} position={[2, 2, -2]}>
        <mesh scale={0.4}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#5C9EAD" roughness={0.2} metalness={0.7} />
        </mesh>
      </Float>
    </>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-full min-h-[350px] relative pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.8} color="#E39774" />
        <pointLight position={[5, 5, 5]} intensity={2} color="#5C9EAD" />

        <FloatingAudioSphere />
        <SmallFloatingSpheres />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
