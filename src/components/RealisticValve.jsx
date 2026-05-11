import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

/*
REALISTIC AORTIC VALVE OPENING ANIMATION
EchoAura Concept

Install:
npm install three @react-three/fiber @react-three/drei
*/

function Leaflet({ angleOffset }) {
  const leafletRef = useRef();

  useFrame((state) => {
    // Heartbeat cycle
    const t = state.clock.elapsedTime;

    /*
      Simulate systole/diastole:
      - opens wider during systole
      - closes during diastole
    */

    const beat = (Math.sin(t * 3) + 1) / 2;

    // Opening angle
    const openAngle = THREE.MathUtils.lerp(
      0.1,
      1.0,
      beat
    );

    leafletRef.current.rotation.z = openAngle;
  });

  return (
    <group rotation={[0, angleOffset, 0]}>
      <mesh
        ref={leafletRef}
        position={[0, 1.1, 0]}
      >
        {/* Curved realistic leaflet */}
        <sphereGeometry
          args={[
            1.2,
            32,
            32,
            0,
            Math.PI / 2.8,
            0,
            Math.PI
          ]}
        />

        <meshPhysicalMaterial
          color="#b6f0ff"
          metalness={0.2}
          roughness={0.1}
          transmission={0.7}
          transparent
          opacity={0.95}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive="#38bdf8"
          emissiveIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ValveRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2, 0.18, 32, 100]} />

      <meshStandardMaterial
        color="#94e8ff"
        metalness={1}
        roughness={0.15}
        emissive="#0ea5e9"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function AIEnergyCore() {
  const coreRef = useRef();

  useFrame((state) => {
    const pulse =
      1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;

    coreRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[0.35, 32, 32]} />

      <meshStandardMaterial
        color="#67e8f9"
        emissive="#22d3ee"
        emissiveIntensity={3}
      />
    </mesh>
  );
}

function EchoAuraValve() {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef}>
      {/* Metallic Ring */}
      <ValveRing />

      {/* Three Realistic Leaflets */}
      <Leaflet angleOffset={0} />

      <Leaflet angleOffset={(Math.PI * 2) / 3} />

      <Leaflet angleOffset={(Math.PI * 4) / 3} />

      {/* AI Core */}
      <AIEnergyCore />
    </group>
  );
}

export default function App() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        {/* Background */}
        <color attach="background" args={["#020617"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          color="#7dd3fc"
        />

        <pointLight
          position={[0, 0, 0]}
          intensity={3}
          color="#22d3ee"
        />

        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          intensity={2}
          penumbra={1}
          color="#38bdf8"
        />

        {/* Floating Motion */}
        <Float
          speed={2}
          rotationIntensity={0.25}
          floatIntensity={0.4}
        >
          <EchoAuraValve />
        </Float>

        {/* Mouse Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}