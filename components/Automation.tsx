
import React from 'react';
import { Language, translations } from '../i18n';

interface AutomationProps {
  lang: Language;
  onBack: () => void;
}

const Automation: React.FC<AutomationProps> = ({ lang, onBack }) => {
  const t = translations[lang];

  const rules = [
    { id: 1, title: 'Night Guard', desc: 'Turn on all lights if fire detected', active: true, icon: 'fa-moon' },
    { id: 2, title: 'Flood Stop', desc: 'Close main valve if moisture > 50%', active: true, icon: 'fa-water' },
    { id: 3, title: 'Power Cut', desc: 'Cut electricity in emergency', active: false, icon: 'fa-plug' },
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 flex items-center gap-3">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase">{t.back}</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-purple-600 rounded-[28px] text-white flex items-center justify-center shadow-2xl">
          <i className="fa-solid fa-bolt text-4xl"></i>
        </div>
        <div>
          <h2 className="text-5xl font-[900] tracking-tighter uppercase text-white">{t.automation}</h2>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em]">Smart Safety Rules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rules.map(rule => (
          <div key={rule.id} className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col gap-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${rule.active ? 'bg-purple-500/20 text-purple-500' : 'bg-slate-800 text-slate-500'}`}>
              <i className={`fa-solid ${rule.icon}`}></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{rule.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{rule.desc}</p>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className={`text-[10px] font-black uppercase tracking-widest ${rule.active ? 'text-emerald-500' : 'text-slate-600'}`}>
                {rule.active ? 'Active' : 'Disabled'}
              </span>
              <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${rule.active ? 'bg-purple-600' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${rule.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Automation;
