"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ParticleField from "./ParticleField";

function MainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    wireframeRef.current.rotation.x = time * 0.2;
    wireframeRef.current.rotation.y = time * 0.3;

    // Mouse tilt
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;
    
    meshRef.current.rotation.x += mouseY * 0.1;
    meshRef.current.rotation.y += mouseX * 0.1;
    wireframeRef.current.rotation.x += mouseY * 0.1;
    wireframeRef.current.rotation.y += mouseX * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 3, 5]} />
        <meshStandardMaterial
          color="#6EE7B7"
          metalness={0.8}
          roughness={0.1}
          emissive="#6EE7B7"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh ref={wireframeRef} scale={1.05}>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 3, 5]} />
        <meshBasicMaterial
          color="#6EE7B7"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#6EE7B7" />
        <pointLight position={[-5, -3, 2]} intensity={1.5} color="#A78BFA" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <MainMesh />
          </Float>
          <ParticleField count={100} />
        </Suspense>
      </Canvas>
    </div>
  );
}
