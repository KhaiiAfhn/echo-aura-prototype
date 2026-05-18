import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Center } from '@react-three/drei';

export default function Valve3D() {
  const meshRef = useRef();

  // 1. Fixed Path: Added leading slash to look directly in the root /public folder
  const geometry = useLoader(STLLoader, '/Vintage Valve knob to 6mm shaft.stl');

  // Optional: Gentle continuous ambient spin so it feels alive on the dashboard
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    // 2. Added <Center> component to auto-correct offset origins from the downloaded STL file
    <Center>
      <mesh 
        ref={meshRef}
        geometry={geometry} 
        castShadow 
        receiveShadow 
        scale={0.06} // Sized down slightly so the knob fits comfortably in the viewport frame
      >
        <meshStandardMaterial 
          color="#22d3ee" // High-tech matte cyan base
          metalness={0.8} 
          roughness={0.25} 
        />
      </mesh>
    </Center>
  );
}