"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ShieldCheck, Upload, FileText, CheckCircle2, Loader2, Sparkles, Building2 } from 'lucide-react';

export default function DogrulamaPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const startValidation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> Tek Taraflı Belge Doğrulama
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9]">
              Tapu ve <span className="text-emerald-400">Yetki Mührü</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium">Bireysel belgelerinizi sisteme tanıtın, AI destekli teyit raporu alın.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {step === 1 ? (
              <>
                 <div className="glass-card p-8 border-white/5 bg-white/[0.02] space-y-8 flex flex-col justify-between h-full animate-in slide-in-from-left-4 duration-500">
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                         <FileText className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Belge Verisi</h3>
                        <p className="text-white/40 text-xs font-semibold leading-relaxed">TAPU, RUHSAT VEYA YETKİ BELGESİ BİLGİLERİNİ GİRİN.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <input type="text" placeholder="Ada Parsel No" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-emerald-500/50 outline-none" />
                       <input type="text" placeholder="Şehir / İlçe" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-emerald-500/50 outline-none" />
                    </div>
                 </div>

                 <div className="glass-card p-8 border-white/5 bg-white/[0.02] space-y-8 flex flex-col justify-between h-full animate-in slide-in-from-right-4 duration-500">
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                         <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Belge Görseli</h3>
                        <p className="text-white/40 text-xs font-semibold leading-relaxed">BELGENİN NET BİR FOTOĞRAFINI VEYA PDF DOSYASINI YÜKLEYİN.</p>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-white/5 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 hover:border-primary/50 cursor-pointer transition-all">
                       <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">DOSYAYI BURAYA BIRAKIN</div>
                       <div className="text-[9px] text-primary/40 font-bold uppercase">VEYA SEÇİN</div>
                    </div>
                 </div>

                 <div className="md:col-span-2 pt-8">
                    <button 
                      onClick={startValidation}
                      disabled={loading}
                      className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-6 h-6" /> BELGEYİ TEYİT ET</>}
                    </button>
                 </div>
              </>
            ) : (
              <div className="md:col-span-2 glass-card p-12 text-center space-y-8 border-emerald-500/20 bg-emerald-500/5 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-inner shadow-emerald-500/40">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tight">BELGE DOĞRULANDI</h2>
                    <p className="text-white/40 uppercase text-[10px] font-black tracking-widest leading-relaxed">
                      Sistem veritabanı ile uyumluluk tespit edildi. <br />
                      Belgeniz <span className="text-emerald-400 font-bold">SHA-256</span> hash kodu ile mühürlendi.
                    </p>
                  </div>
                  <div className="max-w-md mx-auto p-4 bg-[#0a0a0c] border border-white/5 rounded-2xl text-left flex items-center gap-4">
                     <Building2 className="w-10 h-10 text-emerald-400 opacity-20" />
                     <div>
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">DOĞRULAMA KODU</div>
                        <div className="text-xs font-mono font-bold text-white uppercase tracking-widest break-all">VRC-A9BK-229X-001L</div>
                     </div>
                  </div>
                  <button onClick={() => setStep(1)} className="px-16 py-5 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                    YENİ BELGE TEYİT
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
