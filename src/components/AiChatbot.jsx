import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, X, Send, Bot, Loader2, HeartPulse, Activity } from 'lucide-react';

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'EchoAura v3.0 Online. Local Inference Engine active. Systems nominal. How can I assist, Irfan?' }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // --- THE MASTER MOCK ENGINE ---
  // Designed to capture almost any user intent related to the product or general queries.
  const generateMockResponse = (query) => {
    const q = query.toLowerCase();
    
    // 1. GREETINGS & PERSONAL
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) 
      return "Greetings, Irfan. All telemetry links are green. I am ready to analyze the Titanium valve performance or your RPA data flows.";
    if (q.includes("who are you") || q.includes("echoaura")) 
      return "I am the EchoAura AI Core, a specialized LLM for hemodynamic monitoring and prosthetic valve telemetry.";

    // 2. CLINICAL PARAMETERS (DOPPLER DATA)
    if (q.includes("velocity") || q.includes("peak") || q.includes("speed")) 
      return "Current Peak Velocity is 2.4 m/s. Threshold: <3.0 m/s. Interpretation: Non-stenotic, laminar flow detected.";
    if (q.includes("gradient") || q.includes("pressure") || q.includes("mmhg")) 
      return "Mean Gradient is 14 mmHg. Pressure drop across the Titanium valve is within optimal clinical parameters (Ref: <20 mmHg).";
    if (q.includes("eoa") || q.includes("area") || q.includes("orifice")) 
      return "Effective Orifice Area (EOA) is 1.5 cm². This confirms the valve opening is sufficient for the patient's body surface area.";
    if (q.includes("dvi") || q.includes("index")) 
      return "DVI is 0.38 (V_lvot/V_as). Formula check: Stable. A value >0.30 indicates no significant prosthesis-patient mismatch.";

    // 3. HEART DISEASE & PATHOLOGY
    if (q.includes("stenosis") || q.includes("narrowing") || q.includes("as")) 
      return "Zero signs of stenosis. The Titanium Grade 5 leaflets show perfect mobility with no calcification markers detected.";
    if (q.includes("leak") || q.includes("regurgitation") || q.includes("pvl")) 
      return "Paravalvular leakage check: NEGATIVE. The mechanical seal is maintaining 100% integrity during diastole.";
    if (q.includes("thrombosis") || q.includes("clot") || q.includes("blood")) 
      return "Thrombosis risk: LOW. The valve's biocompatible coating minimizes protein adhesion, reducing the need for high-dose anticoagulants.";
    if (q.includes("failure") || q.includes("chf") || q.includes("risk")) 
      return "AI Risk Engine status: STABLE. Cardiac output is optimized, and ventricular load is reduced compared to pre-op baseline.";

    // 4. PRODUCT & TECHNICAL SPECS
    if (q.includes("titanium") || q.includes("material") || q.includes("made of")) 
      return "The valve utilizes Aerospace-grade Titanium (Grade 5) for the housing, providing unmatched durability and MRI compatibility.";
    if (q.includes("rpa") || q.includes("automate") || q.includes("sql") || q.includes("data")) 
      return "Data integration: Live. I am pulling from SQL Server via Power Automate Desktop. All telemetry is logged in the SSRS reporting engine.";
    if (q.includes("malaysia") || q.includes("kuala lumpur") || q.includes("lhdn") || q.includes("padu")) 
      return "System linked to Malaysian medical data standards. I can synchronize telemetry with Suara Rakyat or PADU-compliant healthcare modules.";

    // 5. MATH & PHYSICS (THE "SMART" STUFF)
    if (q.includes("calculate") || q.includes("formula") || q.includes("bernoulli")) 
      return "I use the Simplified Bernoulli Equation: ΔP = 4v². For our current 2.4 m/s velocity, the peak gradient calculates to 23.04 mmHg.";

    // 6. EMERGENCY & CRITICAL
    if (q.includes("emergency") || q.includes("critical") || q.includes("danger") || q.includes("bad")) 
      return "ALERT PROTOCOL: If Velocity hits 4.0 m/s or Gradient exceeds 40 mmHg, I will trigger a high-priority RPA alert to the on-call surgical team.";

    // 7. DEVELOPER / META
    if (q.includes("coding") || q.includes("react") || q.includes("gemini")) 
      return "This interface is running on React with a mock-inference engine to ensure 0ms latency during your demonstration.";

    // DEFAULT FALLBACK (Universal Response)
    return "Query analyzed. Hemodynamic metrics remain in the healthy range. Would you like a detailed breakdown of the Valve Area or the Stenosis risk index?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Realistic "AI Thinking" delay
    setTimeout(() => {
      const botText = generateMockResponse(currentInput);
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[550px] bg-[#020617] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col border border-white/10 overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* HEADER */}
          <div className="bg-cyan-500 p-5 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3 text-black font-black uppercase text-[10px] tracking-[0.2em]">
              <div className="bg-black p-1.5 rounded-lg text-cyan-400 shadow-inner">
                <Activity size={18} />
              </div>
              EchoAura v3.0 Core
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:rotate-90 transition-transform">
              <X size={20} />
            </button>
          </div>
          
          {/* CHAT AREA */}
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/40 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-4 rounded-2xl max-w-[85%] text-[11px] leading-relaxed transition-all shadow-sm ${
                  m.role === 'bot' 
                  ? 'bg-slate-900 text-slate-200 border border-white/5 rounded-bl-none' 
                  : 'bg-cyan-500 text-black font-bold rounded-br-none shadow-md border-b-2 border-cyan-600'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[9px] tracking-widest animate-pulse ml-1">
                <Loader2 size={12} className="animate-spin" />
                ANALYZING_TELEMETRY...
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="p-4 bg-slate-900 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query heart telemetry..." 
              className="bg-black text-white text-[11px] flex-1 outline-none border border-white/10 p-3 rounded-xl focus:border-cyan-500 transition-all placeholder:text-slate-700"
            />
            <button 
              onClick={handleSend} 
              className="bg-cyan-500 p-3 rounded-xl text-black hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-cyan-500 rounded-2xl shadow-[0_15px_40px_rgba(6,182,212,0.4)] flex items-center justify-center text-black hover:scale-110 transition-all border-4 border-[#020617] group"
        >
          <MessageSquareCode size={30} className="group-hover:-rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-black"></span>
          </span>
        </button>
      )}
    </div>
  );
}