"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Dodecahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#A78BFA"
        wireframe
        transparent
        opacity={0.4}
        metalness={0.8}
        roughness={0.1}
      />
    </mesh>
  );
}

export default function FloatingGeometry() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#A78BFA" />
        
        <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
          <Dodecahedron />
        </Float>
      </Canvas>
    </div>
  );
}
