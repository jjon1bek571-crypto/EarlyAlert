
import React from 'react';
import { SafetyAlert } from '../types';
import { Language, translations } from '../i18n';

interface AlertLogsProps {
  alerts: SafetyAlert[];
  lang: Language;
  // Added onBack prop to match App.tsx usage
  onBack: () => void;
}

const AlertLogs: React.FC<AlertLogsProps> = ({ alerts, lang, onBack }) => {
  const t = translations[lang];

  return (
    <div className="space-y-6">
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

      <h2 className="text-2xl font-black">{t.alertHistory}</h2>
      <div className="bg-slate-900/50 border border-slate-800 rounded-[24px] overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-6 py-4">Vaqt</th>
              <th className="px-6 py-4">Turi</th>
              <th className="px-6 py-4">Joylashuv</th>
              <th className="px-6 py-4">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {alerts.map(alert => (
              <tr key={alert.id} className="text-sm">
                <td className="px-6 py-4 text-slate-500 font-medium">{alert.timestamp.toLocaleTimeString()}</td>
                <td className="px-6 py-4 font-black">{alert.type}</td>
                <td className="px-6 py-4 text-slate-300">{alert.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${alert.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {alert.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertLogs;
