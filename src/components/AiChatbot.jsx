import React, { useState } from 'react';
import { Send, X, Activity, Brain, Terminal } from 'lucide-react';

export default function AiChatbot({ patient }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'system', content: `EchoAura AI active. Linked to ${patient?.name || 'Unknown Patient'}.` }
  ]);

  const handleSend = () => {
    if (!input.trim() || !patient) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let response = "";
      const q = input.toLowerCase();

      if (q.includes("status")) {
        response = `Subject is currently ${patient.status}. Stability: ${patient.stability.toUpperCase()}. Heart rate: ${patient.bpmBase} BPM.`;
      } else if (q.includes("risk")) {
        response = patient.stability === 'unstable' 
          ? "CRITICAL: VPI index shows high risk of decompensation." 
          : "Subject is currently hemodynamically stable.";
      } else {
        response = "Telemetry stream analysis complete. No significant arrhythmias detected.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-2xl shadow-2xl transition-all ${patient?.stability === 'unstable' ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
      >
        {isOpen ? <X size={24} /> : <Brain size={24} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-[#0a192f] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
          <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-3">
            <Activity size={18} className="text-cyan-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Clinical AI</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[11px] ${m.role === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-900 text-slate-300 border border-white/5'}`}>
                  {m.role === 'assistant' && <div className="flex items-center gap-1 mb-2 text-[8px] font-black text-cyan-500 uppercase"><Terminal size={10}/> Feed</div>}
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-950/50 border-t border-white/5">
            <div className="relative">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white outline-none" placeholder="Clinical inquiry..." />
              <button onClick={handleSend} className="absolute right-3 top-2 text-cyan-500"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}