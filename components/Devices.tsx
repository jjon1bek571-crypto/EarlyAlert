
import React, { useState } from 'react';
import { Language, translations } from '../i18n';

interface DevicesProps {
  lang: Language;
  // Added onBack prop to match App.tsx usage
  onBack: () => void;
}

const Devices: React.FC<DevicesProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const [valveOpen, setValveOpen] = useState(true);

  const fireSensors = [
    { id: 'F1', location: 'Oshxona', smoke: 5, temp: 24, status: 'OK' },
    { id: 'F2', location: 'Mehmonxona', smoke: 2, temp: 22, status: 'OK' },
  ];

  const waterSensors = [
    { id: 'W1', location: 'Vanna', moisture: 12, flow: 0, status: 'OK' },
    { id: 'W2', location: 'Yerto\'la', moisture: 15, flow: 0, status: 'OK' },
  ];

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

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">{t.devices}</h2>
          <p className="text-slate-500 text-sm">{t.dualLogic}</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t.lowInternet}</span>
        </div>
      </div>

      {/* Safety Layer Logic Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fire Logic */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[24px] p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-orange-500/20 rounded-2xl text-orange-500">
              <i className="fa-solid fa-fire-extinguisher text-3xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t.fire} Monitoring</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{t.smoke} + {t.temp}</p>
            </div>
          </div>

          <div className="space-y-4">
            {fireSensors.map(s => (
              <div key={s.id} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between group hover:border-orange-500/30 transition-all">
                <div>
                  <p className="text-sm font-black text-white">{s.location}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">ID: {s.id}</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">{t.smoke}</p>
                    <p className="text-lg font-black text-orange-500">{s.smoke}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">{t.temp}</p>
                    <p className="text-lg font-black text-white">{s.temp}°C</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Logic */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[24px] p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-500">
              <i className="fa-solid fa-faucet-drip text-3xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t.water} Monitoring</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{t.humidity} + {t.flow}</p>
            </div>
          </div>

          <div className="space-y-4">
            {waterSensors.map(s => (
              <div key={s.id} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                <div>
                  <p className="text-sm font-black text-white">{s.location}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">ID: {s.id}</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">{t.humidity}</p>
                    <p className="text-lg font-black text-blue-500">{s.moisture}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">{t.flow}</p>
                    <p className="text-lg font-black text-white">{s.flow} L/m</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Valve Control */}
          <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">{t.valveStatus}</p>
              <p className="text-lg font-bold">{valveOpen ? 'OPENED / OCHIQ' : 'CLOSED / YOPILGAN'}</p>
            </div>
            <button 
              onClick={() => setValveOpen(!valveOpen)}
              className={`px-6 py-3 rounded-xl font-black text-[10px] transition-all uppercase tracking-widest ${valveOpen ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'}`}
            >
              {valveOpen ? t.closeValve : t.openValve}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
