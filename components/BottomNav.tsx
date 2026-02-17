
import React from 'react';
import { AppTab } from '../types';
import { Language, translations } from '../i18n';

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, lang }) => {
  const t = translations[lang];

  const items = [
    { id: AppTab.DASHBOARD, icon: 'fa-house-chimney', label: t.dashboard },
    { id: AppTab.FIRE_DETAIL, icon: 'fa-fire', label: t.fire },
    { id: AppTab.WATER_DETAIL, icon: 'fa-droplet', label: t.water },
    { id: AppTab.ALERTS, icon: 'fa-list-ul', label: t.alertHistory },
    { id: AppTab.SETTINGS, icon: 'fa-gears', label: t.settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[150]">
      <div className="bg-[#0f172a]/60 backdrop-blur-3xl border border-white/10 rounded-[30px] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-[20px] transition-all duration-300 ${
              activeTab === item.id ? 'bg-white/10 text-white' : 'text-slate-500'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
