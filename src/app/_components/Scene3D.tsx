'use client';

import React, { useRef,  } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, 10), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

function Sculpture() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial 
          color="#A855F7" 
          speed={3} 
          distort={0.4} 
          radius={1}
          metalness={0.5}
          roughness={0.1}
          emissive="#A855F7"
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 sm:opacity-60">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.5} />
        
        {/* Dynamic Point Light that adds to the depth */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#A855F7" />

        <React.Suspense fallback={null}>
          <Sculpture />
          <Rig />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
