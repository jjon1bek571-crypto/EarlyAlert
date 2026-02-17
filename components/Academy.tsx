
import React from 'react';
import { Language, translations } from '../i18n';
import { AppTab } from '../types';

interface AcademyProps {
  lang: Language;
  onBack: () => void;
  // Added to support navigation to manual
  setActiveTab?: (tab: AppTab) => void;
}

const Academy: React.FC<AcademyProps> = ({ lang, onBack, setActiveTab }) => {
  const t = translations[lang];

  const lessons = [
    { title: 'Fire Basics', level: 'Beginner', progress: 100, icon: 'fa-book-open' },
    { title: 'Evacuation 101', level: 'Intermediate', progress: 45, icon: 'fa-person-running' },
    { title: 'First Aid Kit', level: 'Expert', progress: 0, icon: 'fa-kit-medical' },
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
        <div className="w-20 h-20 bg-orange-600 rounded-[28px] text-white flex items-center justify-center shadow-2xl">
          <i className="fa-solid fa-graduation-cap text-4xl"></i>
        </div>
        <div>
          <h2 className="text-5xl font-[900] tracking-tighter uppercase text-white">{t.academy}</h2>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em]">Learn Life Saving Skills</p>
        </div>
      </div>

      {/* NEW BEGINNER HANDBOOK CARD - MOVED FROM DASHBOARD */}
      <div 
        onClick={() => setActiveTab && setActiveTab(AppTab.MANUAL)}
        className="p-10 rounded-[48px] bg-gradient-to-br from-orange-500/20 to-orange-900/10 border border-orange-500/30 flex flex-col md:flex-row items-center gap-10 cursor-pointer group hover:scale-[1.01] transition-all shadow-2xl shadow-orange-950/20"
      >
        <div className="w-24 h-24 bg-orange-600 rounded-[32px] flex items-center justify-center text-white text-5xl shadow-2xl group-hover:rotate-6 transition-transform">
          <i className="fa-solid fa-book-open"></i>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-[900] text-white uppercase italic tracking-tighter mb-2">{t.manualTitle}</h3>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] max-w-lg">{t.manualSubtitle}</p>
        </div>
        <button className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-orange-500 group-hover:text-white transition-all">
          {t.readManual}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {lessons.map(lesson => (
          <div key={lesson.title} className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 group hover:border-orange-500/20 transition-all">
             <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl text-orange-500 group-hover:scale-110 transition-transform">
                  <i className={`fa-solid ${lesson.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{lesson.title}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{lesson.level}</p>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Progress</span>
                  <span>{lesson.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${lesson.progress}%` }}></div>
                </div>
             </div>
             <button className="w-full mt-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">
               Start Lesson
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Academy;
