
import React from 'react';
import { AppTab } from '../types';
import { Language, translations } from '../i18n';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const t = translations[lang];
  
  const menuItems = [
    { id: AppTab.DASHBOARD, label: t.dashboard, icon: 'fa-house-chimney' },
    { id: AppTab.FIRE_DETAIL, label: t.fire, icon: 'fa-fire' },
    { id: AppTab.WATER_DETAIL, label: t.water, icon: 'fa-droplet' },
    { id: AppTab.ALERTS, label: t.alertHistory, icon: 'fa-list-ul' },
    { id: AppTab.LIVE_EXPERT, label: t.liveExpert, icon: 'fa-microphone-lines' },
    { id: AppTab.DEVICES, label: t.devices, icon: 'fa-microchip' },
    { id: AppTab.RISK_ANALYZER, label: t.riskAnalyzer, icon: 'fa-brain' },
    { id: AppTab.BUSINESS, label: t.business, icon: 'fa-briefcase' },
    { id: AppTab.SETTINGS, label: t.settings, icon: 'fa-gears' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 border-r border-white/5 bg-[#020617] relative z-50">
      <div className="p-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-[20px] flex items-center justify-center text-white shadow-2xl shadow-red-900/30">
            <i className="fa-solid fa-shield-heart text-2xl"></i>
          </div>
          <div>
            <h1 className="font-[900] text-2xl leading-none tracking-tight text-white">{t.homeName}</h1>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.2em] font-black">Xavfsizlik Qatlami</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-10 py-4 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-5 px-5 py-5 rounded-[24px] transition-all duration-300 group relative ${
              activeTab === item.id 
                ? 'bg-white/5 text-white' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 w-1.5 h-6 bg-red-600 rounded-r-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
            )}
            <i className={`fa-solid ${item.icon} text-xl w-6 transition-transform group-hover:scale-110`}></i>
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-10 py-10 border-t border-white/5 space-y-6">
        {/* Language Selection */}
        <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5">
          {(['uz', 'ru', 'en'] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex-1 py-2 rounded-[12px] text-[11px] font-[800] uppercase transition-all ${lang === l ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {l}
            </button>
          ))}
        </div>
        
        <p className="text-[10px] text-slate-600 font-black text-center uppercase tracking-widest opacity-50">{t.homeName} v2.5 Premium</p>
      </div>
    </aside>
  );
};

export default Sidebar;
