
import React, { useState, useRef } from 'react';
import { analyzeHomeRisk } from '../geminiService';
import { Language, translations } from '../i18n';

interface RiskAnalyzerProps {
  lang: Language;
  onBack: () => void;
}

const RiskAnalyzer: React.FC<RiskAnalyzerProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64 = image.split(',')[1];
      const result = await analyzeHomeRisk(base64);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 flex items-center gap-3">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase">{t.back}</span>
        </button>
      </div>

      <div>
        <h2 className="text-5xl font-[900] tracking-tighter mb-2">{t.riskAnalyzer}</h2>
        <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Expert Safety Audit Layer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-[40px] border border-white/5 bg-slate-900/40 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-900/60 transition-all overflow-hidden relative shadow-2xl"
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Audit Target" />
            ) : (
              <>
                <i className="fa-solid fa-microscope text-5xl text-slate-700 mb-6"></i>
                <p className="text-slate-500 font-black uppercase text-xs tracking-widest">Upload Area for Deep Audit</p>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className={`w-full py-6 rounded-[24px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${
              !image || loading ? 'bg-slate-800 text-slate-500' : 'bg-red-600 text-white shadow-2xl'
            }`}
          >
            {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-shield-halved"></i>}
            Run Expert Analysis
          </button>
        </div>

        <div className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 flex flex-col min-h-[500px] backdrop-blur-xl">
          <div className="flex-1 overflow-y-auto text-slate-300 prose prose-invert prose-sm">
            {analysis ? (
              <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <i className="fa-solid fa-layer-group text-6xl mb-6"></i>
                <p className="text-xs uppercase font-black tracking-widest">Layer Status: Waiting for input...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalyzer;
