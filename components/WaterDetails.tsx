
import React, { useState } from 'react';
import { Language, translations } from '../i18n';
import { SafetyAlert } from '../types';

interface WaterDetailsProps {
  lang: Language;
  alerts: SafetyAlert[];
  onBack: () => void;
}

const WaterDetails: React.FC<WaterDetailsProps> = ({ lang, alerts, onBack }) => {
  const t = translations[lang];
  const [valveOpen, setValveOpen] = useState(true);

  return (
    <div className="space-y-12 animate-fadeIn pb-20 relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-full h-96 bg-blue-600/10 blur-[150px] -z-10"></div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-4 glass rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-3 border-blue-500/20">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase tracking-widest">{t.back}</span>
        </button>
      </div>

      <div className="flex items-center gap-8">
        <div className="w-24 h-24 bg-blue-600 rounded-[32px] text-white flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] border-4 border-white/20">
          <i className="fa-solid fa-droplet text-5xl"></i>
        </div>
        <div>
          <h2 className="text-6xl font-[900] tracking-tighter uppercase text-white italic">{t.water}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
            <p className="text-blue-500 font-black uppercase text-xs tracking-widest">{t.active}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-12 rounded-[48px] bg-blue-950/20 border border-blue-500/20 space-y-10 backdrop-blur-3xl shadow-2xl">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-sm font-black uppercase tracking-widest text-slate-400">{t.humidity}</span>
                 <span className="text-4xl font-black text-white">12%</span>
              </div>
              <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[12%] shadow-[0_0_15px_#3b82f6]"></div>
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-sm font-black uppercase tracking-widest text-slate-400">{t.flow}</span>
                 <span className="text-4xl font-black text-white">0.0 L/m</span>
              </div>
              <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[0%]"></div>
              </div>
           </div>
        </div>

        <div className="p-12 rounded-[48px] bg-blue-600/10 border border-blue-500/30 flex flex-col justify-center gap-10">
           <h3 className="text-2xl font-black uppercase tracking-tighter text-blue-500">{t.valveStatus}</h3>
           <div className="p-8 bg-black/40 rounded-[28px] border border-white/5 flex items-center justify-between">
             <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Status</p>
                <p className="font-black text-2xl text-white">{valveOpen ? 'NOMINAL' : 'CLOSED'}</p>
             </div>
             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${valveOpen ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                <i className={`fa-solid ${valveOpen ? 'fa-check' : 'fa-xmark'} text-xl`}></i>
             </div>
           </div>
           <button 
             onClick={() => setValveOpen(!valveOpen)}
             className={`w-full py-7 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] transition-all border-2 border-white/10 active:scale-95 ${valveOpen ? 'btn-fire' : 'btn-water'}`}
           >
             {valveOpen ? t.closeValve : t.openValve}
           </button>
        </div>
      </div>
    </div>
  );
};

export default WaterDetails;
