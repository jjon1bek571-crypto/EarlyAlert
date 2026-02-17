
import React from 'react';
import { Language, translations } from '../i18n';

interface CommunityProps {
  lang: Language;
  onBack: () => void;
}

const Community: React.FC<CommunityProps> = ({ lang, onBack }) => {
  const t = translations[lang];

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 flex items-center gap-3">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase">{t.back}</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-sky-600 rounded-[28px] text-white flex items-center justify-center shadow-2xl">
          <i className="fa-solid fa-users text-4xl"></i>
        </div>
        <div>
          <h2 className="text-5xl font-[900] tracking-tighter uppercase text-white">{t.community}</h2>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em]">Safety Network</p>
        </div>
      </div>

      <div className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 space-y-8">
        <div className="flex items-center justify-between">
           <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Trusted Contacts</h3>
           <button className="text-[10px] font-black uppercase text-sky-500">+ Add New</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {['Dad', 'Security Desk', 'Property Manager'].map(person => (
             <div key={person} className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
                  <span className="font-bold">{person}</span>
                </div>
                <i className="fa-solid fa-phone text-sky-500"></i>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
