"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Users, FileDown, Upload, Search, CheckCircle2, ShieldAlert, Loader2, Zap } from 'lucide-react';

export default function MutabakatPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <Users className="w-3 h-3" /> Karşılıklı Mutabakat Paneli
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              Belge <span className="text-primary text-indigo-400">Karşılaştırma</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium">Alıcı ve satıcı belgelerini AI ile çapraz kontrol edin, resmiyet kazanın.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { num: 1, label: "Dosyaları Yükle", active: step === 1 },
              { num: 2, label: "AI Çapraz Analiz", active: step === 2 },
              { num: 3, label: "Mutabakat Raporu", active: step === 3 }
            ].map((s, i) => (
              <div key={i} className={`p-4 border-b-2 text-center transition-all ${
                s.active ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 opacity-40'
              }`}>
                <div className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{s.num}. ADIM</div>
                <div className="text-xs font-bold text-white uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
               {/* Seller Side */}
               <div className="glass-card p-8 border-indigo-500/10 bg-indigo-500/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400">Satıcı Belgeleri</h3>
                     <span className="text-[10px] text-white/30 font-bold uppercase">RAM-BUFFER</span>
                  </div>
                  <div className="border-2 border-dashed border-white/5 rounded-2xl h-48 flex flex-col items-center justify-center gap-4 hover:border-indigo-400/50 transition-all group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-all shadow-inner shadow-indigo-500/40">
                       <Upload className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-black text-white uppercase tracking-widest">TAPU VEYA YETKİ BELGESİ</div>
                      <div className="text-[9px] text-white/20 font-bold uppercase">MAX 20MB (.PDF, .JPG)</div>
                    </div>
                  </div>
               </div>

               {/* Buyer Side */}
               <div className="glass-card p-8 border-amber-500/10 bg-amber-500/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">Alıcı Belgeleri</h3>
                     <span className="text-[10px] text-white/30 font-bold uppercase">RAM-BUFFER</span>
                  </div>
                  <div className="border-2 border-dashed border-white/5 rounded-2xl h-48 flex flex-col items-center justify-center gap-4 hover:border-amber-400/50 transition-all group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-all shadow-inner shadow-amber-500/40">
                       <Upload className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-black text-white uppercase tracking-widest">KİMLİK VEYA FON KANITI</div>
                      <div className="text-[9px] text-white/20 font-bold uppercase">MAX 20MB (.PDF, .JPG)</div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass-card p-12 border-indigo-500/20 bg-indigo-500/5 text-center space-y-8 animate-in fade-in duration-700">
               <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto border border-indigo-500/40 relative">
                  <div className="absolute inset-0 bg-indigo-400 blur-2xl opacity-20 animate-pulse"></div>
                  <Zap className="w-12 h-12 text-indigo-400 relative z-10" />
               </div>
               <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">MUTABAKAT DOĞRULANDI</h2>
                  <p className="text-white/40 uppercase text-[10px] font-black tracking-widest">Belgeler Arasında %100 Uyumluluk Tespit Edildi.</p>
               </div>
               <div className="max-w-md mx-auto p-4 bg-[#0a0a0c] border border-white/10 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black">
                     <span className="text-white/40 uppercase">TAPU SAHİBİ:</span>
                     <span className="text-emerald-400 uppercase">DOĞRULANDI</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black">
                     <span className="text-white/40 uppercase">ALICI KİMLİK:</span>
                     <span className="text-emerald-400 uppercase">DOĞRULANDI</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black border-t border-white/5 pt-2 mt-2">
                     <span className="text-white/40 uppercase">SİSTEM SKORU:</span>
                     <span className="text-indigo-400 uppercase font-bold text-xl">98/100</span>
                  </div>
               </div>
               <div className="flex justify-center flex-col md:flex-row gap-4">
                  <button className="px-12 py-5 bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-indigo-500/30">
                    <FileDown className="w-4 h-4" /> RESMİ RAPORU İNDİR
                  </button>
                  <button onClick={() => setStep(1)} className="px-12 py-5 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                    YENİ SORGULAMA
                  </button>
               </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex justify-center pt-8">
               <button 
                onClick={startAnalysis}
                disabled={loading}
                className="btn-primary px-16 py-5 text-sm font-black uppercase tracking-widest disabled:opacity-50 flex items-center gap-3 active:scale-95 shadow-2xl shadow-primary/40"
               >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> ANALİZİ BAŞLAT</>}
               </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
