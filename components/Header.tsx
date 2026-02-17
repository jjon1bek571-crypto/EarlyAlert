
import React from 'react';
import { AppTab } from '../types';
import { Language, translations } from '../i18n';

interface HeaderProps {
  activeTab: AppTab;
  lang: Language;
  lastUpdate: Date;
}

const Header: React.FC<HeaderProps> = ({ activeTab, lang, lastUpdate }) => {
  const t = translations[lang];

  return (
    <header className="h-24 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-10">
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-white mb-1">{t.homeName}</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          {t.lastUpdated}: {lastUpdate.toLocaleTimeString()}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">{t.active}</p>
        </div>
        
        <div className="h-12 w-12 rounded-2xl border-2 border-slate-800 bg-slate-800 flex items-center justify-center overflow-hidden">
          <img src="https://picsum.photos/seed/66/100/100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;
