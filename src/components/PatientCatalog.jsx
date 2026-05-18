import React from 'react';
import { Search, Plus, ChevronRight, Filter } from 'lucide-react';

export default function PatientCatalog({ onViewPatient }) {
  const patients = [
    { name: "Muhammad Irfan Bin Rosani", id: "MY-AOR-2026-8ADB9300-X", status: "POST-SURGERY", room: "ICU-04", bpmBase: 72, stability: "stable", condition: "Aortic Replacement" },
    { name: "Sarah Jane Connor", id: "US-CARD-2026-9XJ22199-B", status: "CRITICAL", room: "ER-02", bpmBase: 135, stability: "unstable", condition: "Tachycardia" },
    { name: "Ahmad Zaki Bin Abdul", id: "MY-VAL-2026-3KK88122-Z", status: "OBSERVATION", room: "Ward-B2", bpmBase: 58, stability: "stable", condition: "Bradycardia" },
    { name: "Elena Maria Gilbert", id: "US-POST-2026-5PP00911-A", status: "STABLE", room: "Ward-A1", bpmBase: 75, stability: "stable", condition: "Recovery" },
    { name: "Tan Wei Meng", id: "MY-MIT-2026-4NN11044-C", status: "CRITICAL", room: "ICU-01", bpmBase: 118, stability: "unstable", condition: "Mitral Regurgitation" },
    { name: "John David Miller", id: "US-STE-2026-7RR55211-M", status: "POST-SURGERY", room: "CCU-03", bpmBase: 88, stability: "stable", condition: "Aortic Stenosis" },
    { name: "Nirmala Devi a/p Rajan", id: "MY-CHD-2026-2BB99433-Y", status: "OBSERVATION", room: "Ward-C5", bpmBase: 64, stability: "stable", condition: "Coronary Heart Disease" },
    { name: "Bruce Wayne Kent", id: "US-ARR-2026-1LL33877-K", status: "CRITICAL", room: "ER-01", bpmBase: 142, stability: "unstable", condition: "Arrhythmia" },
    { name: "Siti Aminah Binti Mansor", id: "MY-AOR-2026-9FF22311-D", status: "STABLE", room: "Ward-D3", bpmBase: 68, stability: "stable", condition: "Aortic Ectasia" },
    { name: "David Robert Jones", id: "US-VAL-2026-4QQ88322-F", status: "POST-SURGERY", room: "CCU-01", bpmBase: 82, stability: "stable", condition: "Mitral Valve Repair" },
    { name: "Ling Mee Hua", id: "MY-STE-2026-6ZZ55911-H", status: "CRITICAL", room: "ICU-02", bpmBase: 124, stability: "unstable", condition: "Tricuspid Stenosis" },
    { name: "Robert Allen Clarke", id: "US-CHD-2026-3XX44199-L", status: "OBSERVATION", room: "Ward-A4", bpmBase: 70, stability: "stable", condition: "Ischemic Cardiomyopathy" },
    { name: "Ramasamy a/l Subramaniam", id: "MY-ARR-2026-5DD00233-W", status: "CRITICAL", room: "ER-04", bpmBase: 155, stability: "unstable", condition: "Atrial Fibrillation" },
    { name: "Emily Sophia Watson", id: "US-AOR-2026-8EE77411-Q", status: "POST-SURGERY", room: "ICU-06", bpmBase: 76, stability: "stable", condition: "Root Reconstruction" },
    { name: "Khairul Anuar Bin Zakaria", id: "MY-CARD-2026-1AA33088-M", status: "STABLE", room: "Ward-B1", bpmBase: 72, stability: "stable", condition: "Hypertension Control" },
    { name: "Jessica Lynn Miller", id: "US-MIT-2026-2VV99411-N", status: "OBSERVATION", room: "Ward-C2", bpmBase: 92, stability: "stable", condition: "Mitral Valve Prolapse" },
    { name: "Chong Wei Sheng", id: "MY-VAL-2026-7BB66822-P", status: "POST-SURGERY", room: "Ward-D1", bpmBase: 80, stability: "stable", condition: "Pulmonary Valvuloplasty" },
    { name: "Michael Thomas Shell", id: "US-STE-2026-9NN22144-R", status: "CRITICAL", room: "ICU-03", bpmBase: 110, stability: "unstable", condition: "Severe Calcific Stenosis" },
    { name: "Fatimatul Zahrah Binti Ali", id: "MY-POST-2026-3HH44811-S", status: "STABLE", room: "Ward-A2", bpmBase: 65, stability: "stable", condition: "Post-Infarct Follow-up" },
    { name: "James Alexander Kirk", id: "US-ARR-2026-5JJ00111-T", status: "OBSERVATION", room: "Ward-B4", bpmBase: 52, stability: "stable", condition: "Sinus Bradycardia" },
    { name: "Arumugam a/l Palani", id: "MY-CHD-2026-6KK77344-U", status: "CRITICAL", room: "ER-03", bpmBase: 130, stability: "unstable", condition: "Acute Coronary Syndrome" },
    { name: "Diana Prince Trevor", id: "US-AOR-2026-1MM22399-V", status: "POST-SURGERY", room: "ICU-05", bpmBase: 74, stability: "stable", condition: "Ascending Aorta Graft" },
    { name: "Nurul Hidayah Binti Idris", id: "MY-MIT-2026-4CC99011-W", status: "STABLE", room: "Ward-C1", bpmBase: 71, stability: "stable", condition: "Mild Mitral Leak" },
    { name: "Christopher Nolan Fox", id: "US-VAL-2026-9UU88211-X", status: "OBSERVATION", room: "Ward-D4", bpmBase: 85, stability: "stable", condition: "Aortic Insufficiency" },
    { name: "Teoh Kah Hin", id: "MY-STE-2026-2LL55433-Y", status: "CRITICAL", room: "CCU-04", bpmBase: 115, stability: "unstable", condition: "Subaortic Stenosis" },
    { name: "Arthur Joseph Curry", id: "US-CARD-2026-7YY33111-Z", status: "POST-SURGERY", room: "Ward-B3", bpmBase: 78, stability: "stable", condition: "Septal Myectomy" },
    { name: "Mohd Shukri Bin Hashim", id: "MY-ARR-2026-3WW11922-A", status: "OBSERVATION", room: "Ward-A3", bpmBase: 98, stability: "stable", condition: "Paroxysmal SVT" },
    { name: "Rachel Amber Green", id: "US-CHD-2026-6QQ44811-B", status: "STABLE", room: "Ward-C3", bpmBase: 63, stability: "stable", condition: "Stable Angina" },
    { name: "Zulkifli Bin Abdul Rahman", id: "MY-AOR-2026-5PP00477-D", status: "CRITICAL", room: "ICU-08", bpmBase: 122, stability: "unstable", condition: "Dissecting Aortic Aneurysm" },
    { name: "Matthew Murdock Nelson", id: "US-MIT-2026-8ZZ22133-F", status: "POST-SURGERY", room: "CCU-02", bpmBase: 84, stability: "stable", condition: "Double Valve Replacement" },
    { name: "Lim Siew Hoon", id: "MY-VAL-2026-1XX99822-G", status: "STABLE", room: "Ward-E1", bpmBase: 70, stability: "stable", condition: "Bicuspid Aortic Monitoring" },
    { name: "Katherine Marie Pierce", id: "US-STE-2026-4SS44122-J", status: "OBSERVATION", room: "Ward-D2", bpmBase: 79, stability: "stable", condition: "Idiopathic Hypertrophic Stenosis" },
    { name: "Syed Muhammad Al-Attas", id: "MY-CARD-2026-9DD55411-K", status: "CRITICAL", room: "ER-05", bpmBase: 140, stability: "unstable", condition: "Ventricular Tachycardia" },
    { name: "Tony Edward Stark", id: "US-POST-2026-2EE00933-L", status: "POST-SURGERY", room: "ICU-07", bpmBase: 90, stability: "stable", condition: "Pacemaker Implantation" },
    { name: "Pavithra d/o Ganesan", id: "MY-CHD-2026-7FF11299-N", status: "STABLE", room: "Ward-B5", bpmBase: 67, stability: "stable", condition: "Microvascular Disease" },
    { name: "Clark Joseph Kent", id: "US-ARR-2026-3AA33811-P", status: "OBSERVATION", room: "Ward-C4", bpmBase: 48, stability: "stable", condition: "Heart Block Type II" },
    { name: "Azlan Shah Bin Kamaruddin", id: "MY-VAL-2026-6VV88411-Q", status: "CRITICAL", room: "ICU-09", bpmBase: 105, stability: "unstable", condition: "Flail Leaflet Syndrome" },
    { name: "Natasha Romanoff Rush", id: "US-AOR-2026-1KK22099-R", status: "POST-SURGERY", room: "Ward-A5", bpmBase: 73, stability: "stable", condition: "Coarctation Repair" },
    { name: "Ng Thiam Hock", id: "MY-MIT-2026-4JJ55211-T", status: "OBSERVATION", room: "Ward-E2", bpmBase: 86, stability: "stable", condition: "Rheumatic Mitral Disease" },
    { name: "Selina Kyle Kyle", id: "US-STE-2026-8RR99344-V", status: "STABLE", room: "Ward-D5", bpmBase: 71, stability: "stable", condition: "Degenerative Valve Disease" }
  ];

  return (
    <div className="p-8 space-y-8 bg-[#020617] min-h-screen text-slate-100 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Registry</h1>
            <p className="text-slate-500 font-medium font-mono text-xs tracking-widest mt-1">Hospital Management System • Total: {patients.length}</p>
          </div>
          <button className="bg-cyan-500 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-cyan-400 transition-colors">
            <Plus size={18} strokeWidth={3} /> New Admission
          </button>
        </div>

        {/* DATA CONTAINER */}
        <div className="bg-slate-900/30 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-md">
          {/* MAX HEIGHT SCROLL CONTAINER */}
          <div className="max-h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <table className="w-full text-center border-collapse relative">
              <thead className="sticky top-0 bg-[#0b1329] z-20 shadow-md">
                <tr className="border-b border-white/5">
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-left pl-12">Patient Name</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Full Medical ID</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Current Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Unit</th>
                  <th className="p-6 pr-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {patients.map((p, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6 font-bold text-white text-md text-left pl-12">
                      <div>
                        {p.name}
                        <span className="block md:hidden text-[10px] text-slate-500 font-mono mt-0.5">{p.condition}</span>
                      </div>
                    </td>
                    <td className="p-6 font-mono text-xs text-slate-500 tracking-tighter">{p.id}</td>
                    <td className="p-6">
                      <span className={`text-[10px] font-black px-4 py-1 rounded-full border inline-block min-w-[120px] text-center uppercase tracking-wide ${
                        p.status === 'CRITICAL' ? 'border-red-500 text-red-400 bg-red-500/10' :
                        p.status === 'POST-SURGERY' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' :
                        p.status === 'OBSERVATION' ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' :
                        'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-400">{p.room}</td>
                    <td className="p-6 pr-12 text-right">
                      <button 
                        onClick={() => onViewPatient(p)}
                        className="p-3 bg-slate-800 rounded-full hover:bg-cyan-500 hover:text-black transition-all group-hover:scale-105"
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
    </div>
  );
}