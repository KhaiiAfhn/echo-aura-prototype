import React, { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { User, ShieldAlert, Activity, Play, Pause, Zap } from 'lucide-react';

export default function Dashboard({ patient }) {
  const [isPaused, setIsPaused] = useState(false);
  const [leads, setLeads] = useState({
    leadI: Array(100).fill({ val: 0, name: "" }),
    leadII: Array(100).fill({ val: 0, name: "" }),
    leadIII: Array(100).fill({ val: 0, name: "" }),
  });
  
  const [bpm, setBpm] = useState(patient?.bpmBase || 72);

  // Mock Doppler Metrics - these vary based on patient stability
  const metrics = {
    velocity: patient.stability === 'unstable' ? "4.2" : "2.4",
    gradient: patient.stability === 'unstable' ? "42" : "14",
    eoa: patient.stability === 'unstable' ? "0.8" : "1.5",
  };

  useEffect(() => {
    if (isPaused) return;

    let step = 0;
    const isUnstable = patient?.stability === "unstable";
    
    const generateECGPoint = (x, amplitudeMult = 1, shift = 0) => {
      const cycle = (x + shift) % 100;
      const noise = isUnstable ? (Math.random() * 4 - 2) : 0;
      
      let label = "";
      if (cycle === 15) label = "P";
      if (cycle === 25) label = "Q";
      if (cycle === 28) label = "R"; 
      if (cycle === 31) label = "S";
      if (cycle === 62) label = "T";
      
      let val = noise;
      if (cycle > 10 && cycle < 20) val += Math.sin((cycle - 10) * (Math.PI / 10)) * (3 * amplitudeMult);
      if (cycle === 25) val -= 4 * amplitudeMult;
      if (cycle === 28) val += (isUnstable ? 65 : 45) * amplitudeMult;
      if (cycle === 31) val -= 8 * amplitudeMult;
      if (cycle > 50 && cycle < 75) val += Math.sin((cycle - 50) * (Math.PI / 25)) * (7 * amplitudeMult);
      
      return { val, name: label };
    };

    const interval = setInterval(() => {
      const p1 = generateECGPoint(step, 0.8);
      const p2 = generateECGPoint(step, 1.2);
      const p3 = generateECGPoint(step, 0.6, 2);

      setLeads(prev => ({
        leadI: [...prev.leadI.slice(1), p1],
        leadII: [...prev.leadII.slice(1), p2],
        leadIII: [...prev.leadIII.slice(1), p3],
      }));

      if (step % 50 === 0) setBpm((patient?.bpmBase || 72) + Math.floor(Math.random() * (isUnstable ? 12 : 3)));
      step++;
    }, isUnstable ? 35 : 50);

    return () => clearInterval(interval);
  }, [patient, isPaused]);

  if (!patient) return <div className="p-10 text-white font-mono uppercase">Initializing Secure Link...</div>;

  return (
    <div className="p-8 space-y-6 bg-[#020617] min-h-screen text-slate-100 font-sans">
      {/* GLOBAL HEADER */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Zap size={24} className="text-cyan-400" />
            </div>
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">Telemetry Live</h1>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1 italic">Active EchoAura Analysis</p>
            </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-white/10 p-2 rounded-3xl shadow-2xl">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase transition-all active:scale-95 ${
                isPaused ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            {isPaused ? <><Play size={14} fill="currentColor" /> Resume</> : <><Pause size={14} fill="currentColor" /> Freeze</>}
          </button>
          <div className="px-6 border-l border-white/10 flex items-baseline gap-2">
            <span className={`text-4xl font-black font-mono tracking-tighter ${patient.stability === 'unstable' ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {bpm}
            </span>
            <span className="text-[10px] text-slate-500 font-black uppercase">BPM</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: PATIENT CARD (Simplified) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/10 backdrop-blur-md">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
              <User size={32} className="text-slate-400" />
            </div>
            
            <h3 className="font-black text-2xl text-white tracking-tighter mb-1 uppercase leading-none">{patient.name}</h3>
            <p className="text-[10px] text-slate-500 font-mono tracking-tighter mb-4">{patient.id}</p>
            
            <div className="pt-4 border-t border-white/5">
                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${
                    patient.status === 'CRITICAL' ? 'border-red-500 text-red-400 bg-red-500/10' :
                    patient.status === 'POST-SURGERY' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' :
                    'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                }`}>
                    {patient.status}
                </span>
            </div>
          </div>

          <div className={`p-8 rounded-[2rem] border border-white/10 flex flex-col items-center ${patient.stability === 'unstable' ? 'bg-red-950/20' : 'bg-emerald-950/10'}`}>
             <ShieldAlert size={32} className={patient.stability === 'unstable' ? 'text-red-500' : 'text-emerald-500'} />
             <p className="text-[10px] font-black uppercase mt-3 tracking-widest text-slate-500">Stability Index</p>
             <p className="text-3xl font-black">{patient.stability === 'unstable' ? 'CRITICAL' : 'OPTIMAL'}</p>
          </div>
        </div>

        {/* CENTER: TRIPLE ECG STACK */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
           <ECGLead label="Lead I (Lateral)" data={leads.leadI} color={patient.stability === 'unstable' ? "#f43f5e" : "#22d3ee"} isPaused={isPaused} />
           <ECGLead label="Lead II (Inferior)" data={leads.leadII} color={patient.stability === 'unstable' ? "#f43f5e" : "#fbbf24"} isPaused={isPaused} />
           <ECGLead label="Lead III (Inferior)" data={leads.leadIII} color={patient.stability === 'unstable' ? "#f43f5e" : "#a855f7"} isPaused={isPaused} />
        </div>

        {/* RIGHT: HEMODYNAMIC PANEL */}
        <div className="col-span-12 lg:col-span-3 bg-slate-900/40 p-6 rounded-[2rem] border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/5">
                <Activity size={18} className="text-cyan-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Doppler Metrics</h3>
            </div>
            
            <div className="space-y-8">
                <MetricBox label="Peak Velocity" value={`${metrics.velocity} m/s`} ref="< 3.0" alert={parseFloat(metrics.velocity) > 3.0} />
                <MetricBox label="Mean Gradient" value={`${metrics.gradient} mmHg`} ref="< 20" alert={parseFloat(metrics.gradient) > 20} />
                <MetricBox label="EOA Area" value={`${metrics.eoa} cm²`} ref="> 1.2" alert={parseFloat(metrics.eoa) < 1.2} />
            </div>
        </div>
      </div>
    </div>
  );
}

function ECGLead({ label, data, color, isPaused }) {
  return (
    <div className={`bg-slate-950 rounded-3xl border transition-all duration-300 ${isPaused ? 'border-cyan-500' : 'border-white/10'} p-5 relative overflow-hidden`}>
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">{label}</span>
      </div>

      <div className="h-28 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="1 4" stroke="#ffffff" opacity={0.05} />
            <CartesianGrid vertical={true} horizontal={true} stroke="#ffffff" opacity={0.1} strokeWidth={1} />
            <YAxis hide domain={[-35, 95]} />
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={color} 
              strokeWidth={2.5} 
              dot={false} 
              isAnimationActive={false}
              style={{ filter: isPaused ? 'none' : `drop-shadow(0px 0px 8px ${color}dd)` }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none items-end pb-1">
            {data.map((point, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                    {point.name && (
                        <span className="text-[10px] font-black text-white bg-slate-800 border border-white/20 w-5 h-5 flex items-center justify-center rounded-md shadow-xl mb-1">
                            {point.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value, ref, alert }) {
    return (
        <div className="relative">
            <p className="text-[9px] text-slate-500 font-black uppercase mb-1 tracking-widest">{label}</p>
            <div className="flex items-baseline gap-2">
                <p className={`text-4xl font-black tracking-tighter leading-none ${alert ? 'text-red-500' : 'text-white'}`}>{value}</p>
                <p className="text-[9px] text-cyan-500 font-mono font-bold uppercase">REF {ref}</p>
            </div>
        </div>
    )
}