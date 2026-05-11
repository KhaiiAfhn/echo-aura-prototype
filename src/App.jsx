import React, { useState } from 'react';
import { LayoutDashboard, Users, Box, Brain, LogOut, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard.jsx';
import PatientCatalog from './components/PatientCatalog.jsx';
import ProductViewer from './components/ProductViewer.jsx';
import AiDiagnostics from './components/AiDiagnostics.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState({
    name: "Muhammad Irfan Bin Rosani",
    id: "MY-AOR-2026-8ADB9300-X",
    status: "POST-SURGERY",
    bpmBase: 72,
    stability: "stable"
  });

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('dashboard');
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-24 border-r border-white/5 flex flex-col items-center py-10 justify-between bg-slate-950/50 backdrop-blur-xl z-50">
        <div className="flex flex-col items-center gap-12">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center">
            <span className="text-black font-black text-xl italic">E</span>
          </div>

          <nav className="flex flex-col gap-8">
            <SidebarIcon 
              icon={<LayoutDashboard size={24} />} 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              label="Telemetry"
            />
            <SidebarIcon 
              icon={<Users size={24} />} 
              active={activeTab === 'patients'} 
              onClick={() => setActiveTab('patients')}
              label="Registry"
            />
            <SidebarIcon 
              icon={<Box size={24} />} 
              active={activeTab === 'product'} 
              onClick={() => setActiveTab('product')}
              label="Devices"
            />
            <SidebarIcon 
              icon={<Brain size={24} />} 
              active={activeTab === 'ai'} 
              onClick={() => setActiveTab('ai')}
              label="AI Core"
            />
          </nav>
        </div>

        <div className="flex flex-col gap-6 text-slate-600">
           <Settings size={20} className="hover:text-white cursor-pointer transition-colors" />
           <LogOut size={20} className="hover:text-red-400 cursor-pointer transition-colors" />
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 relative overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard patient={selectedPatient} />}
        {activeTab === 'patients' && <PatientCatalog onViewPatient={handleViewPatient} />}
        {activeTab === 'product' && <ProductViewer />}
        {activeTab === 'ai' && <AiDiagnostics />}
      </main>
    </div>
  );
}

function SidebarIcon({ icon, active, onClick, label }) {
  return (
    <button onClick={onClick} className="group relative flex flex-col items-center gap-2 transition-all">
      <div className={`p-4 rounded-2xl transition-all duration-300 ${
        active 
          ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
          : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white border border-white/5'
      }`}>
        {icon}
      </div>
      <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity duration-300 ${active ? 'text-cyan-400 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        {label}
      </span>
    </button>
  );
}