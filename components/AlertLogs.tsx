
import React from 'react';
import { SafetyAlert } from '../types';
import { Language, translations } from '../i18n';

interface AlertLogsProps {
  alerts: SafetyAlert[];
  lang: Language;
  onBack: () => void;
}

const AlertLogs: React.FC<AlertLogsProps> = ({ alerts, lang, onBack }) => {
  const t = translations[lang];

  // Simulated fire stations for the tactical map
  const fireStations = [
    { name: 'Fire Station #14', dist: '1.2 km', eta: '4 min', status: 'READY', pos: { x: '45%', y: '40%' } },
    { name: 'Station Central', dist: '2.8 km', eta: '7 min', status: 'READY', pos: { x: '70%', y: '65%' } },
    { name: 'District Response 01', dist: '3.5 km', eta: '10 min', status: 'BUSY', pos: { x: '20%', y: '30%' } },
  ];

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-3"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase tracking-widest">{t.back}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-5xl font-[900] tracking-tighter uppercase italic text-white">{t.alertHistory}</h2>
           <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em] mt-2">Real-time Safety Logs & Response Coverage</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-red-600/10 border border-red-500/20 rounded-xl flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">{t.fireStations}: 12</span>
           </div>
        </div>
      </div>

      {/* TACTICAL RESPONSE MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 relative aspect-video md:aspect-auto md:h-[500px] rounded-[48px] bg-slate-900 border border-white/5 overflow-hidden shadow-2xl group">
           {/* Abstract Map Grid */}
           <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}></div>

           {/* User Location */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                 <div className="absolute -inset-8 bg-blue-500/20 rounded-full animate-ping"></div>
                 <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(59,130,246,1)] relative z-10"></div>
                 <p className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black text-blue-400 uppercase tracking-widest bg-slate-950/80 px-3 py-1 rounded-full border border-blue-500/30">My Location</p>
              </div>
           </div>

           {/* Fire Stations & Coverage Zones */}
           {fireStations.map((station, i) => (
             <div key={i} className="absolute z-10" style={{ left: station.pos.x, top: station.pos.y }}>
                <div className="relative group/station cursor-pointer">
                   {/* Coverage Circle */}
                   <div className={`absolute -inset-16 rounded-full border border-dashed transition-all duration-700 ${station.status === 'READY' ? 'border-emerald-500/30 bg-emerald-500/5 group-hover/station:bg-emerald-500/10' : 'border-red-500/30 bg-red-500/5'}`}></div>
                   
                   <div className={`w-4 h-4 rounded-lg transform rotate-45 border-2 border-white shadow-xl ${station.status === 'READY' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                   
                   {/* Info Tooltip */}
                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 border border-white/10 p-3 rounded-xl shadow-2xl min-w-[120px] opacity-0 group-hover/station:opacity-100 transition-opacity">
                      <p className="text-[10px] font-black text-white uppercase mb-1">{station.name}</p>
                      <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase">
                        <span>{t.eta}: {station.eta}</span>
                        <span className={station.status === 'READY' ? 'text-emerald-500' : 'text-red-500'}>{station.status}</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}

           {/* Map Controls */}
           <div className="absolute bottom-8 right-8 flex flex-col gap-3">
              <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-white"><i className="fa-solid fa-plus"></i></button>
              <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-white"><i className="fa-solid fa-minus"></i></button>
           </div>

           <div className="absolute top-8 left-8 p-6 glass rounded-[32px] border-white/10 hidden md:block">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{t.responseMap}</h4>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                    <span className="text-[10px] font-bold text-white uppercase">{t.nearestStation}: 4 min</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                    <span className="text-[10px] font-bold text-white uppercase">{t.coverageZone}: Active</span>
                 </div>
              </div>
           </div>
        </div>

        {/* STATION LIST */}
        <div className="space-y-6">
           <div className="p-8 rounded-[40px] bg-slate-900/40 border border-white/5 flex flex-col gap-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">{t.nearestStation}</h3>
              <div className="space-y-4">
                 {fireStations.map((station, i) => (
                   <div key={i} className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 flex items-center justify-between group hover:border-emerald-500/20 transition-all">
                      <div>
                         <p className="text-sm font-black text-white">{station.name}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{station.dist} • {station.eta}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${station.status === 'READY' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                         {station.status}
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-5 glass border-blue-500/20 text-blue-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                Request Zone Audit
              </button>
           </div>
        </div>
      </div>

      {/* ALERT HISTORY TABLE */}
      <div className="space-y-6 pt-10">
        <h3 className="text-2xl font-[900] text-white uppercase italic tracking-tight">{t.alertHistory}</h3>
        <div className="bg-slate-900/40 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-10 py-6">Vaqt</th>
                <th className="px-10 py-6">Turi</th>
                <th className="px-10 py-6">Joylashuv</th>
                <th className="px-10 py-6">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {alerts.map(alert => (
                <tr key={alert.id} className="text-sm group hover:bg-white/[0.02] transition-colors">
                  <td className="px-10 py-6 text-slate-500 font-medium">{alert.timestamp.toLocaleTimeString()}</td>
                  <td className="px-10 py-6">
                     <div className="flex items-center gap-3">
                        <i className={`fa-solid ${alert.type === 'FIRE' ? 'fa-fire text-red-500' : 'fa-droplet text-blue-500'}`}></i>
                        <span className="font-black text-white">{alert.type}</span>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-slate-300 font-bold">{alert.location}</td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${alert.severity === 'CRITICAL' ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-slate-800 text-slate-400'}`}>
                      {alert.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertLogs;
