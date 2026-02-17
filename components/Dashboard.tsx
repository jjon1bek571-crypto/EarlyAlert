
import React from 'react';
import { SafetyAlert, AppTab } from '../types';
import { Language, translations } from '../i18n';

interface DashboardProps {
  alerts: SafetyAlert[];
  lang: Language;
  onTriggerDemo: (type: 'FIRE' | 'WATER') => void;
  setActiveTab: (tab: AppTab) => void;
  onShowIntro: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ alerts, lang, onTriggerDemo, setActiveTab, onShowIntro }) => {
  const t = translations[lang];
  const hasCritical = alerts.some(a => a.severity === 'CRITICAL');

  const categories = [
    { id: AppTab.ALERTS, icon: 'fa-clock-rotate-left', label: t.alertHistory, color: 'text-amber-500', glow: 'hover:border-amber-500/30' },
    { id: AppTab.LIVE_EXPERT, icon: 'fa-microphone-lines', label: t.liveExpert, color: 'text-rose-500', glow: 'hover:border-rose-500/30' },
    { id: AppTab.DEVICES, icon: 'fa-microchip', label: t.devices, color: 'text-indigo-500', glow: 'hover:border-indigo-500/30' },
    { id: AppTab.RISK_ANALYZER, icon: 'fa-brain', label: t.riskAnalyzer, color: 'text-emerald-500', glow: 'hover:border-emerald-500/30' },
    { id: AppTab.AUTOMATION, icon: 'fa-bolt', label: t.automation, color: 'text-purple-500', glow: 'hover:border-purple-500/30' },
    { id: AppTab.COMMUNITY, icon: 'fa-users', label: t.community, color: 'text-sky-500', glow: 'hover:border-sky-500/30' },
    { id: AppTab.ACADEMY, icon: 'fa-graduation-cap', label: t.academy, color: 'text-orange-500', glow: 'hover:border-orange-500/30' },
    { id: AppTab.BUSINESS, icon: 'fa-briefcase', label: t.business, color: 'text-slate-400', glow: 'hover:border-slate-500/30' }
  ];

  return (
    <div className="space-y-10 md:space-y-16 pb-28 px-2 md:px-0">
      {/* WELCOME BANNER */}
      <div className="p-8 md:p-14 rounded-[40px] md:rounded-[56px] bg-gradient-to-br from-slate-900 to-black border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-125 transition-transform duration-1000">
           <i className="fa-solid fa-shield-heart text-[150px]"></i>
        </div>
        <div className="relative z-10 space-y-6">
           <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-600/20 text-red-500 text-[8px] font-black rounded-full border border-red-500/20 tracking-[0.2em] uppercase">V2.5 Live</span>
              <button onClick={onShowIntro} className="text-[8px] font-black text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
                <i className="fa-solid fa-circle-question"></i>
                {lang === 'uz' ? "TANISHUV SAYOHATI" : (lang === 'ru' ? "ОБУЧЕНИЕ" : "START TOUR")}
              </button>
           </div>
           <h1 className="text-3xl md:text-6xl font-[900] text-white tracking-tighter uppercase italic leading-tight">{t.welcomeTitle}</h1>
           <p className="max-w-xl text-slate-400 font-bold uppercase text-[9px] md:text-[12px] tracking-widest leading-relaxed opacity-80">
             {t.welcomeSubtitle}
           </p>
           <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => setActiveTab(AppTab.DEVICES)} className="px-6 md:px-10 py-4 md:py-6 bg-red-600 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all">
                {t.getStarted}
              </button>
              <button onClick={() => setActiveTab(AppTab.ACADEMY)} className="px-6 md:px-10 py-4 md:py-6 glass rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white border-white/10 hover:bg-white/10 active:scale-95 transition-all">
                {t.academy}
              </button>
           </div>
        </div>
      </div>

      {/* STATUS CENTER */}
      <div className="flex flex-col items-center justify-center pt-4">
        <div className="relative group scale-75 md:scale-100">
          <div className={`absolute -inset-14 rounded-full blur-[100px] opacity-20 animate-pulse ${hasCritical ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
          <div className={`w-60 h-60 md:w-80 md:h-80 rounded-full border-[1px] flex flex-col items-center justify-center gap-2 bg-[#0f172a]/40 backdrop-blur-3xl shadow-2xl z-10 relative transition-colors duration-700 ${hasCritical ? 'border-red-500/30' : 'border-emerald-500/30'}`}>
            <i className={`fa-solid ${hasCritical ? 'fa-triangle-exclamation text-red-500' : 'fa-shield-check text-emerald-500'} text-5xl md:text-8xl mb-4`}></i>
            <h2 className="text-2xl md:text-5xl font-[900] tracking-tighter text-white uppercase italic text-center px-4 leading-none">{hasCritical ? t.criticalAlert : t.safe}</h2>
            <p className="text-[8px] md:text-[11px] uppercase tracking-[0.4em] font-[800] text-slate-500 mt-2">{t.anyDanger}</p>
          </div>
        </div>
      </div>

      {/* PRIMARY STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div onClick={() => setActiveTab(AppTab.FIRE_DETAIL)} className="group p-1 bg-gradient-to-br from-red-500/20 to-transparent rounded-[40px] transition-all hover:scale-[1.02] cursor-pointer">
          <div className="relative h-full p-8 md:p-12 rounded-[39px] bg-slate-950 border border-white/5 overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-10 md:mb-14">
              <div className="p-5 md:p-6 bg-red-600 rounded-[24px] md:rounded-[28px] shadow-2xl">
                <i className="fa-solid fa-fire text-3xl md:text-4xl text-white"></i>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[9px] font-black border border-emerald-500/20 uppercase tracking-[0.2em]">{t.underControl}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-[900] mb-2 tracking-tighter text-white uppercase italic">{t.fire}</h3>
            <p className="text-slate-500 font-bold mb-8 md:mb-12 text-[10px] md:text-xs uppercase tracking-widest">24°C • {t.smoke} 5%</p>
            <div className="mt-auto flex gap-4">
               <button onClick={(e) => { e.stopPropagation(); onTriggerDemo('FIRE'); }} className="flex-1 py-4 md:py-5 bg-red-600/90 hover:bg-red-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Test Alert</button>
            </div>
          </div>
        </div>

        <div onClick={() => setActiveTab(AppTab.WATER_DETAIL)} className="group p-1 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[40px] transition-all hover:scale-[1.02] cursor-pointer">
          <div className="relative h-full p-8 md:p-12 rounded-[39px] bg-slate-950 border border-white/5 overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-10 md:mb-14">
              <div className="p-5 md:p-6 bg-blue-600 rounded-[24px] md:rounded-[28px] shadow-2xl">
                <i className="fa-solid fa-droplet text-3xl md:text-4xl text-white"></i>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[9px] font-black border border-emerald-500/20 uppercase tracking-[0.2em]">{t.active}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-[900] mb-2 tracking-tighter text-white uppercase italic">{t.water}</h3>
            <p className="text-slate-500 font-bold mb-8 md:mb-12 text-[10px] md:text-xs uppercase tracking-widest">{t.leakDetection}: 0.0 L/m</p>
            <div className="mt-auto flex gap-4">
               <button onClick={(e) => { e.stopPropagation(); onTriggerDemo('WATER'); }} className="flex-1 py-4 md:py-5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Test Alert</button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-4">
        {categories.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`group relative p-6 md:p-10 rounded-[32px] md:rounded-[40px] bg-slate-900/40 border border-white/5 hover:bg-slate-800 transition-all flex flex-col items-center gap-4 ${item.glow}`}
          >
            <i className={`fa-solid ${item.icon} text-2xl md:text-4xl ${item.color} group-hover:scale-110 transition-transform duration-500`}></i>
            <span className="text-[8px] md:text-[10px] font-[800] uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 text-center">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
