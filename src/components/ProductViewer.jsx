import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Valve3D from './Valve3D';

export default function ProductViewer() {
  // State for live telemetry data based on EchoAura specs
  const [metrics, setMetrics] = useState({
    flowRate: 5.2,
    pressure: 12,
    efficiency: 98.4,
    battery: 100
  });

  // Simulate real-time hemodynamic monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        flowRate: (5.0 + Math.random() * 0.5).toFixed(2), // L/min
        pressure: (10 + Math.random() * 4).toFixed(1),   // mmHg gradient
        efficiency: (98 + Math.random() * 1.5).toFixed(1), // % Opening dynamics
        battery: 100 // Inductive power status
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 h-full flex flex-col gap-6 bg-black text-white font-sans">
      <header className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Biometric Telemetry Link</h2>
          <h1 className="text-4xl font-bold tracking-tighter">EchoAura Dashboard</h1>
        </div>
        <div className="text-right text-[10px] font-mono text-gray-500 uppercase">
          Device ID: EA-2026-ALPHA <br />
          Status: Synchronized
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* DATA PANEL: Real-time metrics based on EchoAura features */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard label="Flow Velocity" value={`${metrics.flowRate} L/min`} sub="Hemodynamic" />
            <MetricCard label="Pressure Grad" value={`${metrics.pressure} mmHg`} sub="Pressure/Flow" />
            <MetricCard label="Valve Aperture" value={`${metrics.efficiency}%`} sub="Opening Dynamics" />
            <MetricCard label="Power Source" value="Inductive" sub="Wireless" />
          </div>

          <div className="glass-card p-6 mt-2 bg-white/5 border-white/10 border rounded-lg">
            <h3 className="text-sm font-bold text-cyan-400 uppercase mb-3 font-mono">Technical Specifications</h3>
            <ul className="text-[11px] space-y-2 text-gray-300 font-mono">
              <li><span className="text-gray-500">FRAME:</span> Titanium (Ti-6Al-4V)</li>
              <li><span className="text-gray-500">LEAFLET:</span> Parylene-based Polymer</li>
              <li><span className="text-gray-500">AI UNIT:</span> Encrypted RF Telemetry</li>
              <li><span className="text-gray-500">DIAMETER:</span> 23 mm (Prototype)</li>
            </ul>
          </div>
        </div>

        {/* 3D VIEWPORT */}
        <div className="flex-1 glass-card border border-white/10 relative bg-[#050505] rounded-xl overflow-hidden">
          <Canvas shadows>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={30}/>
              <Environment preset="city" />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
              <Valve3D />
              <OrbitControls enablePan={false} />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-4 right-4 pointer-events-none text-right">
            <p className="text-[9px] font-mono text-cyan-500 uppercase animate-pulse">
              // AI Control Unit: Analyzing Hemodynamic Data...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col justify-center">
      <p className="text-[9px] font-mono text-gray-500 uppercase tracking-tight">{sub}</p>
      <h4 className="text-gray-400 text-[10px] font-bold uppercase mb-1">{label}</h4>
      <p className="text-2xl font-bold text-white tracking-tighter">{value}</p>
    </div>
  );
}