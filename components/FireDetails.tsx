
import React from 'react';
import { Language, translations } from '../i18n';
import { SafetyAlert } from '../types';

interface FireDetailsProps {
  lang: Language;
  alerts: SafetyAlert[];
  onBack: () => void;
}

const FireDetails: React.FC<FireDetailsProps> = ({ lang, alerts, onBack }) => {
  const t = translations[lang];
  const fireAlerts = alerts.filter(a => a.type === 'FIRE');

  return (
    <div className="space-y-12 animate-fadeIn pb-20 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-96 bg-red-600/10 blur-[150px] -z-10"></div>

      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-4 glass rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-3 border-red-500/20"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase tracking-widest">{t.back}</span>
        </button>
      </div>

      <div className="flex items-center gap-8">
        <div className="w-24 h-24 bg-red-600 rounded-[32px] text-white flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.5)] border-4 border-white/20">
          <i className="fa-solid fa-fire text-5xl"></i>
        </div>
        <div>
          <h2 className="text-6xl font-[900] tracking-tighter uppercase text-white italic">{t.fire}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-flicker shadow-[0_0_10px_#ef4444]"></span>
            <p className="text-red-500 font-black uppercase text-xs tracking-widest">{t.underControl}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-12 rounded-[48px] bg-red-950/20 border border-red-500/20 space-y-10 backdrop-blur-3xl shadow-2xl">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-sm font-black uppercase tracking-widest text-slate-400">{t.smoke}</span>
                 <span className="text-4xl font-black text-white">5%</span>
              </div>
              <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 w-[5%] shadow-[0_0_15px_#ef4444]"></div>
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-sm font-black uppercase tracking-widest text-slate-400">{t.temp}</span>
                 <span className="text-4xl font-black text-white">24°C</span>
              </div>
              <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                 <div className="h-full bg-gradient-to-r from-red-500 to-red-800 w-[45%] shadow-[0_0_15px_#ef4444]"></div>
              </div>
           </div>
        </div>

        <div className="p-12 rounded-[48px] bg-red-600/10 border border-red-500/30 flex flex-col justify-center gap-10">
           <h3 className="text-2xl font-black uppercase tracking-tighter text-red-500">Fast Response</h3>
           <button onClick={() => window.open('tel:112')} className="w-full py-8 btn-fire text-white rounded-[28px] font-black text-2xl shadow-2xl uppercase tracking-tighter border-2 border-white/10 active:scale-95">
             {t.call112}
           </button>
           <div className="flex gap-4">
             <button className="flex-1 py-5 glass border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">
               {t.alarmToggle}
             </button>
             <button className="p-5 glass border-red-500/20 text-white rounded-2xl">
               <i className="fa-solid fa-ellipsis"></i>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FireDetails;
