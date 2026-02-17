
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Language, translations } from '../i18n';

interface LiveExpertProps {
  lang: Language;
  onBack: () => void;
}

const LiveExpert: React.FC<LiveExpertProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Audio utility functions
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmData = encode(new Uint8Array(int16.buffer));
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ 
                  media: { data: pcmData, mimeType: 'audio/pcm;rate=16000' } 
                });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscription(prev => [...prev.slice(-4), `Expert: ${text}`]);
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are an emergency response and home safety expert. Provide clear, calm, and actionable advice about fire and water damage safety. Be concise.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 flex items-center gap-3">
          <i className="fa-solid fa-chevron-left"></i>
          <span className="font-bold text-sm uppercase">{t.back}</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12 py-10">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-[900] tracking-tighter uppercase">{t.liveExpert}</h2>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">{t.liveInstruction}</p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Pulsing Visualizer */}
          <div className={`absolute w-64 h-64 rounded-full border border-rose-500/30 ${isActive ? 'ripple' : ''}`}></div>
          <div className={`absolute w-64 h-64 rounded-full border border-rose-500/20 ${isActive ? 'ripple' : ''}`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute w-64 h-64 rounded-full border border-rose-500/10 ${isActive ? 'ripple' : ''}`} style={{ animationDelay: '2s' }}></div>
          
          <div className={`w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 ${isActive ? 'bg-rose-600 scale-110 shadow-rose-900/50' : 'bg-slate-900 border border-white/10'}`}>
            <i className={`fa-solid ${isConnecting ? 'fa-circle-notch animate-spin' : isActive ? 'fa-microphone-lines' : 'fa-microphone-slash'} text-6xl text-white`}></i>
          </div>
        </div>

        <div className="w-full max-w-lg space-y-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-[32px] p-8 min-h-[160px] flex flex-col justify-center text-center">
            {transcription.length > 0 ? (
              transcription.map((line, i) => (
                <p key={i} className={`text-sm font-bold ${i === transcription.length - 1 ? 'text-white' : 'text-slate-500 opacity-50'}`}>
                  {line}
                </p>
              ))
            ) : (
              <p className="text-slate-600 text-xs font-black uppercase tracking-widest">
                {isActive ? "Listening for your voice..." : "Press start to connect"}
              </p>
            )}
          </div>

          <button
            onClick={isActive ? stopSession : startSession}
            disabled={isConnecting}
            className={`w-full py-8 rounded-[32px] font-[900] text-xl tracking-tighter uppercase transition-all shadow-2xl flex items-center justify-center gap-4 ${
              isActive 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-gradient-to-br from-rose-500 to-rose-700 text-white hover:scale-[1.02]'
            }`}
          >
            {isConnecting ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              <i className={`fa-solid ${isActive ? 'fa-stop' : 'fa-play'}`}></i>
            )}
            {isActive ? t.stopLive : t.startLive}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveExpert;