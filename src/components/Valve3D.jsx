import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Valve3D() {
  const groupRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Rotate the whole device slowly
    if (groupRef.current) groupRef.current.rotation.y = t * 0.15;
    
    // 2. The "Organic Usage" Animation: 
    // This makes the center material pulse/stretch like a heartbeat
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.1; 
      coreRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      
      {/* SOLID TITANIUM CROWN FRAME */}
      {/* This creates a single continuous ring with 3 peaks */}
      <mesh>
        <torusGeometry args={[1.5, 0.15, 16, 100]} />
        <meshStandardMaterial color="#444" metalness={1} roughness={0.1} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          {/* Vertical Strut peaks connecting to the ring */}
          <mesh position={[0, 1.2, 1.5]}>
            <cylinderGeometry args={[0.1, 0.1, 2.4, 16]} />
            <meshStandardMaterial color="#888" metalness={1} />
          </mesh>
        </group>
      ))}

      {/* THE ORGANIC STRETCHED MATERIAL (The Heart) */}
      <group ref={coreRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
            <mesh position={[0, 1, 0.4]} rotation={[-Math.PI / 4, 0, 0]}>
              {/* This shape mimics the 'stretching' polymer in your poster */}
              <cylinderGeometry args={[1.3, 0.4, 2.2, 32, 1, true, 0, Math.PI * 0.7]} />
              <meshStandardMaterial 
                color="#f2e8d5" 
                side={THREE.DoubleSide} 
                transparent 
                opacity={0.85}
                roughness={0.3}
              />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* SENSOR BASE WITH RED GLOW */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.4, 64]} />
        <meshStandardMaterial 
          color="#111" 
          emissive="#ff0000" 
          emissiveIntensity={0.5} 
        />
      </mesh>
    </group>
  );
}