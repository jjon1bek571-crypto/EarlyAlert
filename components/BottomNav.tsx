
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
    <div className="lg:hidden fixed bottom-6 left-4 right-4 z-[150] flex justify-center">
      <div className="w-full max-w-md bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] p-1.5 flex items-center justify-around shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-2 min-w-[64px] rounded-[24px] transition-all duration-500 relative ${
              activeTab === item.id 
                ? 'text-white bg-white/10' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {activeTab === item.id && (
              <span className="absolute -top-1 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></span>
            )}
            <i className={`fa-solid ${item.icon} text-lg ${activeTab === item.id ? 'scale-110' : 'scale-100'}`}></i>
            <span className="text-[7px] font-black uppercase tracking-wider text-center line-clamp-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
