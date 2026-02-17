
import React from 'react';
import { Language, translations } from '../i18n';

interface SettingsProps {
  lang: Language;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ lang, onBack }) => {
  const t = translations[lang];

  return (
    <div className="space-y-12 animate-fadeIn max-w-2xl pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 flex items-center gap-3">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase">{t.back}</span>
        </button>
      </div>

      <h2 className="text-5xl font-[900] tracking-tighter uppercase">{t.settings}</h2>

      <div className="space-y-6">
        <div className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 flex items-center justify-between">
           <div>
              <p className="font-bold text-lg">{t.notifications}</p>
              <p className="text-xs text-slate-500">Push xabarnomalar</p>
           </div>
           <div className="w-14 h-7 bg-emerald-600 rounded-full relative p-1 cursor-pointer">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
           </div>
        </div>

        <div className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 flex items-center justify-between">
           <div>
              <p className="font-bold text-lg">{t.darkMode}</p>
              <p className="text-xs text-slate-500">Asosiy dizayn stili</p>
           </div>
           <div className="w-14 h-7 bg-slate-800 rounded-full relative p-1 cursor-pointer border border-white/10">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
           </div>
        </div>

        <div className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 space-y-4">
           <div>
              <p className="font-bold text-lg">{t.emergencyContact}</p>
              <p className="text-xs text-slate-500">Xavf aniqlanganda qo'ng'iroq qilinadi</p>
           </div>
           <input 
             type="tel" 
             defaultValue="+998 90 123 45 67"
             className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-lg font-bold focus:ring-2 focus:ring-red-500 outline-none" 
           />
        </div>
      </div>
    </div>
  );
};

export default Settings;
