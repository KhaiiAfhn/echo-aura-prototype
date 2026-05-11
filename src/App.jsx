import React, { useState } from 'react';
import { LayoutDashboard, Box, SearchCode } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProductViewer from './components/ProductViewer'; // Your Icon 2
import AiDiagnostics from './components/AiDiagnostics'; // Your Icon 3
import AiChatbot from './components/AiChatbot';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-20 lg:w-64 bg-[#0a192f] flex flex-col py-8 border-r border-white/10">
        <div className="px-6 mb-12 flex justify-center lg:justify-start">
          <div className="w-10 h-10 bg-cyan-400 rounded-xl flex items-center justify-center">
            <span className="font-bold text-black">EA</span>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-2 px-3">
          <NavIcon 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<LayoutDashboard size={22} />} 
            label="Dashboard" 
          />
          <NavIcon 
            active={activeTab === 'product'} 
            onClick={() => setActiveTab('product')}
            icon={<Box size={22} />} 
            label="EchoAura Sim" 
          />
          <NavIcon 
            active={activeTab === 'analyzer'} 
            onClick={() => setActiveTab('analyzer')}
            icon={<SearchCode size={22} />} 
            label="AI Analyzer" 
          />
        </nav>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto relative bg-[#f1f5f9]">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'product' && <ProductViewer />}
        {activeTab === 'analyzer' && <AiDiagnostics />}
        
        {/* GLOBAL AI CHATBOT */}
        <AiChatbot />
      </main>
    </div>
  );
}

function NavIcon({ active, icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
        active ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="hidden lg:block font-medium text-sm">{label}</span>
    </button>
  );
}