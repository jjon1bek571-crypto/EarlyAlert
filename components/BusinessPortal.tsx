
import React from 'react';
import { Language, translations } from '../i18n';

interface BusinessPortalProps {
  lang: Language;
  // Added onBack prop to match App.tsx usage
  onBack: () => void;
}

const BusinessPortal: React.FC<BusinessPortalProps> = ({ lang, onBack }) => {
  const t = translations[lang];

  return (
    <div className="space-y-8">
      {/* Added back button consistent with other components */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-3"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase tracking-widest">{t.back}</span>
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-black">{t.business}</h2>
        <p className="text-slate-500 text-sm">{t.pilotStrategy}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[24px] bg-slate-900/50 border border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
            <i className="fa-solid fa-file-contract text-xl"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">{t.insuranceIntegrate}</h3>
          <p className="text-sm text-slate-500 mb-6">Sug'urta kompaniyalari uchun risklarni kamaytirish koeffitsienti: <span className="text-emerald-500 font-bold">-40%</span></p>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[65%]"></div>
          </div>
        </div>

        <div className="p-8 rounded-[24px] bg-slate-900/50 border border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
            <i className="fa-solid fa-building-circle-check text-xl"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">{t.devPartners}</h3>
          <p className="text-sm text-slate-500 mb-6">Yangi turar-joy komplekslari uchun integratsiya tayyorligi: <span className="text-emerald-500 font-bold">100%</span></p>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[100%]"></div>
          </div>
        </div>

        <div className="p-8 rounded-[24px] bg-slate-900/50 border border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
            <i className="fa-solid fa-users-gear text-xl"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Management Co.</h3>
          <p className="text-sm text-slate-500 mb-6">Boshqaruv kompaniyalari uchun umumiy monitoring paneli.</p>
          <button className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Open Console</button>
        </div>
      </div>

      <div className="p-8 rounded-[24px] bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 shadow-2xl">
        <h3 className="text-lg font-black mb-6 uppercase tracking-widest">Pilot Case Studies</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="flex gap-4 p-4 rounded-2xl bg-black/20">
              <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/build1/200/200" className="w-full h-full object-cover opacity-50" />
              </div>
              <div>
                <p className="font-bold text-sm">"Tashkent City" Lotus Block</p>
                <p className="text-xs text-slate-500 mt-1">250 xonadon, 0 ta soxta signal, 2 ta suv toshqini oldi olindi.</p>
                <p className="text-[9px] text-emerald-500 font-bold uppercase mt-2">Muvaffaqiyatli yakunlandi</p>
              </div>
           </div>
           <div className="flex gap-4 p-4 rounded-2xl bg-black/20">
              <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/build2/200/200" className="w-full h-full object-cover opacity-50" />
              </div>
              <div>
                <p className="font-bold text-sm">"Modern Sergeli" Pro</p>
                <p className="text-xs text-slate-500 mt-1">110 xonadon, Sug'urta hamkori: Apex Insurance.</p>
                <p className="text-[9px] text-blue-500 font-bold uppercase mt-2">Jarayonda</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPortal;
