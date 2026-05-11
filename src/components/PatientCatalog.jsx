import React from 'react';
import { Search, Plus, ChevronRight, Filter } from 'lucide-react';

export default function PatientCatalog({ onViewPatient }) {
  const patients = [
    { 
        name: "Muhammad Irfan Bin Rosani", 
        id: "MY-AOR-2026-8ADB9300-X", 
        status: "POST-SURGERY", 
        room: "ICU-04",
        bpmBase: 72,
        stability: "stable",
        condition: "Aortic Replacement"
    },
    { 
        name: "Sarah Jane Connor", 
        id: "US-CARD-2026-9XJ22199-B", 
        status: "CRITICAL", 
        room: "ER-02",
        bpmBase: 135,
        stability: "unstable",
        condition: "Tachycardia"
    },
    { 
        name: "Ahmad Zaki Bin Abdul", 
        id: "MY-VAL-2026-3KK88122-Z", 
        status: "OBSERVATION", 
        room: "Ward-B2",
        bpmBase: 58,
        stability: "stable",
        condition: "Bradycardia"
    },
    { 
        name: "Elena Maria Gilbert", 
        id: "US-POST-2026-5PP00911-A", 
        status: "STABLE", 
        room: "Ward-A1",
        bpmBase: 75,
        stability: "stable",
        condition: "Recovery"
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#020617] min-h-screen text-slate-100 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Registry</h1>
            <p className="text-slate-500 font-medium font-mono text-xs tracking-widest mt-1">Hospital Management System</p>
          </div>
          <button className="bg-cyan-500 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2">
            <Plus size={18} strokeWidth={3} /> New Admission
          </button>
        </div>

        <div className="bg-slate-900/30 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Patient Name</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Full Medical ID</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Current Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Unit</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {patients.map((p, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 font-bold text-white text-lg">{p.name}</td>
                  <td className="p-6 font-mono text-xs text-slate-500 tracking-tighter">{p.id}</td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black px-4 py-1 rounded-full border ${
                      p.status === 'CRITICAL' ? 'border-red-500 text-red-400 bg-red-500/10' :
                      p.status === 'POST-SURGERY' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' :
                      'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-6 text-sm font-bold text-slate-400">{p.room}</td>
                  <td className="p-6">
                    <button 
                      onClick={() => onViewPatient(p)}
                      className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}