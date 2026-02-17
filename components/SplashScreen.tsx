
import React from 'react';
import { Language, translations } from '../i18n';

interface SplashScreenProps {
  lang: Language;
  onStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ lang, onStart }) => {
  // Matnlarni o'zbekchada ko'rsatish
  const t = translations['uz'];

  return (
    <div className="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-end p-8 overflow-hidden">
      {/* Effektlar: Orqa fondagi rasmsiz, faqat yorug'lik effektlari */}
      <div className="absolute inset-0 z-0">
        {/* Chap tomon (Olov nuri - Neon Red Glow) */}
        <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-gradient-to-r from-red-600/10 via-red-600/5 to-transparent blur-[80px]"></div>
        
        {/* O'ng tomon (Suv nuri - Neon Blue Glow) */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-600/10 via-blue-600/5 to-transparent blur-[80px]"></div>

        {/* Markazdagi qo'shimcha chuqurlik */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020617]/40 to-[#020617]"></div>
      </div>
      
      {/* Markazdagi Neon Belgilar (Olov va Suv integratsiyasi) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-32">
        <div className="w-full max-w-4xl flex justify-between px-8 md:px-24 items-center">
          
          {/* Yong'in belgisi (Chapda) */}
          <div className="relative animate-float">
             <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-[3px] border-red-500 flex items-center justify-center bg-red-600/10 backdrop-blur-3xl shadow-[0_0_80px_rgba(239,68,68,0.4)]">
                <i className="fa-solid fa-fire text-4xl md:text-6xl text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,1)]"></i>
             </div>
             {/* Ogohlantirish belgisi */}
             <div className="absolute top-1 -right-1 md:top-6 md:-right-2 w-8 h-8 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center text-white border-2 border-white/40 shadow-2xl animate-pulse">
                <i className="fa-solid fa-triangle-exclamation text-xs md:text-xl"></i>
             </div>
          </div>

          {/* Suv belgisi (O'ngda) */}
          <div className="relative animate-float" style={{ animationDelay: '1.5s' }}>
             <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-[3px] border-blue-400 flex items-center justify-center bg-blue-600/10 backdrop-blur-3xl shadow-[0_0_80px_rgba(59,130,246,0.4)]">
                <i className="fa-solid fa-droplet text-4xl md:text-6xl text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,1)]"></i>
             </div>
             {/* Ogohlantirish belgisi */}
             <div className="absolute top-1 -right-1 md:top-6 md:-right-2 w-8 h-8 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center text-white border-2 border-white/40 shadow-2xl animate-pulse">
                <i className="fa-solid fa-triangle-exclamation text-xs md:text-xl"></i>
             </div>
          </div>

        </div>
      </div>

      {/* Matnlar va Tugmalar */}
      <div className="relative z-10 text-center space-y-12 max-w-sm w-full mb-16 animate-fadeIn">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-[900] tracking-tighter text-white uppercase italic leading-[0.85] drop-shadow-2xl">
            Xavfsizlik <br/> <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">Qatlami</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] opacity-60">
            Professional Himoya Tizimi
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={onStart}
            className="w-full py-6 bg-red-600 hover:bg-red-500 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] active:scale-95 transition-all shadow-[0_20px_60px_rgba(220,38,38,0.3)] border-b-4 border-red-800"
          >
            {t.login}
          </button>
          
          <button 
            className="w-full py-6 bg-white/5 backdrop-blur-2xl border border-white/10 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 active:scale-95 transition-all"
          >
            {t.signup}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 flex gap-3 opacity-30">
        <div className="w-12 h-1 bg-white rounded-full"></div>
        <div className="w-2 h-1 bg-white rounded-full"></div>
        <div className="w-2 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
