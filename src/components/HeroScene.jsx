import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import Valve3D from './Valve3D';

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[400px] bg-transparent">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={40} />
        
        {/* Professional Studio Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />

        <Suspense fallback={null}>
          {/* Stage handles the centering and professional floor contact shadows */}
          <Stage environment="city" intensity={0.6} contactShadow={true} adjustCamera={false}>
            <Valve3D />
          </Stage>
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate={false} 
          makeDefault 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}