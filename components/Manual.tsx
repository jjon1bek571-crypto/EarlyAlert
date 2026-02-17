
import React from 'react';
import { Language, translations } from '../i18n';
import { AppTab } from '../types';

interface ManualProps {
  lang: Language;
  onBack: () => void;
  // Adding setActiveTab to return to Academy specifically
  setActiveTab?: (tab: AppTab) => void;
}

const Manual: React.FC<ManualProps> = ({ lang, onBack, setActiveTab }) => {
  const t = translations[lang];

  const handleReturn = () => {
    if (setActiveTab) {
      setActiveTab(AppTab.ACADEMY);
    } else {
      onBack();
    }
  };

  const chapters = [
    {
      title: t.manualStep1,
      desc: t.manualStep1Desc,
      icon: 'fa-gears',
      points: [
        'Kommunal hisoblagich raqamini kiriting.',
        'Sensorni gaz/suv klapaniga yaqin o\'rnating.',
        'Sinxronizatsiya tugmasini bosing.'
      ]
    },
    {
      title: t.manualStep2,
      desc: t.manualStep2Desc,
      icon: 'fa-tower-broadcast',
      points: [
        'Xavf aniqlanganda telefoningizga SOS xabar keladi.',
        'Tizim avtomatik ravishda klapanlarni yopadi.',
        '101 xizmati bilan aloqa o\'rnatiladi.'
      ]
    },
    {
      title: t.manualStep3,
      desc: t.manualStep3Desc,
      icon: 'fa-shield-heart',
      points: [
        'Har oy "Test Alert" tugmasi bilan tizimni tekshiring.',
        'Batareya quvvatini Devices bo\'limida nazorat qiling.',
        'Yangi dasturiy yangilanishlarni doim o\'rnating.'
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <button onClick={handleReturn} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 flex items-center gap-3">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase">{t.back}</span>
        </button>
      </div>

      <div className="text-center space-y-6 max-w-2xl mx-auto mb-10">
        <h2 className="text-4xl md:text-5xl font-[900] tracking-normal uppercase italic text-white leading-tight">
          {t.manualTitle}
        </h2>
        <p className="text-slate-500 font-bold uppercase text-[11px] md:text-[13px] tracking-[0.1em] leading-relaxed">
          {t.manualSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 max-w-4xl mx-auto">
        {chapters.map((chapter, idx) => (
          <div key={idx} className="p-10 rounded-[48px] bg-slate-900/40 border border-white/5 relative overflow-hidden group hover:border-orange-500/20 transition-all">
            <div className="absolute top-0 right-0 p-12 text-slate-800 opacity-20 group-hover:scale-110 transition-transform">
               <i className={`fa-solid ${chapter.icon} text-[100px]`}></i>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10">
              <div className="w-20 h-20 bg-orange-600 rounded-[28px] text-white flex items-center justify-center text-3xl shrink-0 shadow-2xl">
                <span className="font-black italic">{idx + 1}</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-[900] text-white uppercase italic tracking-normal mb-3 leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-slate-400 font-bold uppercase text-[11px] tracking-wide leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
                
                <ul className="space-y-4">
                  {chapter.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto pt-10">
        <button 
          onClick={handleReturn}
          className="w-full py-8 bg-white text-slate-950 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          {t.continueLesson}
        </button>
      </div>
    </div>
  );
};

export default Manual;
