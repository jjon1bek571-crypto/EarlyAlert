
import React from 'react';
import { SafetyAlert, AppTab } from '../types';
import { Language, translations } from '../i18n';

interface DashboardProps {
  alerts: SafetyAlert[];
  lang: Language;
  onTriggerDemo: (type: 'FIRE' | 'WATER') => void;
  setActiveTab: (tab: AppTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ alerts, lang, onTriggerDemo, setActiveTab }) => {
  const t = translations[lang];
  const hasCritical = alerts.some(a => a.severity === 'CRITICAL');

  const categories = [
    { id: AppTab.ALERTS, icon: 'fa-clock-rotate-left', label: t.alertHistory, color: 'text-amber-500', glow: 'hover:border-amber-500/30' },
    { id: AppTab.DEVICES, icon: 'fa-microchip', label: t.devices, color: 'text-indigo-500', glow: 'hover:border-indigo-500/30' },
    { id: AppTab.RISK_ANALYZER, icon: 'fa-brain', label: t.riskAnalyzer, color: 'text-emerald-500', glow: 'hover:border-emerald-500/30' },
    { id: AppTab.AUTOMATION, icon: 'fa-bolt', label: t.automation, color: 'text-purple-500', glow: 'hover:border-purple-500/30' },
    { id: AppTab.COMMUNITY, icon: 'fa-users', label: t.community, color: 'text-sky-500', glow: 'hover:border-sky-500/30' },
    { id: AppTab.ACADEMY, icon: 'fa-graduation-cap', label: t.academy, color: 'text-orange-500', glow: 'hover:border-orange-500/30' },
    { id: AppTab.BUSINESS, icon: 'fa-briefcase', label: t.business, color: 'text-slate-400', glow: 'hover:border-slate-500/30' },
    { id: AppTab.SETTINGS, icon: 'fa-gears', label: t.settings, color: 'text-slate-500', glow: 'hover:border-slate-500/30' }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* STATUS CENTER */}
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="relative group">
          <div className={`absolute -inset-14 rounded-full blur-[100px] opacity-20 animate-pulse ${hasCritical ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
          <div className={`w-80 h-80 rounded-full border-[1px] flex flex-col items-center justify-center gap-2 bg-[#0f172a]/40 backdrop-blur-3xl shadow-2xl z-10 relative transition-colors duration-700 ${hasCritical ? 'border-red-500/30' : 'border-emerald-500/30'}`}>
            <i className={`fa-solid ${hasCritical ? 'fa-triangle-exclamation text-red-500' : 'fa-shield-check text-emerald-500'} text-8xl mb-4`}></i>
            <h2 className="text-5xl font-[900] tracking-tighter text-white">{hasCritical ? t.criticalAlert : t.safe}</h2>
            <p className="text-[11px] uppercase tracking-[0.4em] font-[800] text-slate-500 mt-2">{t.anyDanger}</p>
          </div>
        </div>
      </div>

      {/* PRIMARY STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div onClick={() => setActiveTab(AppTab.FIRE_DETAIL)} className="group p-1 bg-gradient-to-br from-red-500/20 to-transparent rounded-[40px] transition-all hover:scale-[1.02] cursor-pointer">
          <div className="relative h-full p-10 rounded-[39px] bg-slate-950 border border-white/5 overflow-hidden flex flex-col fire-glow">
            <div className="flex justify-between items-start mb-12">
              <div className="p-6 bg-red-600 rounded-[28px] shadow-2xl">
                <i className="fa-solid fa-fire text-4xl text-white"></i>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 px-5 py-2 rounded-full text-[10px] font-black border border-emerald-500/20 uppercase tracking-[0.2em]">{t.underControl}</span>
            </div>
            <h3 className="text-4xl font-[900] mb-2 tracking-tighter">{t.fire}</h3>
            <p className="text-slate-500 font-bold mb-10 text-lg">24°C • {t.smoke} 5%</p>
            <div className="mt-auto flex gap-4">
               <button onClick={(e) => { e.stopPropagation(); onTriggerDemo('FIRE'); }} className="flex-1 py-5 bg-red-600/90 hover:bg-red-600 text-white rounded-[22px] text-xs font-black uppercase tracking-[0.2em] shadow-xl">Test Alert</button>
            </div>
          </div>
        </div>

        <div onClick={() => setActiveTab(AppTab.WATER_DETAIL)} className="group p-1 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[40px] transition-all hover:scale-[1.02] cursor-pointer">
          <div className="relative h-full p-10 rounded-[39px] bg-slate-950 border border-white/5 overflow-hidden flex flex-col water-glow">
            <div className="flex justify-between items-start mb-12">
              <div className="p-6 bg-blue-600 rounded-[28px] shadow-2xl">
                <i className="fa-solid fa-droplet text-4xl text-white"></i>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 px-5 py-2 rounded-full text-[10px] font-black border border-emerald-500/20 uppercase tracking-[0.2em]">{t.active}</span>
            </div>
            <h3 className="text-4xl font-[900] mb-2 tracking-tighter">{t.water}</h3>
            <p className="text-slate-500 font-bold mb-10 text-lg">{t.leakDetection}: 0.0 L/m</p>
            <div className="mt-auto flex gap-4">
               <button onClick={(e) => { e.stopPropagation(); onTriggerDemo('WATER'); }} className="flex-1 py-5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-[0.2em] shadow-xl">Test Alert</button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
        {categories.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`group relative p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:bg-slate-800 transition-all flex flex-col items-center gap-4 ${item.glow}`}
          >
            <i className={`fa-solid ${item.icon} text-3xl ${item.color} group-hover:scale-110 transition-transform duration-500`}></i>
            <span className="text-[11px] font-[800] uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-300">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
