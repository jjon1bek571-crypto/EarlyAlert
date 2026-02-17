
import React, { useState, useRef } from 'react';
import { editSafetyImage } from '../geminiService';
import { Language, translations } from '../i18n';

interface VisualEditorProps {
  lang: Language;
  // Added onBack prop to match App.tsx usage
  onBack: () => void;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presets = [
    "Visualize a fire emergency",
    "Simulate a severe water leak",
    "Add smoke detectors",
    "Clean safety audit view"
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (customPrompt?: string) => {
    const activePrompt = customPrompt || prompt;
    if (!originalImage || !activePrompt) return;
    setLoading(true);
    try {
      const base64 = originalImage.split(',')[1];
      const result = await editSafetyImage(base64, activePrompt);
      if (result) setEditedImage(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl font-black mb-2">{t.visualSimulation}</h2>
        <p className="text-slate-400">Favqulodda vaziyatlarni vizual tasvirlash orqali xavfni baholang.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square rounded-[24px] bg-slate-900/50 border border-slate-800 overflow-hidden relative shadow-2xl cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          {originalImage ? <img src={originalImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center opacity-30"><i className="fa-solid fa-image text-4xl mb-2"></i><p className="text-[10px] font-black uppercase tracking-widest">Manba rasmi</p></div>}
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
        </div>

        <div className="aspect-square rounded-[24px] bg-slate-900 border border-slate-800 overflow-hidden relative shadow-2xl">
          {editedImage ? <img src={editedImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center opacity-30">{loading ? <i className="fa-solid fa-wand-sparkles animate-pulse text-purple-500 text-4xl"></i> : <i className="fa-solid fa-robot text-4xl"></i>}</div>}
        </div>
      </div>

      <div className="p-8 rounded-[24px] bg-slate-900/50 border border-slate-800 space-y-6">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Nima sodir bo'lishini tasvirlash kerak?"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={() => handleEdit()}
            disabled={loading || !originalImage}
            className="px-8 bg-purple-600 hover:bg-purple-500 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-purple-900/20"
          >
            {loading ? '...' : 'SIMULATSIYA'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map(p => (
            <button key={p} onClick={() => { setPrompt(p); handleEdit(p); }} className="px-4 py-2 bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualEditor;
