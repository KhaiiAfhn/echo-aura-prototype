import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export default function ValveModel() {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Heartbeat pulse effect
    const pulse = 1 + Math.sin(time * 4) * 0.05;
    if (coreRef.current) {
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Slow technical rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
      ringRef.current.rotation.x = time * 0.2;
    }
  });

  return (
    <group>
      {/* Central Heart Valve Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={2}
          speed={2}
          distort={0.3}
          radius={1}
        />
      </mesh>

      {/* Outer Metallic Support Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#444" 
          metalness={1} 
          roughness={0.1} 
          emissive="#00f2ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Secondary Vertical Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Floating data particles */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[2, 1, -1]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#ff0055" />
        </mesh>
      </Float>
    </group>
  );
}