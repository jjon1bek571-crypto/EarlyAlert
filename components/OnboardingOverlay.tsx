
import React, { useState } from 'react';
import { Language, translations } from '../i18n';

interface OnboardingOverlayProps {
  lang: Language;
  onClose: () => void;
  onReadManual?: () => void;
}

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ lang, onClose, onReadManual }) => {
  const t = translations[lang];
  const [step, setStep] = useState(0);

  const steps = [
    { 
      title: t.step1Title, 
      desc: t.step1Desc, 
      icon: 'fa-layer-group',
      color: 'bg-indigo-600/10 text-indigo-500 border-indigo-500/20'
    },
    { 
      title: t.step2Title, 
      desc: t.step2Desc, 
      icon: 'fa-shield-halved',
      color: 'bg-emerald-600/10 text-emerald-500 border-emerald-500/20'
    },
    { 
      title: t.step3Title, 
      desc: t.step3Desc, 
      icon: 'fa-tower-broadcast',
      color: 'bg-red-600/10 text-red-500 border-red-500/20'
    }
  ];

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6">
      <div className="max-w-md w-full bg-[#020617] border border-white/10 rounded-[32px] md:rounded-[48px] p-8 md:p-12 text-center animate-fadeIn shadow-[0_0_100px_rgba(220,38,38,0.1)] overflow-y-auto max-h-[90vh]">
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[24px] md:rounded-[36px] border flex items-center justify-center animate-float ${steps[step].color}`}>
            <i className={`fa-solid ${steps[step].icon} text-4xl md:text-5xl`}></i>
          </div>
        </div>
        
        <div className="space-y-6 md:space-y-8 mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-[900] text-white tracking-normal uppercase italic leading-tight">
            {steps[step].title}
          </h2>
          <p className="text-slate-300 font-bold leading-relaxed uppercase text-[11px] md:text-[13px] tracking-wide px-2 md:px-4">
            {steps[step].desc}
          </p>
        </div>

        <div className="flex gap-2 md:gap-3 justify-center mb-10 md:mb-14">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 md:w-10 bg-red-500' : 'w-2 bg-slate-800'}`}></div>
          ))}
        </div>

        <div className="space-y-3 md:space-y-4">
          <button 
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : onClose()}
            className="w-full py-5 md:py-7 bg-red-600 text-white rounded-[24px] md:rounded-[28px] font-black text-[11px] md:text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            {step < steps.length - 1 ? (lang === 'uz' ? "KEYINGISI" : (lang === 'ru' ? "ДАЛЕЕ" : "NEXT")) : t.getStarted}
          </button>
          
          {step === steps.length - 1 && onReadManual && (
            <button 
              onClick={onReadManual}
              className="w-full py-3 md:py-4 text-slate-500 font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:text-white transition-colors"
            >
              {t.readManual}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingOverlay;
