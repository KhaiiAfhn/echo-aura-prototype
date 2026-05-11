import React, { useState, useRef } from 'react';
import { Upload, FileSearch, Activity, Wind, Timer, AlertTriangle, X, Image as ImageIcon } from 'lucide-react';

export default function AiDiagnostics() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResults(null); // Clear previous results when new image is added
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleRunAnalysis = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    
    // Simulating AI Processing (Segmentation, Flow Recognition, Timing)
    setTimeout(() => {
      setResults({
        efficiency: "88%",
        jetFlow: "Trace Regurgitation Detected",
        timing: "Normal Cycle (0.8s)",
        classification: "Mild Dysfunction",
        statusColor: "text-yellow-400",
        bgColor: "bg-yellow-950/30",
        borderColor: "border-yellow-500/20"
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResults(null);
  };

  return (
    <div className="p-8 space-y-6 bg-[#020617] min-h-screen text-slate-100">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase">AI Analyzer Core</h1>
          <p className="text-slate-400 font-medium font-mono text-xs">2D Echo • Doppler Waveform • Jet Flow Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* LEFT SIDE: UPLOAD & PREVIEW */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-center min-h-[450px] relative overflow-hidden">
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />

            {!selectedImage ? (
              <div className="flex flex-col items-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-white/5 shadow-xl">
                  <Upload className="text-cyan-400" size={32} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Input Clinical Data</h2>
                <p className="text-slate-400 text-sm mb-8 px-12 max-w-md">
                  Upload your 2D Echo images or Doppler waveforms to begin AI-assisted classification.
                </p>
                <button 
                  onClick={triggerUpload}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-white/10 transition-all"
                >
                  Select Scan File
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center relative animate-in zoom-in-95 duration-300">
                <button 
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors z-10"
                >
                  <X size={16} className="text-white" />
                </button>
                <img 
                  src={selectedImage} 
                  alt="Scan Preview" 
                  className="max-h-[350px] rounded-2xl border border-white/10 shadow-2xl object-contain bg-black/40"
                />
                <p className="mt-4 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Image Loaded into Buffer</p>
              </div>
            )}
            
            {/* OVERLAY FOR ANALYSIS */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-[#020617]/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-cyan-400 font-black tracking-widest text-xs uppercase">Processing Neural Layers...</p>
              </div>
            )}
          </div>

          {/* CONTROL BUTTON */}
          {selectedImage && !results && (
            <button 
              onClick={handleRunAnalysis} 
              disabled={isAnalyzing}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-lg shadow-cyan-500/20"
            >
              Analyze Cardiac Morphology
            </button>
          )}

          {/* AI PROCESSING STAGES */}
          <div className="grid grid-cols-3 gap-4">
            <ProcessCard label="Segmentation" active={isAnalyzing} icon={<Activity size={14}/>} />
            <ProcessCard label="Flow Pattern" active={isAnalyzing} icon={<Wind size={14}/>} />
            <ProcessCard label="Timing Logic" active={isAnalyzing} icon={<Timer size={14}/>} />
          </div>
        </div>

        {/* RIGHT SIDE: OUTPUT LAYER */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 shadow-2xl h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <FileSearch className="text-cyan-400" size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diagnostic Output</h3>
            </div>

            {results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                
                {/* CLASSIFICATION TICKET */}
                <div className={`${results.bgColor} ${results.borderColor} border p-6 rounded-2xl text-center`}>
                  <p className="text-[10px] text-slate-400 font-mono uppercase mb-1">AI Classification</p>
                  <div className={`text-4xl font-black tracking-tighter ${results.statusColor}`}>
                    {results.classification}
                  </div>
                </div>

                <div className="space-y-3">
                  <OutputRow label="Opening Efficiency" value={results.efficiency} />
                  <OutputRow label="Jet Flow Pattern" value={results.jetFlow} />
                  <OutputRow label="Cycle Timing" value={results.timing} />
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      "Image segmentation indicates mild narrowing at the valve orifice. Doppler waveform shows minor velocity acceleration consistent with Grade 1 dysfunction."
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center opacity-20">
                <ImageIcon size={48} className="mb-4" />
                <p className="text-sm font-mono uppercase tracking-widest">Waiting for Scan Data</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// UI SUB-COMPONENTS
function ProcessCard({ label, active, icon }) {
  return (
    <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${active ? 'bg-cyan-500/10 border-cyan-500/50 animate-pulse' : 'bg-slate-900 border-white/5'}`}>
      <div className={active ? 'text-cyan-400' : 'text-slate-500'}>{icon}</div>
      <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'text-cyan-400' : 'text-slate-500'}`}>
        {label}
      </span>
    </div>
  );
}

function OutputRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5">
      <span className="text-[10px] text-slate-500 font-mono uppercase">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}