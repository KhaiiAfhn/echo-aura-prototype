import React, { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { User, Activity, ShieldAlert, Zap, HeartPulse } from 'lucide-react';

export default function Dashboard() {
  const [heartData, setHeartData] = useState(Array(20).fill({ val: 72 }));
  const [metrics, setMetrics] = useState({
    velocity: 2.4, gradient: 14, vpi: 0.38, eoa: 1.5, at: 72, bpm: 72
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newBpm = Math.floor(70 + Math.random() * 10);
      setHeartData(prev => {
        const newData = [...prev.slice(1), { val: newBpm }];
        return newData;
      });
      setMetrics(prev => ({ ...prev, bpm: newBpm }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const calculateRisk = () => {
    if (metrics.velocity >= 4.0 || metrics.gradient >= 35 || metrics.eoa < 0.8) {
      return { level: "CRITICAL", color: "text-red-400", bg: "bg-red-950/40", border: "border-red-500/50" };
    }
    return { level: "STABLE", color: "text-emerald-400", bg: "bg-emerald-950/40", border: "border-emerald-500/50" };
  };

  const risk = calculateRisk();

  return (
    <div className="p-8 space-y-6 bg-[#020617] min-h-screen text-slate-100">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Clinical Dashboard</h1>
          <p className="text-slate-400 font-medium">EchoAura AI Patient Telemetry</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* PANEL 1: PATIENT INFO */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/50 p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/10">
              <User className="text-slate-100" size={32} />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-white">Muhammad Irfan</h3>
              <p className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest">Post-Op Day 12</p>
            </div>
          </div>
          <div className="space-y-4">
            <DataRow label="Procedure" value="Aortic Replacement" />
            <DataRow label="Material" value="Grade 5 Titanium" />
            <DataRow label="AI Version" value="EchoAura v2.5" />
          </div>
        </div>

        {/* PANEL 2: HEART STATUS (FIXED TOOLTIP) */}
        <div className="col-span-12 lg:col-span-8 bg-slate-900/50 p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
                <HeartPulse size={20} className="text-red-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">ECG Real-Time Stream</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black font-mono text-white tracking-tighter">{metrics.bpm}</span>
              <span className="text-xs text-red-500 font-bold uppercase">BPM</span>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <YAxis hide domain={[60, 100]} />
                
                {/* TOOLTIP FIX: Added custom styling so text is visible on dark bg */}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f8fafc' 
                  }}
                  itemStyle={{ color: '#ef4444', fontWeight: 'bold' }}
                  labelStyle={{ display: 'none' }} 
                  cursor={{ stroke: '#334155', strokeWidth: 2 }}
                />

                <Line 
                  type="monotone" 
                  dataKey="val" 
                  stroke="#ef4444" 
                  strokeWidth={4} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }} // Shows point on hover
                  isAnimationActive={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PANEL 3: METRICS */}
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`lg:col-span-1 ${risk.bg} ${risk.border} border p-8 rounded-3xl flex flex-col items-center justify-center text-center`}>
             <ShieldAlert className={`${risk.color} mb-4`} size={40} />
             <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">AI Risk Engine</h4>
             <div className={`text-5xl font-black tracking-tighter ${risk.color}`}>{risk.level}</div>
          </div>

          <div className="lg:col-span-3 bg-slate-900/50 p-8 rounded-3xl border border-white/10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 text-white">Doppler Hemodynamics</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <MetricBox label="Peak Velocity" value={`${metrics.velocity} m/s`} ref="< 3.0" />
              <MetricBox label="Mean Gradient" value={`${metrics.gradient} mmHg`} ref="< 20" />
              <MetricBox label="DVI (Index)" value={metrics.vpi} ref="≥ 0.30" />
              <MetricBox label="EOA Area" value={`${metrics.eoa} cm²`} ref="> 1.2" />
              <MetricBox label="Acc. Time" value={`${metrics.at} ms`} ref="< 80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3">
      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function MetricBox({ label, value, ref }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-slate-500 uppercase font-black">{label}</p>
      <p className="text-2xl font-black text-white tracking-tighter">{value}</p>
      <p className="text-[9px] text-cyan-500 font-mono font-bold uppercase">REF: {ref}</p>
    </div>
  );
}