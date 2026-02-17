
import React from 'react';
import { SafetyAlert } from '../types';
import { Language, translations } from '../i18n';

interface EmergencyOverlayProps {
  alert: SafetyAlert;
  lang: Language;
  onClose: () => void;
}

const EmergencyOverlay: React.FC<EmergencyOverlayProps> = ({ alert, lang, onClose }) => {
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-red-600 animate-fadeInFast">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-red-700 to-red-950 animate-pulse"></div>
      
      <div className="relative text-center p-8 max-w-lg w-full">
        <div className="mb-10 inline-flex items-center justify-center w-32 h-32 rounded-full bg-white text-red-600 shadow-[0_0_50px_rgba(255,255,255,0.4)] animate-bounce">
          <i className="fa-solid fa-triangle-exclamation text-6xl"></i>
        </div>

        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">{t.criticalAlert}</h1>
        <p className="text-2xl font-bold text-white/80 mb-12 uppercase tracking-widest">
          {alert.type === 'FIRE' ? t.fire : t.water} {t.detected}
        </p>

        <div className="space-y-4">
          <button 
            className="w-full py-6 bg-white text-red-600 rounded-[24px] text-2xl font-black shadow-2xl hover:scale-105 transition-transform uppercase tracking-tighter"
            onClick={() => window.open('tel:112')}
          >
            {t.call112}
          </button>
          
          <button 
            className="w-full py-4 bg-red-900/40 text-white/60 hover:text-white rounded-[24px] text-xs font-black transition-all uppercase tracking-widest"
            onClick={onClose}
          >
            {t.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyOverlay;
